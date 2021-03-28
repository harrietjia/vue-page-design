<template>
  <div class="form-item col-1">
    <div class="bg-head">
      <span class="config-title">{{ config.title || "" }}</span>
    </div>
    <!--{{value}}-->
    <!--<p>{{config.menu_button}}</p>-->
    <div v-if="value.id|| value.id===0">
      <div style="margin-top: 15px"
           :class="{'sortable-body': true, 'in-drag': inDrag,'out-drag': !inDrag}">

        <!-- 拖拽容器 -->
        <!--<draggable-->
        <!--tag="ul"-->
        <!--:list="value"-->
        <!--v-bind="dragOptions"-->
        <!--@start="inDrag = true">-->

        <!--&lt;!&ndash; 动画 &ndash;&gt;-->
        <!--<transition-group type="transition" :name="!inDrag ? 'flip-list' : null">-->

        <!-- item -->
        <div :class="{'in-hover': inHover == value.id}"
             @mousemove="inHover = value.id"
             @mouseleave="inHover = ''">

          <div class="item_class">
            <span class="item_title">菜单名称</span>
            <a-input size="large" placeholder="请输入" v-model.trim="value.text">
            </a-input>
          </div>
          <div class="item_class">
            <div class="icon-box">
              <span style="margin-right: 30px;">图标</span>
              <a-radio-group v-model="value.isIcon">
                <a-radio value="1">
                  图标
                </a-radio>
                <a-radio value="2">
                  自定义
                </a-radio>
              </a-radio-group>
            </div>
            <template v-if="value.isIcon=='1'">
              <div class="show-img" style="text-align: center;" v-if="value.icon" @click="openIconUpload(value.id)">
                <i style="font-size: 30px" class="iconfont" :class="value.icon"></i>
                <a-icon class="icon-close11" type="close-circle" @click.stop="deleteIcon(value)" title="点击清除图片"/>
              </div>
              <div class="choose-img" v-else @click="openIconUpload(value.id)">
                <i class="iconfont icon-jiahao"></i>
                <span>选择图标</span>
              </div>
            </template>
            <template v-if="value.isIcon=='2'">
              <div class="show-img" v-if="value.image" @click="openUpload(value.id)">
                <img :src="value.image">
                <a-icon class="icon-close11" type="close-circle" @click.stop="deleteImg(value)" title="点击清除图片"/>
              </div>
              <div class="choose-img" v-else @click="openUpload(value.id)">
                <i class="iconfont icon-jiahao"></i>
                <span>点击上传</span>
              </div>
            </template>
          </div>
          <div class="item_class" v-if="!value.sub_button || value.sub_button.length <= 0">
            <div class="link-box">
              <span style="margin: 10px 10px 0 0;">链接</span>
              <div style="margin-top: 10px">
                <a-radio-group v-model="value.isMinApp">
                  <a-radio value="1">
                    跳转内部链接
                  </a-radio>
                  <a-radio value="2">
                    跳转小程序链接
                  </a-radio>
                </a-radio-group>
              </div>
            </div>
            <div class="slide-bar-wrapper" style="display: flex;margin-top: 10px" v-if="value.isMinApp=='1'">
              <div style="width: 220px">
                <a-input
                    v-model.trim="value.link"
                    placeholder="请输入链接">
                </a-input>
              </div>
              <div style="margin-left: 10px">
                <a-button style="width: 100px" type="primary" @click.stop="openLink(value.id)">选择链接</a-button>
              </div>
            </div>
            <div class="slide-bar-wrapper" style="margin-top: 10px" v-if="value.isMinApp=='2'">
              <template v-if="fun.getKey('page_sort') == 2">
                <div style="width: 290px">
                  <a-input
                      v-model.trim="value.gh_id"
                      placeholder="请填写跳转小程序APPID">
                  </a-input>
                </div>
                <div style="width: 290px;margin-top: 15px">
                  <a-input
                      v-model.trim="value.minApp_link"
                      placeholder="请填写跳转的小程序内页面路径及参数">
                  </a-input>
                </div>
              </template>
              <template v-else>
                <div style="width: 290px">
                  <a-input
                      v-model.trim="value.gh_id"
                      placeholder="请填写跳转的小程序以gh_开头的原始id">
                  </a-input>
                </div>
                <div style="width: 290px;margin-top: 15px">
                  <a-input
                      v-model.trim="value.minApp_link"
                      placeholder="请填写跳转的小程序内页面路径及参数">
                  </a-input>
                </div>
                <span style="color: #999999;margin: 5px">Tips: H5跳转小程序页面路径需要添加.html后缀，如pages/home/home.html</span>
              </template>
            </div>
          </div>

          <link-modal :ref="`linkModal`"
                      :value.sync="value.link"
                      :config="config"
                      :rootConfig="rootConfig"
                      @confirm="handleOk(value,$event)"></link-modal>

          <icon-modal :ref="`iconModal`"
                      :value.sync="value.icon"
                      :config="config"
                      :rootConfig="rootConfig"
                      @confirm="handleIconOk(value,$event)"></icon-modal>

          <image-upload :ref="`imageUpload`"
                        :value.sync="value.image"
                        :config="config"
                        :rootConfig="rootConfig"
                        @confirm="sureImg(value,$event)">
          </image-upload>
        </div>
        <!--</transition-group>-->

        <!--</draggable>-->

        <!-- 删除所有组件 -->
        <!--<div style="text-align: left;margin-top: 10px">-->
        <!--<a-button type="primary" @click="toAdd">-->
        <!--添加菜单-->
        <!--</a-button>-->
        <!--<span class="button-clear-all" @click="toAdd">添加组件</span>-->
        <!--<span class="button-clear-all" @click="">清除所有组件</span>-->
        <!--</div>-->
      </div>
    </div>
    <div v-else>
      <a-empty :description="false" />
    </div>

  </div>
