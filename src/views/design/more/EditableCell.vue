<template>
    <div class="editable-cell">
        <div
            v-if="editable"
            class="editable-cell-input-wrapper">
            <a-input
                v-model.trim="value"
                @blur="handleBlur"
                @pressEnter="check" />
            <a-icon v-if="icon"
                type="check"
                class="editable-cell-icon-check"
                @click="check" />
        </div>
        <div
            v-else
            class="editable-cell-text-wrapper">
            {{ value || ' ' }}
            <a-icon
                type="edit"
                class="editable-cell-icon"
                @click="edit" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: [String, Number]
        }
    },
    data () {
        return {
            value: this.text,
            editable: true,
            icon: false
        };
    },

    methods: {
        handleChange (e) {
            const value = e.target.value;
            this.value = value;
        },
        handleBlur (e) {
            const value = e.target.value;
            this.$emit('change', value);
            this.value = this.text;
        },
        check () {
            this.$emit('change', this.value);
            this.value = this.text;
        },
        edit () {
            this.editable = true;
        }
    },
};
</script>

<style lang="less">
    .editable-cell {
        width: 80px;
        margin-left: 10px;
    }


</style>
