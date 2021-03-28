<template>
    <div class="form-item col-1">
        <label>{{ config.title }}</label>
        
        <!-- 全选 -->
        <a-checkbox
            :indeterminate="indeterminate"
            :checked="checkAll"
            @change="onCheckAllChange">
            全选
        </a-checkbox>
        
        <!-- 可选组件列表 -->
        <ul class="options-list">
            <a-checkbox-group v-model="selected" @change="handle_item_check">
                <li v-for="item in navigators" :key="item.id">
                    <a-checkbox :value="item.id">
                        {{ item.title }}
                    </a-checkbox>
                </li>
            </a-checkbox-group>
        </ul>
    </div>
</template>

<script>

/**
 * 获取 title
 * @param {Object}
 */
const get_title = (item) => {
    let title = '';
    // 如果有配置项，则读取配置项的值
    if (item.config) {
        if (item.config.datas.title) {
            title = item.config.datas.title.value;
        }
        if (item.config.datas.navigator_title) {
            title = item.config.datas.navigator_title.value;
        }
    } else {
        // 读取数据库里面保存的值，优先读取 navigator_title 的值。
        title = item.data.navigator_title || item.data.title;
    }
    return title;
}

/**
 * 导航选择控件
 */
export default {
    props: ['value', 'config'],
    data () {
        return {
            indeterminate: false, // 半选
            checkAll: false, // 全选
            // 选中的组件ID，强制转换为 Number 类型
            selected: [],
            first_load: false, // 判断是否初次加载
            is_check: false
        };
    },

    computed: {
        /**
         * 获取当前页面所有的组件
         * @returns {arr}
         */
        navigators () {

            // 根据数据类型判断是否初次加载，初次加载的类型是 null，正常是 Array
            if (!Array.isArray(this.value)) {
                // 初次加载
                this.first_load = true;
                this.selected = [];
            } else {
                // 初始化选中的值
                this.first_load = false;
                this.selected = this.value.map(x => Number(x.component_id));
            }
            
            // 获取所有的组件数据
            const components = this.$store.state.page.layouts.map(id => {
                const component = this.$store.state.page.components.filter(x => Number(x.id) === Number(id))[0];
                return component;
            });

            // 过滤是导航的数据
            const nav_components = components.filter(x => {
                return (x.component_key === 'U000242' || x.need_navigate === 1);
            });

            // 标题栏ID
            const navigators = nav_components.map(item => {
                return item.id;
            });

            // 当前导航选中值为空，初始化标题栏
            if (this.first_load) {
                const arr = [];
                nav_components.map(item => {
                    // 获取标题
                    const title = get_title(item);
                    arr.push({
                        component_id: item.id,
                        component_title: title
                    })
                });
                this.selected = [...navigators];
                this.$emit('input', arr);
            }
            this.checkAll = navigators.length === this.selected.length && this.selected.length > 0; // 更新全选

            // 拼装需要的数据
            return nav_components.map(item => {
                // 获取标题
                const title = get_title(item);
                return {
                    id: item.id, // 组件唯一ID
                    title:title // 组件标题
                }
            });
        }
    },

    methods: {
        // 全选
        onCheckAllChange (e) {
            Object.assign(this, {
                selected: e.target.checked ? this.navigators.map(x => x.id) : [],
                indeterminate: false,
                checkAll: e.target.checked
            });
            this.is_check = true;

            const arr = [];
            if (this.selected.length) {
                this.navigators.map(item => {
                    arr.push({
                        component_id: item.id,
                        component_title: item.title
                    })
                })
            }
            this.$emit('input', arr);
        },
        // 每个子项
        handle_item_check (checkedList) {
            this.indeterminate = !!checkedList.length && (checkedList.length < this.navigators.length)
            this.checkAll = checkedList.length === this.navigators.length
            this.is_check = true;

            const list = this.navigators;
            const arr = [];

            // 如果有勾选的
            if (checkedList.length) {
                this.navigators.map(x => {
                    if (checkedList.includes(Number(x.id))) {
                        arr.push({
                            component_id: x.id,
                            component_title: x.title
                        });
                    }
                });
            }
            this.$emit('input', arr);
        }
    },

    mounted () {
        // 过滤所有标题栏
        const components = this.$store.state.page.components.filter(x => x.component_key === 'U000242' || x.need_navigate === 1);
        // 过滤已勾选的组件
        const selected_components = components.filter(x => this.selected.includes(Number(x.id)));
        const arr = selected_components.map(item => {
            // 获取标题
            const title = get_title(item);
            return {
                component_id: Number(item.id),
                component_title: title
            }
        });
        // this.$emit('input', arr);
    }
}
</script>

<style lang="less" scoped>

ul.options-list {
    margin: 0px;
    padding: 0px;
    margin-top: 5px;
    li {
        margin-bottom: 5px;
    }
}

</style>
