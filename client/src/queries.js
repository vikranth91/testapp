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
/* Posts get Query */


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