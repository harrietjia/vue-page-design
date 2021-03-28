import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue';

// 组件实例
import Vdc from '@/core/vdc/vdc';

import {
	design_get_page_info
} from '../../interface/index.js';

/**
 * 获取组件配置项方法
 * @param {string} key 组件KEY, 对应数据库字段 component_key
 * @param {string} template 组件模版，默认 template1
 * @returns promise
 */
const load_component_config = (key, template = 'template1') => {
	return new Promise((resolve, reject) => {
		// 读取 config 配置文件
		require([`../../ui-component/${key}/m/form/index.js`], (module) => {
			// deep clone object
			const data = JSON.parse(JSON.stringify(module.config));
			resolve(data);
		});
	});
}

// 装修页模块
const design = {
	namespaced: true,
	state: {
		first_loaded: false, // 首次加载是否成功
		loading: false, // 页面是否加载中
		preview_in_drag: false, // 预览区域是否在拖拽中
		selected_vdc: {}, // 选中的组件数据对象，打开form表单
		show_component_form: '1', // 是否展示组件配置项,
		component_temlate_list: [], // 所有组件的模版列表
		member_data: {}
	},

	mutations: {
		/**
		 * 更新所有组件的模版列表
		 * @param {Object} state
		 * @param {Array} list 模版列表
		 */
		udpate_component_template_list (state, list) {
			state.component_temlate_list = list;
		},
		/**
		 * 更新所有组件的模版列表
		 * @param {Object} state
		 * @param {Array} list 模版列表
		 */
		udpate_member_data (state, list) {
			state.member_data = list;
		}
	},

	actions: {
		/**
		 * 打开form表单
		 * @param {Object} vdc 组件数据对象
		 */
		async form_open ({ state }, vdc) {

			// 如果组件没有读取配置项，则读取 config.js 文件
			if (vdc.is_loaded_config == false) {
				// 读取组件的配置项
				const config = await load_component_config(vdc.component_key, vdc.template_name);
				vdc.update_set('config', config);
			}

			// 如果组件没有模版列表，则加载
			if (vdc.template_list.length <= 0) {
				const template_list = state.component_temlate_list.filter(x => x.component_key == vdc.component_key);
				vdc.update_set('template_list', template_list);
			}

			// 展示 form
			state.selected_vdc = null;
			state.selected_vdc = vdc;
			state.show_component_form = '';
		},

		/**
		 * 关闭表单
		 */
		form_close ({ state }, { num }) {
			state.show_component_form = num;
		},

		/**
		 * 中间预览区域，定位到对应的组件楼层
		 * @param {Vdc} component 组件
		 * @param {Number} index 组件楼层
		 */
		component_locate_by_floor ({}, {component, index}) {
			const dom = document.getElementById(component.id);
			const middleDom = document.getElementById('design-middle-layout');
			// 获取元素的纵坐标（相对于窗口）
			function getTop (e) {
				var offset=e.offsetTop;
				if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
				return offset;
			}
			const top = index == 0 ? 0 : getTop(dom) - 100;
			middleDom.scrollTop = top;
		},

		/**
		 * 页面加载
		 * @param {object} request page_id 页面参数
		 * @param page_id 页面id
		 */
		page_load ({ state, dispatch }, page_id) {
			state.loading = true;

			const null_data = {
				page_id: '',
				page_type: ["0"],
				page_name:  '',
				page_scene: 1,
				page_sort: 1,
				components: [],
				page_title: '',
				page_description: '',
				page_icon: '',
				pageAmount: 0,
				preview_color: '#ffffff',
				font_color: '2',
				top_id: {},
				foot_type: 1,
				foot_id: {},
				full_screen_id: {},
				advertising_id: {},
				member_level: [],
				level: []
			};

			// 存储页面数据
			dispatch('page/load', null_data, { root: true });

			state.loading = false;
			state.first_loaded = true;

		},

		/**
		 * 页面保存函数
		 */
		page_save ({ state, rootState }) {
			// 开启 loading 状态
			// state.loading = true;

			// setTimeout(() => {
			//     state.loading = false;

			// 删除部分不需要传输到后端的字段
			// let cmpts_arr = JSON.parse(JSON.stringify(rootState.page.components));
			const cmpts_arr = rootState.page.components.map(vdc => {
				vdc.inject_remote_data();
				const copy_vdc = JSON.parse(JSON.stringify(vdc));
				// 删除字段
				delete copy_vdc.is_loaded_config;
				delete copy_vdc.lastmodify;
				delete copy_vdc.config;
				delete copy_vdc.template_list;
				// delete copy_vdc.template_id;
				delete copy_vdc.remote_style;
				delete copy_vdc.template_name;
				delete copy_vdc.template_title;
				return copy_vdc;
			});

			// localStorage.setItem('layouts', JSON.stringify(cmpts_arr));

			// 保存的参数
			rootState.page.saveParams = {
				// "page_name": rootState.page.info.page_name,
				// "lang": rootState.page.info.lang,
				// "page_id": rootState.page.info.page_id,
				// "page_type": rootState.page.info.page_type,
				"components": cmpts_arr
			};

			// message.success('保存成功');
			// }, 200);
		},

		/**
		 * 清除页面组件
		 */
		page_reset ({ rootState }) {
			// 弹层
			Modal.confirm({
				title: '确认删除所有组件？',
				onOk () {
					rootState.page.new_layouts = [];
					rootState.page.goodsSKU = [];
				}
			});
		},

		/**
		 * 装修页更新页面布局排序
		 * @param {Array} layouts 所有组件数据
		 */
		page_update_layout_v2 ({ commit }, layouts) {
			commit('page/update_new_layout', layouts, { root: true });
		}
	}
};

export default design;
