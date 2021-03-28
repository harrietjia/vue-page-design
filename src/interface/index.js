import { get, post } from './core';

/**
 * Mock数据地址
 * @description
 * http://rap2.taobao.org/repository/editor?id=254744&mod=381924
 */

/**
 * 获取组件列表
 */
export const design_get_component_list = () => {
    const json = require('./json-data/get_component_list.json');
    return json;
};

/**
 * 获取组件模版列表
 */
export const design_get_component_template_list = () => {
    const json = require('./json-data/get_component_template_list.json');
    return json;
};

/**
 * 装修页面数据
 * @param {Number} page_id 页面ID, default
 */
export const design_get_page_info = (page_id) => {
    return new Promise((resolve, reject) => {
        const json = require('./json-data/design_get_page_info.json');
        const res = json.data.filter(x => x.pageId == page_id);
        resolve(res[0]);
    });
};

/**
 * 装修页保存接口
 */
export const design_save_page_info = () => { return get('/design_get_page_info'); }

export default {};
