<template>
    <v-container text-center>
        <v-row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-form @submit.prevent="handleSigninUser">
                     <h1>Welcome back!</h1>

        <v-row layout v-if="error" wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message">

                </form-alert>
            </v-flex>
        </v-row>


                <v-card color="light-blue">
                            <v-row wrap>
            <v-flex xs12 sm6 offset-sm3>
            </v-flex>
        </v-row>
        <!-- error alert -->


                    <v-container>
                      <v-form v-model="isFormValidated" lazy-validation @submit.prevent="handleSigninUser" ref="form">
                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="usernameRules" prepend-icon = "mdi-account" label="Username" type="text" required v-model="username"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="passwordRules" prepend-icon = "mdi-form-textbox" label="Password" type="text" required v-model="password"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-btn color="primary" type="submit" :loading="loading" :disabled="loading || !isFormValidated">Signin <v-icon size="20">mdi-login</v-icon></v-btn>
                                <h3>Dont have an Account? <router-link to="/signup">Signup</router-link> </h3>
                                
                            </v-flex>
                        </v-row>
                      </v-form>
                    </v-container>
                </v-card>
                </v-form>
            </v-flex>
        </v-row>

        
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "Signin",
    data() {
        return {
          isFormValidated: true,
            username: '',
            password:'',
            usernameRules: [
              //check if username in
              username => !!username || 'username is required',
              //make sure username is less than 10 character
              username => username.length > 6 || 'username must be more than 6 characters'
            ],
            passwordRules: [
              password => !!password || 'Password is required',
              password => password.length >= 6 || 'Password must be more than 6 characters'
            ]
        }
    },
    computed: {
        ...mapGetters([
            'user',
            'error',
            'loading'
        ])
    },
    watch: {
        user(value){
            //if user value from null to object, redirect to home page
            if (value) {
                this.$router.push("/")
            }
        }
    },
    methods: {
        handleSigninUser(){
          if (this.$refs.form.validate()) {
            this.$store.dispatch('signinuser', {
                username: this.username,
                password: this.password
            }) 
          }
        }
    },
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
