// 数据配置
const datas = {
    title: {
        title: '标题文案',
        type: 'text',
        value: 'FLASH SALE',
    },
    goods: {
        title: '商品数据',
        type: 'goods',
        value: '',
        able: [3]
    },

	margin_top: {
		title: '组件边距(上)',
		type: 'number',
		value: 0,
		col: 2
	},
	margin_bottom: {
		title: '组件边距(下)',
		type: 'number',
		value: 0,
		col: 2,
	},
	bg_color: {
		title: '组件背景色',
		type: 'color',
		value: '#F8F8F8',
	},

	// 标题配置
	text_bg_color: {
		title: '标题背景色',
		type: 'color',
		value: '#D8D8D8',
	},
	text_color: {
		title: '标题文字颜色',
		type: 'color',
		value: '#333333',
	},
	time_text_bg_color: {
		title: '状态文字/时间背景色',
		type: 'color',
		value: '#333333',
		col: 2
	},
	time_text_color: {
		title: '时间文字颜色',
		type: 'color',
		value: '#FFFFFF',
		col: 2
	},

	// 商品类
	shop_price_color: {
		title: '销售价颜色',
		type: 'color',
		value: '#333333',
		col: 2,
	},
	market_price_color: {
		title: '划线价颜色',
		type: 'color',
		value: '#999999',
		col: 2,
	},
	bar_left_bg_color: {
		title: '剩余库存条颜色',
		type: 'color',
		value: '#333333',
		col: 2,
	},
	bar_bg_color: {
		title: '总库存条颜色',
		type: 'color',
		value: '#D8D8D8',
		col: 2,
	},
	bar_text_color: {
		title: '库存文字颜色',
		type: 'color',
		value: '#333333',
	},
	buynow_bg_color: {
		title: '购买按钮背景颜色',
		type: 'color',
		value: '#333333',
		col: 2,
	},
	buynow_text_color: {
		title: '购买按钮文字颜色',
		type: 'color',
		value: '#FFFFFF',
		col: 2,
	},

	// 折扣
	discount_show: {
		title: '是否显示',
		type: 'radio',
		value: '1',
		options: [
			{ label: '是', value: '1' },
			{ label: '否', value: '0' }
		]
	},
	discount_type: {
		title: '显示方式',
		type: 'radio',
		value: '1',
		options: [
			{ label: '**%OFF', value: '1' },
			{ label: '-**%', value: '0' }
		]
	},
	discount_width: {
		title: '折扣标宽度',
		type: 'number',
		value: '80',
		col: 2
	},
	discount_height: {
		title: '折扣标高度',
		type: 'number',
		value: '80',
		col: 2
	},
	discount_margin_top: {
		title: '整体上偏移',
		type: 'number',
		value: '0',
		col: 2
	},
	discount_margin_right: {
		title: '整体右偏移',
		type: 'number',
		value: '0',
		col: 2
	},
	discount_padding_top: {
		title: '文字上偏移',
		type: 'number',
		value: '18',
		col: 2
	},
	discount_padding_right: {
		title: '文字右偏移',
		type: 'number',
		value: '15',
		col: 2
	},
	discount_bg_color: {
		title: '背景颜色',
		type: 'color',
		value: '#333333',
		col: 2
	},
	discount_font_color: {
		title: '文字颜色',
		type: 'color',
		value: '#FFFFFF',
		col: 2
	},
	discount_bg_image: {
		title: '背景图片',
		type: 'image',
		value: ''
	}

};

// 样式配置
const styles = {};

// 布局
import template1 from './template1';

export const config = {
    datas,
    styles,
    layout: [
        template1
    ]
};
