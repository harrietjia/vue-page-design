<template>
  <design-dialog
      wrapClassName="dialog-images-manager"
      title="选择坐标"
      :visible="visible"
      :width="960"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <!-- dialog-body -->
    <div style="height:50vh;overflow:auto">
      <a-input id="tipinput" style="width: 80%;margin-bottom: 10px;margin-right: 10px" v-model.trim="keywords" placeholder="请输入关键字搜索地址">
      </a-input>
      <a-button style="width:90px;" type="primary" @click.stop="search">搜索</a-button>
      <div id="map-wrapper"></div>
    </div>

  </design-dialog>
</template>

<script>
	// 拖拽

	export default {
		name: 'map-choose',

		props: {
			value: {
				type: Object,
				default: {}
			},
			// 配置项
			config: {
				type: Object,
				required: true,
			},
			// 根配置
			rootConfig: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
        location: {
          address: '地址',
	        lng: "",
          lat: "",
        },
				keywords: '',
				visible: false,
				placeSearch: null,
        map: null,
			};
		},
		watch: {
			value(newVal) {
				// this.location = newVal;
			},
		},
    mounted() {

    },
		methods: {
			initMap() {
				let that = this;

				if(this.location.lng) {
					this.map = new  AMap.Map('map-wrapper',{
						resizeEnable: true, //是否监控地图容器尺寸变化
						zoom: 15,  //指定缩放级别
						viewMode: '3D',
						center: [this.location.lng, this.location.lat] //初始化地图中心点
					});
        }else {
					this.map = new  AMap.Map('map-wrapper',{
						resizeEnable: true, //是否监控地图容器尺寸变化
						zoom: 10,  //指定缩放级别
						viewMode: '3D',
					});
        }


				//经纬度转地址  逆地址解析
				var geocoder = new AMap.Geocoder({
					radius: 1000 //范围，默认：500
				});

				AMap.plugin([
					'AMap.ControlBar',
				], () => {
					// 添加 3D 罗盘控制
					this.map.addControl(new AMap.ControlBar());
				});

				// 创建一个 Marker 实例：
				var marker = new AMap.Marker({
					position: new AMap.LngLat(116.39, 39.9),
					// icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
					// 设置是否可以拖拽
					draggable: true,
					cursor: 'move',
					// 设置拖拽效果
					// raiseOnDrag: true
					// 	title: '北京'
				});

				// 将创建的点标记添加到已有的地图实例：
				this.map.add(marker);

				this.map.on('click', (ev)=> {
					// 触发事件的对象
					// var target = ev.target;
					// 触发事件的地理坐标，AMap.LngLat 类型
					// var lnglat = ev.lnglat;
					// 触发事件的像素坐标，AMap.Pixel 类型
					// var pixel = ev.pixel;
					// 触发事件类型
					// var type = ev.type;

					that.location.lng = ev.lnglat.lng;
					that.location.lat = ev.lnglat.lat;
					marker.setPosition([ev.lnglat.lng, ev.lnglat.lat]); //更新点标记位置

					geocoder.getAddress([ev.lnglat.lng, ev.lnglat.lat], function(status, result) {
						if (status === 'complete'&&result.regeocode) {
							that.location.address = result.regeocode.formattedAddress;
							// console.log(that.location,'click')
						}else{
							that.location.address = '';
							console.error('根据经纬度查询地址失败')
						}
					});

					// console.log(target,lnglat,pixel,type)
				});

				marker.on('dragend', showInfoM);

				function showInfoM(e) {
					// console.log(e.lnglat,'您拖拽了marker！')
					that.location.lng = e.lnglat.lng;
					that.location.lat = e.lnglat.lat;

					geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(status, result) {
						if (status === 'complete'&&result.regeocode) {
							that.location.address = result.regeocode.formattedAddress;
							// console.log(that.location,'dragend')
						}else{
							that.location.address = '';
							console.error('根据经纬度查询地址失败')
						}
					});
				}

				//输入提示
				var autoOptions = {
					input: "tipinput"
				};
				var auto = new AMap.Autocomplete(autoOptions);
				this.placeSearch = new AMap.PlaceSearch({
					map: this.map
				});  //构造地点查询类

				AMap.event.addListener(auto, "select", this.select);//注册监听，当选中某条记录时会触发

				AMap.event.addListener(this.placeSearch, 'markerClick', function (e) {
					that.map.remove(marker);
					that.location.lng = e.data.location.lng;
					that.location.lat = e.data.location.lat;
					that.location.address = e.data.pname + e.data.cityname + e.data.adname + e.data.address;
					// console.log(that.location,'markerClick')
				})

			},
			select(e) {
				this.placeSearch.setCity(e.poi.adcode);
				this.placeSearch.search(e.poi.name);  //关键字查询查询
			},
      search() {
	      this.placeSearch.search(this.keywords, function(status, result) {
		      // 搜索成功时，result即是对应的匹配数据
		      // console.log(status,result)
	      })
      },
			destroyMap() {
				this.map && this.map.destroy();
			},

			show (location) {
				this.visible = true;
				if(location) {
					this.location = location;
        }

				// 延迟1秒让弹窗初始化地图
				setTimeout(()=> {
					this.initMap();
        },1000)
			},
			/**
			 * 弹窗按钮 - 确认
			 */
			handle_confirm () {
				this.$emit('confirm', this.location);
				this.destroyMap();
				this.visible = false;
			},

			/**
			 * 弹窗按钮 - 取消
			 */
			handle_cancel () {
				this.destroyMap();
				this.visible = false;
			},
		},
	};
</script>

<style lang="less" scoped>
  #map-wrapper{
    width: 100%;
    height: 45vh;
  }

</style>
