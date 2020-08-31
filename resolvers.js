const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const {
        username,
        email
    } = user
    return jwt.sign({
        username,
        email
    }, secret, {
        expiresIn
    })
}

module.exports = {
    Query: {
        getCurrentUser: async (_, args, {
            User,
            currentUser
        }) => {
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({
                username: currentUser.username
            }).populate({
                path: 'favorites',
                model: 'Post'
            });
            return user
        },
        getPosts: async (_, args, {
            Post
        }) => {
            const posts = await Post.find({}).sort({
                createdDate: 'desc'
            }).populate({
                path: 'createdBy',
                model: 'User'
            });
            return posts;
        },
        getPostView: async (_, {
            postId
        }, {
            Post
        }) => {
            singlePost = await Post.findOne({
                    _id: postId
                })
                .populate({
                    path: 'messages.messageUser',
                    model: 'User'
                })

            return singlePost
        },
        infiniteScrollPosts: async (_, {
            pageNum,
            pageSize
        }, {
            Post
        }) => {
            let posts;
            if (pageNum === 1) {
                posts = await Post.find({}).sort({
                    createdDate: 'desc'
                }).populate({
                    path: 'createdBy',
                    model: 'User'
                }).limit(pageSize)
            } else {
                const skips = pageSize * (pageNum - 1);
                posts = await Post.find({}).sort({
                    createdDate: 'desc'
                }).populate({
                    path: 'createdBy',
                    model: 'User'
                }).skip(skips).limit(pageSize)
            }

            const totalDocs = await Post.countDocuments();
            const hasMore = totalDocs > (pageSize * pageNum)

            return {
                posts,
                hasMore
            };
        },
    },
    Mutation: {
        addPost: async (_, {
            title,
            imageURL,
            categories,
            description,
            createrId
        }, {
            Post
        }) => {
            const newPost = await new Post({
                title,
                imageURL,
                categories,
                description,
                createdBy: createrId
            }).save();

            return newPost;
        },
        signInUser: async (_, {
            username,
            password
        }, {
            User
        }) => {

            const user = await User.findOne({
                username
            })

            if (!user) {
                throw new Error("User not found test");
            }

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
                throw new Error("Invalid password")
            }

            return {
                token: createToken(user, process.env.SECRET, '1hr')
            }

        },
        signUpUser: async (_, {
            username,
            email,
            password
        }, {
            User
        }) => {
            const user = await User.findOne({
                username: username
            });
            if (user) {
                throw new Error('user already exists')
            }

            const newUser = await new User({
                username,
                password,
                email
            }).save();

            return {
                token: createToken(newUser, process.env.SECRET, '1hr')
            }

        },

        addPostMessage: async (_, {
            messageBody,
            postId,
            userId
        }, {
            Post
        }) => {
            const newMessage = {
                messageBody,
                messageUser: userId
            }
            console.log('in message resolver')
            const post = await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    messages: {
                        $each: [newMessage],
                        $position: 0
                    }
                }
            }, {
                new: true
            }).populate({
                path: 'messages.messageUser',
                model: 'User'
            })
            return post.messages[0];
        }
    }
}