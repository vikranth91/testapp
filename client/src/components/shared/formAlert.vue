<template>
    <v-alert dense outlined type="error" transition="scale-transition" :value="true" dismissible>
        <h4>
           {{message}} 
            </h4>
    </v-alert>
</template>

<script>
export default {
    props: ['message']
}
</script>