<template>
    <v-container text-center>
        <v-row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-form @submit.prevent="handleSigninUser">
                     <h1>Signup Now!</h1>

        <v-row layout v-if="error" wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message">

                </form-alert>
            </v-flex>
        </v-row>


                <v-card color="light orange">
                            <v-row wrap>
            <v-flex xs12 sm6 offset-sm3>
            </v-flex>
        </v-row>
        <!-- error alert -->


                    <v-container>
                      <v-form v-model="isFormValidated" lazy-validation @submit.prevent="handleSignupUser" ref="form">
                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="usernameRules" prepend-icon = "mdi-account" label="Username" type="text" required v-model="username"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="emailRules" prepend-icon = "mdi-at" label="email" type="email" required v-model="email"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="passwordRules" prepend-icon = "mdi-form-textbox" label="Password" type="text" required v-model="password"></v-text-field>
                            </v-flex>
                        </v-row>
                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="passwordRules" prepend-icon = "mdi-onepassword" label="Confirm Password" type="text" required v-model="passwordConfirmation"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-btn color="info" type="submit" :loading="loading" :disabled="loading || !isFormValidated">Signin <v-icon size="20">mdi-login</v-icon></v-btn>
                                <h3>Already have an account? <router-link to="/signin">Signin</router-link> </h3>
                                
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
    data() {
        return {
            isFormValidated: true,
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            usernameRules: [
                username => !!username || 'Username is a required field.',
                username => username.length > 6 || 'username must be greater than 6 characters'
            ],
            emailRules: [
                email => !!email || 'Email is a required field.',
                email => /.@+./.test(email) || 'Email must be valid'
            ],
            passwordRules: [
                password => !!password || 'password is a required field.',
                password => password.length >= 6 || 'Password must have 6 or more characters',
                passwordConfirmation => passwordConfirmation === this.password || 'password must match'
            ],
        }
    },
    watch: {
        user(value){
            //if user value from null to object, redirect to home page
            if (value) {
                this.$router.push("/")
            }
        }
    },
    name: "signup",
    computed: {
                ...mapGetters([
            'user',
            'error',
            'loading'
        ])
        
    },
    methods: {
        handleSignupUser(){
            if (this.$refs.form.validate()) {
                this.$store.dispatch('signupUser', {
                    username: this.username,
                    email: this.email,
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