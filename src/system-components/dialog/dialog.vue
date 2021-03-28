<template>
    <a-modal
        class="design-dialog"
        :wrapClassName="wrapClassName"
        :width="width"
        :visible="visible"
        :title="title"
        :zIndex="zIndex"
        :centered="centered"
        :okText="okText"
        :cancelText="cancelText"
        :confirmLoading="confirmLoading"
        :destroyOnClose="destroyOnClose"
        @cancel="handleCancel"
        @ok="handleOk">
        <slot></slot>
        <template slot="footer">
            <slot name="footer"></slot>
        </template>
    </a-modal>
</template>

<script>
export default {
    name: 'design-dialog',
    props: {
        // 弹窗宽度
        width: {
            type: [String, Number],
            default: 960
        },
        // 标题
        title: {
            type: String
        },
        // 是否显示
        visible: {
            type: Boolean,
            default: false
        },
        // 是否垂直居中显示
        centered: {
            type: Boolean,
            default: true
        },
        // 定位层级
        zIndex: {
            type: Number,
            default: 1000
        },
        // loading
        confirmLoading: {
            type: Boolean,
            default: false
        },
        // 确认文案
        okText: {
            type: String,
            default: '确定'
        },
        // 取消文案
        cancelText: {
            type: String,
            default: '取消'
        },
        wrapClassName : {
            type: String
        },
	      destroyOnClose: {
		      type: Boolean,
		      default: false
        },
    },
    data () {
        return {
        }
    },
    methods: {
        // 确认
        handleOk () {
            this.$emit('isOk');
        },

        // 取消
        handleCancel () {
            this.$emit('isCancel');
        }
    }
}
</script>

<style lang="less">
.design-dialog {
    .ant-modal-body {
        font-size: 13px;
    }
    .ant-modal-footer {
        border-top: none;
        text-align: center;
        padding-top: 8px;
        padding-bottom: 32px;
        .ant-btn {
            padding: 0 32px;
        }
    }
    .ant-modal-header .ant-modal-title {
        color: #3F4245;
        font-weight: 600;
    }
    .ant-modal-footer {
        border-top: none;
        text-align: center;
        padding-bottom: 40px;
    }
    .ant-modal-footer button + button{
        margin-left: 16px;
    }
}
</style>
