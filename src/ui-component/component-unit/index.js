import discount from './discount/index.vue';
import shopPrice from './shop_price/index.vue';
import marketPrice from './market_price/index.vue';
import goodsImage from './image_goods/index.vue';
import loadMore from './load_more/index.vue';
import fixedTop from './fixed_top/index.vue';

// 所有组件列表
const components = [
    discount,
    shopPrice,
    marketPrice,
    goodsImage,
    loadMore,
    fixedTop,
];

// VUE 安装包, 注册所有插件
const install = (Vue) => {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

export default {
    install,
};
