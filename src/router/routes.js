import Home from '@/views/Home.vue';
import LogIn from '@/views/LogIn.vue';
import AuthFortyTwo from '@/views/AuthFortyTwo.vue';
import store from '@/store';
import authentifier from '@/services/authentifier';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: LogIn,
    beforeEnter: async (_, __, next) => {
      const { isAuthenticated } = store.state.auth;

      if (isAuthenticated) {
        next({ name: "Home" });
        return;
      }

      await authentifier.newAccessToken()
        .then(({ headers: { authorization } }) => {
          store.dispatch("auth/authenticate", authorization);
          renewAccessTokenIn((60 * 15 - 10) * 1000);

          next({ name: "Home" })
        })
        .catch(() => next());
    },
  },
  {
    path: '/oauth/fortytwo/callback',
    name: 'AuthFortyTwo',
    component: AuthFortyTwo,
  }
];

const renewAccessTokenIn = (ms) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await authentifier.newAccessToken()
        .then(({ headers: { authorization } }) => {
          store.dispatch("auth/authenticate", authorization);
        });
      resolve();
      renewAccessTokenIn(ms);
    }, ms);
  });
}
