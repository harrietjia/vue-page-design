<template>
     <!--数据配置-->
    <design-dialog
        wrapClassName="dialog-images-manager"
        title="图片配置"
        :visible="true"
        :width="500"
        :confirmLoading="loading"
        @isOk="handle_confirm"
        @isCancel="handle_cancel">

        <!-- dialog-body -->
        <div class="wrapper">

            <!-- 图片列表 -->
            <div class="images-list">

                <!-- 拖拽容器 -->
                <draggable
                    tag="div"
                    v-model="list"
                    v-bind="dragOptions"
                    @start="inDrag = true"
                    @end="handle_drag_end">

                    <!-- 循环每个图片的配置 -->
                    <div
                        class="images-list-item"
                        v-for="(item, index) in list"
                        :key="index">

                        <!-- close button -->
                        <div class="remove-button" @click="handle_remove_item(index)">
                            <i>X</i>
                        </div>
                        <img :src="item.image" class="image-preview">
                    </div>
                </draggable>
            </div>
        </div>
    </design-dialog>
</template>

<script>

// 拖拽
import draggable from 'vuedraggable'

export default {
    name: 'images-manager',

    props: {
        // 是否展示弹窗
        visible: {
            type: Boolean,
            default: false
        },
        // 图片数据数组
        value: {
            type: Array,
            default: []
        },
        // 配置项
        options: {
            required: true,
            type: Object
        },
        // 根配置
        rootConfig: {
            type: Object,
            required: true
        }
    },

    components: {
        draggable
    },

    data () {
        return {
            inDrag: false, // 是否正在拖拽
            loading: false, // 是否正在请求ajax
            list: [], // 图片列表
            // 拖拽组件参数
            dragOptions: {
                animation: 200, // 动画时间
                group: "description",
                disabled: false,
                ghostClass: "sortable-ghost",
                dragClass: "sortable-drag",
                filter: ".ignore-elements"
            },
        }
    },

    methods: {

        /**
         * 拖拽释放
         */
        handle_drag_end () {
            this.inDrag = false;
        },

        /**
         * 增加图片项目
         */
        handle_add_item () {
            this.list.push({
                image: '',
                link_m: '',
                link_app: ''
            });
        },

        /**
         * 删除图片项
         * @param {Number} index 数组索引
         */
        handle_remove_item (index) {
            if (this.list.length > 1) {
                this.list.splice(index, 1);
            } else {
                return false;
            }
        },

        /**
         * 确认弹窗操作
         */
        handle_confirm () {
            // 过滤
            this.list = this.helper_list_filter(this.list);
            this.list.length <= 0 && this.handle_add_item();
            // 上报数据
            this.$emit('confirm', [...this.list]);
            this.$emit('cancel');
        },

        /**
         * 取消操作
         */
        handle_cancel () {
            this.$emit('cancel');
        },

        /**
         * 数据校验过滤，保存有效的值
         * @param {Array} list 数组
         */
        helper_list_filter (list) {
            return list.filter(x => x.image != '');
        }
    },

    created () {
        // 默认添加一条信息
        this.list = JSON.parse(JSON.stringify(this.value));
        if (this.list.length == 0) {
            this.list.push({
                image: '',
                link_m: '',
                link_app: ''
            });
        }
    }
}
</script>

<style lang="less">
.dialog-images-manager {
    // 弹窗的内边距
    .ant-modal-body {
        padding: 0px;
    }

    // 表单字段文案，下边距
    .form-item label {
        display: block;
        margin-bottom: 4px;
    }
}
</style>
<style lang="less" scoped>

// 最外层容器
.wrapper {

}

// 图片列表
.images-list {
    padding: 0px 24px;
    padding-top: 8px;
    padding-bottom: 0px;
    max-height: 296 + 124 + 16px;
    overflow-y: scroll;
}

// 图片项
.images-list-item {
    position: relative;
    background:rgba(136,171,207,0.08);
    border-radius: 2px;
    padding: 16px;
    margin-top: 16px;
}

.image-preview {
    width: 100%;
}

// 新增按钮
.add-button {
    font-size: 24px;
    width: 115px;
    margin-top: 24px;
    margin-left: 24px;
}

// 关闭按钮
.remove-button {
    position: absolute;
    top: -12px;
    right: -12px;
    width:24px;
    height:24px;
    color: #fff;
    background:rgba(174,177,179,1);
    text-align: center;
    line-height: 24px;
    border-radius: 24px;
    cursor: pointer;
    &:hover {
        background:#29ba9c;
    }
}

</style>
