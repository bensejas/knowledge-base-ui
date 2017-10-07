import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import List from '@/components/List';
import Topic from '@/components/Topic';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/List',
      name: 'List',
      component: List,
    },
    {
      path: '/Topic/:id',
      name: 'Topic',
      component: Topic,
      props: true,
    },
  ],
});
