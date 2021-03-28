<template>
  <div style="display: flex;margin-top: 20px" :class="`form-item col-${config.col || 1}`" v-show="config.showBy ? rootConfig[config.showBy].value: true">
    <span class="config-title" style="flex: 1;align-self: center">{{ config.title }}</span>
    <div class="icon-checkbox">
      <div class="icon-item" :class="[icon.includes('1')?'choose':'']" @click="handleInputChange('1')">
        <i class="iconfont icon-ht_textstyle_blod"></i>
      </div>
      <div class="icon-item" :class="[icon.includes('2')?'choose':'']" @click="handleInputChange('2')">
        <i class="iconfont icon-ht_textstyle_italic"></i>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['value', 'config', 'rootConfig'],

		computed: {
			icon: {
				get () {
					return this.value;
				},
				set (newValue) {
					this.$emit('input', newValue);
				}
			}
		},

		methods: {
			handleInputChange (num) {
				if(this.icon.includes(num)) {
					for(let i = 0;i<this.icon.length;i++) {
						if(this.icon[i] == num) {
							this.icon.splice(i, 1);
            }
          }
        }else {
					this.icon.push(num);
        }
			}
    }
	};
</script>

<style lang="less" scoped>
  .icon-checkbox {
    display: flex;
    flex: 0 0 120px;
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
    border-radius: 4px 0 0 4px;
  }
  .icon-item:last-child {
    border-radius: 0 4px 4px 0;
  }
</style>
