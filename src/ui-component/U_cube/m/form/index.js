// 数据配置
const datas = {
	picture: {
		title: '图片设置',
		type: "cube",
		value: {
			density: 4,
			icon: '1',
			cudeSelected: []
		}
	},
	preview_color: {
		title: "背景颜色",
		type: 'color',
		value: '#ffffff',
	},
	margin: {
		title: "图片间隙",
		type: "bar",
		no_show_px: true,
		value: 0,
		min: 0,
		max: 30,
	},
	// 只用于显示
	currentItem: {
		title: '当前选择的方格',
		type: 'chooseItem',
		value: {}
	},
	selectedArr: {
		title: '当前选中的方格',
		type: 'chooseList',
		value: []
	},
	currentItemId: {
		title: '当前选择的方格ID',
		type: 'text',
		value: ""
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
