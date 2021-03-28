<template>
    <draggable
        :class="{'dragArea': true, 'is-panel': isPanel}"
        :list="tasks"
        tag="ul"
        group="people"
        @start="handle_drag_start"
        @change="handle_drag_change">
        <li v-for="(el, index) in tasks" :key="el.id">
            <controller
                :vdc="el"
                :isPanel="!!el.tasks"
                @onDelete="handleDeleteComponent(index)">
                <nested-draggable
                    :isPanel="!!el.tasks"
                    :tasks.sync="el.tasks"
                    @update-layouts="updateLayouts" />
            </controller>
        </li>
    </draggable>
</template>
<script>
import controller  from './controller.vue';
import draggable from "vuedraggable";

export default {
    props: {
        tasks: {
            required: true,
            type: Array
        },
        isPanel: {
            type: Boolean,
            default: false
        }
    },
    components: {
        controller,
        draggable
    },

    data () {
        return {
            before_drag_tasks: []
        }
    },

    name: "nested-draggable",

    methods: {
        /**
         * 开始拖拽前，记录拖拽前的数据
         */
        handle_drag_start () {
            this.before_drag_tasks = [...this.tasks];
        },
        /**
         * 拖拽结束事件变更
         */
        async handle_drag_change (data) {
            // 新增组件模式
            if (data.hasOwnProperty('added')) {
                const isPanel = data.added.element.hasOwnProperty('tasks');
                if (this.isPanel == true && isPanel == true) {
                    this.$emit('update:tasks', [...this.before_drag_tasks]);
                } else {
                    this.before_drag_tasks = [...this.tasks];
                    // 新增后默认打开表单项
                    this.$store.dispatch('design/form_open', data.added.element);
                }
            }
            this.$emit('update-layouts', this.tasks);
        },

        updateLayouts () {
            this.$emit('update-layouts', this.tasks);
        },

        /**
         * 删除组件
         * @param {Number} index 组件索引
         */
        handleDeleteComponent (index) {
            const that = this;
            // 弹层
            this.$confirm({
                title: '确认删除该组件？',
                onOk () {
                    that.tasks.splice(index, 1);
                    that.$store.dispatch('design/form_close', {num : '2'});
                    that.$message.success('删除组件成功');
                }
            });

        }
    }
};
</script>

<style scoped lang="less">

ul.dragArea {
    padding-left: 0px;
    list-style: none;
}

ul.dragArea.is-panel {
    min-height: 100px;
    padding: 10px;
    background-color: rgba(64, 158, 255, 0.2);
}


</style>
