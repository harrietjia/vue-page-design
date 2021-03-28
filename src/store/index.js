import Vuex from 'vuex';
import Vue from 'vue';
import design from './modules/design'; // 装修模块
import page from './modules/page'; // 页面公共信息模块

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		design,
		page,
  }
});

export default store;
