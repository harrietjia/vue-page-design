<template>
    <div class="form-item col-1">
        <label>智能商品组件关联</label>
        <a-radio-group v-model="selected" @change="handle_radio_change">
            <a-radio
                v-for="item in list"
                :key="item.id"
                :style="radioStyle"
                :value="item.id">{{ item.title }} - 楼层 {{ item.index }}
            </a-radio>
        </a-radio-group>
    </div>
</template>

<script>
export default {
    props: ['value', 'config', 'rootConfig'],

    data () {
        return {
            selected: '', // 选中的组件ID
            list: [], // 符合规则的组件列表
            radioStyle: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            },
        }
    },

    computed: {
        components () {
            return this.$store.state.page.components;
        },
        layouts () {
            return this.$store.state.page.layouts;
        }
    },

    watch: {
        layouts () {
            this.update_list(this.selected);
        }
    },

    methods: {
        /**
         * 勾选组件，更新选中的值
         */
        handle_radio_change () {
            this.$emit('input', this.selected);
        },

        /**
         * 更新列表
         */
        update_list (selected) {
            // 根据布局顺序更新列表的排序
            const list = [];
            this.layouts.map((id, index) => {
                const cmpt = this.components.filter(x => x.id.toString() == id.toString())[0];
                if (cmpt.component_key == 'U000249') {
                    list.push({
                        id: cmpt.id.toString(),
                        title: cmpt.component_title,
                        index: index + 1,
                    });
                }
            });
            this.list = list;

            // 判断选中的值，还在不在
            const ids = list.map(x => x.id);
            if (!ids.includes(selected)) {
                this.selected = '';
                this.$emit('input', this.selected);
            };
        }
    },

    mounted () {
        // 更新列表
        this.update_list(this.value);

        // 默认选中的
        this.selected = this.value;
    }
}
</script>