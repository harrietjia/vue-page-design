<template>
  <div class="design-layout-page-info" v-if="show === '1'">

    <div class="design-layout-sortable-wrapper" >
      <!-- 标题 -->
      <h2 class="sortable-head">页面设置</h2>

      <!-- 内容 -->
      <a-spin :spinning="loading">
        <div style="margin-top: -30px">
          <template-config-detail
              :layout="settings.layout"
              :configs="settings.datas"
              :rootConfig="settings.datas"
              type="datas"
              key="datas">
          </template-config-detail>
        </div>
      </a-spin>
    </div>

  </div>
</template>

<script>
	import emptySort from '@/resource/images/empty-sort.png';

	export default {
		props: ['is_from'],
		data () {
			return {
				settings: {},
				loading: false,
				images: {
					emptySort
				}
			};
		},
    mounted() {
			this.settings = this.$store.state.page.settings;

			if(this.is_from === 'store') {
				// 门店装修
				this.settings.layout[0].groups = [
					'pageAmount',
					'page_title',
					'page_description',
					'preview_color',
					'page_icon',
				];
				return;
      }

			if(this.fun.getKey('page_sort') == 2) {
				// 小程序端

				if(this.fun.getKey('page_scene') == 2) {
					// 会员中心
					this.settings.layout[0].groups = [
						'pageAmount',
						'advertising_id',
					];

				}else {
					this.settings.layout[0].groups = [
						'page_title',
						'page_description',
						'preview_color',
            'pageAmount',
						'font_color',
						'full_screen_id',
						'advertising_id',
						'top_id',
						'bottom_menu',
						'member_level',
					];
        }

      }else {
				//H5

				if(this.fun.getKey('page_scene') == 2) {
					// 会员中心
					this.settings.layout[0].groups = [
						'pageAmount',
						'advertising_id',
					];

				}else {
					this.settings.layout[0].groups = [
						'page_title',
						'page_description',
						'page_icon',
						'pageAmount',
						'full_screen_id',
						'advertising_id',
						'top_id',
						'bottom_menu',
						'member_level',
					];
        }
      }
    },

		computed: {
			// 根据是否展示组件配置项，决定组件排序组件是否展示
			show () {
				return this.$store.state.design.show_component_form;
			},
			// settings: {
			// 	get() {
			// 		return this.$store.state.page.settings;
			// 	}
			// }
		},
		watch: {
			settings: {
				deep: true,//深度监听
				handler: function () {
					this.$store.commit('page/update_page', this.settings.datas);
				}
			}
		},

		components: {
		},

		methods: {

		}
	}
</script>

<style lang="less" scoped>

  // 整体布局
  .design-layout-page-info {
    position: fixed;
    right: 0px;
    top: 50px;
    bottom: 0px;
    width: 360px;
    background: #fff;
    box-sizing: border-box;
  }
  .design-layout-sortable-wrapper {
    position: relative;
    padding: 24px;
    overflow-y: auto;
    height: 100%;
  }

</style>
