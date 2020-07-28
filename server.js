const express = require('express');
const {
    ApolloServer,
    gql
} = require('apollo-server-express');
const mongoose = require('mongoose');

require('dotenv').config({
    path: 'variables.env'
})

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


const todos = [{
        task: 'Clean house',
        status: true
    },
    {
        task: 'study for exam',
        status: false
    }
]

// Construct a schema, using GraphQL schema language
const typeDefs = gql `
  type Todo {
    task: String,
    status: Boolean
  }

  type Query{
      getTodos: [Todo]
  }

  type Mutation{
      addTodo(task:String, status: Boolean): Todo
  }

`;



// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        getTodos: () => todos
    },

    Mutation: {
        addTodo: (_, task, status) => {
            const todo = {
                task: task,
                status: status
            }
            todos.push(todo);
            return todo;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
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