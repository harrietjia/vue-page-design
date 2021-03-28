# 可视化页面装修
基于 ```vue``` + ```ant-design``` + ```vue-draggable``` 实现的可视化页面装修功能

[![Vue](https://img.shields.io/badge/Vue-%5E2.5.16-brightgreen)](https://cn.vuejs.org)
[![Ant-deisgn](https://img.shields.io/badge/Antd-v1.3.10-brightgreen)](https://antdv.com/)
[![Vue.Draggable](https://img.shields.io/badge/Vue.Draggable-v2.23.0-brightgreen)](https://github.com/SortableJS/Vue.Draggable)


## 目录
* [DEMO](https://cullenng.github.io/page-design)
* [特点](#特点)
* 1. 自由拖拽组件
* 2. 支持[PC/M]端布局（PC模式后续支持）
* 3. 支持实时预览，所见即所得
* 4. 支持组件嵌套（后续支持）
* 5. [支持组件的自定义配置项](#组件配置项)
* [安装](https://github.com/CullenNg/page-design#安装)
* [使用](https://github.com/CullenNg/page-design#使用)
* 目前支持组件列表
* 1. [标题栏](https://github.com/CullenNg/page-design#标题栏)
* 2. [广告图](https://github.com/CullenNg/page-design#广告图)
* 3. [商品列表](https://github.com/CullenNg/page-design#商品列表)
* [新增组件](https://github.com/CullenNg/page-design#新增组件)
* [组件配置项](https://github.com/CullenNg/page-design#组件配置项)
* [更新日志](https://github.com/CullenNg/page-design#更新日志)

## 安装
```
$ npm install
```

## 使用
```
# develop mode
$ npm run dev
```


## 自定义组件配置项
参考组件 U000001：

目录 | 作用
---|---
./U000001/m/form/index.js | 配置当前组件的所有字段，以及注册所有模版
./U000001/m/form/template1.js | 模版一的展示字段
./U000001/m/form/template2.js | 模版二的展示字段

### index.js
```
/** 数据类型的配置 */
const datas = {
    field1,
    field2,
    field3,
};

/** 样式类型的配置 */
const styles = {
    field1,
    field2,
    field3,
};
```

### field 参考
格式：
```
/** 自行替换[]中的值 */
[name]: {
    title: "[配置项的文案]",
    type: "[配置项的类型]"
}
```
Example: 
```
href: {
    title: '跳转链接',
    type: 'text'
},
```
通用字段：
字段名 | 作用 | 可选值
---|---|---
title | 配置项的展示文案 | -
type | 配置项的类型 | text, number, color, radio, bar, image
value | 默认值 | -

### type 可选值：

#### text 文本输入框
```
[name]: {
    title: "[文案]",
    type: 'text',
    value: '',
    showBy: 'show_title'  //根据哪个参数控制显示
},
```

#### number: 数字类型输入框
```
[name]: {
    title: "[文案]",
    type: 'number',
    value: 1,
    max: 100
},
```

#### color: 颜色选择器
```
[name]: {
    title: "[文案]",
    type: 'color',
    value: '#FFFFFF',
},
```

#### radio: 单选
```
[name]: {
    title: '对齐方式',
    type: 'radio',
    "button_style": 'solid', //显示的样式
    value: 'center',
        options: [
            { label: '左对齐', value: 'left' },
            { label: '居中对齐', value: 'center' },
            { label: '右对齐', value: 'right' }
        ]  
    },
```

#### checkbox: 多选
```
[name]: {
    title: '对齐方式',
    type: 'checkbox',
    value: [],
        options: [
            { label: '左对齐', value: 'left' },
            { label: '居中对齐', value: 'center' },
            { label: '右对齐', value: 'right' }
        ]  
    },
```

#### iconbox: 图标样式单选
```
[name]: {
            title: '商品属性',
            type: "iconbox",
            tips: '商品属性统一在左上角显示',
            value: {
                choose_icon: '0',
                image: '',
            },
            choose: 'single',
            isIcon: false,
            options: [
                {label: '无', value: '0'},
                {label: '推荐', value: '1'},
                {label: '热销', value: '2'},
                {label: '新上', value: '3'},
                {label: '包邮', value: '4'},
                {label: '限时', value: '5'},
                {label: '自定义', value: '7'}
            ]
        },
```

#### bar: 范围选择
```
[name]: {
    title: '圆角大小',
    type: 'bar',
    value: 0,
    min: 0,
    max: 20,
    },
```

#### link: 选择连接
```
[name]: {
    title: '对齐方式',
    type: 'link',
    value: '' 
    },
```

#### bg: 背景选择
```
[name]: {
            title: "背景",
            type: "bg",
            value: {
                isColor: '1',
                color: "#ffffff",
                image: ""
            }
        },
```

#### image: 选择图片
```
[name]: {
    title: '选择图片',
    type: 'image',
    value: '' 
    },
```

#### switch: 滑动开关
```
[name]: {
    title: '是否显示',
    type: 'switch',
    value: false 
    },
```

#### tab: 多个
```
[name]: {
    title: '对齐方式',
    type: 'tab',
    value: [],
        options: [
            {"type": "text", "title": "测试", "value": ""}
        ]  
    },
```

#### list: 多个图片+跳转链接
```
[name]: {
        title: "添加单图",
        type: "list",
        notShowText: true,
        // notShow: true,
        hotArea: true,
        choose_title: {
            choose_style: '2',
            choose_option: [
                {label: "普通样式", value: "2"},
                {label: "绘制热区", value: "3"},
            ]
        },
        value: [
            {
                id: 1,
                image: '',
                is_minApp: '1',
                h5_link: '',
                gh_id: '',
                minApp_link: '',
                hotArea: []
            }
        ]
    },
```

#### ustyle: 获取方式
```
[name]: {
            title: "获取方式",
            type: "ustyle",
            value: {
                get_style: '1',
                get_number: '0',
                list: []
            },
            show: 'list',
            min: 0,
            max: 30,
            choose: 'coupons',
            options: [
                {label: "自动获取", value: "1"},
                {label: "手动获取", value: "2"},
            ]
        },
```


### template1.js 模版一配置
```
export default {
    datas: [
        {
            title: '[文案]',
            groups: [name1, name2, name3]
        }
    ],
    styles: [
        {
            title: 'margin配置',
            groups: ['margin_top', 'margin_bottom']
        },
        {
            title: 'padding配置',
            groups: ['padding_top', 'padding_bottom']
        }
    ]
}
```


## 更新日志
