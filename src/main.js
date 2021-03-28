import Vue from 'vue'

// ant-design
import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.less'
Vue.use(Antd);

import 'element-ui/lib/theme-chalk/index.css';
import { ColorPicker, Upload, Icon, Loading, Checkbox, CheckboxButton, CheckboxGroup, Tree} from 'element-ui';
Vue.use(ColorPicker);
Vue.use(Upload);
Vue.use(Icon);
Vue.use(Loading.directive);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Tree);

Vue.prototype.$loading = Loading.service;

import Moment from 'vue-moment'
Vue.use(Moment);

import { Modal, message } from 'ant-design-vue/es';
message.config({
	top: `200px`,
});
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;

import Fun from "@/core/fun"; // 常用方法
import http from "@/core/http"; // 请求封装的方法

// 前端路由
import router from './router/index.js'

// 前端数据中心
import store from './store/index.js'

// 新统一样式弹出层
import dialog from './system-components/dialog/dialog.vue'
Vue.component('design-dialog', dialog);

// 接口
import api from './interface/index.js'
Vue.prototype.$api = api;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 所有的UI组件的公共控件
// import All_form_unit from './system-components/form-unit/index.js';
// Vue.use(All_form_unit);

// 选项卡表单控件组件
import templateConfigDetail from './views/design/form/template-config-detail.vue';
Vue.component('template-config-detail', templateConfigDetail);
import U_simplegraph from './ui-component/U_simplegraph/m/index.vue';
Vue.component('U_simplegraph', U_simplegraph);
import U_cube from './ui-component/U_cube/m/index.vue';
Vue.component('U_cube', U_cube);
import All_ui_unit from './ui-component/component-unit/index.js'; // 所有的UI组件的公共控件
Vue.use(All_ui_unit);

// 组件级别懒加载
import VueLazyComponent from '@xunlei/vue-lazy-component';
Vue.use(VueLazyComponent);

// pixel 转 rem
Vue.prototype.$px2rem = function (pixel = 0) {
    return (pixel / 75) + 'rem';
};

// 页面入口
import App from './layout/index.vue'

Vue.prototype.fun = Fun;

window.$http = http;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
