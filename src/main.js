// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vSelect from 'vue-select';
import modal from '@/components/Modal';
import createTopicLinkModal from '@/components/CreateTopicLinkModal';
import editTopicModal from '@/components/EditTopicModal';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);
Vue.component('modal', modal);
Vue.component('create-topic-link-modal', createTopicLinkModal);
Vue.component('edit-topic-modal', editTopicModal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

require('../node_modules/font-awesome/css/font-awesome.min.css');
