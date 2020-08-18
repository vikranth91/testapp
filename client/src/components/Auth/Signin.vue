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
                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field prepend-icon = "mdi-account" label="Username" type="text" required v-model="username"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field prepend-icon = "mdi-form-textbox" label="Password" type="text" required v-model="password"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-btn color="primary" type="submit" :loading="loading" :disabled="loading">Signin <v-icon size="20">mdi-login</v-icon></v-btn>
                                <h3>Dont have an Account? <router-link to="/signup">Signup</router-link> </h3>
                                
                            </v-flex>
                        </v-row>

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
            username: '',
            password:''
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
           this.$store.dispatch('signinuser', {
               username: this.username,
               password: this.password
           }) 
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
