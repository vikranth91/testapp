<template>

    <v-container fluid v-if="infiniteScrollPosts" grid-list-xl>
        <v-row dense wrap xs12 sm6>
        <v-col v-for="post in infiniteScrollPosts.posts" :key="post._id" :cols="6">
          <v-card hover @click.native="postView(post._id)">
            <v-img
              :src="post.imageURL"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px" lazy>
            </v-img>
            <v-card-actions>
            <v-card-title>
                <div>
                <div class="headline">{{post.title}}</div>
                <span class="grey--text">{{ post.likes }} Likes - {{post.messages.length}} Comments</span>
                </div>
                </v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon v-if="user">
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon v-if="user">
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <!-- <v-btn icon>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn> -->

            </v-card-actions>
            <!-- post creater Name -->
            <v-divider class="mx-4"></v-divider>
            <v-slide-y-transition>
                 <v-list-item>
                    <v-list-item-avatar color="grey">
                        <img :src="post.createdBy.avatar" alt="">
                    </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-subtitle>{{ post.createdBy.username}}</v-list-item-subtitle>
                            <v-list-item-subtitle>Added: {{ post.createdDate}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list class="item action">
                            <v-btn icon ripple>
                                <v-icon>mdi-information-outline</v-icon>
                            </v-btn>
                        </v-list>
                    </v-list-item>
            </v-slide-y-transition>
          </v-card>
        </v-col>
       
      </v-row>

      <v-col v-if="showMoreEnabled">
          <v-row justify="center">
              <v-btn @click="showMorePosts">Show More</v-btn>
          </v-row>
      </v-col>
       
        
    </v-container>
        


</template>

<script>
import {mapGetters} from 'vuex';
import {INFINITE_SCROLL_POSTS} from "../../queries.js";

const pageSize = 4;

export default {
    name: "Posts",
    data() {
        return {
            pageNum: 1,
            showMoreEnabled: true
        }
    },
    apollo: {
        infiniteScrollPosts:{
            query: INFINITE_SCROLL_POSTS,
            variables: {
                pageNum: 1,
                pageSize
            }

        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        showMorePosts(){
            //fetch data
            this.pageNum += 1;

            console.log(this.$apollo.queries.infiniteScrollPosts.fetchMore)

                this.$apollo.queries.infiniteScrollPosts.fetchMore({
                variables: {
                    pageNum: this.pageNum,
                    pageSize
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    console.log('prev results',prevResult)
                    console.log(fetchMoreResult)
                    const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
                    const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;

                    this.showMoreEnabled = hasMore;

                    return {
                        infiniteScrollPosts: {
                            __typename: prevResult.infiniteScrollPosts.__typename,

                            posts:[
                                ...prevResult.infiniteScrollPosts.posts,
                                ...newPosts
                            ],
                            hasMore
                        }
                    }


                }


            })


        },
    postView(postId){
      this.$router.push(`/posts/${postId}`)
        }
    },
}
</script>