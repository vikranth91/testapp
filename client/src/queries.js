import {
  gql
} from "apollo-boost";

/* Posts get Query */
export const GET_POSTS = gql `
query {
          getPosts {
            _id
            title
            description
            imageURL
            likes
          }
        }
`;

// Get PostView

export const GET_POST_VIEW = gql `
query($postId: ID!){
  getPostView(postId: $postId){
    _id
    title
    description
    imageURL
    likes
    createdDate
    categories
    messages{
      _id
      messageBody
      messageDate
      messageUser{
        _id
        username
        avatar
      }
    }
  }

}

`;

/* user Queries */
export const GET_CURRENT_USER = gql `
query{
  getCurrentUser{
    _id
    username
    email
    password
    avatar
    joinDate
    favorites{
      _id
      title
      imageURL
    }
  }
}

`;
/* Posts get Query */
export const ADD_POST = gql `
mutation(
  $title: String!,
  $imageURL: String!,
  $categories: [String]!,
  $description: String!,
  $createrId: ID!
){
  addPost(
    title: $title,
    imageURL: $imageURL,
    categories: $categories,
    description: $description,
    createrId: $createrId
  ){
    _id,
    title,
    imageURL,
    categories,
    description,
    createdDate
  }
}
`;

/* Posts get Query */

export const INFINITE_SCROLL_POSTS = gql `
query( $pageNum: Int!, $pageSize: Int!){
  infiniteScrollPosts(pageNum: $pageNum, pageSize: $pageSize){
    hasMore
    posts{
      _id
      title
      imageURL
      categories
      description
      createdDate
      likes
      createdBy{
        _id
        username
        avatar
      }
      messages{
        _id
      }

    }

  }
}
`;

// create message

export const ADD_POST_MESSAGE = gql `
  mutation($messageBody: String!, $userId: ID!, $postId:ID!){
    addPostMessage(messageBody: $messageBody, userId: $userId, postId: $postId){
      _id
      messageBody
      messageDate
      messageUser{
        _id
        username
      }

    }
  }
`;


/* user Mutation */
export const SIGNIN_USER = gql `
mutation($username:String! , $password: String!){
  signInUser(username: $username , password :$password){
	token
  }
}
`

export const SIGNUP_USER = gql `
mutation($username:String! , $password: String!, $email: String! ){
  signUpUser(username: $username , password: $password, email : $email){
	token
  }
}

`