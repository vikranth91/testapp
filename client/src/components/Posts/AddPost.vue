<template>
<v-container text-center>
      <v-form v-model="isFormValidated" lazy-validation @submit.prevent="handleAddPost" ref="form">

      <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="image">

      <!-- source is image -->
      <v-card-title>preview</v-card-title>
    </v-img>

    <!-- <v-card-subtitle class="pb-0"><h2>New post</h2></v-card-subtitle> -->
    

    <v-card-text class="text--primary">
 


 <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="titleRules" prepend-icon = "mdi-subtitles" label="Post Title" type="text" required v-model="title"></v-text-field>
                            </v-flex>
                        </v-row>

                        <v-row no-gutters>
                            <v-flex xs12>
                                <v-text-field :rules="imageRules" prepend-icon = "mdi-postage-stamp" label="Image URL" type="text" required v-model="image"></v-text-field>
                            </v-flex>
                        </v-row>

                        <!-- categoires select -->
                        <v-select :rules="categoryRules" v-model="categories" :items="['Art', 'Education', 'Travel']" multiple label="Categories" prepend-icon = "mdi-format-list-bulleted">

                        </v-select>

                         <v-row no-gutters>
                        <v-flex xs12>
                                <v-textarea :rules="descriptionRules" prepend-icon = "mdi-cursor-text" label="Description" type="text" required v-model="description"></v-textarea>
                                  
                            
                            </v-flex>
                        </v-row>
 
    </v-card-text>

    <v-card-actions>
    <v-btn color="info" type="submit" :loading="loading" :disabled="loading || !isFormValidated" text>Create Post <v-icon size="20">mdi-pencil </v-icon></v-btn>
                                
    </v-card-actions>
  </v-card>   
  </v-form>    
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "AddPost",
    data() {
        return {
            isFormValidated: true,
            title: '',
            image: '',
            categories: [],
            description: '',
            titleRules: [
                title => !!title || 'Title is required.',
                title => title.length < 20 || 'Title must be less than 20 characters.',
            ],
            imageRules: [
                image => !!image || 'Image is required.'
            ],
            categoryRules: [
                categories => categories.length >= 1 || 'Atleast 1 Category is required'
            ],
            descriptionRules: [
                description => !!description || 'description is required',
                description => description.length <= 250 ||  'description must be less than 250 characters'
            ]
        }
    },
    computed: {
        ...mapGetters(['loading', 'user'])
    },
    methods: {
        handleAddPost(){
            if (this.$refs.form.validate()) {
                this.$store.dispatch('addPost', {
                    title : this.title,
                    imageURL : this.image,
                    categories: this.categories,
                    description: this.description,
                    createrId: this.user._id
                });
                this.$router.push('/')
            }
        }
    },
}
</script>
