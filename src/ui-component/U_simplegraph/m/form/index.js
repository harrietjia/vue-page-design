// 模版
import template1 from './template1';

// 数据配置
const datas = {
	padding_top: { title: '上边距', type: 'number', value: 0, col: 4, },
	padding_bottom: { title: '下边距', type: 'number', value: 0, col: 4, },
	padding_left: { title: '左边距', type: 'number', value: 0, col: 4, },
	padding_right: { title: '右边距', type: 'number', value: 0, col: 4, },
	picture_border: {title: '图片圆角', type: 'bar', value: 0, min: 0, max: 100},
	list: {
		title: "添加单图",
		type: "list",
		tips: '选择热区模式将只跳转热区设置的链接并且点击热区以外的部分不进行跳转，需要点击整张图片跳转的请选择普通模式',
		notShowText: true,
		// notShow: true,
		hotArea: true,
		choose_title: {
			choose_option: [
				{label: "普通模式", value: "2"},
				{label: "绘制热区", value: "3"},
			]
		},
		value: []
	},
	choose_style: {
		title: '选择方式',
		type: 'radio',
		value: '2',
		options: []
	},
};

// 样式配置
const styles = {};

export const config = {
	datas,
	styles,
	layout: [
		template1
	]
};
