import Vue from 'vue';
import Vuex from 'vuex';
import {
  defaultClient as ApolloClient
} from '../main.js';
import {
  GET_POSTS,
  SIGNIN_USER,
  GET_CURRENT_USER,
  SIGNUP_USER,
  ADD_POST
} from "../queries.js"
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    clearUser: (state) => {
      state.user = null
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setAuthError: (state, payload) => {
      state.authError = payload
    },
    clearError: state => (state.error = null)
  },
  actions: {
    getCurrentUser: ({
      commit
    }) => {
      commit('setLoading', true);
      ApolloClient.query({
          query: GET_CURRENT_USER
        })
        .then(({
          data
        }) => {
          commit("setLoading", false)
          commit('setUser', data.getCurrentUser)
          console.log(data.getCurrentUser)
        })
        .catch(err => {
          commit("setLoading", false)
          console.log(err)
        })
    },
    getPosts: ({
      commit
    }) => {
      // loading vuex
      commit('setLoading', true)

      // use apollo client to get posts, getPosts query
      ApolloClient.query({
          query: GET_POSTS
        })
        .then(({
          data
        }) => {
          // get data from actions to state via mutations, use commit()

          // commit passes data to mutations
          commit('setPosts', data.getPosts);

          commit('setLoading', false)
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    addPost: ({
      commit
    }, payload) => {
      ApolloClient.mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: {addPost} }) => { // updating page without reloading, seeing changes right away
            //reading query to update
            const data = cache.readQuery({query: GET_POSTS});
            //create updated data
            data.getPosts.unshift(addPost);
            //write updated data back to query
            cache.writeQuery({
              query: GET_POSTS,
              data
            })
          },
            //optimistic response ensures data is added immedietly - message to Apollo - Part of apollo client
            optimisticResponse:{
              __typename : 'Mutation',
              addPost: {
                __typename: 'Post',
                id: -1,
                ...payload
              }
            }

        })
        .then(({
          data
        }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signinuser: ({
      commit
    }, payload) => {
      //set loading
      commit('setLoading', true)


      //clear error
      commit('clearError')

      // handle invalid token or expired token
      localStorage.setItem("token", "")

      ApolloClient.mutate({
          mutation: SIGNIN_USER,
          variables: payload
        }).then(({
          data
        }) => {
          commit('setLoading', false)

          localStorage.setItem('token', data.signInUser.token)
          //to make sure created method is run in main.js to get current user
          router.go('/')

        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    signupUser: ({
      commit
    }, payload) => {
      //set loading
      commit('setLoading', true)


      //clear error
      commit('clearError')

      // handle invalid token or expired token
      localStorage.setItem("token", "")

      ApolloClient.mutate({
          mutation: SIGNUP_USER,
          variables: payload
        }).then(({
          data
        }) => {
          commit('setLoading', false)

          console.log(data)

          localStorage.setItem('token', data.signUpUser.token)
          //to make sure created method is run in main.js to get current user
          router.go('/')

        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    signoutUser: async ({
      commit
    }) => {
      //clear user in state
      commit('clearUser')

      //remove token in local storage
      localStorage.setItem('token', '')

      //end apollo session
      await ApolloClient.resetStore()

      //redirect user to login, kick user out
      router.push('/signin')

    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error,
    authError: state => state.authError
  }
});