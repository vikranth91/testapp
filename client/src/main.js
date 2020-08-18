import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

import formAlert from './components/shared/formAlert.vue'

Vue.component('form-alert', formAlert)

Vue.use(VueApollo);

//setup default apollo client request config
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',

  fetchOptions: {
    credentials: "include"
  },

  request: operation => {
    if (!localStorage.token) {
      localStorage.setItem('token', "");
    }

    //always setting jwt to context upon every request
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
  },
  onError: ({
    graphQLErrors,
    networkError
  }) => {
    if (networkError) {
      console.log('network Error: ' + networkError)
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err)
      }
    }
  }

})

const apolloProvider = new VueApollo({
  defaultClient
});

Vue.config.productionTip = false

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    //get current user, run on every page refresh....
    this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')