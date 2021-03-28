<template>
  <div class="design-layout-top">
    <a-row type="flex" justify="space-between" align="middle" class="header">
      <!--logo-->
      <!--<div class="layout-logo">-->
      <!--<a href="/"><i class="iconfont logo"></i></a>-->
      <!--</div>-->

      <!-- 页面标题 -->
      <a-col :span="12" class="middle">
        <a-checkbox-group style="width: 90%;margin-left: 30px" v-model="page_type" @change="onChange" v-if="fun.getKey('page_sort') == 1">
          <a-checkbox value="1">
            公众号
          </a-checkbox>
          <a-checkbox value="3">
            APP
          </a-checkbox>
          <a-checkbox value="4">
            支付宝
          </a-checkbox>
          <a-checkbox value="5">
            WAP
          </a-checkbox>
          <a-checkbox value="0">
            其他页面
          </a-checkbox>
        </a-checkbox-group>
        <a-checkbox-group style="width: 90%;margin-left: 30px;text-align: center;" v-model="page_type" @change="onChange" v-if="fun.getKey('page_sort') == 2">
          <a-checkbox value="2">
            小程序
          </a-checkbox>
          <a-checkbox value="0">
            其他页面
          </a-checkbox>
        </a-checkbox-group>
      </a-col>

      <a-col :span="8" class="middle">
        <div style="display: flex">
          <span style="font-size: 15px;font-weight: bold;line-height: 35px;color: #29ba9c">页面名称： </span><a-input style="width: 300px" v-model.trim="page_name" placeholder="请输入页面名称"></a-input>
        </div>
      </a-col>


      <!-- 右侧功能区域 -->
      <a-col :span="4" class="right">
        <span class="save" @click="handle_page_release">返回列表</span>
        <span class="release" @click="handle_page_save">保存</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>

	export default {
		name: 'design-top',
		props: ['is_from'],
		data() {
			return {
				page_name: '', // 页面标题
				page_sort: '1',
				page_scene: '1',

				// current_pipeline: '',  // 当前选择的渠道
				// current_lang: '', // 当前选择的语言
				page_type: ["0"], // 当前选择的端口
			}
		},

		methods: {
			onChange(checkedValues) {
				if(checkedValues[checkedValues.length-1] === '0') {
					this.page_type = ['0'];
        }else if(checkedValues.includes('0')){
					this.page_type = checkedValues.filter(function(item) {
					    return item !== '0'
					});
				}else {
					this.page_type = checkedValues;
        }

        if(checkedValues.length <=0 ) {
	        this.page_type = ['0'];
        }

				// console.log('checked = ', this.page_type);
			},
			/**
			 * 处理数据
			 * @param {String} datas
			 * **/
      handle_data(datas) {
	      let handleDatas = {};
	      Object.keys(datas).map(key => {
		      handleDatas[key] = datas[key].value;
	      });
	      return handleDatas;
      },

			/**
			 * 页面保存
			 */
			async handle_page_save() {
        this.$store.dispatch('design/page_save');
				await this.page_post()
			},

      page_post() {
	      // console.log(this.$store.state.page.saveParams.components);
	      // console.log(this.$store.state.page.info);
        // return
	      let pageinfo = this.handle_data(this.$store.state.page.settings.datas);
	      if(!this.page_name) {
		      this.$message.error('装修页面名称不能为空');
		      return
	      }
	      let json = {
		      id: this.$store.state.page.info.page_id || '',
		      member_level: pageinfo.member_level ? pageinfo.member_level.join(',') : '',
		      top_id: pageinfo.top_id.get_style == 0 ? '0' : pageinfo.top_id.menu_id.id || '0',
		      foot_type: pageinfo.bottom_menu.get_style,
		      foot_id: pageinfo.bottom_menu.menu_id.id || '',
		      page_info: JSON.stringify({
			      pageAmount: pageinfo.pageAmount,
			      preview_color: pageinfo.preview_color,
			      font_color: pageinfo.font_color,
			      page_title: pageinfo.page_title,
			      page_description: pageinfo.page_description,
			      page_icon: pageinfo.page_icon,
			      full_screen_id: pageinfo.full_screen_id.get_style == 2 ? pageinfo.full_screen_id.menu_id || {} : {},
			      advertising_id: pageinfo.advertising_id.get_style == 2 ? pageinfo.advertising_id.menu_id || {}: {},
		      }),
		      page_name: this.page_name,
		      page_type: this.page_type.join(','),
		      page_sort: this.page_sort,
		      page_scene: this.page_scene,
		      datas: JSON.stringify(this.$store.state.page.saveParams.components)
	      };
	      // console.log(json,"json");
        let url = "plugin.decorate.admin.decorate.save";
        if(this.is_from === 'store') {
        	url = "plugin.store-decorate.admin.store-decorate.save";
        }
	      $http.post(url, json, "loading").then(response => {
		      if (response.result === 1) {
			      this.$success({
						      title: '提示',
                  content: '保存成功',
                  onOk: ()=>{
	                  let url = window.location.href.substring(0,window.location.href.indexOf('&route='));
	                  // /admin/shop?c=site&a=entry&m=yun_shop&do=7900& 独立版
                    // /web/index.php?c=site&a=entry&m=yun_shop&do=1333& 微擎版
	                  if(this.is_from === 'store') {
		                  window.location.href = url + '&route=plugin.store-decorate.admin.page.get-list&store_id='+this.fun.getKey('store_id')+'&i='+this.fun.getKeyByI()+'#/store_home';
	                  }else {
		                  window.location.href = url + '&route=plugin.decorate.admin.page.get-list&i='+this.fun.getKeyByI()+'#/home';
	                  }
                  }
            });
		      } else {
			      if (response.msg) {
				      this.$message.error(response.msg);
			      }
		      }
	      }).catch(err => {
		      console.log(err);
	      });
      },

			/**
			 * 跳转列表
			 */
			handle_page_release() {
        let url = window.location.href.substring(0,window.location.href.indexOf('&route='));
				// /admin/shop?c=site&a=entry&m=yun_shop&do=7900& 独立版
				// /web/index.php?c=site&a=entry&m=yun_shop&do=1333& 微擎版
				if(this.is_from === 'store') {
					window.location.href = url + '&route=plugin.store-decorate.admin.page.get-list&store_id='+this.fun.getKey('store_id')+'&i='+this.fun.getKeyByI()+'#/store_home';
				}else {
					window.location.href = url + '&route=plugin.decorate.admin.page.get-list&i='+this.fun.getKeyByI()+'#/home';
        }
			}
		},

		mounted() {
			const info = this.$store.state.page.info; // 当前装修页数据

			// 页面标题
			this.page_name = info.page_name;

			// 当前选中的值
			// this.current_pipeline = info.pipeline;
			// this.current_lang = info.lang;
			this.page_type = info.page_type;
			this.page_scene = this.fun.getKey('page_scene') || info.page_scene;
			this.page_sort = this.fun.getKey('page_sort') || info.page_sort;
		}
	}
