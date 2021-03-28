// import { Modal } from 'ant-design-vue'
const page = {
    namespaced: true,
    state: {
        // 环境变量，1=装修，2=预览, 3=发布
        env: 1,
        // 当前页面信息
        info: {
            page_id: 0,         // 页面ID
	          page_name: '',          // 页面标题
            lang: '',           // 当前页面选中的语种，默认英语,
	          page_type: ['0'],       // 设备终端，[公众号/APP],
		        page_scene: '',   // 页面类型  首页/会员
		        page_sort: ''    // H5/小程序
        },
        settings: {
	        layout : [
		        {
			        title: '',
			        groups: [
				        'page_title',
				        'page_description',
				        'page_icon',
				        'preview_color',
				        'pageAmount',
				        'font_color',
				        'full_screen_id',
				        'advertising_id',
				        'top_id',
				        'bottom_menu',
				        'member_level',
			        ]
		        },
	        ],
	        datas : {
		        page_title: {
			        title: "页面标题",
			        type: "text",
			        value: ''
		        },
		        page_description: {
			        title: "页面描述",
			        type: "text",
			        value: ''
		        },
		        page_icon: {
			        title: "分享图标",
			        type: "image",
			        value: ''
		        },
		        pageAmount: {
			        title: "每页显示组件数量",
			        tips: '（0或者空 为不分页）',
			        type: "number",
			        value: 0
		        },
		        preview_color: {
			        title: '小程序顶部背景颜色',
			        type: 'color',
			        value: "#ffffff",
		        },
		        font_color: {
			        title: '小程序顶部文字颜色',
			        type: 'radio',
			        value: '2',
			        tips: '小程序前景文字颜色仅支持黑色或白色',
			        options: [
				        { label: '白色', value: '1' },
				        { label: '黑色', value: '2' }
			        ]
		        },
		        full_screen_id: {
			        title: "全屏广告",
			        type: "ustyle",
			        menu: true,
			        value: {
				        get_style: 0,
				        menu_id: {}
			        },
			        notShowTitle: true,
			        choose: 'full_screen',
			        options: [
				        {label: "不显示", value: 0},
				        {label: "自定义设置", value: 2},
			        ]
		        },
		        advertising_id: {
			        title: "弹窗广告",
			        type: "ustyle",
			        menu: true,
			        value: {
				        get_style: 0,
				        menu_id: ''
			        },
			        notShowTitle: true,
			        choose: 'advertising',
			        options: [
				        {label: "不显示", value: 0},
				        {label: "自定义设置", value: 2},
			        ]
		        },
		        top_id: {
			        title: "顶部菜单",
			        type: "ustyle",
			        menu: true,
			        value: {
				        get_style: 0,
				        menu_id: ''
			        },
			        notShowTitle: true,
			        choose: 'top',
			        options: [
				        {label: "不显示", value: 0},
				        {label: "自定义菜单", value: 2},
			        ]
		        },
		        bottom_menu: {
			        title: "底部导航",
			        type: "ustyle",
			        menu: true,
			        value: {
				        get_style: 1,
				        menu_id: ''
			        },
			        notShowTitle: true,
			        choose: 'bottom',
			        options: [
				        {label: "不显示", value: -1},
				        {label: "系统默认", value: 1},
				        {label: "自定义导航", value: 2},
			        ]
		        },
		        member_level:{
			        title: '浏览权限',
			        type: 'checkbox',
			        value: [],
			        options: []
		        },
	        },
        },
        // 布局和组件基础数据
        components: [],

        // 页面数据
        remote_data_loaded: false, // 页面远端数据是否加载完毕
        remote_data: [], // 页面远端数据， { 1: {}, 2: {} }
        languages: [], // 页面语言包
        preview_url: '', // 预览链接
	      saveParams: {
		      components: []
	      },
    },

    mutations: {
        /**
         * 更新页面布局信息
         * @param {Object} state
         * @param {Array} layouts 布局信息数组
         * [1,2,3,4,5,{ id: 111, groups: [222,333] }]
         */
        update_new_layout (state, layouts) {
            state.new_layouts = layouts;
        },
		    update_page(state, datas) {
			    state.settings.datas = datas;
		    },
    },

    actions: {
        /**
         * 加载页面数据
         * @param {Number} env 页面环境变量
         * @param {String} lang 语言
         * @param {String} page_type 设备终端
         * @param {String} page_name 页面标题
         * @param {Array} components 页面布局信息
         */
        load ({ state }, data) {
            const {
                env = 1,
	              lang = 'en',
                page_id,
	              page_name,
	              page_type,
		            page_scene,
		            page_sort,
                components,
		            page_title,
		            page_description,
	              pageAmount,
		            page_icon,
		            preview_color,
				        font_color,
		            top_id,
		            foot_type,
		            foot_id,
	              full_screen_id,
	              advertising_id,
		            member_level,
		            level
            } = data;
            state.env = env;
            state.info.page_id = page_id;
            state.info.page_name = page_name;
            state.info.lang = lang;
            state.info.page_type = page_type || ['0'];
		        state.info.page_scene = page_scene;
		        state.info.page_sort = page_sort;
            state.components = components;

            // 页面数据重新组合
		        state.settings.datas.page_title.value = page_title;
		        state.settings.datas.page_description.value = page_description || '';
		        state.settings.datas.page_icon.value = page_icon;
	          state.settings.datas.pageAmount.value = pageAmount;
		        state.settings.datas.preview_color.value = preview_color;
		        state.settings.datas.font_color.value = font_color;

		        if(window.location.href.indexOf('store_design') < 0) {
			        if(top_id.id) {
				        state.settings.datas.top_id.value.get_style = 2;
				        state.settings.datas.top_id.value.menu_id = top_id;
			        }else {
				        state.settings.datas.top_id.value.get_style = 0;
				        state.settings.datas.top_id.value.menu_id = '';
			        }

			        state.settings.datas.bottom_menu.value.get_style = foot_type;
			        state.settings.datas.bottom_menu.value.menu_id = foot_id;

			        if(advertising_id.id) {
				        state.settings.datas.advertising_id.value.get_style = 2;
				        state.settings.datas.advertising_id.value.menu_id = advertising_id;
			        }else {
				        state.settings.datas.advertising_id.value.get_style = 0;
				        state.settings.datas.advertising_id.value.menu_id = {};
			        }
			        if(full_screen_id.id) {
				        state.settings.datas.full_screen_id.value.get_style = 2;
				        state.settings.datas.full_screen_id.value.menu_id = full_screen_id;
			        }else {
				        state.settings.datas.full_screen_id.value.get_style = 0;
				        state.settings.datas.full_screen_id.value.menu_id = {};
			        }

			        state.settings.datas.member_level.options = level.map(item => {
				        return {label: item.level_name, value: item.id};
			        });
			        state.settings.datas.member_level.options.push({label: '默认等级', value: 0});
			        state.settings.datas.member_level.value = member_level.map(item => {
				        return Number(item);
			        });
		        }

	        // 页面数据暂时重新组合end

        },

        /**
         * 通过API获取远端商品数据
         */
        load_remote_goods_data ({ state }) {
            // test data
            const res = {"code":0,"message":"success","data":{"1588906992541":{"skuInfo":[{"id":"1588907399051","type":"3","component_id":"1588906992541","sku":"","sop_rule_id":"","sop_rule_name":"","price_sys_ids":"14949","tsk_info":{"tsk_begin_time":"1588867200","tsk_end_time":"1624636799"},"goodsInfo":[{"goods_id":"557955","goods_sn":"454843201","goods_title":"Zip Pocket PU Leather Panel Backpack","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/23\/grid-img\/1534987293059075717.jpg","detail_url":"http:\/\/www.pc-zaful-spider-php5.fpm.egomsl.com\/zip-pocket-pu-leather-panel-backpack-puid_2800426.html?kuid=557955","shop_price":"37.99","market_price":"70.43","discount":28,"stock_num":2,"tsk_price":"19.99","tsk_total_num":2,"tsk_sale_num":0,"tsk_left_num":2},{"goods_id":"566016","goods_sn":"280080808","goods_title":"Funny Graphic Fleece Hoodie","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/09\/03\/grid-img\/1535959167077609976.jpg","detail_url":"http:\/\/www.pc-zaful-spider-php5.fpm.egomsl.com\/funny-graphic-fleece-hoodie-puid_2800808.html?kuid=566016","shop_price":"36.89","market_price":"54.23","discount":36,"stock_num":2,"tsk_price":"19.99","tsk_total_num":2,"tsk_sale_num":0,"tsk_left_num":2},{"goods_id":"566047","goods_sn":"110738909","goods_title":"ZAFUL0test0 Cami Wide Leg Jumpsuit","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/27\/grid-img\/1535990322708422898.jpg","detail_url":"http:\/\/www.pc-zaful-spider-php5.fpm.egomsl.com\/zaful-cami-wide-leg-jumpsuit-puid_1107389.html?kuid=566047","shop_price":"38.99","market_price":"50.69","discount":39,"stock_num":2,"tsk_price":"19.99","tsk_total_num":2,"tsk_sale_num":0,"tsk_left_num":2}]}]},"1588906988501":{"skuInfo":[{"id":"1588907350068","type":"2","component_id":"1588906988501","sku":"","sop_rule_id":"604","sop_rule_name":"\u8718\u86db\u4fa0","price_sys_ids":"","goodsInfo":[{"goods_id":557955,"goods_sn":"454843201","goods_title":"Zip Pocket PU Leather Panel Backpack","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/23\/grid-img\/1534987293059075717.jpg","market_price":"70.43","shop_price":"19.99","discount":72,"is_on_sale":1,"goods_number":997,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/zip-pocket-pu-leather-panel-backpack-puid_4548432.html?kuid=557955"},{"goods_id":557971,"goods_sn":"279996101","goods_title":"Layered Disc Pendant Choker Necklace","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/23\/grid-img\/1534987343226361614.jpg","market_price":"4.48","shop_price":"94.99","discount":-123,"is_on_sale":1,"goods_number":10,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/layered-disc-pendant-choker-necklace-puid_2799961.html?kuid=557971"},{"goods_id":557857,"goods_sn":"278677108","goods_title":"Casual Striped Jogger Pants","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/21\/grid-img\/1534983385019748789.jpg","market_price":"42.09","shop_price":"9.99","discount":76,"is_on_sale":1,"goods_number":1007,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/casual-striped-jogger-pants-puid_2786771.html?kuid=557857"},{"goods_id":557973,"goods_sn":"279751401","goods_title":"Halloween Stone Texture Teardrop Design Earrings","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/23\/grid-img\/1534987349447563144.jpg","market_price":"5.81","shop_price":"9.99","discount":-72,"is_on_sale":1,"goods_number":997,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/halloween-stone-texture-teardrop-design-earrings-puid_2797514.html?kuid=557973"},{"goods_id":557824,"goods_sn":"271459203","goods_title":"Fashion Unisex Classic Trucker Baseball Golf Mesh Cap Hat vintage question mark women men hip-hop baseball dad hat baseball cap","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Maiyang\/2018\/06\/13\/grid-img\/1534979376584364052.jpg","market_price":"28.09","shop_price":"9.99","discount":64,"is_on_sale":1,"goods_number":199,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/fashion-unisex-classic-trucker-baseball-golf-mesh-cap-hat-vintage-question-mark-women-men-hip-hop-baseball-dad-hat-baseball-cap-puid_2714592.html?kuid=557824"},{"goods_id":557821,"goods_sn":"271459004","goods_title":"Fashion Unisex Classic Trucker Baseball Golf Mesh Cap Hat vintage question mark women men hip-hop","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Maiyang\/2018\/06\/13\/grid-img\/1534979367647587003.jpg","market_price":"7.72","shop_price":"21.99","discount":-185,"is_on_sale":1,"goods_number":200,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/fashion-unisex-classic-trucker-baseball-golf-mesh-cap-hat-vintage-question-mark-women-men-hip-hop-puid_2714590.html?kuid=557821"},{"goods_id":562737,"goods_sn":"280339603","goods_title":"Side Bear Logo Striped Jogger Pants","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/29\/grid-img\/1535595862586419223.jpg","market_price":"46.41","shop_price":"19.99","discount":57,"is_on_sale":1,"goods_number":100,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/side-bear-logo-striped-jogger-pants-puid_2803396.html?kuid=562737"},{"goods_id":557933,"goods_sn":"279711501","goods_title":"Tied Side V Neck Palazzo Jumpsuit","goods_img":"https:\/\/gloimg.zafcdn.com\/zaful\/pdm-product-pic\/Clothing\/2018\/08\/23\/grid-img\/1534987159383175729.jpg","market_price":"45.87","shop_price":"9.99","discount":78,"is_on_sale":1,"goods_number":1003,"url_quick":"","url_title":"http:\/\/m.wap-zaful-master-php5.fpm.egomsl.com\/tied-side-v-neck-palazzo-jumpsuit-puid_2797115.html?kuid=557933"}],"pagination":{"page_num":1,"page_size":20,"total_count":8}}]}}};
            // 遍历
            Object.keys(res.data).map(component_id => {
                return false;
                // 如果是商品数据类型的话
                if (res.data[component_id].hasOwnProperty('skuInfo') == true) {
                    // ajax数据源列表
                    const source_list = res.data[component_id].skuInfo;
                    // 遍历ajax数据源
                    Array.isArray(source_list) && source_list.map(item => {
                        // 如果有的则覆盖, 没有则追加
                        state.goodsSKU = state.goodsSKU.filter(x => parseInt(x.id) != parseInt(item.id));
                        state.goodsSKU.push(Object.assign({}, item));
                    });
                } else {
                    state.remote_data.push({
                        component_id,
                        data: res.data[component_id]
                    });
                }
            });
            // 远端数据加载成功标记
            state.remote_data_loaded = true;
        }
    }
};

export default page;
