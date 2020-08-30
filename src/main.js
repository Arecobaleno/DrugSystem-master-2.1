import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './utils/filters'
import fastclick from 'fastclick'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(ElementUI);


sync(store, router)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

fastclick.attach(document.body)
Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})