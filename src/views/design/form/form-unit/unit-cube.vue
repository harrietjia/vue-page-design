<template>
  <div class="form-item col-1">

    <div class="icon-box">
      <span style="display: inline-block;margin: 10px 0">魔方布局</span>
      <div class="icon-checkbox">
        <div class="icon-item" :class="[current_value.icon == '1'?'choose':'']" @click="handleInputChange('1')">
          <i class="iconfont icon-ht_goods_twopic"></i>
        </div>
        <div class="icon-item" :class="[current_value.icon == '2' ?'choose':'']" @click="handleInputChange('2')">
          <i class="iconfont icon-ht_picgroup_four_1"></i>
        </div>
        <div class="icon-item" :class="[current_value.icon == '3' ?'choose':'']" @click="handleInputChange('3')">
          <i class="iconfont icon-ht_goods_threepic"></i>
        </div>
        <div class="icon-item" :class="[current_value.icon == '4' ?'choose':'']" @click="handleInputChange('4')">
          <i class="iconfont icon-ht_picgroup_three_1"></i>
        </div>
        <div class="icon-item" :class="[current_value.icon == '5' ?'choose':'']" @click="handleInputChange('5')">
          <i class="iconfont icon-ht_picgroup_four"></i>
        </div>
        <div class="icon-item" :class="[current_value.icon == '6' ?'choose':'']" @click="handleInputChange('6')">
          <i class="iconfont icon-ht_picgroup_identify"></i>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 10px">tips: {{current_value.icon == '6'?'移动鼠标选定布局区域大小':'选定布局区域，在下方添加图片，建议添加比例一致的图片'}}</div>

    <div class="bg-head" v-if="current_value.icon == 6">
      <span class="config-title" style="margin: 0">魔方密度:</span>
      <div>
        <a-select v-model="current_value.density" style="width: 220px" @change="handleChange">
          <a-select-option :value="4">
            4 x 4
          </a-select-option>
          <a-select-option :value="5">
            5 x 5
          </a-select-option>
          <a-select-option :value="6">
            6 x 6
          </a-select-option>
          <a-select-option :value="7">
            7 x 7
          </a-select-option>
        </a-select>
      </div>
    </div>

    <div class="decorate-cube" @mouseleave="clearCube">
      <ul class="cube-row" v-for="n in densityNum"  v-if="current_value.icon == 6">
        <li :class="['cube-item',{'item-selecting': isSelecting(i,n),'item-selected':isSelected(i,n) }]"
            v-for="i in densityNum"
            :style="{'width':cubeItemWidth+'px','height':cubeItemHeight+'px'}"
            :data-x="i" :data-y="n"  :data-cube="i+'-'+n" @mousemove="chooseCube($event,i,n)" @mouseleave="clearChooseCube($event,i,n)"
            @click.stop="cubeItemClick($event)">
          <i class="iconfont icon-jiahao" :style="{'line-height':cubeItemHeight+'px'}"></i>
        </li>
      </ul>

      <div class="cube-selected"
           v-for="(item, index) in current_value.cudeSelected"
           :style="{'width':getCubeSelectedWidth(item)+'px','height':getCubeSelectedHeight(item)+'px','top':getCubeSelectedTop(item)+'px','left':getCubeSelectedLeft(item)+'px',backgroundImage: `url(${item.value.image ? item.value.image : ''})`, backgroundSize: '100% 100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}" @click="cubeSelectItemClick(item)" @mousemove="showIcon(item)"
           @mouseleave="inHover = ''" :class="[{'cube-selected-click': isSelectedItem(item.id)}]"
      >
        <div class="cube-selected-text" >
          <!--<span v-if="current_value.icon == 1 && !item.value.image">宽度{{ Math.round(750/current_value.density*(parseInt(item.end.y) - parseInt(item.start.y) + 1)) }}像素</span>-->
          <template  v-if="!item.value.image">
            {{ Math.round(750/current_value.density*(parseInt(item.end.y) - parseInt(item.start.y) + 1)) }}
            x
            {{ Math.round(750/current_value.density*(parseInt(item.end.x) - parseInt(item.start.x) + 1)) }}
            <span v-if="current_value.density>5">{{((parseInt(item.end.y) - parseInt(item.start.y) + 1) >1) || ((parseInt(item.end.x) - parseInt(item.start.x) + 1) >1) ? '像素或同等比例' : ''}}</span>
            <span v-if="current_value.density<=5">像素或同等比例</span>
          </template>
        </div>
        <a-icon v-show="inHover == item.id && current_value.icon == '6'" class="icon-close11" type="close-circle"  @click.stop="handle_delete(item)" title="点击清除"/>
      </div>

    </div>

    <div>
      <div class="item-box" :style="{marginTop: current_value.icon == 1?'175px':'335px'}" :class="{'sortable-body': true}" v-if="currentItem.id">

          <ul>
            <!-- item -->
            <li>

              <div class="top">
                <div class="left">
                  <div class="show-img" v-if="currentItem.value.image" @click="openUpload(currentItem.id)">
                    <img :src="currentItem.value.image">
                    <a-icon class="icon-close11" type="close-circle"  @click.stop="deleteImg(currentItem)" title="点击清除图片"/>
                  </div>
                  <div class="choose-img" v-else @click="openUpload(currentItem.id)">
                    <i class="iconfont icon-jiahao"></i>
                    <span>点击上传</span>
                  </div>
                </div>

                <div class="right" :style="{marginLeft: '10px'}">
                  <div class="slide-bar-wrapper" style="margin-top: 10px">
                    <a-radio-group :default-value="1" v-model="currentItem.value.is_minApp">
                      <a-radio :value="'1'">
                        内部链接
                      </a-radio>
                      <a-radio :value="'2'">
                        小程序链接
                      </a-radio>
                    </a-radio-group>
                  </div>
                </div>
              </div>

              <div class="bottom" style="display: flex;margin-top: 10px" v-if="currentItem.value.is_minApp == 1">
                <div style="width: 215px">
                  <a-input
                      v-model.trim="currentItem.value.h5_link"
                      placeholder="请输入链接">
                  </a-input>
                </div>
                <div style="margin-left: 10px">
                  <a-button :style="{width: '60px'}" type="primary" @click.stop="openLink(currentItem.id)">选择</a-button>
                </div>
              </div>

              <div class="bottom" v-if="currentItem.value.is_minApp == 2">
                <template v-if="fun.getKey('page_sort') == 2">
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="currentItem.value.gh_id"
                        placeholder="请填写跳转小程序APPID">
                    </a-input>
                  </div>
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="currentItem.value.minApp_link"
                        placeholder="请填写跳转的小程序内页面路径及参数">
                    </a-input>
                  </div>
                </template>
                <template v-else>
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="currentItem.value.gh_id"
                        placeholder="请填写跳转小程序以gh_开头的原始id">
                    </a-input>
                  </div>
                  <div style="width: 285px;margin-top: 10px">
                    <a-input
                        v-model.trim="currentItem.value.minApp_link"
                        placeholder="请填写跳转的小程序内页面路径及参数">
                    </a-input>
                  </div>
                  <span style="color: #999999;margin: 5px">Tips: H5跳转小程序页面路径需要添加.html后缀，如pages/home/home.html</span>
                </template>
              </div>

              <link-modal ref="linkModal"
                          :value.sync="currentItem.value.h5_link"
                          :config="config"
                          :rootConfig="rootConfig"
                          @confirm="handleOk(currentItem,$event)"></link-modal>

              <image-upload ref="imageUpload"
                            :value.sync="currentItem.value.image"
                            :config="config"
                            :rootConfig="rootConfig"
                            @confirm="sureImg(currentItem,$event)">
              </image-upload>
            </li>
          </ul>

      </div>
    </div>

  </div>
