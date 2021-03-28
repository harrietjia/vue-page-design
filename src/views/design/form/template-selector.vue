<template>
    <ul class="sheet-list">
        <template v-for="template in list">
            <li
                :key="template.id"
                :class="{ 'active': template_id == template.id }"
                @click="handle_change_template(template)">
                <i :class="`iconfont icon`"></i>
            </li>
        </template>
    </ul>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            required: true
        },
        // 模版列表
        list: {
            type: Array,
            required: true
        }
    },

    data () {
        return {
            // 当前选中的模版ID
            template_id: 0,
        };
    },

    methods: {
        /**
         * 切换模版
         * @param {Number} id 模版ID
         * @param {String} name 模版标题
         * @param {String} name_en 模版文件夹
         */
        handle_change_template ({ id, name, name_en }) {
            this.$emit('update', id);
            this.$emit('onChange', {
                template_id: id,
                template_title: name,
                template_name: name_en
            });
        }
    },

    created () {
        this.template_id = this.value;
    }
}
</script>

<style lang="less" scoped>

    // 模版选择
    ul.sheet-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0px;
        margin: 0px;
        list-style: none;
        margin-top: 16px;
        li {
            flex-shrink: 0;
            width: 56px;
            height: 40px;
            border: solid 1px #ddd;
            box-sizing: border-box;
            margin-right: 10px;
            border-radius: 2px;
            cursor: pointer;
            text-align: center;
            line-height: 40px;
            color: #C9CED1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        li.active {
            border-color: #29ba9c;
            color: #29ba9c;
        }
        i.iconfont {
            font-size: 28px;
        }
    }

</style>
