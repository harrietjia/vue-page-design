<!-- 多选 -->
<template>
  <div class="form-item col-1">
    <div style="display: flex">
      <span class="config-title" v-show="config.showBy ? rootConfig[config.showBy].value: true"> {{ config.title }} </span>
      <a-tooltip v-if="config.tips">
        <template slot="title">
          Tips: {{config.tips}}
        </template>
        <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
      </a-tooltip>
    </div>

    <el-checkbox style="margin-bottom: 10px" v-if="options.length > 0" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

    <el-checkbox-group v-model="local_value" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="(x, index) in options" v-if="x && notShow.indexOf(x.url) < 0" :label="x.url || x.value" :key="index">{{x.title || x.label}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
	export default {
		props: ['value', 'config', 'rootConfig'],
    data() {
			return {
				checkAll: false,
				isIndeterminate: true,
        h5_none: ['coupons_qrcode'],
        mini_none: ['lifeService','uidCode','codePage','teamSell','eliteAwardHome','admarketHome','Bonus','extendHelper','publish_manage','hireCarManage','TransHome','ReplenishmentApply','DeliveryTerminalApply','signIndex','contractListPlu', 'signIndexPlu', 'footprintMember'],
      }
    },

		computed: {
			notShow(){
				if( this.fun.getKey('page_sort') == 1) {
					return this.h5_none
        }else {
					return this.mini_none
				}
      },
			options() {
				if(this.config.from !== 'all' && this.$store.state.design.member_data[this.config.from]) {
					// 实用工具四个模块
					let options = this.$store.state.design.member_data[this.config.from].filter((item)=>{
						return this.notShow.indexOf(item.url) < 0
          });
					return options;
				}else if(this.config.from === 'all') {
					// 资产数据
					let options = [
						{label: "消费积分", value: "Integral_love"},
						{label: "白爱心值", value: "love_index_1"},
						{label: "爱心值", value: "love_index_2"},
						{label: "余额", value: "balance"},
						{label: "积分", value: "integral_v2"},
						{label: "提现", value: "extension"},
					];
					if(!this.$store.state.design.member_data.judgelove) {
						delete options[1];
						delete options[2];
					}
          if(!this.$store.state.design.member_data.judgeintegral) {
	          delete options[0];
          }
					return options;
				}else {
					return []
				}
      },
			local_value: {
				get () {
					let checkedCount = this.value.length;
					this.checkAll = checkedCount === this.options.length;
					this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
					return this.value.map(item => {
						return item.url || item.value
					});
				},
				set (newValue) {
					let icons = [];
					this.config.urls = newValue || [];
					this.options.map(item => {
						if(newValue.includes(item.url || item.value)){
							icons.push(item);
            }
					});
					this.$emit('input', icons);
				}
			}
		},
    mounted() {

    },
		methods: {
			handleCheckAllChange(val) {
				this.local_value = val ? this.options.map(item => { return item.url || item.value }) : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.options.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
			}
    }
	}
</script>

<style lang="less" scoped>

</style>
