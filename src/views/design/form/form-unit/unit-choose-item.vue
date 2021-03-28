<template>
  <div class="form-item col-1">
    <div class="bg-head" v-if="!config.notShowTitle">
      <span class="config-title">{{ config.title || "" }}</span>
    </div>
    <!--<p>{{config}}</p>-->

    <div>
      <div style="margin-top: 15px"
           :class="{'sortable-body': true, 'in-drag': inDrag,'out-drag': !inDrag}">

            <ul>
              <!-- item -->
              <li
                  v-if="value.id"
                  :class="{'in-hover': inHover == value.id}"
                  @mousemove="inHover = value.id"
                  @mouseleave="inHover = ''">

                <div class="article-box">
                  {{value.title || value.name}}
                </div>

                <div class="id-name">
                  ID： {{value.id}}
                </div>
                <div class="buttons">
                <span class="ignore-elements" @click.stop="handle_component_delete(value.id)">
                   <i class="iconfont icon-ht_operation_delete"/>
                 </span>
                </div>

              </li>
              <li v-if="!value.id" :key="0">
                <a-empty />
              </li>
            </ul>


        <choose-article ref="chooseArticle"
                        :value.sync="value"
                        :config="config"
                        :rootConfig="rootConfig"
                        @confirm="handleOk"></choose-article>

        <!-- 删除所有组件 -->
        <div style="text-align: center;margin-top: 10px">
          <a-button type="primary" style="width: 300px" @click="openArticle">
            {{value.id?'点击替换':'点击添加'}}
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
	import chooseArticle from '../../../../system-components/choose-item/index.vue';

	export default {
		props: ['value', 'config', 'rootConfig'],

		components: {
			draggable,
			chooseArticle,
		},

		data () {
			return {
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
				this.$refs.chooseArticle.show(this.value);
			},
			handleOk(list) {
				this.$emit('input', list);
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
				this.$emit('input', {});
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
        /*cursor: move;*/
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
