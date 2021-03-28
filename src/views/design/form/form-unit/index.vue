<template>
    <component
        v-model="current_value"
        :is="component"
        :config="config"
        :rootConfig="rootConfig"
        @input="emit">
    </component>
</template>

<script>
// 图片选择器
import imagePicker from './unit-image.vue';

const components = {
    image: imagePicker
}

export default {
    props: ['value', 'type', 'config', 'tab', 'tabIndex', 'rootConfig'],
    data () {
        return {
            current_value: this.value,
            component: components[this.type]
        }
    },
    watch: {
        value (newVal) {
            this.current_value = newVal;
        }
    },
    methods: {
        emit (e) {
            this.current_value = e;
            this.$emit('input', e, this.tab, this.tabIndex);
        }
    }
}
</script>

<style>

</style>
