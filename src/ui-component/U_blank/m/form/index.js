// 数据配置
const datas = {
	preview_color: {
		title: "背景",
		type: "bg",
		value: {
			isColor: '1',
			color: "#ffffff",
			image: ""
		}
	},
	search_height: {
		title: "高度设置",
		type: "bar",
		value: 30,
		min: 0,
		max: 500,
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
