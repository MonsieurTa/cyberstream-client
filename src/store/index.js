import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/authentication';
import baseClient from '@/services/base-client';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
  },
});

baseClient.interceptors.request.use(function (config) {
  const accessToken = store.state.auth.accessToken;
  config.headers["Authorization"] = accessToken;
  return config;
});

export default store;
