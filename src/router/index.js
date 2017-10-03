import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import List from '@/components/List';
import Topic from '@/components/Topic';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
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
