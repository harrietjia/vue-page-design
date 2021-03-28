<template>
  <div class="form-item col-1">
    <div style="display: flex">
      <span>商品数据</span>
      <a-tooltip v-if="config.tips">
        <template slot="title">
          Tips: {{config.tips}}
        </template>
        <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
      </a-tooltip>
    </div>
    <!--<strong style="color: #29ba9c" v-if="value.length > 0">（已选{{value.length}}商品）</strong>-->
    <div>
      <template v-if="is_from === 'store'">
        <a-radio-group v-model="rootConfig.goods_type.value" @change="changeType">
          <a-radio
              :value="x.value"
              v-for="(x, index) in storeChooseType"
              :key="index">
            {{ x.label }}
          </a-radio>
        </a-radio-group>
      </template>
      <template v-if="is_from !== 'store'">
        <a-radio-group v-model="rootConfig.goods_type.value" @change="changeType">
          <a-radio
              :value="x.value"
              v-for="(x, index) in config.chooseType"
              :key="index">
            {{ x.label }}
          </a-radio>
        </a-radio-group>
      </template>
    </div>
    <div v-for="(type, index) in config.chooseType" :key="index">

      <div style="margin-top: 15px"
           :class="{'sortable-body': true, 'in-drag': inDrag,'out-drag': !inDrag}" v-if="type.value === rootConfig.goods_type.value">
        <!-- 拖拽容器 -->
        <draggable
            tag="ul"
            :list="config.chooseList[type.value]"
            v-bind="dragOptions"
            @start="inDrag = true">

          <!-- 动画 -->
          <!--<transition-group type="transition" :name="!inDrag ? 'flip-list' : null">-->

            <!-- item -->
            <li
                v-for="(item, index) in config.chooseList[type.value]"
                :key="item.id"
                :class="{'in-hover': inHover == item.id}"
                @mousemove="inHover = item.id"
                @mouseleave="inHover = ''">

              <div class="goods-box" v-if="type.value === 'list' || type.value === 'group' || type.value === 'rush'">
                <div class="img-box"><img :src="item.thumb || (item.goods && item.goods.thumb)" alt=""> </div>
                <div class="right">
                  <span>{{item.title}}</span>
                  <span style="color: #ff2c29">￥{{item.price || item.group_price}}</span>
                </div>
              </div>

              <div class="goods-box" v-if="type.value === 'tag' || type.value === 'category'">
                  <span>{{type.value === 'tag'?'标签名称':'分类名称'}}： {{item.name}}</span>
              </div>

              <div class="goods-box" v-if="type.value === 'supplier'">
                <span>供应商： {{item.username}}（{{item.mobile}}）</span>
              </div>

              <div class="goods-box" v-if="type.value === 'store'">
                <span>门店： {{item.store_name}}</span>
              </div>

              <div class="goods-box" v-if="type.value === 'hotel'">
                <span>酒店： {{item.hotel_name}}</span>
              </div>
             <div class="goods-box" v-if="type.value === 'starGroup'">
                <div class="img-box"><img :src="item.thumb || (item.goods && item.goods.thumb)" alt=""> </div>
                <div class="right">
                    <div style="margin-bottom:5px;" class="activity-name">{{item.activity_name}}</div>
                    <!--<a-input style="width: 85%;margin-bottom: 20px;margin-right: 10px" v-model="item.tab_name"   placeholder="请输入自定义名称">-->
                    <!--</a-input>-->
                </div>
              </div>
              <div class="id-name" v-if="type.value != 'starGroup'">
                ID： {{item.id}}
              </div>
              <div class="id-name" v-if="type.value === 'starGroup'">
                ID： {{item.activity_id}}
              </div>
              <div class="buttons">

                <span class="ignore-elements" @click.stop="handle_component_delete(item.id)">
                   <i class="iconfont icon-ht_operation_delete"/>
                 </span>
                <span class="ignore-elements" @click.stop="handle_component_top(item.id)">
                   <i class="iconfont icon-top_place" style="font-size: 20px"/>
                 </span>
              </div>

            </li>
            <li v-if="config.chooseList[type.value].length<=0" :key="0">
              <a-empty />
            </li>
          <!--</transition-group>-->

        </draggable>

        <!-- 删除所有组件 -->
        <div style="text-align: left;margin-top: 10px">
          <a-button type="primary" style="width: 310px" @click="handle_open_dialog">
            点击添加
          </a-button>
          <!--<span class="button-clear-all" @click="toAdd">添加组件</span>-->
          <!--<span class="button-clear-all" @click="">清除所有组件</span>-->
        </div>
      </div>
    </div>
    <!--{{value}}-->
    <!-- 弹窗 -->
    <goods-manager
        ref="goodsManager" :goods_type="rootConfig.goods_type.value" :config="config" :is_from="is_from"
        @onComfirm="update_goods_list"/>

  </div>
