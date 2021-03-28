<template>
    <div class="form-item col-1" v-show="config.showBy ? rootConfig[config.showBy].value: true">
        <div style="flex: 1;display: flex">
            <span v-show="!no_show_title"> {{ config.title }} </span>
            <a-tooltip v-if="config.tips">
                <template slot="title">
                    Tips: {{config.tips}}
                </template>
                <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
            </a-tooltip>
        </div>
        <div class="slide-bar-wrapper">
            <div :style="{'width': config.no_show_px ? '260px':'220px'}">
                <a-slider
                    :min="config.min || 0"
                    :max="config.max || 100"
                    v-model="local_value"
                    @afterChange="handleChange"/>
            </div>
            <div style="width:50px;">
                <a-input-number
                    :min="config.min || 0"
                    :max="config.max || 100"
                    v-model.trim="local_value"
                    @change="handleChange"/>
            </div>
            <span class="title" v-if="!config.no_show_px">px</span>
        </div>
    </div>
</template>

<script>

export default {
    props: ['value', 'config', 'rootConfig', 'no_show_title'],

    computed: {
        local_value: {
            get () {
                return this.value || 0;
            },
            set (newValue) {
                this.$emit('input', newValue);
            }
        }
    },
    methods: {
        handleChange (value = 0) {
            this.local_value = value;
        }
    }
}
</script>
<style lang="less" scoped>
    .slide-bar-wrapper{
        display: flex;
    }
    .title {
        line-height: 40px;
        margin-left: 5px;
        font-size: 16px;
    }
</style>
