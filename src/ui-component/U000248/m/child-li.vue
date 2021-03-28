<template>
    <div class="child-li">
        <label>
            <span @click="$emit('click', data.item_id, data.item_title, type)">
                {{ data.item_title }}
            </span>
            <div
                class="icon-layer"
                v-show="data.child_item && data.child_item.length > 0 && show_child == true"
                @click="handle_open">
                <img src="https://geshopimg.logsss.com/uploads/KAzYgJkIXQTtnWuRaG0LxOPZHE8vojCM.png"/>
            </div>
            <div
                class="icon-layer"
                v-show="data.child_item && data.child_item.length > 0 && show_child == false"
                @click="handle_open">
                <img src="https://geshopimg.logsss.com/uploads/f6TQBvq7Y281A3k9oHPeysZtrmRuJKhN.png"/>
            </div>
        </label>
        <div
            v-if="data.child_item && data.child_item.length > 0"
            ref="child"
            class="child-li-items"
            style="display:none;">
            <div>
                <child-li
                    v-for="(item, index) in data.child_item"
                    :key="index"
                    :data.sync="item"
                    :type="type"
                    @click="handle_click">
                </child-li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data', 'type'],
    name: 'child-li',
    data () {
        return {
            show_child: false
        };
    },
    methods: {
        handle_open () {
            this.show_child = !this.show_child;
            this.show_child ? $(this.$refs.child).show() : $(this.$refs.child).hide();
        },
        handle_click (x, y, z) {
            this.$emit('click', x, y, z);
        }
    }
};
</script>

<style lang="less" scoped>
.child-li {
    width: 100%;
}

// 打开状态
.child-li.open {
    img {
        transform: rotate(-180deg);
    }
}

// LI 文案
label {
    display: flex;
    height: 88 / 75rem;
    line-height: 88 / 75rem;
    vertical-align: top;
    justify-content: space-between;
    
    > span {
        width: 100%;
        &::before {
            display: inline-block;
            width: 32 / 75rem;
            flex-shrink: 0;
            content: " ";
        }
    }
}

// 图标
.icon-layer {
    flex-shrink: 0;
    position: relative;
    height: 88 / 75rem;
    width: 88 / 75rem;
    background: #fff;
    vertical-align: top;
    img {
        position: absolute;
        width: 28 / 75rem;
        height: 28/ 75rem;
        right: 32 / 75rem;
        top: (88-28) / 2 / 75rem;
    }
}

// LI 子项
.child-li-items {
    width: 100%;
    display: flex;
    &::before {
        display: inline-block;
        content: " ";
        width: 32 / 75rem;
    }
    > div {
        width: 100%;
    }
}
</style>
