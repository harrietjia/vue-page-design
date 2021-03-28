<template>
  <div class="form-item col-1">
    <span>{{ config.title }}</span>
    <div v-if="value.is_h5 && !config.noMinApp" style="margin: 10px">
      <a-radio-group  v-model="value.is_h5">
        <a-radio :value="'1'">
          内部链接
        </a-radio>
        <a-radio :value="'2'">
          小程序链接
        </a-radio>
      </a-radio-group>
    </div>
    <div v-if="value.is_minApp && !config.noMinApp" style="margin: 10px">
      <a-radio-group  v-model="value.is_minApp">
        <a-radio :value="'1'">
          跳转链接
        </a-radio>
        <a-radio :value="'2'">
          跳转小程序
        </a-radio>
      </a-radio-group>
    </div>

    <div class="bottom" v-if="value.is_h5 && value.is_h5 == 2">
      <template v-if="fun.getKey('page_sort') == 2">
        <div style="width: 285px;margin-top: 10px">
          <a-input
              v-model.trim="value.gh_id"
              placeholder="请填写跳转小程序APPID">
          </a-input>
        </div>
        <div style="width: 285px;margin-top: 10px">
          <a-input
              v-model.trim="value.minApp_link"
              placeholder="请填写跳转的小程序内页面路径及参数">
          </a-input>
        </div>
      </template>
      <template v-else>
        <div style="width: 285px;margin-top: 10px">
          <a-input
              v-model.trim="value.gh_id"
              placeholder="请填写跳转的小程序以gh_开头的原始id">
          </a-input>
        </div>
        <div style="width: 285px;margin-top: 10px">
          <a-input
              v-model.trim="value.minApp_link"
              placeholder="请填写跳转的小程序内页面路径及参数">
          </a-input>
        </div>
        <span style="color: #999999;margin: 5px">Tips: H5跳转小程序页面路径需要添加.html后缀，如pages/home/home.html</span>
      </template>
    </div>

    <div class="bottom" v-else-if="value.is_minApp && value.is_minApp == 2">
      <div style="width: 285px;margin-top: 10px">
        <a-input
            v-model.trim="value.gh_id"
            placeholder="请填写跳转的小程序的APPID">
        </a-input>
      </div>
      <div style="width: 285px;margin-top: 10px">
        <a-input
            v-model.trim="value.minApp_link"
            placeholder="请填写跳转的小程序内页面路径及参数">
        </a-input>
      </div>
    </div>

    <div class="slide-bar-wrapper" style="margin-top:6px;display: flex" v-else>
      <div style="width: 210px;">
        <a-input
            v-model.trim="value.link" @blur="handle_input_change"
            placeholder="请输入">
        </a-input>
      </div>
      <div style="width:90px;  margin-left: 10px">
        <a-button style="width:90px;" type="primary" @click.stop="openLink">选择链接</a-button>
      </div>
    </div>

    <link-modal ref="linkModal"
                :value.sync="value.link"
                :config="config"
                :rootConfig="rootConfig"
                @confirm="handleOk"></link-modal>
  </div>
</template>

<script>
	import linkModal from '../../../../system-components/link-modal/index.vue';
	export default {
		props: ['value', 'config', 'rootConfig'],
    data() {
			return {
      }
    },
		components: {
			linkModal,
		},
		computed: {
			local_link: {
				get () {
					return this.value;
				},
				set (newValue) {
					this.$emit('input', newValue);
				}
			}
		},
		methods: {
			openLink() {
				if(this.config.show === 'minApp') {
					this.$refs.linkModal.show('2');
        }else {
					this.$refs.linkModal.show();
        }
			},
			handleOk(url) {
				this.local_link.link = url;
			},
			handle_input_change(e) {
				const url = e.target.value;
				// 判断不为空
				if (url != "") {
					this.local_link.link = url;
					this.$emit("input", this.local_link);
				}
			},
		}
	}
</script>
<style lang="less" scoped>
</style>
