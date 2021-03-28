<template>
  <div class="form-item col-1">
    <span>{{ config.title }}</span>

    <div class="slide-bar-wrapper" style="margin-top:10px;display: flex">
      <div style="width: 100px;">
        <a-input
            v-model.trim="value.lng"
            placeholder="经度">
        </a-input>
      </div>
      <div style="width: 100px;margin-left: 10px">
        <a-input
            v-model.trim="value.lat"
            placeholder="纬度">
        </a-input>
      </div>
      <div style="width:90px;  margin-left: 10px">
        <a-button style="width:90px;" type="primary" @click.stop="openLink">选择坐标</a-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <a-input v-model.trim="value.address" placeholder="请输入地址">
      </a-input>
    </div>

    <map-modal ref="linkModal"
                :value.sync="value"
                :config="config"
                :rootConfig="rootConfig"
                @confirm="handleOk"></map-modal>
  </div>
</template>

<script>
	import mapModal from '../../../../system-components/map-choose/index.vue';
	export default {
		props: ['value', 'config', 'rootConfig'],
		data() {
			return {
			}
		},
		components: {
			mapModal,
		},
		computed: {
			location: {
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
				this.$refs.linkModal.show(this.location);
			},
			handleOk(location) {
				this.location = location;
			},
		}
	}
</script>
<style lang="less" scoped>

</style>
