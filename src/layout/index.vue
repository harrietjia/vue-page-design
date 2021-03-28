<template>
    <div id="app">
        <a-config-provider :locale="zh_CN">
            <router-view></router-view>
        </a-config-provider>
    </div>
</template>

<script>
// 语言包
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
    name: 'app',
    data () {
        return {
            zh_CN,
        }
    }
}
</script>

<style lang="less">
// 全局的 checkbox
.ant-checkbox-wrapper,
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
    margin-right: 24px;
}
.ant-checkbox-wrapper span + span {
    padding-left: 4px;
    padding-right: 0px;
}

</style>
