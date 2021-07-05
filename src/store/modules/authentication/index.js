const authentication = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    accessToken: '',
  }),
  mutations: {
    SET_AUTHENTICATE(state, value) {
      state.isAuthenticated = value;
    },
    SET_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
  actions: {
    authenticate({ commit }, accessToken) {
      commit('SET_TOKEN', accessToken)
      commit('SET_AUTHENTICATE', true)
    },
  },
  getters: {},
};

export default authentication;
