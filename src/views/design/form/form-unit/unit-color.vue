<template>
    <div :class="`form-item col-${config.col || 1}`" v-show="config.showBy ? rootConfig[config.showBy].value: true">
        <span class="config-title">{{ config.title }}</span>
        <div class="color-picker-wrapper">
            <a-input
                size="large"
                v-model.trim="color"
                @blur="handleInputChange">

                <ColorPicker
                    slot="addonBefore"
                    :value="color"
                    @change="handlePickerChange" />
            </a-input>
        </div>
    </div>
</template>

<script>
/**
 * 颜色选择器
 */
import { ColorPicker } from 'element-ui';

/**
 * 颜色格式化， 正则判断
 * @returns {String}
 */
const check_formate = (value) => {
    // 只允许输入完整的十六进制的值
    return (/^#[A-Fa-f0-9]{6,8}$/.test(value)!= false);
}

export default {
    props: ['value', 'config', 'rootConfig'],

    components: {
        ColorPicker,
    },

    computed: {
        color: {
            get () {
                return this.value;
            },
            set (newValue) {
                this.$emit('input', newValue);
            }
        }
    },

    methods: {
        /**
         * 颜色选择器的值变更
         */
        handlePickerChange (value = '') {
            if (check_formate(value) == true) {
                this.color = value;
            } else {
                this.color = '#ffffff';
            }
        },

        /**
         * 文本输入框的值变更
         */
        handleInputChange (event) {
            let value = event.target.value || '';
            if (check_formate(value) == true) {
                this.color = value;
            } else {
                this.color = '#ffffff';
            }
        }
    }
};
</script>

<style lang="less">

// 颜色选择器
.design-form-body, .design-layout-page-info {

    .color-picker-wrapper {
        display: flex;
        flex-wrap: nowrap;
        .ant-input-group-addon:first-child {
            padding: 0px;
            border: none;
            border-radius: 0px;
        }
        .el-color-picker {
            display: block;
        }
        .el-color-picker__trigger {
            border-color: #E8EAEC;
            border-right: none;
            padding: 0px;
            border: none;
        }
        .el-color-picker__color {
            border-color: #E8EAEC;
            border-right: none;
            border-radius: 4px 0px 0px 4px;
            overflow: hidden;
        }
        .el-color-picker__icon.el-icon-arrow-down {
            color: #E8EAEC;
        }
        .el-icon-arrow-down {
            display: none;
        }
    }
}

</style>
