<template>
    <div class="unit-tab">
        <p style="margin-bottom: 16px"> {{ config.title }}</p>

        <!--{{value}}-->

        <!-- 遍历配置项 -->
        <!--<div-->
            <!--class="form-item col-1"-->
            <!--v-for="(key, itemIndex) in Object.keys(item)"-->
            <!--:key="itemIndex">-->

            <!--&lt;!&ndash; 文本框 &ndash;&gt;-->
            <!--<template v-if="config.options[key].type === 'text'">-->
                <!--<label> {{ config.options[key].title }} {{ tabIndex + 1 }}</label>-->
                <!--<a-input-->
                    <!--size="large"-->
                    <!--placeholder="请输入"-->
                    <!--v-model="item[key]">-->
                <!--</a-input>-->
            <!--</template>-->

            <!--&lt;!&ndash; 其他控件 &ndash;&gt;-->
            <!--<unit-entry-->
                <!--v-else-->
                <!--v-model="item[key]"-->
                <!--:type="config.options[key].type"-->
                <!--@input="emit"-->
                <!--:tab="item"-->
                <!--:tabIndex="tabIndex"-->
                <!--:config="config.options[key]"-->
                <!--:rootConfig="rootConfig">-->
            <!--</unit-entry>-->
        <!--</div>-->

        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="文字设置">
                <div class="form-item col-1" style="display: flex">
                    <span style="margin-right: 10px">文字是否显示</span>
                    <a-switch :default-checked="config.value['text_set'].text_show ? true : false"
                              v-model="config.value['text_set'].text_show" />
                </div>
                <div class="form-item col-1">
                    <span>未选中颜色</span>
                    <color-picker v-model="config.value['text_set'].text_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
                <div class="form-item col-1">
                    <span>选中颜色</span>
                    <color-picker v-model="config.value['text_set'].text_choose_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="图标设置">
                <div class="form-item col-1" style="display: flex">
                    <span style="margin-right: 10px">图标是否显示</span>
                    <a-switch :default-checked="config.value['icon_set'].icon_show ? true : false"
                              v-model="config.value['icon_set'].icon_show" />
                </div>
                <div class="form-item col-1">
                    <span>图标位置</span>
                    <a-radio-group v-model="config.value['icon_set'].icon_position">
                        <a-radio value="left">
                            左边
                        </a-radio>
                        <a-radio value="top">
                           上边
                        </a-radio>
                    </a-radio-group>
                </div>
                <div class="form-item col-1">
                    <span>未选中颜色</span>
                    <color-picker v-model="config.value['icon_set'].icon_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
                <div class="form-item col-1">
                    <span>选中颜色</span>
                    <color-picker v-model="config.value['icon_set'].icon_choose_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="边框设置">
                <div class="form-item col-1" style="display: flex">
                    <span style="margin-right: 10px">边框是否显示</span>
                    <a-switch :default-checked="config.value['border_set'].border_show ? true : false"
                              v-model="config.value['border_set'].border_show" />
                    <a-tooltip>
                        <template slot="title">Tips: 选择边框不显示后仍存在部分边框为辅助边框  在实际页面上是没有的</template>
                        <a-icon type="alert" style="color: #ff9b19;font-size: 18px;" />
                    </a-tooltip>
                </div>
                <div class="form-item col-1">
                    <span>未选中颜色</span>
                    <color-picker v-model="config.value['border_set'].border_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
                <div class="form-item col-1">
                    <span>选中颜色</span>
                    <color-picker v-model="config.value['border_set'].border_choose_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="背景设置">
                <div class="form-item col-1">
                    <span>背景颜色</span>
                    <color-picker v-model="config.value['bg_set'].bg_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
                <div class="form-item col-1">
                    <span>选中颜色</span>
                    <color-picker v-model="config.value['bg_set'].bg_choose_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
            </a-tab-pane>
            <a-tab-pane key="5" tab="二级菜单">
                <div class="form-item col-1">
                    <span>未选中颜色</span>
                    <color-picker v-model="config.value['children_set'].children_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
                <div class="form-item col-1">
                    <span>选中颜色</span>
                    <color-picker v-model="config.value['children_set'].children_choose_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
                <div class="form-item col-1">
                    <span>背景颜色</span>
                    <color-picker v-model="config.value['children_set'].children_bg_color"
                                  :config="config"
                                  :rootConfig.sync="rootConfig"></color-picker>
                </div>
            </a-tab-pane>
        </a-tabs>

    </div>
</template>

<script>
import unitEntry from './index.vue';
import colorPicker from './unit-color.vue';

export default {
    props: ['id', 'value', 'config', 'rootConfig'],
    data () {
        return {
        }
    },

    components: {
	      colorPicker,
        unitEntry,
    },

    methods: {
      callback(key) {
        // console.log(key);
      },
    },

    created () {
    }
}
</script>

<style lang="less" scoped>
    .unit-tab {
        width: 100%;
        margin-top: 15px;
    }
</style>
