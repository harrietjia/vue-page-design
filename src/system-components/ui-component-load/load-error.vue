<template>
    <div class="component-error">组件加载失败，可尝试强制刷新页面（Ctrl+F5）或点击左侧组件标题进行重新加载</div>
</template>

<script>
export default {
    data () {
        return {};
    },
    mounted () {
        this.$emit('errored');
    }
};
</script>

<style lang="less" scoped>

.component-error {
    height: 100px;
    text-align: center;
    line-height: 100px;
    background: #f1f1f1;
    color: #333;
}

</style>
