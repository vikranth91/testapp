const express = require('express');
const {
    ApolloServer,
    AuthenticationError
} = require('apollo-server-express');
const mongoose = require('mongoose');

require('dotenv').config({
    path: 'variables.env'
})
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");

//gql file path
const gqlFilePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(gqlFilePath, 'utf-8')
//mongoose models
const User = require("./models/user.js");
const Post = require("./models/post.js")
const jwt = require('jsonwebtoken');

//resolvers
const resolvers = require('./resolvers')
const app_express = express();

app_express.use(bodyParser.json());

//mongoose connection
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB Connected')
    })
    .catch(err => {
        console.log(err)
    })
//verify token passed from client
const getUser = async token => {
    if (token) {
        try {
            console.log('current user triggered')
            const user = jwt.verify(token, process.env.SECRET);
            console.log(user)
            return user
        } catch (error) {
            console.log(error)
            throw new AuthenticationError("Session has ended. Please sign in Again  **")
        }
    }
}



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({
        req
    }) => {
        const token = req.headers['authorization']
        console.log(req.headers.referer.split('/')[3])
        return {
            User,
            Post,
            currentUser: await getUser(token)
        };
    }
});

const app = express();
server.applyMiddleware({
    app
});

app.listen({
        port: 3000
    }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);