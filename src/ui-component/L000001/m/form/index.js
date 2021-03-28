// 数据配置
const datas = {
    title: {
        title: '文案',
        type: 'text',
        value: 'Title',
    },
    jump_link: {
        title: '跳转链接',
        type: 'text',
        value: '',
    }
};

// 样式配置
const styles = {
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
    padding_top: {
        title: '内边距(上)',
        type: 'number',
        value: 30,
        col: 2,
    },
    padding_bottom: {
        title: '内边距(下)',
        type: 'number',
        value: 30,
        col: 2,
    },
    width: {
        title: '标题宽度',
        type: 'number',
        value: 750,
        max: 750,
    },
    text_size: {
        title: '文字大小',
        type: 'bar',
        value: 30,
        min: 12,
        max: 50,
    },
    text_color: {
        title: '文字颜色',
        type: 'color',
        value: '#333333',
    },
    text_style: {
        title: '文字粗细',
        type: 'radio',
        value: '0',
        options: [
            { label: '正常', value: '0' },
            { label: '加粗', value: '1' }
        ]
    },
    bg_color: {
        title: '背景色',
        type: 'color',
        value: '#FFFFFF',
    },
    bg_img: {
        title: '背景图片',
        type: 'image',
        value: '',
    }
};

import template1 from './template1';

export const config = {
    datas,
    styles,
    layout: [
        template1
    ]
}
