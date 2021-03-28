<template>
    <div class="form-group" ref="dom">
        <!-- 标题 -->
        <div class="form-group-title" @click="handle_toogle_slide">
            <a-icon type="caret-down" v-if="slide"/>
            {{ title }}
            <span class="form-group-desc">{{ desc }}</span>
        </div>

        <!-- 自定义内容 -->
        <div class="form-group-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 标题
        title: {
            type: String
        },
        // 描述
        desc: {
            type: String
        },
        // 文案内容
        content: {
            type: String
        },
        // 是否开启展示功能，默认开启
        slide: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        /**
         * 通过 class 来 [收起/展开] 内容
         */
        handle_toogle_slide () {
            // 判断是否开启了功能
            if (!this.slide) return false;
            // 判断当前状态
            const dom = $(this.$refs.dom);
            const class_name = 'is-hide';
            dom.hasClass(class_name) ? dom.removeClass(class_name) : dom.addClass(class_name);
        }
    }
}
</script>

<style lang="less">
</style>
