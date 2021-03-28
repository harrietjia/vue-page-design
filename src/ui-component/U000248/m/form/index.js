// 数据配置
const datas = {
    userGroup: {
        title: '组件展示人群',
        type: 'radio',
        value: '0',
        options: [
            { label: '全部用户', value: '0' },
            { label: '新用户', value: '1' },
            { label: '老用户', value: '2' }
        ]
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