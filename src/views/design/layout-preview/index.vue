<template>
    <div
        id="design-middle-layout"
        :class="`design-layout-preview page-site-zf ${text_direction}`"
        @click.self="handle_release_selected">

        <!-- 主要布局，中间，最小宽度 375x667 -->
        <div class="main-layout is-app" :class="{ 'is-empty': layouts.length <= 0}">
            <div class="controller-title">
                iphone8屏幕高度------
            </div>

            <!-- 拖拽区域 -->
            <nexted
                :tasks.sync="components"
                @update-layouts="updateLayouts">
            </nexted>

            <!-- 空信息 -->
            <div class="is-empty" v-if="components.length <= 0">
                <img :src="images.emptyImage">
                哎哟，您还没有放置组件哦~ <br/> 赶紧拖动组件到这里设置吧
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import controller  from './controller.vue';
import emptyImage from '@/resource/images/empty-preview.png';
import nexted from './nested';

export default {
    components: {
        draggable,
        controller,
        nexted
    },
	  props: ["previewData"],
    data () {
        return {
            // 拖拽组件参数
            dragOptions: {
                group: "description",
                disabled: false,
                touchStartThreshold: 5,
                ghostClass: "sortable-ghost",
                dragClass: "sortable-drag",
                filter: ".controller-title, .controller-aside", // 不允许此元素拖拽
            },
            // 当前页面布局信息
            layouts: [],
            images: {
                emptyImage
            }
        };
    },

    computed: {
        // 页面所有组件
        components: {
            get () {
                return this.previewData || this.$store.state.page.components || [];
            },
            set (arr) {
                this.$store.dispatch('design/page_update_layout_v2', arr);
            }
        },

        // 文案方向
        text_direction () {
            const map = ['he'];
            const lang = this.$store.state.page.info.lang || 'en';
            return map.includes(lang) ? 'rtl' : 'ltr';
        }
    },

    methods: {

        // 更新布局数据
        updateLayouts (layouts) {
            this.$store.dispatch('design/page_update_layout_v2', layouts);
        },

        /**
         * 开始拖拽
         */
        handle_drag_start () {
            this.$store.state.design.preview_in_drag = true;
        },

        /**
         * 结束拖拽
         */
        handle_drag_end () {
            this.$store.state.design.preview_in_drag = false;
        },

        /**
         * 释放组件选中效果
         */
        handle_release_selected () {
            this.$store.dispatch('design/form_close', {num : '2'});
        }
    }
}
</script>

<style lang="less" scoped>

.design-layout-preview {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding-top: 114px;
    padding-bottom: 100px;
    overflow-y: scroll;

    // 主要预览布局
    .main-layout {
        position: relative;
        margin: 0 auto;
        width: 375px;
        min-height: 667px;
        background: #fff;
        box-shadow:-10px 20px 30px 0px rgba(192,197,205,0.8);
        // 为空
        &.is-empty {
            .is-empty {
                display: block;
            }
        }
        // 空数据的样式
        .is-empty {
            position: absolute;
            left: 0px;
            top: 240px;
            right: 0px;
            display: none;
            text-align: center;
            color: rgba(92, 162, 232, 0.46);
            font-size: 14px;
            img {
                width: 190px;
                height: 125px;
                margin: 0 auto;
                display: block;
            }
        }
    }

    // 拖拽区域
    .dragArea {
        min-height: 667px;
        > span {
            display: block;
            min-height: 667px;
        }
    }
}

// 拖拽效果
.flip-list-move {
    transition: transform 0.5s;
}

// 拖拽组件容器
.list-group-item {
    position: relative;
    &.is-hover {
        &:before {
            position: absolute;
            content: " ";
            left: 0px;
            bottom: 0px;
            top: 0px;
            right: 0px;
            border: dashed 2px #29ba9c;
        }
        .component-controller {
            display: block;
        }
    }

    // 选中打开表单中
    &.is-active {
        &::before {
            position: absolute;
            content: " ";
            left: 0px;
            bottom: 0px;
            top: 0px;
            right: 0px;
            border: solid 3px #29ba9c;
        }
    }
}
</style>

<style lang="less">

// 拖拽时的样式
.design-layout-preview {
    .main-layout {
        .dragArea {
            > .sortable-ghost {
                position: relative;
                list-style: none;
                width: 100%;
                height: 100px;
                line-height: 100px;
                text-align: center;
                background:rgba(64,158,255,0.3) !important;
                cursor: move;

                i,
                p,
                .component-box,
                > .dragArea {
                    display: none;
                }

                > * {
                    display: none;
                }

                &:before {
                    position: absolute;
                    content: " ";
                    left: 0px;
                    bottom: 0px;
                    top: 0px;
                    right: 0px;
                    border: 3px solid #29ba9c;
                }
                &:after {
                    top: 0px;
                    content: "我要在这里";
                }
            }
        }
    }
}

.controller-title {
    position: absolute;
    top: 655px;
    right: 100%;
    word-break: keep-all;
    white-space: nowrap;
}

// 测试信息
.debuger-info {
    background: #333;
    color: #fff;
    padding: 10px;
    label {
        font-weight: bold;
    }
    p {
        margin: 0px;
        margin-bottom: 10px;
    }
}
</style>