</template>

<script>
	import draggable from 'vuedraggable';
	// 商品数据弹窗
	import goodsManager from '@/system-components/dialog-goods-manager/index.vue';


	// Main code
	export default {
		props: ['value', 'config', 'rootConfig','is_from'],

		components: {
			draggable,
			goodsManager
		},

		data() {
			return {
				// 门店装修只有单个和分类
				storeChooseType: [
					{label: '单个选择', value: 'list'},
					{label: '选择分类', value: 'category'},
        ],
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
			}
		},

		computed: {
			current_value() {
				return this.value;
			},
		},

    mounted() {
	    this.config.chooseList[this.rootConfig.goods_type.value] = this.current_value;
    },
    updated() {
	    this.config.chooseList[this.rootConfig.goods_type.value] = this.current_value;
    },

		methods: {
			/**
			 * 打开商品数据配置的弹窗
			 */
			handle_open_dialog() {
				if(this.config.chooseList[this.rootConfig.goods_type.value].length > 100) {
					this.$message.error('最多只能添加100个');
					return
        }
				this.$refs.goodsManager.show(this.config.chooseList[this.rootConfig.goods_type.value]);
			},

			/**
			 * 更新商品列表
			 */
			update_goods_list(list) {
				this.config.chooseList[this.rootConfig.goods_type.value] = [...list];
				let current_value = this.config.chooseList[this.rootConfig.goods_type.value];
				this.$emit('input', current_value);
			},
			/**
			 * 结束拖拽
			 */
			handleDragEnd (c) {
				this.inDrag = false;
			},
			/**
			 * 删除组件
			 * @param {Number} id 数组索引
			 */
			handle_component_delete (id) {
				for(let i=0;i< this.config.chooseList[this.rootConfig.goods_type.value].length;i++) {
					if(this.config.chooseList[this.rootConfig.goods_type.value][i].id == id) {
						this.config.chooseList[this.rootConfig.goods_type.value].splice(i, 1);
					}
				}
        let current_value = this.config.chooseList[this.rootConfig.goods_type.value];
				this.$emit('input',  current_value);
			},
			handle_component_top(id) {
				// 置顶
				for(let i=0;i< this.config.chooseList[this.rootConfig.goods_type.value].length;i++) {
					if(this.config.chooseList[this.rootConfig.goods_type.value][i].id == id) {
						let last_one = this.config.chooseList[this.rootConfig.goods_type.value].splice(i, 1);
						this.config.chooseList[this.rootConfig.goods_type.value].unshift(last_one[0]);
					}
				}
				let current_value = this.config.chooseList[this.rootConfig.goods_type.value];
				this.$emit('input',  current_value);
      },
			changeType() {
				let current_value = this.config.chooseList[this.rootConfig.goods_type.value];
				this.$emit('input',  current_value);
      },
		}
	}
</script>

<style lang="less" scoped>
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
          margin: 0;
        }

        .id-name {
          position: absolute;
          left: 10px;
          top: 0px;
        }
        .activity-name {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
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

  .goods-box {
    background-color: #fbfbfb;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    display: flex;
    .img-box {
      flex: 0 0 80px;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-self: center;
      justify-self: center;
    }
  }
</style>
