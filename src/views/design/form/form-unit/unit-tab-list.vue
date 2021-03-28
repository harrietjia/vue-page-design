<template>
  <div class="form-item col-1">
    <div class="wrapper">
      <a-button type="primary" style="width: 310px" @click="visible = true">
        点击添加
      </a-button>
      <draggable
          tag="div" class="tab-box"
          :list="tab_list"
          v-bind="dragOptions">

        <div class="tab-item" :class="[tab_active == item.id?'active':'']" v-for="item in tab_list" :key="item.id"
             @click="chooseIt(item)">
          <span>{{item.component}}</span><span class="close">
          <a-icon class="icon-close11" type="close-circle" @click.stop="deleteIt(item.id)"/></span>
        </div>

      </draggable>

      <div style="margin-top: 10px" v-if="current_tab.id">
        <div class="title-box">
          <span style="flex: 0 0 100px">选项模块</span><span style="flex: 1;">{{current_tab.component}}</span>
        </div>
        <div class="title-box">
          <span style="flex: 0 0 100px;align-self: center">选项名称</span>
          <span style="flex: 1;"><a-input placeholder="选项名称" style="width: 200px" v-model.trim="current_tab.name"/></span>
        </div>
        <div style="margin-top: 15px">
          <!-- 数据配置界面 -->
          <template-config-detail
              :layout="current_tab.layout"
              :configs="current_tab.datas"
              :rootConfig="current_tab.datas"
              type="datas"
              key="datas">
          </template-config-detail>
        </div>
      </div>
    </div>

    <a-modal v-model="visible" title="选择页面类型" @ok="handleOk">
      <a-radio-group v-model="choose_type">
        <a-radio :style="radioStyle" :value="'1'">
          文章组件
        </a-radio>
        <a-radio :style="radioStyle" :value="'2'">
          商品组
        </a-radio>
        <a-radio :style="radioStyle" :value="'3'">
          限时抢购
        </a-radio>
        <a-radio :style="radioStyle" :value="'4'">
          拼团
        </a-radio>
        <a-radio :style="radioStyle" :value="'5'">
          附近商品
        </a-radio>
        <a-radio :style="radioStyle" :value="'6'">
          单图
        </a-radio>
        <a-radio :style="radioStyle" :value="'7'">
          图片组合
        </a-radio>
        <a-radio :style="radioStyle" :value="'8'">
          带货直播
        </a-radio>
        <a-radio :style="radioStyle" :value="'9'">
          短视频
        </a-radio>
        <a-radio :style="radioStyle" :value="'10'">
          微社区
        </a-radio>
        <a-radio :style="radioStyle" :value="'11'">
          幸运大转盘
        </a-radio>
        <a-radio :style="radioStyle" :value="'12'">
          门店
        </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
	import draggable from 'vuedraggable';
	// 配置项编译器
	// import templateConfigDetail from '../template-config-detail.vue';

	export default {
		components: {
			draggable,
			// templateConfigDetail
		},

		props: ['value', 'config', 'rootConfig'],

		data() {
			return {
				current_ids: [], //现在已经添加过的id
				visible: false,
				tab_active: '', //当前选择的选项卡
				// tab_list: [],  //选项卡列表
				choose_type: '',
				current_tab: {},
				radioStyle: {
					display: 'block',
					height: '30px',
					lineHeight: '30px',
				},
				dragOptions: {
					animation: 200, // 动画时间
					group: "description",
					disabled: false,
					ghostClass: "sortable-ghost",
					dragClass: "sortable-drag",
					filter: ".ignore-elements"
				},
			}
		},

		computed: {
			tab_list: {
				get() {
					this.current_ids = [];
					if(this.value.length > 0) {
						this.value.map((item)=>{
							this.current_ids.push(item.id);
							item.remote_data = this.handle_data(item.datas)
							if(item.active) {
								this.current_tab = item;
								this.tab_active = item.id;
							}
						});
					}else {
						this.current_tab = {};
						this.tab_active = '';
					}

					return this.value;
				},
				set(newValue) {
					this.$emit('input', newValue);
				}
			}
		},
    mounted() {},
		methods: {
			/**
			 * 处理数据
			 * @param {String} datas
			 * **/
			handle_data(datas) {
				let handleDatas = {};
				if(datas) {
					Object.keys(datas).map(key => {
						handleDatas[key] = datas[key].value;
					});
        }
				return handleDatas;
			},
			chooseIt(item) {
				for (let i = 0; i < this.tab_list.length; i++) {
					if(this.tab_list[i].id == item.id) {
						this.tab_list[i].active = true;
          }else {
						this.tab_list[i].active = false;
          }
				}
				this.current_tab = item;
				this.tab_active = item.id;
			},
			deleteIt(id) {
				for (let i = 0; i < this.tab_list.length; i++) {
					if (this.tab_list[i].id == id) {
						this.tab_list.splice(i, 1);
					}
					if (this.current_tab.id == id) {
						this.current_tab = {};
						if (this.tab_list.length >= 1) {
							this.tab_list[0].active = true;
							this.current_tab = this.tab_list[0];
							this.tab_active = this.tab_list[0].id;
						}
					}
				}
			},
			handleOk(e) {
				let id = this.tab_list.length + 1;
				while (this.current_ids.includes(id)) {
					id += 1;
				}
				this.current_ids.push(id);
				let component = '';
				let datas = {};
				let layout = [];
				let uikey = '';
				switch (this.choose_type) {
					case '1':
						uikey = 'U_article';
						component = '文章组件';
						layout = [
							{
								title: '文章组件设置',
								groups: [
									'list',
									'article_style',
									'article_bg',
								]
							},
						];
						datas = {
							list: {
								title: "获取方式",
								type: "ustyle",
								value: [],
								show: 'list',
								min: 1,
								max: 100,
								choose: 'article',
								options: [
									{label: "自动获取", value: "1"},
									{label: "手动获取", value: "2"},
									{label: "按分类获取", value: "3"},
								]
							},
							get_style: {
								title: "获取方式",
								type: "radio",
								value: "1",
								options: []
							},
							get_number: {
								title: "显示数量",
								type: 'number',
								value: 10,
								min: 1,
								max: 100
							},
							article_style: {
								title: "文章显示方式",
								type: "radio",
								value: "2",
								options: [
									{label: "居左", value: "1"},
									{label: "居右", value: "2"},
								]
							},
							// article_bg: {
							// 	title: "文章背景颜色",
							// 	type: "bg",
							// 	value: {
							// 		isColor: '1',
							// 		color: "#ffffff",
							// 		image: ""
							// 	}
							// },
							article_bg: {
								title: '文章背景颜色',
								type: 'color',
								value: "#ffffff",
							},
						};
						break;
					case '6':
						uikey = 'U_simplegraph';
						component = '单图';
						layout = [
							{
								title: '单图组件设置',
								groups: [
									'padding_top',
									'padding_bottom',
									'padding_left',
									'padding_right',
									'picture_border',
									'list'
								]
							}
						];
						datas = {
							padding_top: { title: '上边距', type: 'number', value: 0, col: 4, },
							padding_bottom: { title: '下边距', type: 'number', value: 0, col: 4, },
							padding_left: { title: '左边距', type: 'number', value: 0, col: 4, },
							padding_right: { title: '右边距', type: 'number', value: 0, col: 4, },
							picture_border: {title: '图片圆角', type: 'bar', value: 0, min: 0, max: 100},
							list: {
								title: "添加单图",
								type: "list",
								notShowText: true,
								// notShow: true,
								hotArea: true,
								choose_title: {
									choose_option: [
										{label: "普通样式", value: "2"},
										{label: "绘制热区", value: "3"},
									]
								},
								value: []
							},
							choose_style: {
								title: '选择方式',
								type: 'radio',
								value: '2',
								options: []
							},
						};
						break;
					case '7':
						uikey = 'U_cube';
						component = '图片组合';
						layout = [
							{
								title: '图片组合配置',
								groups: [
									'picture',
									'preview_color',
									'margin',
								]
							},
						];
						datas = {
							picture: {
								title: '图片设置',
								type: "cube",
								value: {
									density: 4,
									icon: '1',
									cudeSelected: []
								}
							},
							preview_color: {
								title: "背景颜色",
								type: 'color',
								value: '#ffffff',
							},
							margin: {
								title: "图片间隙",
								type: "bar",
								no_show_px: true,
								value: 0,
								min: 0,
								max: 30,
							},
							// 只用于显示
							currentItem: {
								title: '当前选择的方格',
								type: 'chooseItem',
								value: {}
							},
							selectedArr: {
								title: '当前选中的方格',
								type: 'chooseList',
								value: []
							},
							currentItemId: {
								title: '当前选择的方格ID',
								type: 'text',
								value: ""
							},
						};
						break;
					case '8':
						uikey = 'U_livestreaming';
						component = '带货直播';
						layout = [
							{
								title: '带货直播组件设置',
								groups: [
									'get_number',
									'preview_color',
								]
							},
						];
						datas = {
							get_number: {
								title: "直播间显示数量",
								type: 'number',
								value: 10,
								min: 1,
								max: 20
							},
							preview_color: {
								title: "背景颜色",
								type: "color",
								value: "#ffffff"
							},
						};
						break;
					case '9':
						uikey = 'U_shortvideo';
						component = '短视频';
						layout = [
							{
								title: '短视频组件配置',
								groups: [
									'preview_color',
									'list',
								]
							},
						];
						datas = {
							// preview_color: {
							// 	title: "背景",
							// 	type: "bg",
							// 	value: {
							// 		isColor: '1',
							// 		color: "#ffffff",
							// 		image: ""
							// 	}
							// },
							preview_color: {
								title: '背景颜色',
								type: 'color',
								value: "#ffffff",
							},
							list: {
								title: "获取方式",
								type: "ustyle",
								value: [],
								show: 'list',
								min: 1,
								max: 100,
								choose: 'video',
								options: [
									{label: "自动获取", value: "1"},
									{label: "手动获取", value: "2"},
								]
							},
							get_style: {
								title: "获取方式",
								type: "radio",
								value: "1",
								options: []
							},
							get_number: {
								title: "显示数量",
								type: 'number',
								value: 10,
								min: 1,
								max: 100
							},
						};
						break;
					case '10':
						uikey = 'U_community';
						component = '微社区';
						layout = [
							{
								title: '微社区组件配置',
								groups: [
									'get_number',
									'preview_color',
								]
							},
						];
						datas = {
							get_number: {
								title: "帖子显示数量",
								type: 'number',
								value: 10,
								min: 1,
								max: 100
							},
							preview_color: {
								title: '背景颜色',
								type: 'color',
								value: "#ffffff",
							},
							notShowTab: {
								title: '不显示标题栏',
								type: 'switch',
								value: true
              }
							// preview_color: {
							// 	title: "背景颜色",
							// 	type: "bg",
							// 	value: {
							// 		isColor: '1',
							// 		color: "#ffffff",
							// 		image: "",
               //    notShowTab: true
							// 	}
							// }
						};
						break;
					case '11':
						uikey = 'U_lottery';
						component = '幸运大转盘';
						layout = [
							{
								title: '幸运大抽奖组件配置',
								groups: [
									'preview_color',
									'lottery',
									'font_size',
									'font_color',
									'class_font_size',
									'class_font_color',
									'class_bg_color',
									'class_border_radius'
								]
							},
						];
						datas = {
							preview_color: {
								title: "背景",
								type: "bg",
								value: {
									isColor: '1',
									color: "#ED6737",
									image: ""
								}
							},
							lottery: {
								title: '抽奖活动设置',
								type: 'chooseItem',
								choose: 'lottery',
								value: {}
							},
							font_size: {
								title: "字体大小",
								type: "bar",
								value: 14,
								min: 12,
								max: 24,
							},
							font_color: {
								title: '文字颜色',
								type: 'color',
								value: '#ffffff',
							},
							class_font_size: {
								title: "中奖纪录按钮字体大小",
								type: "bar",
								value: 14,
								min: 12,
								max: 24,
							},
							class_font_color: {
								title: '中奖纪录按钮文字颜色',
								type: 'color',
								value: '#ffffff',
							},
							class_bg_color: {
								title: '中奖纪录按钮背景颜色',
								type: 'color',
								value: '#edb81c',
							},
							class_border_radius: {
								title: "中奖纪录按钮边框圆角",
								type: "bar",
								value: 0,
								min: 0,
								max: 20,
							},
						};
						break;
					case '12':
						uikey = 'U_stores';
						component = '门店';
						layout = [
							{
								title: '门店组件设置',
								groups: [
									'get_number',
									'preview_color',
									'font_size',
									'font_color',
									'class_font_size',
									'class_font_color',
									'class_bg_color',
									'class_border_radius',
									'location_font_size',
									'location_font_color',
									'show_goods',
									// 'show_stores',
								]
							},
							{
								title: '营销活动设置',
								groups: [
									'discount_font_size',
									'discount_title_color',
									'discount_font_color',
									'discount_list',
								]
							},
							{
								title: '标签设置',
								groups: [
									'tag_font_size',
									'tag_font_color',
									'tag_bg_color',
									'tag_border_color',
									'tag_border_radius',
								]
							}
						];
						datas = {
							get_number: {
								title: "门店显示数量",
								type: 'number',
								value: 10,
								min: 1,
								max: 100
							},
							// preview_color: {
							// 	title: "门店背景",
							// 	type: "bg",
							// 	value: {
							// 		isColor: '1',
							// 		color: "#ffffff",
							// 		image: ""
							// 	}
							// },
							preview_color: {
								title: '门店背景颜色',
								type: 'color',
								value: "#ffffff",
							},
							font_size: {
								title: "门店名称字体大小",
								type: "bar",
								value: 14,
								min: 12,
								max: 24,
							},
							font_color: {
								title: '门店名称文字颜色',
								type: 'color',
								value: '#666666',
							},
							class_font_size: {
								title: "门店分类字体大小",
								type: "bar",
								value: 14,
								min: 12,
								max: 24,
							},
							class_font_color: {
								title: '门店分类文字颜色',
								type: 'color',
								value: '#ffffff',
							},
							class_bg_color: {
								title: '门店分类背景颜色',
								type: 'color',
								value: '#adadad',
							},
							class_border_radius: {
								title: "分类边框圆角",
								type: "bar",
								value: 5,
								min: 0,
								max: 20,
							},
							location_font_size: {
								title: "距离字体大小",
								type: "bar",
								value: 14,
								min: 12,
								max: 24,
							},
							location_font_color: {
								title: '距离文字颜色',
								type: 'color',
								value: '#666666',
							},
							discount_font_size: {
								title: "营销活动字体大小",
								type: "bar",
								value: 14,
								min: 12,
								max: 24,
							},
							discount_title_color: {
								title: '营销活动标题颜色',
								type: 'color',
								value: '#ff2c29',
							},
							discount_font_color: {
								title: '营销活动文字颜色',
								type: 'color',
								value: '#666666',
							},
							discount_list: {
								title: "营销活动内容显示",
								type: "checkbox",
								value: ['1','2','3','4'],
								options: [
									{label: "销量", value: "1"},
									{label: "赠送", value: "2"},
									{label: "抵扣", value: "3"},
									{label: "优惠券", value: "4"},
								]
							},
							tag_font_size: {
								title: "标签字体大小",
								type: "bar",
								value: 14,
								min: 12,
								max: 24,
							},
							tag_font_color: {
								title: '标签文字颜色',
								type: 'color',
								value: '#666666',
							},
							tag_bg_color: {
								title: "标签背景色",
								type: "color",
								value: "#f3f2f2"
							},
							tag_border_color: {
								title: "标签边框颜色",
								type: "color",
								value: "#ff8400"
							},
							tag_border_radius: {
								title: "标签边框圆角",
								type: "bar",
								value: 5,
								min: 0,
								max: 20,
							},
							show_goods: {
								title: "推荐商品是否显示",
								type: "switch",
								value: true,
							},
							// show_stores: {
							// 	title: "未定位是否显示门店是否显示",
							// 	type: "switch",
							// 	value: true,
							// },
						};
						break;
					default:
						component = '无';
						uikey = 'U_article';
						return;
				}
				let item = {id: id, type_id: this.choose_type, uikey: uikey, component: component, datas: datas, layout: layout, name: '', active: true};
				for (let i = 0; i < this.tab_list.length; i++) {
          this.tab_list[i].active = false;
				}
				this.current_tab = item;
				this.tab_active = item.id;
				this.tab_list.push(item);

				this.visible = false;
			},
		}
	}
</script>
<style lang="less" scoped>
  .tab-box {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .tab-item {
    cursor: move;
    border: 1px solid #333333;
    color: #333333;
    padding: 5px 10px;
    margin: 5px;
    .close {
      cursor: pointer;
      padding: 2px 5px;
      margin-left: 5px;
    }
    &.active {
      border: 0;
      background-color: rgba(41, 186, 156, 0.15);
      color: #29ba9c;
    }
  }

  .title-box {
    display: flex;
    margin-bottom: 10px;
  }
</style>
