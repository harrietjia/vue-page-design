<template>
  <transition name="slide-fade">
    <div class="design-layout-form" v-if="!show">
      <!-- 组件标题 -->
      <h2 class="form-head">{{ component.component_title }}组件</h2>

      <!-- 组件表单 -->
      <div class="design-form-body">

        <!-- 模版样式选择 -->
        <!--<unit-panel title="组件样式" :desc="component.template_title">-->
        <!--<template-selector-->
        <!--v-model="component.template_id"-->
        <!--:list="component.template_list"-->
        <!--@onChange="handle_update_template"/>-->
        <!--</unit-panel>-->

        <!-- 循环当前已有的模版列表 -->
        <template v-for="(tmp, index) in component.template_list">
          <div :key="index" v-if="component.template_id == tmp.id">
            <!-- 数据配置界面 -->
            <template-config-detail
                :is_from="is_from"
                :layout="component.config.layout[index].datas"
                :configs="component.config.datas"
                :rootConfig="component.config.datas"
                type="datas"
                key="datas">
            </template-config-detail>

            <!-- 残忍的分割线 -->
            <hr class="form-line"/>

            <!-- 样式配置界面 -->
            <template-config-detail
                :is_from="is_from"
                :layout="component.config.layout[index].styles"
                :configs="component.config.styles"
                :rootConfig="component.config.styles"
                type="styles"
                key="styles">
            </template-config-detail>

          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
	// 容器组件
	import templateSelector from './template-selector';
	import unitPanel from './form-unit/unit-panel';
	// 配置项编译器
	// import templateConfigDetail from './template-config-detail.vue';

	export default {
		props: ['is_from'],
		components: {
			templateSelector,
			unitPanel,
			// templateConfigDetail
		},

		data() {
			return {
				component: {}
			}
		},

		computed: {
			show() {
				return this.$store.state.design.show_component_form;
			},

			/**
			 * 选中的组件ID
			 */
			selected_id() {
				return this.$store.state.design.selected_vdc.id;
			}
		},

		watch: {
			/**
			 * 监听选中的组件ID，如果有变更，则重新加载数据
			 */
			selected_id() {
				this.component = this.$store.state.design.selected_vdc;
			}
		},

		methods: {
			/**
			 * 切换样式模版
			 * @param {String} 模版名字
			 * @param {String} 模版标题
			 */
			handle_update_template({template_id, template_name, template_title}) {
				this.component.template_title = template_title;
				this.component.template_id = template_id;
				this.component.template_name = template_name;
			}
		},

		created() {
			this.component = this.$store.state.design.selected_vdc;
		}
	}
</script>

<style lang="less" scoped>
  .design-layout-form {
    background: #fff;
    width: 360px;
    position: fixed;
    right: 0px;
    top: 50px;
    bottom: 0px;
    z-index: 1;
    transition: all 0.5s;
    padding: 24px;
    padding-right: 0px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }

  // 标题
  .form-head {
    padding: 0px;
    margin: 0px auto 16px;
    font-size: 18px;
    font-weight: 600;
    color: #3F4245;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>


<style lang="less">

  .design-form-body, .design-layout-page-info {
    width: 312px;
    display: block;

    // 单个配置项样式
    .form-item {
      flex-shrink: 0;
      margin-top: 16px;

      &.col-1 {
        width: 100%;
      }

      &.col-2 {
        width: 148px;
      }

      &.col-4 {
        width: 70px;
      }

      // 配置项的标题
      .config-title {
        display: block;
        margin-bottom: 6px;
        margin-right: 10px;
        /*height: 20px;*/
        line-height: 20px;
      }

      // 输入框公共配置
      .ant-input,
      .ant-input-group-addon {
        border-color: #E8EAEC;
      }
      .ant-input:hover,
      .ant-input:active,
      .ant-input:focus {
        border-color: #4cc7aa;
      }

      // 所有输入框字体大小
      .ant-input {
        font-size: 14px;
      }

      // 数字类型
      .ant-input-number {
        width: 100%;
        height: 40px;
        line-height: 40px;
      }

      // 图片选择器
      .image-picker-wrapper {
        .ant-input-group-addon {
          cursor: pointer;
          padding: 0px;
          width: 40px;
          text-align: center;
          background: #fff;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  .form-line {
    border: 0px;
    margin-top: 40px;
    box-sizing: border-box;
    height: 1px;
    display: block;
    background: #EDEFF2;
  }
</style>

