// 公共配置项
import commonConfig from '../../../common-config';
// 模版
import template1 from './template1';

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
	show_title: {title: '标题显示', type: 'switch', value: true,},
	title: {title: '标题内容', type: 'text', value: '标题', showBy: 'show_title'},
	text_size: {title: '文字大小', type: 'bar', value: 16, min: 12, max: 50, showBy: 'show_title'},
	text_color: {title: '文字颜色', type: 'color', value: '#333333', showBy: 'show_title'},
	text_align: {
		title: '对齐方式', type: 'radio', value: 'center',
		options: [
			{label: '左对齐', value: 'left'},
			{label: '居中对齐', value: 'center'},
			{label: '右对齐', value: 'right'}
		],
		showBy: 'show_title'
	},
	text_style: {
		title: "文字样式",
		type: "textstylebox",
		value: [],
		showBy: 'show_title'
	},

	show_second_title: {title: '副标题显示', type: 'switch', value: true},
	second_title: {title: '副标题内容', type: 'text', value: '副标题', showBy: 'show_second_title'},
	second_text_size: {title: '文字大小', type: 'bar', value: 12, min: 12, max: 50, showBy: 'show_second_title'},
	second_text_color: {title: '文字颜色', type: 'color', value: '#333333', showBy: 'show_second_title'},
	second_text_align: {
		title: '对齐方式', type: 'radio', value: 'center',
		options: [
			{label: '左对齐', value: 'left'},
			{label: '居中对齐', value: 'center'},
			{label: '右对齐', value: 'right'}
		],
		showBy: 'show_second_title'
	},
	second_text_style: {
		title: "文字样式",
		type: "textstylebox",
		value: [],
		showBy: 'show_second_title'
	},
};

// 样式配置
const styles = {};

export const config = commonConfig.merge({
	datas,
	styles,
	layout: [
		template1
	]
});
