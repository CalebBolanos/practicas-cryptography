import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3366FF',
                secondary: '#1939B7',
                accent: '#3FBFFF',
                error: '#FF3F3F',
                info: '#0066A4',
                success: '#49DD4B',
                warning: '#FFB33A',
            },
        },
    },
});
