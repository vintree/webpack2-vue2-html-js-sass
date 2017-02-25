import Vue from 'vue'
import App from './App/index.vue'
import VueResource from 'vue-resource'
// import VueTap from 'vue-touch'
import './App/index.scss'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(Element)

//开启debug模式
Vue.config.debug = true;

// Vue.use(VueTap)
Vue.use(VueResource)

new Vue(App).$mount('#app')