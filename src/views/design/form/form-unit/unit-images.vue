<template>
    <div class="form-item col-1">
        <label>图片配置</label>

        <ul class="images-preview-list">
            <li v-for="(item, index) in current_value" :key="index">
                <img :src="item.image">
                <div class="controller-layer">
                    <button @click="handle_zoom(item.image)">
                        <a-icon type="zoom-in" />
                        <label>放大</label>
                    </button>
                    <button @click="handle_remove(index)">
                        <a-icon type="delete" />
                        <label>删除</label>
                    </button>
                </div>
            </li>
        </ul>

        <a-button-group class="button-group">
            <a-button type="primary" @click="handle_open_manager">添加图片</a-button>
            <a-button @click="handle_dialog_open"> 图片排序( {{ current_value.length }} ) </a-button>
        </a-button-group>

        <!-- 图片管理器 -->
        <images-sort
            ref="images-sort"
            v-if="dialog.visible"
            :value="current_value"
            :options="config.options"
            :rootConfig="rootConfig"
            @confirm="handle_dialog_confirm"
            @cancel="handle_dialog_cancel">
        </images-sort>

        <images-manager
            ref="imagesManager"
            @onSelected="handle_add_image" />
    </div>
</template>

<script>

// 图片管理弹窗
import imagesSort from "../../../../system-components/images-sort/index.vue";
import imagesManager from "../../../../system-components/images-manager/index.vue";

// Main code
export default {
    name: 'unit-images',
    props: {
        value: {
            type: Array
        },
        // 配置
        config: {
            type: Object,
            required: true
        },
        // 根配置
        rootConfig: {
            type: Object,
            required: true
        }
    },
    components: {
        imagesSort,
        imagesManager
    },
    data () {
        return {
            current_value: this.value,
            dialog: {
                visible: false
            }
        }
    },

    watch: {
        value (newVal) {
            this.current_value = this.value;
        }
    },

    methods: {
        /**
         * 打开商品数据配置的弹窗
         */
        handle_dialog_open () {
            this.$message.warning('功能还没准备好，别急');
        },

        /**
         * 弹层-确认回调
         * @param {Array} list 具体数据
         */
        handle_dialog_confirm (list) {
            this.current_value = [...list];
            this.$emit('input', [...list]);
        },

        /**
         * 取消弹层
         */
        handle_dialog_cancel () {
            this.dialog.visible = false;
        },

        /**
         * 放大查看
         * @param {String} url 图片地址
         */
        handle_zoom (url) {
            this.$message.warning('功能还没准备好，别急');
        },

        /**
         * 删除图片
         * @param {Number} index 数组索引
         */
        handle_remove (index) {
            this.current_value.splice(index, 1);
            this.$message.success('删除成功');
        },

        /**
         * 打开素材管理
         */
        handle_open_manager () {
            this.$refs.imagesManager.show();
        },

        /**
         * 添加图片
         * @param {String} url
         */
        handle_add_image (url) {
            this.current_value.push({
                image: url
            });
        }
    }
}
</script>

<style lang="less" scoped>

// 排序按钮
.button-group {
    width: 100%;
    font-size: 14px;
    display: flex;
    > button {
        width: 50%;
    }
}

// 预览区域
.images-preview-list {
    list-style: none;
    padding: 0px;
    margin: 0px;
    li {
        position: relative;
        margin-bottom: 10px;
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
    li:hover {
        .controller-layer {
            display: flex;
        }
    }
    // 预览区域的按钮操作
    .controller-layer {
        display: none;
        position: absolute;
        background-color: rgba(255, 255, 255, .5);
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        justify-content: center;
        align-content: center;
        align-items: center;


        > button {
            display: inline-block;
            width:48px;
            height:32px;
            line-height: 30px;
            margin: 0 6px;
            border-radius:16px;
            vertical-align: middle;
            border:1px solid #29ba9c;
            background-color: #fff;
            cursor: pointer;
            outline: none;
            i {
                display: block;
                color: #29ba9c;
                font-size: 22px;
            }
            label {
                display: none;

            }
        }
        > button:hover {
            background:#29ba9c;
            label {
                display: block;
                color: #fff;
                font-size: 12px;
                cursor: pointer;
            }
            i {
                display: none;
            }
        }
    }
}

// 编辑区域
.form-goods {
    display: flex;
    flex-flow: row nowrap;

    .ant-input {
        flex-shrink: 1;
        margin-right: 8px;
        text-overflow: ellipsis;
    }
    .button-edit {
        font-size: 14px;
        flex-shrink: 0;
    }
}
</style>
