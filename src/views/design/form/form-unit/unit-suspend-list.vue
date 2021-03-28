<template>
  <div class="form-item col-1">
    <div class="bg-head">
      <span class="config-title">{{ config.title || "" }}</span>

      <div style="flex: 0 0 200px">
        <a-radio-group v-model="value.choose_style">
          <a-radio-button
              :value="x.value"
              v-for="(x, index) in config.choose_option"
              :key="index">
            {{ x.label }}
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <!--<p>{{config}}</p>-->

    <div class="bg-head" style="margin-top: 15px" v-show="value.choose_style == 2">
      <span class="config-title">悬浮窗样式</span>

      <div style="flex: 0 0 200px">
        <a-radio-group v-model="value.show_style">
          <a-radio-button value="1">
            样式一
          </a-radio-button>
          <a-radio-button value="2">
            样式二
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>

    <div style="margin-top: 15px" v-show="value.choose_style == 2">
      <span class="config-title">悬浮按钮</span>

      <div style="background-color: #fbfbfb;padding: 10px 5px;">
        <span style="margin-left: 10px;color: #999999;font-size: 13px">展开按钮图片</span>
        <image-picker v-model="value.unfold_button"  :config="config" :show_title="false"
                      :rootConfig.sync="rootConfig"></image-picker>
      </div>
      <div style="background-color: #fbfbfb;padding: 10px 5px;">
        <span style="margin-left: 10px;color: #999999;font-size: 13px">收起按钮图片</span>
        <image-picker v-model="value.fold_button"  :config="config" :show_title="false"
                      :rootConfig.sync="rootConfig"></image-picker>
      </div>
    </div>

    <div style="margin-top: 15px" v-show="value.choose_style == 1 && value.list.length>1">
      <span class="config-title">悬浮按钮间距</span>
      <bar v-model="value.button_padding" :no_show_title="true" :config="config"></bar>
    </div>

    <div>
      <div style="margin-top: 15px" :class="{'sortable-body': true, 'in-drag': inDrag,'out-drag': !inDrag}">

        <p style="margin-bottom: 10px">悬浮窗列表(最多可添加四个按钮)</p>

        <!-- 拖拽容器 -->
        <draggable
            tag="ul"
            :list="value.list"
            v-bind="dragOptions"
            @start="inDrag = true">

          <!-- 动画 -->
          <transition-group type="transition" :name="!inDrag ? 'flip-list' : null">

            <!-- item -->
            <li
                v-for="(item, index) in value.list"
                :key="item.id"
                :class="{'in-hover': inHover == item.id}"
                @mousemove="inHover = item.id"
                @mouseleave="inHover = ''">

              <div class="top">
                <div class="left">
                  <div class="show-img" v-if="item.image" @click="openUpload(item.id)">
                    <img :src="item.image">
                    <a-icon class="icon-close11" type="close-circle"  @click.stop="deleteImg(item)" title="点击清除图片"/>
                  </div>
                  <div class="choose-img" v-else @click="openUpload(item.id)">
                    <i class="iconfont icon-jiahao"></i>
                    <span>点击上传</span>
                  </div>
                </div>

                <div class="right" :style="{marginLeft: '10px'}">
                  <!--<a-input :style="{width: '210px'}" v-model="item.text" placeholder="请输入菜单名"></a-input>-->
                  <div class="slide-bar-wrapper" style="margin-top: 10px">
                    <a-radio-group :default-value="1" v-model="item.is_minApp">
                      <a-radio :value="'1'">
                        内部链接
                      </a-radio>
                      <a-radio :value="'2'">
                        小程序链接
                      </a-radio>
                      <a-radio :value="'3'">
                        电话
                      </a-radio>
                      <a-radio :value="'4'" v-if="fun.getKey('page_sort') == 2">
                        小程序客服
                      </a-radio>
                      <a-radio :value="'5'">
                        海报
                      </a-radio>
                    </a-radio-group>
                  </div>
                </div>
              </div>

              <div class="bottom" style="display: flex;margin-top: 10px" v-if="item.is_minApp == 1">
                <div style="width: 215px">
                  <a-input
                      v-model.trim="item.h5_link"
                      placeholder="请输入链接">
                  </a-input>
                </div>
                <div style="margin-left: 10px">
                  <a-button :style="{width: '60px'}" type="primary" @click.stop="openLink(item.id)">选择</a-button>
                </div>
              </div>

              <div class="bottom" v-if="item.is_minApp == 2">
                <template v-if="fun.getKey('page_sort') == 2">
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="item.gh_id"
                        placeholder="请填写跳转小程序APPID">
                    </a-input>
                  </div>
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="item.minApp_link"
                        placeholder="请填写跳转的小程序内页面路径及参数">
                    </a-input>
                  </div>
                </template>
                <template v-else>
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="item.gh_id"
                        placeholder="请填写跳转的小程序以gh_开头的原始id">
                    </a-input>
                  </div>
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="item.minApp_link"
                        placeholder="请填写跳转的小程序内页面路径及参数">
                    </a-input>
                  </div>
                  <span style="color: #999999;margin: 5px">Tips: H5跳转小程序页面路径需要添加.html后缀，如pages/home/home.html</span>
                </template>
              </div>

              <div class="bottom" style="display: flex;margin-top: 10px" v-if="item.is_minApp == 3">
                <div style="width: 295px">
                  <a-input
                      v-model.trim="item.phone"
                      placeholder="请输入电话号码">
                  </a-input>
                </div>
              </div>

              <div class="id-name">
                ID： {{item.id}}
              </div>
              <div class="buttons">
                <!--<span class="ignore-elements" @click.stop="handle_component_copy(value, item, index)">-->
                <!--<i class="iconfont icon-ht_operation_copypage"/>-->
                <!--</span>-->
                <span class="ignore-elements" @click.stop="handle_component_delete(item.id)">
                   <i class="iconfont icon-ht_operation_delete"/>
                 </span>
              </div>

              <link-modal :ref="`linkModal`+item.id"
                          :value.sync="item.h5_link"
                          :config="config"
                          :rootConfig="rootConfig"
                          @confirm="handleOk(item,$event)"></link-modal>

              <image-upload :ref="`imageUpload`+item.id"
                            :value.sync="item.image"
                            :config="config"
                            :rootConfig="rootConfig"
                            @confirm="sureImg(item,$event)">
              </image-upload>
            </li>
          </transition-group>

        </draggable>

        <!-- 删除所有组件 -->
        <div style="text-align: left;margin-top: 10px" v-if="this.value.list.length <= 3">
          <a-button type="primary" style="width: 310px" @click="toAdd">
            添加更多
          </a-button>
          <!--<span class="button-clear-all" @click="toAdd">添加组件</span>-->
          <!--<span class="button-clear-all" @click="">清除所有组件</span>-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
	import draggable from 'vuedraggable';
	import imageUpload from '../../../../system-components/image-upload/index.vue';
	import linkModal from '../../../../system-components/link-modal/index.vue';
	import imagePicker from './unit-image.vue';
	import bar from './unit-bar.vue';

	export default {
		props: ['value', 'config', 'rootConfig'],

		components: {
			draggable,
			imageUpload,
			linkModal,
			imagePicker,
			bar
		},

		data () {
			return {
				current_ids: [],

				loading: false,
				// 拖拽组件参数
				dragOptions: {
					animation: 200, // 动画时间
					group: "description",
					disabled: false,
					ghostClass: "sortable-ghost",
					dragClass: "sortable-drag",
					filter: ".ignore-elements"
				},
				inDrag: false, // 是否正在拖拽
				inHover: 0, // 鼠标 hover 的 <li> 的 component_id
			};
		},

		computed: {
			current_value() {
				return this.value;
			},
		},

		methods: {
			openLink(id) {
				this.$refs[`linkModal${id}`][0].show();
			},
			handleOk(item,url) {
				item.h5_link = url;
			},

			openUpload(id) {
				this.$refs[`imageUpload${id}`][0].show();
			},
			sureImg(item,imgUrl) {
				item.image = imgUrl;
			},
			deleteImg(item) {
				item.image = "";
			},
			/**
			 * 结束拖拽
			 */
			handleDragEnd (c) {
				this.inDrag = false;
			},
			/**
			 * 添加组件
			 */
			toAdd() {
				let current_value = this.value.list;
				current_value.map((item)=>{
					this.current_ids.push(item.id);
				});
				let id = current_value.length + 1;
				while (this.current_ids.includes(id)) {
					id += 1;
				}
				this.current_ids.push(id);
				current_value.push({
					id: id,
					image: '',
					is_minApp: '1',
					h5_link: '',
					gh_id: '',
					minApp_link: '',
					phone: '',
					// text: '文本'
				});
				this.current_value.list = current_value;
				this.$emit('input', this.current_value);
			},
			/**
			 * 复制粘贴组件
			 * @param {Array} page_components 所有组件列表
			 * @param {Vdc} component 组件
			 * @param {Number} index 组件楼层索引
			 */
			async handle_component_copy (page_components, component, index) {
				try {
					const vdc = component.duplicate();
					page_components.splice(index + 1, 0, vdc);
					this.$message.success('复制组件成功！');
				} catch (err) {
					this.$message.error('复制组件失败！');
				}
			},
			/**
			 * 删除组件
			 * @param {Number} id 数组索引
			 */
			handle_component_delete (id) {
				let current_value = this.value.list;
				for(let i=0;i<current_value.length;i++) {
					if(current_value[i].id == id) {
						current_value.splice(i, 1);
					}
				}
				this.current_value.list = current_value;
				this.$emit('input', this.current_value);
			},
		}
	}
