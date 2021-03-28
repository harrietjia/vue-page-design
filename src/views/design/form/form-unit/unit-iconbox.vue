<template>
  <div style="margin-top: 20px" :class="`form-item col-${config.col || 1}`">
    <div style="display: flex">
      <span class="config-title" style="align-self: center;margin-bottom: 0">{{ config.title }}</span>
      <span v-if="config.tips" style="align-self: center;color: #999999;font-size: 12px">tips: {{config.tips}}</span>
    </div>
    <div class="icon-checkbox">
      <template v-if="config.isIcon">
      <div class="icon-item" v-for="(item,index) in config.options" :key="index"
           :class="[(config.choose === 'single'?choose_value.choose_icon == item.value:choose_value.choose_icon.includes(item.value))?'choose':'']"
           @click="handleInputChange(item.value)">
          <i :class="[item.icon,'iconfont']"></i>
      </div>
      </template>
      <template v-else>
        <div class="icon-item" style="padding: 3px 7px;" v-for="(item,index) in config.options" :key="index"
             :class="[(config.choose === 'single'?choose_value.choose_icon == item.value:choose_value.choose_icon.includes(item.value))?'choose':'']"
             @click="handleInputChange(item.value)">
          <span>{{item.label}}</span>
        </div>
        <image-picker v-model="choose_value.image" v-if="choose_value.choose_icon == 7"
                      :config="config" :show_title="false"
                      :rootConfig.sync="config"></image-picker>
      </template>
    </div>
  </div>
</template>

<script>
	import imagePicker from './unit-image.vue';
	export default {
		props: ['value', 'config'],

		computed: {
			choose_value: {
				get () {
					return this.value;
				},
				set (newValue) {
					this.$emit('input', newValue);
				}
			}
		},
    components: {
	    imagePicker
    },

		methods: {
			handleInputChange (num) {
				if(this.config.choose === 'single') {
					this.choose_value.choose_icon = num;
        }else {
					if(this.choose_value.choose_icon.includes(num)) {
						for(let i = 0;i<this.choose_value.choose_icon.length;i++) {
							if(this.choose_value.choose_icon[i] == num) {
								this.choose_value.choose_icon.splice(i, 1);
							}
						}
					}else {
						this.choose_value.choose_icon.push(num);
					}
        }

			}
		}
	};
</script>

<style lang="less" scoped>
  .icon-checkbox {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 120px;
    .choose {
      background-color: rgba(41, 186, 156, 0.16);
      border: solid 1px #29ba9c;
      color: #29ba9c;
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
    border-radius: 4px 0 0 4px;
  }
  .icon-item:last-child {
    border-radius: 0 4px 4px 0;
  }
</style>
