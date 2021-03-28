<template>
    <div class="component-controller" v-if="vdc">
        <!-- 组件标题 -->
        <div class="controller-title" @click="reload">
            {{ vdc.component_title }}
        </div>

        <!-- 组件删除 -->
        <div class="controller-aside">
            <button class="button-remove" @click="handle_component_delete">
                <i class="iconfont icon-ht_operation_delete"></i>
            </button>
        </div>

        <!-- 布局组件的控制器 -->

        <template v-if="isPanel">
            <div
                class="controller-panel"
                @click="handle_component_select">
                拖拽区域
            </div>
            <load-component
                :vdc="vdc"
                :id="vdc.id"
                :uikey="vdc.component_key"
                :template="vdc.template_name || 'template1'">
                <slot></slot>
            </load-component>
        </template>

        <!-- UI组件的入口 -->
        <div
            v-else
            :class="{
                'design-component': true,
                'is-active': design_selected_id === vdc.id && show_component_form === '',
                'is-hover': in_drag == false && mouse_hover_id === vdc.id,
                'is-panel': isPanel
            }"
            @click="handle_component_select"
            @mouseenter="handle_component_hover(vdc.id)"
            @mouseleave="handle_component_leave">
            <load-component
                v-if="isRouterAlive"
                @reload="reload"
                :vdc="vdc"
                :id="vdc.id"
                :uikey="vdc.component_key"
                :template="vdc.template_name || 'template1'">
                <slot></slot>
            </load-component>
        </div>

    </div>
</template>

<script>

// 组件加载主体
import loadComponent from '../../../system-components/ui-component-load/index.vue';

export default {
    // 传入组件数据对象
    // isPanel 是否容器对象
    props: ['vdc', 'isPanel'],

    components: {
        loadComponent
    },

    data () {
        return {
	          isRouterAlive: true,
            mouse_hover_id: 0, // 鼠标经过的ID,
            // 真实组件
            component_module: null,
            dataset: {
                datas: {},
                styles: {}
            }
        };
    },

    computed: {
        // 页面所有组件
        layouts () {
            return this.$store.state.page.layouts;
        },
        // 装修页选中的组件ID
        design_selected_id () {
            return this.$store.state.design.selected_vdc.id;
        },
        show_component_form () {
            return this.$store.state.design.show_component_form;
        },
        // 是否在拖拽状态中
        in_drag () {
            return this.$store.state.design.preview_in_drag;
        }
    },

    methods: {
	      reload() {
		      this.isRouterAlive = false
		      this.$nextTick(() => (this.isRouterAlive = true))
		      //重新加载组件内容
        },
        /**
         * 删除组件
         */
        handle_component_delete () {
            this.$emit('onDelete');
        },

        /**
         * 选择组件
         */
        handle_component_select () {
            this.$store.dispatch('design/form_open', this.vdc);
        },

        /**
         * 鼠标经过组件，增加虚线
         * @param {number} id 组件ID
         */
        handle_component_hover (id) {
            if (this.isPanel == true) return false;
            this.mouse_hover_id = id;
        },

        /**
         * 鼠标离开组件，删除虚线
         * @param {number} id 组件ID
         */
        handle_component_leave () {
            if (this.isPanel == true) return false;
            this.mouse_hover_id = '';
        }
    }
};
</script>

<style lang="less" scoped>

// 组件容器
.design-component {
    position: relative;
    overflow: hidden;

    &:before {
        display: none;
        position: absolute;
        content: " ";
        left: 0px;
        bottom: 0px;
        top: 0px;
        right: 0px;
        border: dashed 2px #29ba9c;
        z-index: 2;
    }

    // 组件容器 - 鼠标经过
    &:hover {
        &::before {
            display: block;
        }
    }

    // 组件容器 - 选中
    &.is-active {
        &::before {
            border: solid 3px #29ba9c;
            display: block;
        }
    }

    // 布局容器
    &.is-panel {
        background-color: rgba(78, 255, 235, 0.2);
    }
}

// 控制栏容器
.component-controller {
    position: relative;
    &:hover {
        .controller-aside {
            display: block;
        }
    }
}

// 布局容器控制栏
.controller-panel {
    background-color: #29ba9c;
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding-left: 14px;
    cursor: pointer;
}


// 删除组件
.controller-aside {
    display: none;
    position: absolute;
    left: 100%;
    padding-left: 8px;

    > button {
        outline: none;
        border: none;
        width: 36px;
        height: 36px;
        background: #fff;
        box-shadow:-1px 2px 6px 0px rgba(188,195,206,1);
        border-radius: 36px;
        cursor: pointer;
        color: #AEB1B3;
        i {
            font-size: 23px;
        }
        &:hover {
            color: #29ba9c;
        }
    }
}


// 组件标题
.controller-title {
    position: absolute;
    right: 100%;
    top: 0px;
    height:32px;
    line-height: 32px;
    background:rgba(255,255,255, 0.4);
    border-radius:16px;
    padding: 0 16px;
    word-break: keep-all;
    white-space: nowrap;
    font-size:14px;
    transform: translateX(-8px);
    color: #6B7075;
    cursor: pointer;
}
</style>