</script>

<style lang="less" scoped>
  .bg-head {
    display: flex;
    .config-title {
      flex: 1;
      align-self: center;
    }
  }

  // 拖拽区域
  .sortable-body {

    // 删除所有组件
    .button-clear-all {
      display: inline-block;
      width: 88px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background: #29ba9c;
        color: #ffffff;
        border-radius:12px;
      }
    }

    // 组件列表
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;

      li {
        cursor: move;
        position: relative;
        padding: 25px 10px;
        margin-bottom: 16px;
        width: 100%;
        /*height: 48px;*/
        /*line-height: 48px;*/
        background: #fff;
        box-sizing: border-box;
        box-shadow: 0px 0px 0px 1px #E9EAEC;
        display: flex;
        flex-direction: column;


        // 鼠标滑过
        &.in-hover {
          /*background: #29ba9c;*/
          /*color: #fff;*/
          box-shadow: 0px 2px 6px 0px rgba(188,195,206,0.8);
          .buttons {
            color: #29ba9c;
            display: block;
          }
        }

        // 拖拽中
        &.sortable-ghost, &.sortable-chosen {
          /*opacity: .2 !important;*/
          /*background: #29ba9c;*/
          box-shadow: 0px 2px 6px 0px rgba(188,195,206,0.8);
          /*color: #fff;*/
          span {
            color: #29ba9c;
          }
        }

        p {
          margin: 0px;
        }

        .top {
          display: flex;
        }

        .id-name {
          position: absolute;
          left: 10px;
          top: 0px;
        }

        // 按钮区域
        .buttons {
          display: none;
          position: absolute;
          right: 10px;
          top: 0px;
          text-align: right;

          > span {
            text-align: center;
            vertical-align: middle;
            display: inline-block;
            background: #fff;
            border-radius: 100%;
            width: 24px;
            height: 24px;
            line-height: 24px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }

  .choose-img {
    margin: 0 auto;
    width: 65px;
    height: 65px;
    border-radius: 3px;
    border: dashed 1px #e2e2e2;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    text-align: center;
    color: #5e5e5e;
    cursor: pointer;
    font-size: 12px;
    i {
      height: 28px;
    }
  }
  .choose-img:hover, .show-img:hover {
    color: #29ba9c;
    border-color: #29ba9c;
  }

  .show-img {
    position: relative;
    width: 65px;
    margin: 0 auto;
    border: dashed 1px #e2e2e2;
    cursor: pointer;
    img {
      width: 100%;
    }
    .icon-close11 {
      position: absolute;
      top: -10px;
      right: -9px;
      color: #999;
      font-size: 18px;
    }
  }

  .tips {
    margin-top: 15px;
    color: #b4b4b4;
  }
</style>
