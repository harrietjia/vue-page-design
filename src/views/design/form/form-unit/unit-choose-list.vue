<template>
  <div class="form-item col-1">
    <div class="bg-head">
      <span v-if="config.showTitle">{{ config.title || "" }}</span>
      <a-tooltip v-if="config.tips">
        <template slot="title">
          Tips: {{config.tips}}
        </template>
        <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
      </a-tooltip>
    </div>
    <!--<p>{{value}}</p>-->

    <div>
      <div style="margin-top: 15px"
           :class="{'sortable-body': true, 'in-drag': inDrag,'out-drag': !inDrag}">

        <!-- 拖拽容器 -->
        <draggable
            tag="ul"
            :list="value"
            v-bind="dragOptions"
            @start="inDrag = true">

          <!-- 动画 -->
          <transition-group type="transition" :name="!inDrag ? 'flip-list' : null">

            <!-- item -->
            <li
                v-for="(item, index) in value"
                :key="item.id"
                :class="{'in-hover': inHover == item.id}"
                @mousemove="inHover = item.id"
                @mouseleave="inHover = ''">

             <div class="article-box">
               {{item.title || item.name}}
             </div>

              <div class="id-name">
                ID： {{item.id}}
              </div>
              <div class="buttons">
                <span class="ignore-elements" @click.stop="handle_component_delete(item.id)">
                   <i class="iconfont icon-ht_operation_delete"/>
                 </span>
              </div>

            </li>
            <li v-if="value.length<=0" :key="0" style="cursor: default">
              <a-empty />
            </li>
          </transition-group>

        </draggable>

        <choose-lists ref="chooseLists"
                        :value.sync="value"
                        :config="config"
                        :rootConfig="rootConfig"
                        @confirm="handleOk"></choose-lists>

        <!-- 删除所有组件 -->
        <div style="text-align: left;margin-top: 10px">
          <a-button type="primary" style="width: 310px" @click="openArticle">
            点击添加
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
	import chooseLists from '../../../../system-components/choose-list/index.vue';

	export default {
		props: ['value', 'config', 'rootConfig'],

		components: {
			draggable,
			chooseLists,
		},

		data () {
			return {
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
			openArticle() {
				this.$refs.chooseLists.show(this.value);
			},
			handleOk(list) {
				let current_value = [...list];
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
				let current_value = this.value;
				for(let i=0;i<current_value.length;i++) {
					if(current_value[i].id == id) {
						current_value.splice(i, 1);
					}
				}
				this.$emit('input', current_value);
			},
		}
	}
</script>

<style lang="less" scoped>
  .bg-head {
    display: flex;
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
          margin: 0;
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

  .article-box {
    background-color: #fbfbfb;
    border-radius: 5px;
    padding: 10px;
  }

</style>
