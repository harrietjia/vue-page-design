// 布局
const layout = {
    // 数据
    datas: [
        {
            title: '数据配置',
            groups: ['title', 'goods']
        },

	    {
		    title: '组件配置',
		    groups: [
			    'margin_top',
			    'margin_bottom',
			    'bg_color',
		    ]
	    },
	    {
		    title: '标题配置',
		    groups: [
			    'text_bg_color',
			    'text_color',
			    'time_text_bg_color',
			    'time_text_color'
		    ]
	    },
	    {
		    title: '商品信息配置',
		    groups: [
			    'shop_price_color',
			    'market_price_color',
			    'bar_left_bg_color',
			    'bar_bg_color',
			    'bar_text_color',
			    'buynow_bg_color',
			    'buynow_text_color'
		    ]
	    },
	    {
		    title: '折扣标',
		    groups: [
			    'discount_show',
			    'discount_type',
			    'discount_bg_color',
			    'discount_font_color',
			    'discount_bg_image'
		    ]
	    }

    ],
    // 样式
    styles: []
};

// 导出模块
export default layout;
