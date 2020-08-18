<template>
    <!-- one method of outputting apollo gql data -->

    <v-container text-center>
      <v-layout row>
        <v-dialog v-model="loading" persistant fullscreen>
          <v-container fill-height>
            <v-row justify="center" align="center">
              <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="70"
                  :width="7"
                ></v-progress-circular>
            </v-row>

          </v-container>

        </v-dialog>
      </v-layout>


       <v-flex xs12>
         <v-carousel 
            cycle
            height="500"
            hide-delimiter-background
            show-arrows-on-hover
            v-if="!loading">

            <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageURL">
              <h1 id="carousel__title"> {{post.title}} </h1>
            </v-carousel-item>

         </v-carousel>
       </v-flex>
    </v-container>
</template>

<script>
import{ mapGetters } from 'vuex'

export default {
  name:'home',
  created() {
    this.handleGetCarouselPosts()
  },
  computed: {
   ...mapGetters(['loading', 'posts'])
  },
  methods: {
    handleGetCarouselPosts(){
      // reach out to vuex store and fire actions that get posts for carousel
      this.$store.dispatch('getPosts')
    }
  },
}
</script>

<style>
#carousel__title{
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: 125px;
  border-radius: 0px 0px 0px 0px;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

</style>
