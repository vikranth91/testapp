<template>
    <v-app style="background: E3E3EE;">   

      <v-navigation-drawer app temporary fixed v-model="sideNavOpenClose">
        <v-toolbar color="accent" dark flat>
          <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
          <router-link to="/" tag="span" style="cursor: pointer">
                  VueShare
                </router-link>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list-item ripple v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
             <v-icon left class="hidden-sm-only"> {{item.icon}} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
                    {{item.title}}
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>

      <v-card class="overflow-hidden" tile>
        <!-- tool bar title -->
          <v-toolbar color="primary" fixed dark>
            <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
              <v-toolbar-title class="hidden-xs-only">
                <router-link to="/" tag="span" style="cursor: pointer">
                  VueShare
                </router-link>
              </v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- More menu items -->
          <v-text-field flex prepend-icon="mdi-magnify" placeholder="search posts" color="accent" single-line hide-details>  
          </v-text-field>

          <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-xs-only">
              <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
                <v-icon left class="hidden-sm-only"> {{item.icon}} </v-icon>
                {{item.title}}
                </v-btn>

                <!-- profile button -->
                <v-btn to='/profile' text v-if="user">
                <v-icon left class="hidden-sm-only">mdi-account-box </v-icon>
                <v-badge right color="blue darken-2">
                  <span slot="badge">1</span>
                  Profile
                </v-badge>
                </v-btn>

                <!-- logout button -->
                <v-btn text v-if="user" @click="handleSignoutUser">
                <v-icon left class="hidden-sm-only">mdi-account-lock-outline </v-icon>
                Logout
                </v-btn>
                
                
            </v-toolbar-items>
          </v-toolbar>
      </v-card>
        
      <!-- main area app content -->
      <main>
        <v-container class="mt-4">
           <router-view/>
        </v-container>
      </main>

    </v-app>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: 'app',
  data(){
    return {
      sideNavOpenClose: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    horizontalNavItems (){
      let items = [
        {icon: "mdi-message-text" , title: "posts", link: "/posts"},
        {icon: "mdi-lock-open" , title: "sign In", link: "/signin"},
        {icon: "mdi-account-plus" , title: "sign up", link: "/signup"},
      ]
      if(this.user){
        items = [
          {icon: "mdi-message-text" , title: "posts", link: "/posts"},
          {icon: "mdi-card-plus-outline" , title: "Create Post", link: "/post/add"},
          
        ]
      }
      return items
    },
  },
  methods: {
    handleSignoutUser(){
      this.$store.dispatch('signoutUser')
    },
    toggleSideNav(){
      this.sideNavOpenClose = !this.sideNavOpenClose
    }
  },
}
</script>