</template>

<script>
	import draggable from 'vuedraggable';
	import imageUpload from '../../../../system-components/image-upload/index.vue';
	import linkModal from '../../../../system-components/link-modal/index.vue';

	export default {
		props: ['value', 'config', 'rootConfig'],

		components: {
			draggable,
			imageUpload,
			linkModal
		},

		data () {
			return {
				// density: 4, //密度
				cubeWidth: 310, //魔方宽度
				cubeHeight: 310, //魔方高度
				cudeSelecting:{
					start:null,
					end:null,
					data:[]
				},
				// cudeSelected:[], //已经生成的单元  换成current_value.cudeSelected
				selectedArr: [], //已经选中的方格x-y
				currentItemId: '', //当前选中的方格id
				currentItem: {}, //当前选中的方格

				// icon: '1',
				current_ids: [],

				// 拖拽组件参数
				inDrag: false, // 是否正在选择
				inHover: 0, // 鼠标 hover 的 <li> 的 component_id
			};
		},

		computed:{
			current_value: {
				get () {
					return this.value;
				},
				set (newValue) {
					this.$emit('input', newValue);
				}
			},
			//密度值
			densityNum () {
				return parseInt(this.current_value.density);
			},
			//单元魔方高度
			cubeItemHeight () {
				return this.cubeHeight/parseInt(this.current_value.density);
			},
			//单元魔方宽度
			cubeItemWidth () {
				return this.cubeWidth/parseInt(this.current_value.density);
			},
		},

		watch: {
			current_value: {
				deep: true,//深度监听
				handler: function () {
					this.clearCube();
					if(this.current_value.icon == '1' && this.current_value.cudeSelected.length === 0) {
						this.handleInputChange('1');
					}else {
						this.selectedArr = this.rootConfig.selectedArr.value;
            this.currentItemId = this.rootConfig.currentItemId.value;
            this.currentItem = this.rootConfig.currentItem.value;
					}
					this.$emit('input', this.current_value);
				}
			}
		},

    mounted() {
	    this.clearCube();
	    if(this.current_value.icon == '1' && this.current_value.cudeSelected.length === 0) {
		    this.handleInputChange('1');
	    }else {
		    this.selectedArr = this.rootConfig.selectedArr.value;
		    this.currentItemId = this.rootConfig.currentItemId.value.value;
		    this.currentItem = this.rootConfig.currentItem.value;
	    }
    },

		methods: {
			// 预先实现几个组合
			handleInputChange (num) {
				this.current_value.icon = num;
				let image0 = '';
				let image1 = '';
				let image2 = '';
				let image3 = '';

        for(let i = 0;i<this.current_value.cudeSelected.length;i++) {
        	if(i===0) {
		        image0 = this.current_value.cudeSelected[i].value.image
          }
	        if(i===1) {
		        image1 = this.current_value.cudeSelected[i].value.image
	        }
	        if(i===2) {
		        image2 = this.current_value.cudeSelected[i].value.image
	        }
	        if(i===3) {
		        image3 = this.current_value.cudeSelected[i].value.image
	        }

        }
				switch(num) {
					case '1':
						this.current_value.density = 4;
						this.current_value.cudeSelected = [{"id":1,"value":{"image":image0?image0:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":1},"end":{"x":2,"y":2},"data":[{"x":1,"y":1,"cube":"1-1"},{"x":1,"y":2,"cube":"1-2"},{"x":2,"y":1,"cube":"2-1"},{"x":2,"y":2,"cube":"2-2"}]},{"id":3,"value":{"image":image1?image1:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":3},"end":{"x":2,"y":4},"data":[{"x":1,"y":3,"cube":"1-3"},{"x":1,"y":4,"cube":"1-4"},{"x":2,"y":3,"cube":"2-3"},{"x":2,"y":4,"cube":"2-4"}]}];
						this.rootConfig.currentItemId.value = this.currentItemId = this.current_value.cudeSelected[0].id;
						this.rootConfig.currentItem.value = this.currentItem = this.current_value.cudeSelected[0];
						break;
					case '2':
						this.current_value.density = 4;
						this.current_value.cudeSelected = [{"id":1,"value":{"image":image0?image0:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":1},"end":{"x":4,"y":2},"data":[{"x":1,"y":1,"cube":"1-1"},{"x":1,"y":2,"cube":"1-2"},{"x":2,"y":1,"cube":"2-1"},{"x":2,"y":2,"cube":"2-2"},{"x":3,"y":1,"cube":"3-1"},{"x":3,"y":2,"cube":"3-2"},{"x":4,"y":1,"cube":"4-1"},{"x":4,"y":2,"cube":"4-2"}]},{"id":2,"value":{"image":image1?image1:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":3},"end":{"x":2,"y":4},"data":[{"x":1,"y":3,"cube":"1-3"},{"x":1,"y":4,"cube":"1-4"},{"x":2,"y":3,"cube":"2-3"},{"x":2,"y":4,"cube":"2-4"}]},{"id":3,"value":{"image":image2?image2:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":3,"y":3},"end":{"x":4,"y":3},"data":[{"x":3,"y":3,"cube":"3-3"},{"x":4,"y":3,"cube":"4-3"}]},{"id":4,"value":{"image":image3?image3:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":3,"y":4},"end":{"x":4,"y":4},"data":[{"x":3,"y":4,"cube":"3-4"},{"x":4,"y":4,"cube":"4-4"}]}];
						this.rootConfig.currentItemId.value = this.currentItemId = this.current_value.cudeSelected[0].id;
						this.rootConfig.currentItem.value = this.currentItem = this.current_value.cudeSelected[0];
						break;
					case '3':
						this.current_value.density = 4;
						this.current_value.cudeSelected = [{"id":1,"value":{"image":image0?image0:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":1},"end":{"x":2,"y":4},"data":[{"x":1,"y":1,"cube":"1-1"},{"x":1,"y":2,"cube":"1-2"},{"x":1,"y":3,"cube":"1-3"},{"x":1,"y":4,"cube":"1-4"},{"x":2,"y":1,"cube":"2-1"},{"x":2,"y":2,"cube":"2-2"},{"x":2,"y":3,"cube":"2-3"},{"x":2,"y":4,"cube":"2-4"}]},{"id":2,"value":{"image":image1?image1:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":3,"y":1},"end":{"x":4,"y":2},"data":[{"x":3,"y":1,"cube":"3-1"},{"x":3,"y":2,"cube":"3-2"},{"x":4,"y":1,"cube":"4-1"},{"x":4,"y":2,"cube":"4-2"}]},{"id":3,"value":{"image":image2?image2:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":3,"y":3},"end":{"x":4,"y":4},"data":[{"x":3,"y":3,"cube":"3-3"},{"x":3,"y":4,"cube":"3-4"},{"x":4,"y":3,"cube":"4-3"},{"x":4,"y":4,"cube":"4-4"}]}];
						this.rootConfig.currentItemId.value = this.currentItemId = this.current_value.cudeSelected[0].id;
						this.rootConfig.currentItem.value = this.currentItem = this.current_value.cudeSelected[0];
						break;
					case '4':
						this.current_value.density = 4;
						this.current_value.cudeSelected = [{"id":3,"value":{"image":image0?image0:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":1},"end":{"x":4,"y":2},"data":[{"x":1,"y":1,"cube":"1-1"},{"x":1,"y":2,"cube":"1-2"},{"x":2,"y":1,"cube":"2-1"},{"x":2,"y":2,"cube":"2-2"},{"x":3,"y":1,"cube":"3-1"},{"x":3,"y":2,"cube":"3-2"},{"x":4,"y":1,"cube":"4-1"},{"x":4,"y":2,"cube":"4-2"}]},{"id":4,"value":{"image":image1?image1:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":3},"end":{"x":2,"y":4},"data":[{"x":1,"y":3,"cube":"1-3"},{"x":1,"y":4,"cube":"1-4"},{"x":2,"y":3,"cube":"2-3"},{"x":2,"y":4,"cube":"2-4"}]},{"id":5,"value":{"image":image2?image2:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":3,"y":3},"end":{"x":4,"y":4},"data":[{"x":3,"y":3,"cube":"3-3"},{"x":3,"y":4,"cube":"3-4"},{"x":4,"y":3,"cube":"4-3"},{"x":4,"y":4,"cube":"4-4"}]}];
						this.rootConfig.currentItemId.value = this.currentItemId = this.current_value.cudeSelected[0].id;
						this.rootConfig.currentItem.value = this.currentItem = this.current_value.cudeSelected[0];
						break;
					case '5':
						this.current_value.density = 4;
						this.current_value.cudeSelected = [{"id":1,"value":{"image":image0?image0:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":1},"end":{"x":2,"y":2},"data":[{"x":1,"y":1,"cube":"1-1"},{"x":1,"y":2,"cube":"1-2"},{"x":2,"y":1,"cube":"2-1"},{"x":2,"y":2,"cube":"2-2"}]},{"id":2,"value":{"image":image1?image1:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":1,"y":3},"end":{"x":2,"y":4},"data":[{"x":1,"y":3,"cube":"1-3"},{"x":1,"y":4,"cube":"1-4"},{"x":2,"y":3,"cube":"2-3"},{"x":2,"y":4,"cube":"2-4"}]},{"id":3,"value":{"image":image2?image2:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":3,"y":1},"end":{"x":4,"y":2},"data":[{"x":3,"y":1,"cube":"3-1"},{"x":3,"y":2,"cube":"3-2"},{"x":4,"y":1,"cube":"4-1"},{"x":4,"y":2,"cube":"4-2"}]},{"id":4,"value":{"image":image3?image3:'',"is_minApp":"1","h5_link":"","gh_id":"","minApp_link":""},"start":{"x":3,"y":3},"end":{"x":4,"y":4},"data":[{"x":3,"y":3,"cube":"3-3"},{"x":3,"y":4,"cube":"3-4"},{"x":4,"y":3,"cube":"4-3"},{"x":4,"y":4,"cube":"4-4"}]}];
						this.rootConfig.currentItemId.value = this.currentItemId = this.current_value.cudeSelected[0].id;
						this.rootConfig.currentItem.value = this.currentItem = this.current_value.cudeSelected[0];
						break;
					default:
						this.handleChange(4)

				}
			},
			handleChange(value) {
				this.current_value.density = parseInt(value);
				this.current_value.cudeSelected = [];
				this.rootConfig.selectedArr.value = this.selectedArr = [];
				this.rootConfig.currentItemId.value = this.currentItemId = '';
				this.rootConfig.currentItem.value = this.currentItem = {};
			},
			/**
			 * 删除
			 * @param {Number} item
			 */
			handle_delete (item) {
				if(this.currentItemId == item.id) {
					this.rootConfig.currentItemId.value = this.currentItemId = '';
					this.rootConfig.currentItem.value = this.currentItem = {};
        }

				// 清除选中的已经生成的单元
				for(let i=0;i<this.current_value.cudeSelected.length;i++) {
					if(this.current_value.cudeSelected[i].id == item.id) {
						this.current_value.cudeSelected.splice(i, 1);
						if(this.current_value.cudeSelected.length>0){
							this.rootConfig.currentItemId.value = this.currentItemId = this.current_value.cudeSelected[0].id;
							this.rootConfig.currentItem.value = this.currentItem = this.current_value.cudeSelected[0];
            }
					}
				}

				if(this.selectedArr) {
					// 清除之前选中cube
					for(let j=0;j<item.data.length;j++) {
						this.rootConfig.selectedArr.value = this.selectedArr = this.selectedArr.filter(seleted => seleted != item.data[j].cube);
					}
        }

			},
			openLink(id) {
				this.$refs['linkModal'].show();
			},
			handleOk(item,url) {
				item.value.h5_link = url;
			},

			openUpload(id) {
				this.$refs['imageUpload'].show();
			},
			sureImg(item,imgUrl) {
				item.value.image = imgUrl;
			},
			deleteImg(item) {
				item.value.image = "";
			},

			//魔方点击事件
			cubeItemClick (event) {
				let that = this;

				var el = event.currentTarget;
				var x = el.getAttribute('data-x');
				var y = el.getAttribute('data-y');
				// var domclass = el.getAttribute('class');
				// console.log('['+x+','+y+','+domclass+']执行了点击');

				var cudeSelectingStart = this.cudeSelecting.start;
				var coord = {x:x,y:y};

				if(null == cudeSelectingStart){
					this.cudeSelecting.start = coord;
					this.cudeSelecting.data.push(coord);
					// 开始选择
					this.inDrag = true;
				}else{

					this.cudeSelecting.end = coord;
					this.cudeSelecting.data.push(coord);
					// 结束选择
					this.inDrag = false;

					//获取开始和结束之间所有魔方单元
					var start = cudeSelectingStart;
					var end = coord;

					var x_start = Math.min(start.x,end.x);
					var x_end = Math.max(start.x,end.x);

					var y_start = Math.min(start.y,end.y);
					var y_end = Math.max(start.y,end.y);

					var real_start = {x:Math.min(start.x,end.x),y:Math.min(start.y,end.y)};
					var real_end = {x:Math.max(start.x,end.x),y:Math.max(start.y,end.y)};

					//清空正在选择的 不然会重复
					that.cudeSelecting.data.splice(0);

					// 判断是否有重复的方格
					let flag = true;
					let cubeArr = [];
					for(let i=x_start;i<=x_end;i++){
						if(flag && that.selectedArr) {
							for(let j=y_start;j<=y_end;j++){
								cubeArr.push(i+'-'+j);
								this.cudeSelecting.data.push({x:i,y:j,cube:i+'-'+j});
								if(that.selectedArr.includes(i+'-'+j) && flag){
									flag = false;
									that.clearCube();
									// that.$message.error("有重复选择的方格");
									break;
								}
							}
            }
					}

					if(flag && this.selectedArr) {
						// 保存已经选中的方格
						this.rootConfig.selectedArr.value = this.selectedArr = this.selectedArr.concat(cubeArr);

						var cudeSelectingData = this.cudeSelecting.data;
						var cudeSelectedArr = [];

						for(let i=0;i<cudeSelectingData.length;i++) {
							cudeSelectedArr.push(cudeSelectingData[i])
						}

						// console.log(cudeSelectedArr,'这个范围有'+cudeSelectedArr.length+'个方');
						// console.log(real_start,'从哪个方开始');
						// console.log(real_end,'从哪个方结束');

						this.current_value.cudeSelected.map((item)=>{
							this.current_ids.push(item.id);
						});
						let id = 1;
						while (this.current_ids.includes(id)) {
							id += 1;
						}
						this.current_ids.push(id);

						//加入选中的
						let cudeSelected = {
							'id': id,
							'value': {
								image: '',
								is_minApp: '1',
								h5_link: '',
								gh_id: '',
								minApp_link: '',
							},
							'start':real_start,
							'end':real_end,
							'data':cudeSelectedArr
						};

						this.rootConfig.currentItemId.value = this.currentItemId = id;
						this.rootConfig.currentItem.value = this.currentItem = cudeSelected;
						this.current_value.cudeSelected.push(cudeSelected);

						// console.log(this.current_value.cudeSelected,"this.current_value.cudeSelected");

						//清空正在选择的
						this.cudeSelecting = {
							start:null,
							end:null,
							data:[]
						}
          }

				}

			},
			clearChooseCube(event,x,y) {
				var cudeSelectingData = this.cudeSelecting.data;
				for(var i = 0, len = cudeSelectingData.length; i < len; i++){
					if(cudeSelectingData[i]) {
						var coord = cudeSelectingData[i];
						if(parseInt(coord.x) === parseInt(x) && parseInt(coord.y) === parseInt(y)){
							this.cudeSelecting.data.splice(i,1);
						}
          }
				}
      },
			chooseCube(event,x,y) {
				let that = this;
				if(this.inDrag) {

					let coord = {x:x,y:y};
					this.cudeSelecting.end = coord;

					//获取开始和结束之间所有魔方单元
					var start = this.cudeSelecting.start;
					var end = coord;

					var x_start = Math.min(start.x,end.x);
					var x_end = Math.max(start.x,end.x);

					var y_start = Math.min(start.y,end.y);
					var y_end = Math.max(start.y,end.y);

					//清空正在选择的 不然会重复
					that.cudeSelecting.data.splice(0);


					// 判断是否有重复的方格
					let flag = true;
					for(let i=x_start;i<=x_end;i++){
						if(flag && that.selectedArr) {
							for(let j=y_start;j<=y_end;j++){
								this.cudeSelecting.data.push({x:i,y:j,cube:i+'-'+j});
								if(that.selectedArr.includes(i+'-'+j) && flag){
									that.clearCube();
									flag = false;
									break;
								}
							}
						}
					}

				}
			},
			cubeSelectItemClick(item) {
				this.rootConfig.currentItemId.valuey = this.currentItemId = item.id;
				this.rootConfig.currentItem.value = this.currentItem = item;
				this.clearCube();
			},
      showIcon(item) {
	      this.clearCube();
				// 选中了才能删除
				if(this.currentItemId == item.id){
					this.inHover = item.id
        }
      },
			isSelectedItem(id) {
				// 当前选中
				return this.currentItemId == id;
      },
			clearCube() {
				// 移出了直接清除全部
				this.inDrag = false;
				this.cudeSelecting = {
					start:null,
          end:null,
          data:[]
				}
      },
			//判断是否正在选择
			isSelecting (x,y) {
				var cudeSelectingData = this.cudeSelecting.data;
				for(var i = 0, len = cudeSelectingData.length; i < len; i++){
					var coord = cudeSelectingData[i];
					if(parseInt(coord.x) === parseInt(x) && parseInt(coord.y) === parseInt(y)){
						return true;
					}
				}
				return false;
			},
			//判断是否已经选择
			isSelected (x,y) {

				if(this.selectedArr) {
					for(let i=0;i<this.selectedArr.length;i++){
						if(this.selectedArr.includes(x+'-'+y)){
							return true;
						}
					}
        }

        // 两个循环效率低
				// var list = this.current_value.cudeSelected;
				// for(var i=0;i<list.length;i++){
				// 	var data = list[i].data;
				// 	for(var j=0;j<data.length;j++){
				// 		var coord = data[j];
				// 		if(parseInt(coord.x) === parseInt(x) && parseInt(coord.y) === parseInt(y)){
				// 			return true;
				// 		}
				// 	}
				// }
				return false;
			},
			//计算选中层的宽度
			getCubeSelectedWidth (item) {
				return (parseInt(item.end.y) - parseInt(item.start.y) + 1) * this.cubeItemWidth;
			},
			//计算选中层的高度
			getCubeSelectedHeight (item) {
				return (parseInt(item.end.x) - parseInt(item.start.x) + 1) * this.cubeItemHeight;
			},
			//计算选中层的右边距离
			getCubeSelectedTop (item) {
				return (item.start.x-1) * this.cubeItemHeight;
			},
			//计算选中层的左边距离
			getCubeSelectedLeft (item) {
				return (item.start.y-1) * this.cubeItemWidth;
			}
		}
	}
</script>

<style lang="less" scoped>
  .bg-head {
    display: flex;
    margin-bottom: 20px;
    .config-title {
      flex: 1;
      align-self: center;
    }
  }

  // 拖拽区域
  .sortable-body {

    // 组件列表
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;

      li {
        /*cursor: move;*/
        position: relative;
        padding: 25px 10px;
        /*margin-bottom: 16px;*/
        width: 100%;
        /*height: 48px;*/
        /*line-height: 48px;*/
        background: #fff;
        box-sizing: border-box;
        /*box-shadow: 0px 0px 0px 1px #E9EAEC;*/
        display: flex;
        flex-direction: column;


        // 鼠标滑过
        &.in-hover {
          /*background: #29ba9c;*/
          /*color: #fff;*/
          /*box-shadow: 0px 2px 6px 0px rgba(188,195,206,0.8);*/
          /*.buttons {*/
            /*color: #29ba9c;*/
            /*display: block;*/
          /*}*/
        }

        // 拖拽中
        &.sortable-ghost, &.sortable-chosen {
          /*opacity: .2 !important;*/
          /*background: #29ba9c;*/
          /*box-shadow: 0px 2px 6px 0px rgba(188,195,206,0.8);*/
          /*color: #fff;*/
          span {
            color: #29ba9c;
          }
        }

        p {
          margin: 0px;
        }

        .item-box {
          margin-top: 15px;
        }

        .top {
          display: flex;
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

  .decorate-cube{
    position: relative;
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }
  .decorate-cube .cube-row:last-of-type .cube-item {
    border-right: 1px solid #e5e5e5;
  }
  .decorate-cube .cube-selected {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ebedf0;
    text-align: center;
    color: #7d7e80;
    box-sizing: border-box;
    .icon-close11 {
      position: absolute;
      right: -5px;
      top: -5px;
      cursor: pointer;
      z-index: 5;
    }
  }
  .decorate-cube .cube-selected.cube-selected-click {
    background: rgba(41, 186, 156, 0.30);
    color: #289f80;
    z-index: 2;
    cursor: auto;
  }
  .decorate-cube .cube-selected-text {
    font-size: 12px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .decorate-cube .cube-row {
    float: left;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .decorate-cube .cube-item:first-child {
    border-top: 1px solid #e5e5e5;
  }
  .decorate-cube .cube-item {
    background: #f8f8f8;
    border-left: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
  }
  .decorate-cube .cube-item.item-selecting{
    background: rgba(41, 186, 156, 0.30);
  }
  .decorate-cube .cube-item.item-selecting i{
    display: none;
  }
  .decorate-cube .cube-item.item-selected {
    background: #e0edff;
    visibility: hidden;
  }
  .decorate-cube .cube-item.item-selected i{
    display: none;
  }

  .icon-box{
    margin-bottom: 20px;
  }
  .icon-checkbox {
    display: flex;
    flex-wrap: wrap;
    .choose {
      background-color: rgba(41, 186, 156, 0.16);
      border: solid 1px #29ba9c;
      i {
        color: #29ba9c;
      }
    }
  }
  .icon-item {
    border: solid 1px #cccccc;
    padding: 2px 15px;
    cursor: pointer;
    i {
      font-size: 18px;
      color: #999999;
    }
  }
  .icon-item:first-child {
    border-radius: 2px 0 0 2px;
  }
  .icon-item:last-child {
    border-radius: 0 2px 2px 0;
  }
</style>
