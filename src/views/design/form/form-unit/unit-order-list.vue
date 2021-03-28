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
          <span style="flex: 0 0 100px">订单模块</span><span style="flex: 1;">{{current_tab.component}}</span>
        </div>
        <div class="title-box">
          <span style="flex: 0 0 100px;align-self: center">订单名称</span>
          <span style="flex: 1;"><a-input placeholder="订单名称" style="width: 200px" v-model.trim="current_tab.name"/></span>
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

    <a-modal v-model="visible" title="选择添加订单类型" @ok="handleOk">
      <a-radio-group v-model="choose_type">
        <a-radio :style="radioStyle" :value="'1'">
          商品订单
        </a-radio>
        <a-radio :style="radioStyle" :value="'2'" v-if="member_data.is_open_fight_groups == 1">
          拼团订单
        </a-radio>
        <a-radio :style="radioStyle" :value="'3'" v-if="member_data.is_open_hotel == 1">
          酒店订单
        </a-radio>
        <a-radio :style="radioStyle" :value="'4'" v-if="member_data.is_open_lease_toy == 1">
          租赁订单
        </a-radio>
        <a-radio :style="radioStyle" :value="'5'" v-if="member_data.is_open_snatch_regiment == 1">
          抢团订单
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
					if(this.value.length > 0) {
						this.value.map((item)=>{
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
			},
			member_data () {
				if(this.$store.state.design.member_data.is_open) {
					return this.$store.state.design.member_data.is_open;
        }else {
					return {}
        }
			}
		},
    mounted() {
	    for (let i = 0; i < this.tab_list.length; i++) {
		    if(this.tab_list[i].active) {
			    this.current_tab = this.tab_list[i];
			    this.tab_active = this.tab_list[i].id;
		    }
	    }
    },
		methods: {
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
				this.tab_list.map((item)=>{
					this.current_ids.push(item.id);
				});
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
						uikey = 'U_memberorder';
						component = '商品订单';
						layout = [
							{
								title: '商品订单设置',
								groups: [
									'list',
								]
							},
						];
						datas = {
							list: {
								title: '',
								type: "list",
								notShow: true,
                notLink: true,
								notMore: true,
								choose_title: {
									choose_style: '2',
									choose_option: [
										{label: "普通样式", value: "1"},
										{label: "图标+文字", value: "2"},
									]
								},
								value: [
									{
										id: 1,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/myOrder_a.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/myOrder_a.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待付款',
									},
									{
										id: 2,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/myOrder_b.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/myOrder_b.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待发货',
									},
									{
										id: 3,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/myOrder_c.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/myOrder_c.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待收货',
									},
									{
										id: 4,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/myOrder_d.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/myOrder_d.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '售后列表',
									},
									{
										id: 0,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/all_order.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/all_order.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '全部订单',
									}
                ]
							},
							choose_style: {
								title: '选择方式',
								type: 'radio',
								value: '2',
								options: []
							}
            };
						break;
					case '2':
						uikey = 'U_memberordergroup';
						component = '拼团订单';
						layout = [
							{
								title: '拼团订单设置',
								groups: [
									'list',
								]
							},
						];
						datas = {
							list: {
								title: '',
								type: "list",
								notShow: true,
								notLink: true,
								notMore: true,
								choose_title: {
									choose_style: '2',
									choose_option: [
										{label: "普通样式", value: "1"},
										{label: "图标+文字", value: "2"},
									]
								},
								value: [
									{
										id: 1,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_a.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_a.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待付款',
									},
									{
										id: 2,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_b.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_b.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待发货',
									},
									{
										id: 3,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_c.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_c.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待收货',
									},
									{
										id: 4,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_d.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_d.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '售后列表',
									},
									{
										id: 0,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/all_order.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/all_order.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '全部订单',
									}
								]
							},
							choose_style: {
								title: '选择方式',
								type: 'radio',
								value: '2',
								options: []
							}
						};
						break;
					case '3':
						uikey = 'U_memberorderhotel';
						component = '酒店订单';
						layout = [
							{
								title: '酒店订单设置',
								groups: [
									'list',
								]
							},
						];
						datas = {
							list: {
								title: '',
								type: "list",
								notShow: true,
								notLink: true,
								notMore: true,
								choose_title: {
									choose_style: '2',
									choose_option: [
										{label: "普通样式", value: "1"},
										{label: "图标+文字", value: "2"},
									]
								},
								value: [
									{
										id: 1,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/hotel_a.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/hotel_a.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待付款',
									},
									{
										id: 2,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/hotel_b.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/hotel_b.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待确认',
									},
									{
										id: 3,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/hotel_c.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/hotel_c.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待入住',
									},
									{
										id: 5,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/hotel_d.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/hotel_d.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待退房',
									},
									{
										id: 0,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/hotel_all.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/hotel_all.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '全部订单',
									}
								]
							},
							choose_style: {
								title: '选择方式',
								type: 'radio',
								value: '2',
								options: []
							}
						};
						break;
					case '4':
						uikey = 'U_memberorderrelease';
						component = '租赁订单';
						layout = [
							{
								title: '租赁订单设置',
								groups: [
									'list',
								]
							},
						];
						datas = {
							list: {
								title: '',
								type: "list",
								notShow: true,
								notLink: true,
                notMore: true,
								choose_title: {
									choose_style: '2',
									choose_option: [
										{label: "普通样式", value: "1"},
										{label: "图标+文字", value: "2"},
									]
								},
								value: [
									{
										id: 1,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/lease_a.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/lease_a.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待支付',
									},
									{
										id: 2,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/lease_b.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/lease_b.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待发货',
									},
									{
										id: 3,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/lease_c.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/lease_c.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待收货',
									},
									{
										id: 4,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/lease_d.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/lease_d.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待归还',
									},
									{
										id: 0,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/all_order.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/all_order.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '全部订单',
									}
								]
							},
							choose_style: {
								title: '选择方式',
								type: 'radio',
								value: '2',
								options: []
							}
						};
						break;
					case '5':
						uikey = 'U_memberordergrab';
						component = '抢团订单';
						layout = [
							{
								title: '抢团订单设置',
								groups: [
									'list',
								]
							},
						];
						datas = {
							list: {
								title: '',
								type: "list",
								notShow: true,
								notLink: true,
								notMore: true,
								choose_title: {
									choose_style: '2',
									choose_option: [
										{label: "普通样式", value: "1"},
										{label: "图标+文字", value: "2"},
									]
								},
								value: [
									{
										id: 1,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_a.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_a.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待付款',
									},
									{
										id: 2,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_b.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_b.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待发货',
									},
									{
										id: 3,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_c.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_c.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '待收货',
									},
									{
										id: 4,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/group_d.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/group_d.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '售后列表',
									},
									{
										id: 0,
										image: this.fun.IsOldOne() ? this.fun.getSiteRoot()+'/addons/yun_shop/plugins/decorate/assets/all_order.png' :this.fun.getSiteRoot()+'/plugins/decorate/assets/all_order.png',
										is_minApp: ' ',
										h5_link: '',
										gh_id: '',
										minApp_link: '',
										text: '全部订单',
									}
								]
							},
							choose_style: {
								title: '选择方式',
								type: 'radio',
								value: '2',
								options: []
							}
						};
						break;
					default:
						component = '无';
						uikey = 'U_memberorder';
						return;
				}
				let flag = false; // 判断是否有重复
				let item = {id: id, type_id: this.choose_type, uikey: uikey, component: component, datas: datas, layout: layout, name: '', active: true};
				for(let i = 0; i < this.tab_list.length; i++) {
					if(this.tab_list[i].uikey === uikey) {
						flag = true;
					}
				}

				if(!flag) {
					for (let i = 0; i < this.tab_list.length; i++) {
						this.tab_list[i].active = false;
					}
					this.current_tab = item;
					this.tab_active = item.id;
					this.tab_list.push(item);
        }else {
					this.$message.error('已经有重复的订单！');
        }

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
