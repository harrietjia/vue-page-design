<template>
  <div>
    <!-- 循环样式配置项 -->
    <template v-for="(group, index) in layout">
      <div
          :key="index"
          :class="{
                    'form-group': true,
                    'is-hide': slideup_group_index.includes(group.title)
                }">

        <!-- 标题 -->
        <div class="form-group-title" @click="handle_group_toggle(group.title)" v-show="group.title">
          <a-icon type="caret-down"/>
          {{ group.title }}
        </div>

        <div class="form-group-body">

          <template v-for="key in group.groups">
            <!-- 如果是自定义的组件 -->
            <component
                :is_from="is_from"
                v-if="is_diy(configs[key].type)"
                v-model="configs[key].value"
                :key="key"
                :is="units[configs[key].type]"
                :config="configs[key]"
                :rootConfig.sync="rootConfig">
            </component>

            <div v-else-if="configs[key].type ==='switch'" class="form-item col-1" style="display: flex">
              <!-- 开关 -->
              <div style="flex: 1;display: flex">
                <span class="config-title"> {{ configs[key].title }} </span>
                <a-tooltip v-if="configs[key].tips">
                  <template slot="title">
                    Tips: {{configs[key].tips}}
                  </template>
                  <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
                </a-tooltip>
              </div>
                <a-switch style="flex: 0 0 40px" :default-checked="configs[key].default ? true : false"
                          v-model="configs[key].value"
                          :disabled="configs[key].disabled ? true : false"
                          @change="handle_change(key)" />
            </div>

            <!-- 非自定义 -->
            <div
                v-else
                :key="key"
                :class="`form-item col-${configs[key].col || 1}`">

              <!-- 配置项名字 -->
              <div style="display: flex">
                <span class="config-title" v-show="configs[key].showBy ? rootConfig[configs[key].showBy].value: true"> {{ configs[key].title }} </span>
                <a-tooltip v-if="configs[key].tips">
                  <template slot="title">
                    Tips: {{configs[key].tips}}
                  </template>
                  <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
                </a-tooltip>
              </div>


              <!-- 文本输入框 -->
              <template v-if="(configs[key].type ==='text' || !configs[key].type) && (configs[key].showBy ? rootConfig[configs[key].showBy].value: true)">
                <a-input
                    v-model.trim="configs[key].value"
                    size="large"
                    :maxLength="configs[key].max || 100"
                    placeholder="请输入">
                </a-input>
              </template>

              <!-- 数字输入框 -->
              <template v-if="configs[key].type ==='number'">
                <a-input-number
                    :disabled="configs[key].disabled ? true : false"
                    :min="set_number_min(configs[key].min)"
                    :max="set_number_max(configs[key].max)"
                    v-model="configs[key].value"
                    @change="handle_number_change(key)"/>
              </template>

              <!-- 单选 radio -->
              <template v-if="configs[key].type === 'radio' && (configs[key].showBy ? rootConfig[configs[key].showBy].value: true)">
                <a-radio-group v-model="configs[key].value" v-if="configs[key].button_style === 'solid'" button-style="solid">
                  <a-radio-button
                      :value="x.value"
                      v-for="(x, index) in configs[key].options"
                      :key="index">
                    {{ x.label }}
                  </a-radio-button>
                </a-radio-group>
                <a-radio-group v-model="configs[key].value" v-else-if="configs[key].button_style === 'noSolid'">
                  <a-radio-button
                      :value="x.value"
                      v-for="(x, index) in configs[key].options"
                      :key="index">
                    {{ x.label }}
                  </a-radio-button>
                </a-radio-group>
                <a-radio-group v-model="configs[key].value" v-else>
                  <a-radio
                      :value="x.value"
                      v-for="(x, index) in configs[key].options"
                      :key="index">
                    {{ x.label }}
                  </a-radio>
                </a-radio-group>
              </template>

              <!-- 多选 -->
              <template v-if="configs[key].type === 'checkbox'">
                <!--<a-checkbox-group v-model="configs[key].value">-->
                  <!--<a-checkbox :value="x.value"-->
                              <!--v-for="(x, index) in configs[key].options"-->
                              <!--:key="index">-->
                    <!--{{ x.label }}-->
                  <!--</a-checkbox>-->
                <!--</a-checkbox-group>-->
                <el-checkbox-group
                    v-model="configs[key].value">
                  <el-checkbox v-for="(x, index) in configs[key].options" :label="x.value" :key="index">{{x.label}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

	// 所有控件
	import {
		colorPicker,
		goods,
		imagePicker,
		images,
		video,
		bar,
		tab,
    link,
    list,
		suspendList,
		bottomItem,
    bg,
    map,
		tinymce,
		chooseList,
		chooseItem,
		ustyle,
		textstylebox,
		cube,
		iconbox,
		goodList,
		tabList,
		orderList,
		memberCheckbox
	} from './form-unit/index.js';

	export default {
		props: ['type', 'layout', 'configs', 'rootConfig','is_from'],
		data() {
			return {
				// 自定义的表单控件
				units: {
					color: colorPicker,
					goods: goods,
					image: imagePicker,
					images,
					video,
					bar,
					tab,
					link,
					list,
					suspendList,
					bottomItem,
          bg,
					map,
					tinymce,
					chooseList,
					chooseItem,
					ustyle,
					textstylebox,
					cube,
					iconbox,
					goodList,
					tabList,
					orderList,
					memberCheckbox
				},
				slideup_group_index: [], // 记录隐藏的配置集合的索引值，默认全部展开
			}
		},

		methods: {
			// 判断是否自定义控件
			is_diy(type) {
				const map = [
					'color',
					'goods',
					'image',
					'images',
          'video',
					'bar',
					'tab',
					'page',
					'sort',
          'link',
          'list',
          'suspendList',
          'bottomItem',
          'bg',
          'map',
          'tinymce',
          'chooseList',
          'chooseItem',
          'ustyle',
          'textstylebox',
          'cube',
          'iconbox',
          'goodList',
          'tabList',
          'orderList',
          'memberCheckbox'
				];
				return map.includes(type);
			},

			// 设置数值最小
			set_number_min(val) {
				if (Number(val) === 0) {
					return 0;
				} else {
					return Number(val) || 0;
				}
			},

			// 设置数值最大值
			set_number_max(val) {
				return Number(val) || 9999;
			},

			// 数字输入框，值变化，绑定其他配置项的值
			handle_number_change(key) {
				let value = this.configs[key].value;
				// 如果值为空，则默认改为0
				if (value === '') {
					value = 0;
				}
				try {
					if (this.configs[key].hasOwnProperty('bind')) {
						const bindStr = this.configs[key].bind;
						eval('this.configs.' + bindStr + '=' + value);
					}
				} catch (err) {
				}
			},

			handle_change(key) {
				let value = this.configs[key].value;
				// 如果值为空，则默认改为false
				if (value === '') {
					value = false;
				}
				try {
					if (this.configs[key].hasOwnProperty('bind')) {
						const bindStr = this.configs[key].bind;
						eval('this.configs.' + bindStr + '=' + value);
					}
				} catch (err) {
				}
      },

			/**
			 * 收起/展开 配置项组合
			 * @param {Number} index 组合数组索引
			 */
			handle_group_toggle(index) {
				if (this.slideup_group_index.includes(index)) {
					this.slideup_group_index = this.slideup_group_index.filter(x => x != index);
				} else {
					this.slideup_group_index.push(index);
				}
			}
		}
	}
</script>
<style lang="less">
    .form-group {
      margin-top: 40px;
    }

    // panel 标题
    .form-group-title {
      font-size: 16px;
      font-weight:600;
      color:rgba(63,66,69,1);
      line-height: 22px;
      cursor: pointer;

      // 标题箭头
      .anticon-caret-down {
        transition: all .5s;
      }
    }

    // panel 描述
    .form-group-desc {
      font-size: 14px;
      color: #999;
      font-weight: normal;
    }

    // panel 内容
    .form-group-body {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    // panel 隐藏模式下
    .form-group.is-hide {
      // 箭头动画
      .anticon-caret-down {
        transform: rotate(180deg);
      }
      // 隐藏具体内容
      .form-group-body {
        display: none;
      }
    }

  .ant-radio-wrapper, .ant-checkbox-wrapper {
    margin-top: 5px;
  }

    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #29ba9c;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #29ba9c;
      border-color: #29ba9c;
    }
</style>
