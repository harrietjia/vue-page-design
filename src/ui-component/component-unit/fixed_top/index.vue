<template>
    <div ref="dom">
        <div class="realdom">
            <slot></slot>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
export default {
    name: 'fixed-top',
    data () {
        return {
            current_top: 0
        };
    },
    computed: {
        env () {
            return this.$store.state.page.env;
        }
    },
    methods: {
        check_scroll_top () {
            const top = $(window).scrollTop();
            // 相同高度不触发事件
            if (top == this.current_top) return false;
            // 记录当前的值
            this.current_top = top;
            // 
            const domTop = $(this.$refs.dom).offset().top;
            const domHeight = $(this.$refs.dom).height();
            if (top + 1 >= domTop) {
                this.$emit('change', true);
                $(this.$refs.dom).addClass('fixed').find('.realdom').attr('style', `top: 0px`);
                $('#pageHeader').hide();
            } else {
                this.$emit('change', false);
                $(this.$refs.dom).removeClass('fixed').find('.mask').height(domHeight);
                $('#pageHeader').show();
            }
        }
    },
    mounted () {
        if (this.env == 1) return false;
        $(window).scroll(() => {
            this.check_scroll_top();
        });
        this.check_scroll_top();
    }
};
</script>

<style lang="less" scoped>
.fixed {
    .realdom {
        position: fixed;
        right: 0px;
        left: 0px;
        z-index: 99999;
    }
    .mask {
        display: block;
    }
}
.mask {
    display: none;
}
</style>
