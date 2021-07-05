import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import IconFortyTwo from '@/components/icons/IconFortyTwo.vue';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      fortytwo: {
        component: IconFortyTwo,
        props: {
          name: 'fortytwo',
        },
      },
    },
  },
});