</template>

<script>
	import draggable from 'vuedraggable';
	import imageUpload from '../../../../system-components/image-upload/index.vue';
	import linkModal from '../../../../system-components/link-modal/index.vue';
	import iconModal from '../../../../system-components/icon-modal/index.vue';

	export default {
		props: ['value', 'config', 'rootConfig'],

		components: {
			draggable,
			imageUpload,
			linkModal,
			iconModal
		},

		data() {
			return {
				current_ids: [],
				current_value: this.value,

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
			// 当前组件ID
			component_id() {
				return this.$store.state.design.selected_id;
			},
		},
		watch: {
			value: {
				deep: true,//深度监听
				handler: function () {
					if (this.value.sub_button) {
						for (let i = 0; i < this.config.menu_button.length; i++) {
							if (this.config.menu_button[i].id == this.value.id) {
								this.config.menu_button[i].text = this.value.text;
								this.config.menu_button[i].image = this.value.image;
								this.config.menu_button[i].icon = this.value.icon;
								this.config.menu_button[i].isIcon = this.value.isIcon;
								this.config.menu_button[i].link = this.value.link;
								this.config.menu_button[i].isMinApp = this.value.isMinApp;
								this.config.menu_button[i].gh_id = this.value.gh_id;
								this.config.menu_button[i].minApp_link = this.value.minApp_link;
							}
						}
					} else {
						if(this.value.id) {
							let id = this.value.id.slice(0, 1);
							for (let i = 0; i < this.config.menu_button.length; i++) {
								if (this.config.menu_button[i].id == id) {
									for (let k = 0; k < this.config.menu_button[i].sub_button.length; k++) {
										if (this.config.menu_button[i].sub_button[k].id == this.value.id) {
											this.config.menu_button[i].sub_button[k].text = this.value.text;
											this.config.menu_button[i].sub_button[k].image = this.value.image;
											this.config.menu_button[i].sub_button[k].icon = this.value.icon;
											this.config.menu_button[i].sub_button[k].isIcon = this.value.isIcon;
											this.config.menu_button[i].sub_button[k].link = this.value.link;
											this.config.menu_button[i].sub_button[k].isMinApp = this.value.isMinApp;
											this.config.menu_button[i].sub_button[k].gh_id = this.value.gh_id;
											this.config.menu_button[i].sub_button[k].minApp_link = this.value.minApp_link;
										}
									}
								}
							}
            }

					}
				}
			}
		},
		methods: {
			openLink(id) {
				this.$refs[`linkModal`].show();
			},
			handleOk(item, url) {
				item.link = url;
			},

			openIconUpload(id) {
				this.$refs[`iconModal`].show();
      },
			handleIconOk(item,icon) {
				item.icon = icon;
      },
			deleteIcon(item) {
				item.icon = "";
      },

			openUpload(id) {
				this.$refs[`imageUpload`].show();
			},
			sureImg(item, imgUrl) {
				item.image = imgUrl;
			},
			deleteImg(item) {
				item.image = "";
			},
			/**
			 * 结束拖拽
			 */
			handleDragEnd(c) {
				this.inDrag = false;
			},
			/**
			 * 添加组件
			 */
			toAdd() {
				this.current_value = this.value;
				this.current_value.map((item)=>{
					this.current_ids.push(item.id);
				});
				let id = this.current_value.length + 1;
				while (this.current_ids.includes(id)) {
					id += 1;
				}
				this.current_ids.push(id);
				this.current_value.push({
					id: id,
					image: '',
					link: '',
					text: '菜单'
				});
				this.$emit('input', this.current_value);
			},
			/**
			 * 复制粘贴组件
			 * @param {Array} page_components 所有组件列表
			 * @param {Vdc} component 组件
			 * @param {Number} index 组件楼层索引
			 */
			async handle_component_copy(page_components, component, index) {
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
			handle_component_delete(id) {
				this.current_value = this.value;
				for (let i = 0; i < this.current_value.length; i++) {
					if (this.current_value[i].id == id) {
						this.current_value.splice(i, 1);
					}
				}
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
        border-radius: 12px;
      }
    }

    // 组件列表
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;

      li {
        /*cursor: move;*/
        position: relative;
        padding: 10px;
        margin-bottom: 16px;
        width: 100%;
        /*height: 48px;*/
        /*line-height: 48px;*/
        background: #fff;
        box-sizing: border-box;
        box-shadow: 0px 0px 0px 1px #E9EAEC;
        /*display: flex;*/

        // 鼠标滑过
        &.in-hover {
          /*background: #29ba9c;*/
          /*color: #fff;*/
          box-shadow: 0px 2px 6px 0px rgba(188, 195, 206, 0.8);
          .buttons {
            color: #29ba9c;
            display: block;
          }
        }

        // 拖拽中
        &.sortable-ghost, &.sortable-chosen {
          /*opacity: .2 !important;*/
          /*background: #29ba9c;*/
          box-shadow: 0px 2px 6px 0px rgba(188, 195, 206, 0.8);
          /*color: #fff;*/
          /*span {*/
          /*color: #29ba9c;*/
          /*}*/
        }

        p {
          margin: 0px;
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

  .item_class {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item_title {
      margin-bottom: 10px;
    }
    .icon-box {
      display: flex;
      margin: 10px 0;
    }
    .link-box {
      margin: 10px 0;
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