</script>

<style lang="less">

  .design-layout-top {

    // 图标
    .design-arrow-down {
      font-size: 12px !important;
      transform: scale(0.5);
      transition: 0.5s;
      &:before {
        display: block;
      }
      &.drop {
        transform: scale(0.5) rotate(180deg);
      }
    }

    // 左侧
    .left {
      .select-channel .ant-select-selection {
        border: none;
        box-shadow: none;
        height: 42px;
      }
      .select-channel .ant-select-selection__rendered {
        line-height: 38px;
      }
    }

    // 右侧
    .right {
      .select-channel .ant-select-selection {
        border: none;
        box-shadow: none;
        border-radius: 16px;
        background-color: #F0F2F5;
      }
      .ant-select-selection__placeholder, .ant-select-selection-selected-value {
        color: #3F4245;
      }
      .ant-select-selection__rendered {
        margin-left: 22px;
      }
    }

    .design-platform-pc, .design-platform-wap {
      font-size: 24px !important;
      vertical-align: middle;
    }
    .select-channel .title {
      vertical-align: middle;
    }

    // 渠道选择
    .channel {
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      .ant-select-selection-selected-value {
        color:#29ba9c !important;
      }
    }
  }

  // 端口选择
  .platformCls {
    .design-platform-pc, .design-platform-wap {
      font-size: 24px !important;
      vertical-align: middle;
    }
    .title {
      vertical-align: middle;
    }
  }

  // 下拉菜单选中项去除字体加粗
  .ant-select-dropdown-menu-item-selected,
  .ant-select-dropdown-menu-item-selected:hover {
    font-weight: 400 !important;
  }
</style>

<style lang="less" scoped>
  .design-layout-top {
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 0px 8px 0px rgba(188, 195, 206, 1);
    z-index: 3;

    .header {
      height: 50px;
      flex-flow: row nowrap;
    }

    .left {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      /*min-width: 450px;*/

      .layout-logo {
        width: 52px;
        border-right: 1px solid #E8EAEC;
        a {
          padding-left: 8px;
        }
        i {
          font-size: 32px;
        }
      }

      .channel,
      .language,
      .client {
        height: 50px;
        line-height: 50px;
        border-right: 1px solid #E8EAEC;
      }

      // 渠道选择
      .channel {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        min-width: 240px;
        .select-channel {
          width: 122px;
        }
      }

      // 语言选择
      .language {
        .select-channel {
          width: 120px;
        }
        // 屏蔽默认语言的 tag
        .default {
          display: none;
        }
      }
      .client .title {
        display: none;
      }
    }

    .middle {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #3F4245;
      font-size: 18px;
      font-weight: 600;
    }

    .right {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      line-height: 50px;
      align-items: center;
      /*min-width: 450px;*/

      .save,
      .release {
        width: 96px;
        text-align: center;
        color: #3F4245;
        cursor: pointer;
      }
      .preview, .save {
        border-left: 1px solid #E8EAEC;
        &:hover {
          background: #F0F2F5;
        }
      }

      .release {
        background-color: #29ba9c;
        color: #ffffff;
        &:hover {
          background: #299b7f;
        }
      }

      .select-channel {
        width: 144px;
        margin-right: 25px;
      }
    }

  }
</style>
