<template>
  <div class="form-item col-1">
    <span>{{ config.title }}</span>

    <template v-if="!config.menu">
      <div style="margin: 15px 0;">
        <!--微社区-->
        <template v-if="is_from !== 'store' && rootConfig.list.choose === 'community'">
          <a-radio-group v-model="rootConfig.get_style.value">
            <a-radio v-for="(item, index) in CommunityOptions" :key="index" :value="item.value">
              {{item.label}}
            </a-radio>
          </a-radio-group>
        </template>
        <template v-if="rootConfig.list.choose === 'community' && is_from === 'store'">
          <a-radio-group v-model="rootConfig.get_style.value">
            <a-radio v-for="(item, index) in config.options" :key="index" :value="item.value">
              {{item.label}}
            </a-radio>
          </a-radio-group>
        </template>
        <!--微社区end-->
        <template v-if="rootConfig.list.choose !== 'community'">
          <a-radio-group v-model="rootConfig.get_style.value" @change="onChange">
            <a-radio v-for="(item, index) in config.options" :key="index" :value="item.value">
              {{item.label}}
            </a-radio>
          </a-radio-group>
        </template>
      </div>

      <div style="display: flex" v-if="rootConfig.get_style.value == 1">
        <span style="width: 100px;align-self: center">显示数量</span>
        <a-input-number
            :min="set_number_min(config.min)"
            :max="set_number_max(config.max)"
            v-model.trim="rootConfig.get_number.value"/>
      </div>

      <div class="slide-bar-wrapper" v-if="rootConfig.get_style.value == 2 || rootConfig.get_style.value == 3">
        <template v-if="config.show == 'list'">
          <choose-list v-model="local_value"
                       :config="config"
                       :rootConfig="rootConfig"></choose-list>
        </template>
      </div>
    </template>

    <template v-if="config.menu">
      <div style="margin: 15px 0;">
        <a-radio-group v-model="value.get_style">
          <a-radio v-for="(item, index) in config.options" :key="index" :value="item.value">
            {{item.label}}
          </a-radio>
        </a-radio-group>
      </div>

      <div class="slide-bar-wrapper" style="width: 105%" v-if="value.get_style == 2">
        <choose-item v-model="value.menu_id"
                     :config="config"
                     :rootConfig="rootConfig"></choose-item>
      </div>
    </template>

  </div>
</template>

<script>
	import chooseList from './unit-choose-list.vue';
	import chooseItem from './unit-choose-item.vue';
	export default {
		props: ['value', 'config', 'rootConfig','is_from'],
		data() {
			return {
				// 商城装修微社区
				CommunityOptions: [
					{label: "自动获取", value: "1"},
        ]
			}
		},
		components: {
			chooseList,
			chooseItem
		},
		computed: {
			local_value: {
				get () {
					return this.value;
				},
				set (newValue) {
					this.$emit('input', newValue);
				}
			}
		},
		methods: {
			onChange(e) {
				this.$emit('input', []);
      },
			// 设置数值最小
			set_number_min(val) {
				if (Number(val) === 0) {
					return 0;
				} else {
					return Number(val) || -9999;
				}
			},

			// 设置数值最大值
			set_number_max(val) {
				return Number(val) || 9999;
			},
		}
	}
</script>
<style lang="less" scoped>

</style>
