// 数据配置
const datas = {
	bg_color: {
		title: '背景颜色',
		type: 'color',
		value: '#ffffff',
	},
	padding_top: { title: '上边距', type: 'number', value: 0, col: 4, },
	padding_bottom: { title: '下边距', type: 'number', value: 0, col: 4, },
	padding_left: { title: '左边距', type: 'number', value: 0, col: 4, },
	padding_right: { title: '右边距', type: 'number', value: 0, col: 4, },
	html_value: {
		title: '内容设置',
		type: 'tinymce',
		value: `<p><span style="font-size: 24px;">请填写富文本内容，<span style="font-size: 18px;">可以对文字进行<strong>加粗</strong>，<em>斜体</em>，<span style="text-decoration: underline;">下划线</span>，<span style="text-decoration: line-through;">删除线</span>，<span style="color: #339966;">文字颜色</span>，等简单排版操作，也可以上传图片。</span></span>`,
		// timestamp: Date.parse(new Date()),
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
