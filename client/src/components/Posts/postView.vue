<template>
    <div>
        <v-container v-if="getPostView" fluid style="padding: 0px;">
             <v-card
    class="mx-auto my-12"
    max-width="1200"
    style="margin-top: 0px !important; margin-bottom: 0px !important;">

     <v-list-item>
       
      <v-list-item-content>
        <v-list-item-title class="headline">{{ getPostView.title}}</v-list-item-title>
        <v-list-item-subtitle>{{user.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img
      height="300"
      :src="getPostView.imageURL"
    ></v-img>
    <v-card-text>
      <v-card-text>
        <div>
            <h3 color="grey">Likes: {{getPostView.likes}}</h3>
        </div>
      <v-divider></v-divider>    
          
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column>
        <v-chip  v-for="(tag,key) in getPostView.categories" :key="key">
            <span>{{tag}}</span>
        </v-chip>

      </v-chip-group>
    </v-card-text>
        <v-divider></v-divider>

      <div class="my-4 subtitle-1">
        Description:
      </div>

      <div>{{getPostView.description}}</div>
      {{user.avatar}}
    </v-card-text>


    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="goToPrevious()"
      >
        Return
      </v-btn>
    </v-card-actions>
  </v-card>

      <!-- messages section -->

    <div>
        <v-row v-if="user">
            <v-col xs12>
                <v-form @submit.prevent="handleAddPostMessage">
                    <v-row>
                         <v-col cols="12" xs="12">
                            <v-text-field
                                label="Message Input"
                                outlined
                                clearable
                                append-icon="mdi-send"
                                v-model="messageBody"
                                @click:append-icon="handleAddPostMessage"
                            ></v-text-field>
                        </v-col>
                    </v-row>
        <v-row>
            <v-col cols="12" xs = "12">
                <v-card
                    class="mx-auto"
                    max-width="1200"
                    tile
                >
                <v-list subheader two-line>
                   <v-subheader>Messages: {{getPostView.messages.length}}</v-subheader>
                </v-list>
                </v-card>

            </v-col>
        </v-row>
                    <v-row>
                        <v-col cols="12" xs = "12">
                             <v-card
                    class="mx-auto"
                    max-width="1200"
                    tile
                >
                            <template v-for="message in getPostView.messages">
                                <v-divider :key="message._id"></v-divider>
                                <v-list-item inset :key="message.messagebody">
                                    <v-list-item-avatar>
                                        <img :src="message.messageUser.avatar">
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title> {{message.messageBody}}</v-list-item-title>
                                        <v-list-item-subtitle>{{message.messageUser.username}}</v-list-item-subtitle>
                                        <span class="grey--text text--lighten-1">{{message.messageDate | dateFormat}}</span>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>

        </v-row>

        <!-- messages list -->
        
        
    </div> 
        </v-container>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {GET_POST_VIEW, ADD_POST, ADD_POST_MESSAGE, GET_POSTS} from '../../queries.js'
export default {
    name:"postView",
    props: ['postId'],
    apollo:{
        getPostView:{
            query: GET_POST_VIEW,
            variables(){
                return {
                    postId: this.postId
                }
            }
         }
    },
    data() {
        return {
            messageBody: '' 
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        goToPrevious(){
            this.$router.go(-1);
        },
        handleAddPostMessage(){
            this.$apollo.mutate({
                mutation: ADD_POST_MESSAGE,
                variables: {
                    messageBody: this.messageBody,
                    userId: this.user._id,
                    postId: this.postId
                },
                update:(cache, {data: {addPostMessage} }) => {
                    const data = cache.readQuery({
                        query: GET_POST_VIEW,
                        variables: {
                            postId: this.postId
                        }
                    });

                    data.getPostView.messages.unshift(addPostMessage);

                    cache.writeQuery({
                        query: GET_POST_VIEW,
                        variables: {
                            postId: this.postId
                        },
                        data
                    });

                }
            }).then(({data}) => {
                    this.messageBody = ''
                    console.log(data.addPostMessage)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    filters: {
        dateFormat: (value) => {
            return new Date(parseInt(value,10)); 
        }
    }
}
</script>