<template>
  <design-dialog
      wrapClassName="dialog-images-manager"
      title="热区编辑"
      :visible="visible"
      :destroyOnClose="true"
      :width="960"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <!-- dialog-body -->
    <div style="height:55vh;overflow:auto">

      <!--保留用来复制的-->
      <div class="hotarea-box" v-show="false" style="top: 0;left: 0;width: 80px;height: 80px" data-id="1" @mousedown='moveArea' @dblclick="openLink">

        <div class="hotarea-inner">
          <div class="hotarea">
            <div class="hotarea-text">
              <div>
                <div>双击设置</div>
                <div>关联链接</div>
              </div>
            </div>
          </div>
        </div>
        <a-icon class="icon-close11" type="close-circle" title="点击清除图片"/>

        <span>
              <div @mousedown="DivChange($event,'top')" style="position: absolute; user-select: none; width: 100%; height: 10px; top: -5px; left: 0px; cursor: row-resize;"></div>
              <div @mousedown="DivChange($event,'right')" style="position: absolute; user-select: none; width: 10px; height: 100%; top: 0px; right: -5px; cursor: col-resize;"></div>
              <div @mousedown="DivChange($event,'bottom')" style="position: absolute; user-select: none; width: 100%; height: 10px; bottom: -5px; left: 0px; cursor: row-resize;"></div>
              <div @mousedown="DivChange($event,'left')" style="position: absolute; user-select: none; width: 10px; height: 100%; top: 0px; left: -5px; cursor: col-resize;"></div>
              <div @click.stop="deleteItem" style="position: absolute; user-select: none; width: 20px; height: 20px; right: -10px; top: -10px; cursor: pointer;"></div>
              <div @mousedown="DivChange($event,'right','bottom')" style="position: absolute; user-select: none; width: 20px; height: 20px; right: -10px; bottom: -10px; cursor: se-resize;"></div>
              <div @mousedown="DivChange($event,'left','bottom')" style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; bottom: -10px; cursor: sw-resize;"></div>
              <div @mousedown="DivChange($event,'left','top')" style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"></div>
            </span>

      </div>
      <!--保留用来复制的end-->

      <div class="editor-box" style="display: flex;margin-bottom: 10px">
        <a-button type="primary" style="width: 150px" @click="toAddArea">
          添加热区
        </a-button>
        <div style="align-self: center;margin-left: 20px;width: 680px">
          <a-steps :current="3" progress-dot size="small" labelPlacement="vertical">
            <a-step title="点击添加热区" />
            <a-step title="移动鼠标至热区边缘调整热区大小和位置" />
            <a-step title="设置关联链接" />
            <a-step title="保存生效" />
          </a-steps>
        </div>
      </div>

      <div class="hot-area">
        <div class="show-img" id="show-img" v-if="listItem.image">
          <img class="show-area-img" :src="listItem.image">
          <!--<div class="hotarea-box real-hotarea" style="top: 0;left: 0;width: 80px;height: 80px" data-id="1" @mousedown='moveArea' @dblclick="openLink">-->

          <!--通过数据来添加-->

            <!--<div class="hotarea-inner">-->
              <!--<div class="hotarea">-->
                <!--<div class="hotarea-text">-->
                  <!--<div>-->
                    <!--<div>双击设置</div>-->
                    <!--<div>关联链接</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<a-icon class="icon-close11" type="close-circle" title="点击清除图片"/>-->

            <!--<span>-->
              <!--<div @mousedown="DivChange($event,'top')" style="position: absolute; user-select: none; width: 100%; height: 10px; top: -5px; left: 0px; cursor: row-resize;"></div>-->
              <!--<div @mousedown="DivChange($event,'right')" style="position: absolute; user-select: none; width: 10px; height: 100%; top: 0px; right: -5px; cursor: col-resize;"></div>-->
              <!--<div @mousedown="DivChange($event,'bottom')" style="position: absolute; user-select: none; width: 100%; height: 10px; bottom: -5px; left: 0px; cursor: row-resize;"></div>-->
              <!--<div @mousedown="DivChange($event,'left')" style="position: absolute; user-select: none; width: 10px; height: 100%; top: 0px; left: -5px; cursor: col-resize;"></div>-->
              <!--<div @click.stop="deleteItem" style="position: absolute; user-select: none; width: 20px; height: 20px; right: -10px; top: -10px; cursor: pointer;"></div>-->
              <!--<div @mousedown="DivChange($event,'right','bottom')" style="position: absolute; user-select: none; width: 20px; height: 20px; right: -10px; bottom: -10px; cursor: se-resize;"></div>-->
              <!--<div @mousedown="DivChange($event,'left','bottom')" style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; bottom: -10px; cursor: sw-resize;"></div>-->
              <!--<div @mousedown="DivChange($event,'left','top')" style="position: absolute; user-select: none; width: 20px; height: 20px; left: -10px; top: -10px; cursor: nw-resize;"></div>-->
            <!--</span>-->

          <!--</div>-->
        </div>
      </div>
    </div>

    <link-modal :ref="`linkModal`"
                :value.sync="currentItem"
                :config="config"
                :rootConfig="rootConfig"
                @confirm="handleOk"></link-modal>

  </design-dialog>
