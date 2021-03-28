// 数据配置
const datas = {
	button_size: {
		title: "按钮大小",
		type: "bar",
		value: 40,
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
		value: "left",
		options: [
			{label: "左", value: "left"},
			{label: "右", value: "right"},
		]
	},
	icon_url: {
		title: "图标",
		type: 'image',
		value: "",
	}
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
