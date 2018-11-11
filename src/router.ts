import Vue from 'vue';
import Router, {RedirectOption} from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const REDIRECT_TIME_LIMIT = 3600000;

const redirect = () => {
  const defaultRoute = '/home';
  const local = JSON.parse(window.localStorage.getItem('vuex'));
  const isIos = () => window.navigator.userAgent.indexOf('iPhone') !== -1;
  // @ts-ignore
  const isStandalone = () => window.navigator.standalone;

  if (!local) {
    return defaultRoute;
  }

  const {route, lastLaunch} = local;
  const now = new Date().valueOf();

  if (isIos() && isStandalone() && now - lastLaunch < REDIRECT_TIME_LIMIT) {
    return route.path;
  }

  return defaultRoute;
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: (to: RedirectOption) => redirect(),
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
