import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        primary: "#3f51b5",
        secondary: "#01f4cc",
        accent: "#cddc39",
        error: "#f44336",
        warning: "#ffc107",
        info: "#e91e63",
        success: "#4caf50"
    }
});