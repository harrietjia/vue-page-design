// 数据配置
const datas = {
	button_size: {
		title: "按钮大小",
		type: "bar",
		value: 50,
		min: 40,
		max: 70,
	},
	over_top: {
		title: "距离顶部",
		type: "bar",
		value: 450,
		min: 0,
		max: 800,
	},
	position_location: {
		title: "悬浮位置",
		type: "radio",
		value: "right",
		options: [
			{label: "左", value: "left"},
			{label: "右", value: "right"},
		]
	},
	list: {
		title: '显示方式',
		type: 'suspendList',
		min: 5,
		max: 30,
		choose_option: [
			{label: "独立模式", value: "1"},
			{label: "缩略模式", value: "2"},
		],
		value: {
			choose_style: '1',
			button_padding: 10,
			show_style: '1',
			unfold_button: '',
			fold_button: '',
			list: [
				{
					id: 1,
					image: '',
					is_minApp: '1',
					h5_link: '',
					gh_id: '',
					minApp_link: '',
					// text: '文本'
				}
			]

		}
	},
};

// 样式配置
const styles = {};

import template1 from './template1';

export const config = {
	datas,
	styles,
	layout: [
		template1
	]
};