</template>

<script>
	import linkModal from './choose-link.vue';

	export default {
		name: 'hot-modal',
		props: ['value', 'config', 'rootConfig'],
		components: {
			linkModal
		},
		data() {
			return {
				hotArea: [],
				listItem: {},
        currentItem: {},
        current_ids: [1],
				oldHotArea: [],
				visible: false,
			};
		},
		watch: {
			value(newVal) {}
		},
		methods: {
			//移动热区
			moveArea(el) {
				let dragBox = el.currentTarget; //获取当前元素
				//算出鼠标相对元素的位置
				let disX = el.clientX - dragBox.offsetLeft;
				let disY = el.clientY - dragBox.offsetTop;
				let id = dragBox.getAttribute('data-id');
				let currentTop = parseInt(dragBox.style.top);
				let currentLeft = parseInt(dragBox.style.left);

				// dragBox.previousElementSibling 上一个同级元素、 parentNode.firstElementChild父元素的第一个
				document.onmousemove = e => {
					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
					let left = e.clientX - disX;
					let top = e.clientY - disY;
					//限制区域
					if (left <= 0) {
						left = 0;
					} else if (left >= dragBox.parentNode.firstElementChild.clientWidth - dragBox.clientWidth) {
						left = dragBox.parentNode.firstElementChild.clientWidth - dragBox.clientWidth;
					}

					if (top <= 0) {
						top = 0;
					} else if (top >= dragBox.parentNode.firstElementChild.clientHeight - dragBox.clientHeight) {
						top = dragBox.parentNode.firstElementChild.clientHeight - dragBox.clientHeight;
					}
					//移动当前元素
					dragBox.style.left = left + "px";
					dragBox.style.top = top + "px";
					currentLeft = left;
					currentTop = top;
				};
				document.onmouseup = e => {
					for(let i=0;i<this.hotArea.length;i++) {
						if(id == this.hotArea[i].id) {
							this.hotArea[i].top = currentTop;
							this.hotArea[i].left = currentLeft;
						}
					}
					//鼠标弹起来的时候不再移动
					document.onmousemove = null;
					//预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
					document.onmouseup = null;
				};
			},
			// 改变区域大小
			DivChange(e,str,str2) {
				let odivParent = e.currentTarget.parentNode.parentNode; //获取目标父元素
				let dx= e.clientX;//当你第一次单击的时候，存储x轴的坐标。
				let dy= e.clientY;//当你第一次单击的时候，存储y轴的坐标。
				let dw= odivParent.offsetWidth;//存储默认的div的宽度。
				let dh= odivParent.offsetHeight;//存储默认的div的高度。
				let disX = e.clientX - odivParent.offsetLeft;
				let disY = e.clientY - odivParent.offsetTop;
				let id = odivParent.getAttribute('data-id');
				let currentTop = parseInt(odivParent.style.top);
				let currentLeft = parseInt(odivParent.style.left);
				let currentWidth = parseInt(odivParent.style.width);
				let currentHeight = parseInt(odivParent.style.height);

				document.onmousemove = e => {
					if(str === 'left' || str2 === 'left') {
						let left = e.clientX - disX;
						//限制区域
						if (left < 0) {
							left = 0;
						} else if (left >= odivParent.parentNode.firstElementChild.clientWidth - odivParent.clientWidth && dw-(e.clientX-dx)>30) {
							left = odivParent.parentNode.firstElementChild.clientWidth - odivParent.clientWidth;
							odivParent.style.width=dw-(e.clientX-dx)+'px';
							currentWidth = dw-(e.clientX-dx);
						}else if (dw-(e.clientX-dx)<=30) {
							currentWidth = 30;
							// do nothing
							return
						}else {
							odivParent.style.width=dw-(e.clientX-dx)+'px';
							currentWidth = dw-(e.clientX-dx);
						}
						odivParent.style.left = left + "px";
						currentLeft = left;

					}else if(str === 'right' || str2 === 'right'){
						odivParent.style.width=dw+(e.clientX-dx)+'px';
						currentWidth = dw+(e.clientX-dx);

						if(odivParent.offsetWidth + odivParent.offsetLeft >= odivParent.parentNode.firstElementChild.clientWidth) {
							odivParent.style.width= odivParent.parentNode.firstElementChild.clientWidth - odivParent.offsetLeft +'px';
							currentWidth = odivParent.parentNode.firstElementChild.clientWidth - odivParent.offsetLeft;
						}
						if(currentWidth <= 30) {
							currentWidth = 30;
						}
					}

					if(str === 'top' || str2 === 'top') {
						let top = e.clientY - disY;
						//限制区域
						if (top < 0) {
							top = 0;
						} else if (top >= odivParent.parentNode.firstElementChild.clientHeight - odivParent.clientHeight && dh-(e.clientY-dy)>30) {
							top = odivParent.parentNode.firstElementChild.clientHeight - odivParent.clientHeight;
							odivParent.style.height=dh-(e.clientY-dy)+'px';
							currentHeight = dh-(e.clientY-dy);
						} else if (dh-(e.clientY-dy)<=30) {
							currentHeight = 30;
							// do nothing
							return
						}else {
							odivParent.style.height=dh-(e.clientY-dy)+'px';
							currentHeight = dh-(e.clientY-dy);
						}
						odivParent.style.top = top + "px";
						currentTop = top;

					}else if(str === 'bottom' || str2 === 'bottom'){
						odivParent.style.height=dh+(e.clientY-dy)+'px';
						currentHeight = dh+(e.clientY-dy);

						if(odivParent.offsetHeight + odivParent.offsetTop >= odivParent.parentNode.firstElementChild.clientHeight) {
							odivParent.style.height= odivParent.parentNode.firstElementChild.clientHeight - odivParent.offsetTop +'px';
							currentHeight = odivParent.parentNode.firstElementChild.clientHeight - odivParent.offsetTop;
						}
						if(currentHeight <= 30) {
							currentHeight = 30;
            }
					}

				};
				document.onmouseup = e => {
					for(let i=0;i<this.hotArea.length;i++) {
						if(id == this.hotArea[i].id) {
							this.hotArea[i].top = currentTop;
							this.hotArea[i].left = currentLeft;
							this.hotArea[i].width = currentWidth;
							this.hotArea[i].height = currentHeight;
						}
					}
					document.onmousemove = null;
					document.onmouseup = null;
				};
				e.stopPropagation();
				e.preventDefault();
				return false;
			},
			// 删除热区
			deleteItem(el) {
				let dragBox = el.currentTarget; //获取当前元素
				this.hotArea = this.hotArea.filter((item) => {
					if(item.id != dragBox.parentNode.parentNode.getAttribute('data-id')) {
						return item;
					}
				});
        dragBox.parentNode.parentNode.parentNode.removeChild(dragBox.parentNode.parentNode);
      },
      // 添加热区
			toAddArea() {
				let that = this;
				let dom = document.querySelector(".hotarea-box").cloneNode(true);
				this.hotArea.map((item)=>{
					this.current_ids.push(item.id);
				});
				let id = this.hotArea.length + 1;
				while (this.current_ids.includes(id)) {
					id += 1;
				}
				this.current_ids.push(id);
				dom.setAttribute('data-id', id);
				dom.classList.add("real-hotarea");
				dom.style.top = 0 + "px";
				dom.style.left = 0 + "px";
				dom.style.width = 80 + "px";
				dom.style.height = 80 + "px";
				dom.style.display = "block";
				dom.ondblclick = function(event){
					that.openLink(event);
				};
				dom.onmousedown = this.moveArea;
				dom.children[2].children[0].onmousedown = function(event){
					that.DivChange(event,'top');
				};
				dom.children[2].children[1].onmousedown = function(event){
					that.DivChange(event,'right');
				};
				dom.children[2].children[2].onmousedown = function(event){
					that.DivChange(event,'bottom');
				};
				dom.children[2].children[3].onmousedown = function(event){
					that.DivChange(event,'left');
				};
				dom.children[2].children[4].onclick = this.deleteItem;

				dom.children[2].children[5].onmousedown = function(event){
					that.DivChange(event,'right','bottom');
				};
				dom.children[2].children[6].onmousedown = function(event){
					that.DivChange(event,'left','bottom');
				};
				dom.children[2].children[7].onmousedown = function(event){
					that.DivChange(event,'left','top');
				};
				document.querySelector("#show-img").appendChild(dom);

				// 添加到热区数组
				this.hotArea.push({
					id: id,
					top: 0,
					left: 0,
					width: 80,
					height: 80,
					is_minApp: '1',
					h5_link: '',
					gh_id: '',
					minApp_link: ''
				});
      },
			editorArea() {
				let that = this;
				for(let i =0;i<this.hotArea.length;i++) {
					if(!this.current_ids.includes(this.hotArea[i].id)) {
						this.current_ids.push(this.hotArea[i].id);
					}
					let dom = document.querySelector(".hotarea-box").cloneNode(true);
					dom.setAttribute('data-id', this.hotArea[i].id);
					dom.classList.add("real-hotarea");
					if(this.hotArea[i].is_minApp == 2) {
						dom.querySelector('.hotarea-text').innerHTML = '<div>小程序链接</div>';
					}else if(this.hotArea[i].is_minApp == 1 && this.hotArea[i].h5_link) {
						dom.querySelector('.hotarea-text').innerHTML = '<div>内部链接</div>';
					}else {
						dom.querySelector('.hotarea-text').innerHTML = '<div><div >双击设置</div> <div>关联链接</div></div>';
					}
					dom.style.top = this.hotArea[i].top + "px";
					dom.style.left = this.hotArea[i].left + "px";
					dom.style.width = this.hotArea[i].width + "px";
					dom.style.height = this.hotArea[i].height + "px";
					dom.style.display = "block";
					dom.ondblclick = function(event){
						that.openLink(event);
					};
					dom.onmousedown = this.moveArea;
					dom.children[2].children[0].onmousedown = function(event){
						that.DivChange(event,'top');
					};
					dom.children[2].children[1].onmousedown = function(event){
						that.DivChange(event,'right');
					};
					dom.children[2].children[2].onmousedown = function(event){
						that.DivChange(event,'bottom');
					};
					dom.children[2].children[3].onmousedown = function(event){
						that.DivChange(event,'left');
					};
					dom.children[2].children[4].onclick = this.deleteItem;

					dom.children[2].children[5].onmousedown = function(event){
						that.DivChange(event,'right','bottom');
					};
					dom.children[2].children[6].onmousedown = function(event){
						that.DivChange(event,'left','bottom');
					};
					dom.children[2].children[7].onmousedown = function(event){
						that.DivChange(event,'left','top');
					};
					document.querySelector("#show-img").appendChild(dom);
        }
			},
			openLink(el) {
				// 选中热区设置链接
				let item = this.hotArea.filter((item) => {
					return item.id == el.currentTarget.getAttribute('data-id');
				});
				this.currentItem = item[0];

				this.$refs.linkModal.show(item[0]);
			},
			handleOk(item) {
				// 设置完热区后赋值数组
				this.currentItem = item;
				for(let j=0;j<document.querySelectorAll('.real-hotarea').length;j++) {
					if(this.currentItem.id == document.querySelectorAll('.real-hotarea')[j].getAttribute('data-id')) {
						if(this.currentItem.is_minApp == 2) {
							document.querySelectorAll('.real-hotarea')[j].querySelector('.hotarea-text').innerHTML = '<div>小程序链接</div>';
            }else if(this.currentItem.is_minApp == 1 && this.currentItem.h5_link) {
							document.querySelectorAll('.real-hotarea')[j].querySelector('.hotarea-text').innerHTML = '<div>内部链接</div>';
						}else {
							document.querySelectorAll('.real-hotarea')[j].querySelector('.hotarea-text').innerHTML = '<div><div >双击设置</div> <div>关联链接</div></div>';
            }
					}
				}
				for(let i=0;i<this.hotArea.length;i++) {
					if(this.currentItem.id == this.hotArea[i].id) {
						this.hotArea[i] = this.currentItem
          }
        }
			},
			show (item) {
				// 获取显示的单图
				this.visible = true;
				if(item) {
					this.listItem = item;
					//数组的浅拷贝
          if(this.listItem.hotArea && this.listItem.hotArea.length > 0) {
	          this.oldHotArea = JSON.parse(JSON.stringify(this.listItem.hotArea));
          }else {
	          this.oldHotArea = [];
          }

          if(item.hotArea) {
	          this.hotArea = item.hotArea;
          }else {
	          this.hotArea = [];
          }

					this.$nextTick(()=>{
						// 根据传入的数据布局
						this.editorArea();
          })
					// this.oldHotArea = this.listItem.hotArea;  没用
				}
			},
			/**
			 * 弹窗按钮 - 确认
			 */
			handle_confirm () {
				// 返回改单图的热区数组
				this.$emit('confirm', this.hotArea);
				this.visible = false;
			},

			/**
			 * 弹窗按钮 - 取消
			 */
			handle_cancel () {
				this.$emit('confirm', this.oldHotArea);
				this.visible = false;
			},
		},
	};
</script>

<style lang="less" scoped>
  .ant-radio-group {
    align-self: center;
  }

  .hot-area {
    position: relative;
    width: 100%;
    height: 44vh;
    overflow-y: scroll;
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
    .show-img {
      position: relative;
      width: 400px;
      margin: 0 auto;
      border: dashed 1px #e2e2e2;
      img {
        width: 100%;
      }
    }
    .hotarea-box {
      position: absolute;
      user-select: auto;
      touch-action: none;
      display: inline-block;
      top: 0px;
      left: 0px;
      width: 80px;
      height: 80px;
      min-width: 30px;
      min-height: 30px;
      padding: 5px;
      box-sizing: border-box;
      border: 1px solid #29ba9c;
      background: rgba(41, 186, 156, 0.3);
      font-size: 12px;
      color: #fff;
      cursor: move;
      .icon-close11 {
        position: absolute;
        top: -10px;
        right: -9px;
        color: #999;
        font-size: 18px;
        cursor: pointer;
        display: none;
      }
    }
    .hotarea-box:hover {
      .icon-close11 {
        display: block;
      }
    }
    .hotarea-inner {
      position: relative;
      height: 100%;
    }
    .hotarea {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    .hotarea-text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
</style>
