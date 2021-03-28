<template>
  <design-dialog
      wrapClassName="dialog-images-manager"
      title="选择链接"
      :visible="visible"
      width="1000px"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <!-- dialog-body -->
    <div style="height:50vh;overflow:auto">
      <!--小程序-->
      <a-tabs v-model="active" v-if="fun.getKey('page_sort') == 2 || page_sort == 2" @change="callback">
        <a-tab-pane key="1" tab="系统页面">
          <div class="link-box" v-if="is_from === 'store'">
            <p class="title">门店页面</p>
            <div class="links">
              <span @click="handleChange('/packageC/o2o/o2oStore/o2oStore?store_id=','store')" :class="{active: local_link === '/packageC/o2o/o2oStore/o2oStore?store_id='}">门店商品</span>
              <span @click="handleChange('/packageC/cashier/cashier_pay/cashier_pay?store_id=','store')" :class="{active: local_link === '/packageC/cashier/cashier_pay/cashier_pay?store_id='}">门店优惠买单</span>
              <span @click="handleChange('/packageC/o2o/store_coupon/store_coupon?id=','store')" :class="{active: local_link === '/packageC/o2o/store_coupon/store_coupon?id='}">门店优惠券</span>
              <span @click="handleChange('/packageG/member_v2/member_v2')" :class="{active: local_link === '/packageG/member_v2/member_v2'}">会员中心</span>
              <span @click="handleChange('/packageA/member/myOrder_v2/myOrder_v2')" :class="{active: local_link === '/packageA/member/myOrder_v2/myOrder_v2'}">我的订单</span>
            </div>
          </div>
          <div class="link-box" v-if="is_from !== 'store'">
            <p class="title">商城页面</p>
            <div class="links">
              <span @click="handleChange('/packageG/index/index')" :class="{active: local_link === '/packageG/index/index'}">商城首页</span>
              <span @click="handleChange('/packageG/pages/category_v2/category_v2')" :class="{active: local_link === '/packageG/pages/category_v2/category_v2'}">分类导航</span>
              <span @click="handleChange('/packageC/member/searchAll/searchAll')" :class="{active: local_link === '/packageC/member/searchAll/searchAll'}">全部商品</span>
              <span @click="handleChange('/packageC/o2o/o2oHome/o2oHome')" :class="{active: local_link === '/packageC/o2o/o2oHome/o2oHome'}">门店聚合页</span>
            </div>
          </div>
          <div class="link-box" v-if="is_from !== 'store'">
            <p class="title">会员中心</p>
            <div class="links">
              <span @click="handleChange('/packageG/member_v2/member_v2')" :class="{active: local_link === '/packageG/member_v2/member_v2'}">会员中心</span>
              <span @click="handleChange('/packageA/member/myOrder_v2/myOrder_v2')" :class="{active: local_link === '/packageA/member/myOrder_v2/myOrder_v2'}">我的订单</span>
              <span @click="handleChange('/packageG/pages/buy/cart_v2/cart_v2')" :class="{active: local_link === '/packageG/pages/buy/cart_v2/cart_v2'}">购物车</span>
              <span @click="handleChange('/packageD/member/collection/collection')" :class="{active: local_link === '/packageD/member/collection/collection'}">我的收藏</span>
              <span @click="handleChange('/packageD/member/footprint/footprint')" :class="{active: local_link === '/packageD/member/footprint/footprint'}">我的足迹</span>
              <span @click="handleChange('/packageA/member/coupon_v2/coupon_v2')" :class="{active: local_link === '/packageA/member/coupon_v2/coupon_v2'}">我的优惠券</span>
              <span @click="handleChange('/packageA/member/balance/balance/balance')" :class="{active: local_link === '/packageA/member/balance/balance/balance'}">会员充值</span>
              <span @click="handleChange('/packageA/member/balance/detailed/detailed')" :class="{active: local_link === '/packageA/member/balance/detailed/detailed'}">余额明细</span>
            </div>
          </div>
          <div class="link-box" v-if="is_from !== 'store'">
            <p class="title">其他链接</p>
            <div class="links">
              <span @click="handleChange('/packageA/member/info/info')" :class="{active: local_link === '/packageA/member/info/info'}">会员信息</span>
              <span @click="handleChange('/packageB/member/integral/integral')" :class="{active: local_link === '/packageB/member/Integral_love/Integral_love'}">积分</span>
              <!--<span @click="handleChange('/packageB/member/Integral_love/Integral_love')" :class="{active: local_link === '/packageB/member/income/income/income'}">收入</span>-->
              <span @click="handleChange('/packageA/member/withdrawal/withdrawal')" :class="{active: local_link === '/packageA/member/withdrawal/withdrawal'}">收入提现</span>
              <span @click="handleChange('/packageA/member/extension/incomedetails/incomedetails')" :class="{active: local_link === '/packageA/member/extension/incomedetails/incomedetails'}">收入明细</span>
              <!--<span @click="handleChange('/packageA/member/presentationRecord_v2/presentationRecord_v2?orderType=extension')" :class="{active: local_link === '/packageA/member/presentationRecord_v2/presentationRecord_v2?orderType=extension'}">提现记录</span>-->
              <span @click="handleChange('/packageD/member/addressList/addressList')" :class="{active: local_link === '/packageD/member/addressList/addressList'}">收货地址</span>
              <span @click="handleChange('/packageD/member/addressAdd_v2/addressAdd_v2')" :class="{active: local_link === '/packageD/member/addressAdd_v2/addressAdd_v2'}">添加收货地址</span>
              <span @click="handleChange('/packageD/member/myRelationship/myRelationship')" :class="{active: local_link === '/packageD/member/myRelationship/myRelationship'}">我的客户</span>
              <span @click="handleChange('/packageD/member/myEvaluation/myEvaluation')" :class="{active: local_link === '/packageD/member/myEvaluation/myEvaluation'}">我的评价</span>
              <span @click="handleChange('/packageG/pages/member/extension/extension')" :class="{active: local_link === '/packageG/pages/member/extension/extension'}">推广中心</span>
              <span @click="handleChange('/packageA/member/distribution/distribution')" :class="{active: local_link === '/packageA/member/distribution/distribution'}">分销商</span>
              <span @click="handleChange('/packageA/member/extension/distributionOrder/distributionOrder')" :class="{active: local_link === '/packageA/member/extension/distributionOrder/distributionOrder'}">分销订单</span>
              <span @click="handleChange('/packageD/member/myOrder/Aftersaleslist/Aftersaleslist')" :class="{active: local_link === '/packageD/member/myOrder/Aftersaleslist/Aftersaleslist'}">售后列表</span>
              <span @click="handleChange('/packageD/coupon/coupon_store')" :class="{active: local_link === '/packageD/coupon/coupon_store'}">领券中心</span>
              <span @click="handleChange('/packageB/member/category/search_v2/search_v2')" :class="{active: local_link === '/packageB/member/category/search_v2/search_v2'}">搜索</span>
              <span @click="handleChange('/packageB/member/category/brand_v2/brand_v2')" :class="{active: local_link === '/packageB/member/category/brand_v2/brand_v2'}">品牌列表</span>
              <span @click="handleChange('/packageA/member/course/VoiceList/VoiceList')" :class="{active: local_link === '/packageA/member/course/VoiceList/VoiceList'}">音频文章</span>
              <span @click="handleChange('/packageB/member/business_card/CardCenter/CardCenter')" :class="{active: local_link === '/packageB/member/business_card/CardCenter/CardCenter'}">名片中心</span>
              <span @click="handleChange('/packageE/Rankings/Rankings')" :class="{active: local_link === '/packageE/Rankings/Rankings'}">排行榜</span>
              <span @click="handleChange('/packageD/directSeeding/liveList/liveList')" :class="{active: local_link === '/packageD/directSeeding/liveList/liveList'}">带货直播列表</span>
              <span @click="handleChange('/packageB/member/group/GroupList/GroupList')" :class="{active: local_link === '/packageB/member/group/GroupList/GroupList'}">拼团列表</span>
              <span @click="handleChange('/packageB/member/group/MyGroups/MyGroups')" :class="{active: local_link === '/packageB/member/group/MyGroups/MyGroups'}">我的拼团</span>
              <span @click="handleChange('/packageC/video_goods/VideoList/VideoList')" :class="{active: local_link === '/packageC/video_goods/VideoList/VideoList'}">发现视频</span>
              <span @click="handleChange('/packageC/micro_communities/microIndex/microIndex')" :class="{active: local_link === '/packageC/micro_communities/microIndex/microIndex'}">微社区</span>
              <span @click="handleChange('/packageA/member/sign/sign')" :class="{active: local_link === '/packageA/member/sign/sign'}">签到</span>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="商品链接" force-render v-if="is_from !== 'store'">
          <a-input-search
              v-model.trim="keywords"
              placeholder="请输入商品名称进行搜索（多规格商品不支持一键下单）  直接点击搜索可显示全部商品"
              enter-button="搜索"
              @search="currentChange(1)"
          />
          <a-table class="goods_tab"
                   :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio'}"
                   :columns="good_columns" rowKey="id"
                   :data-source="main_page_list"
                   :pagination="{
                      pageSize: main_page_pagination.pageSize,
                      current: main_page_pagination.current,
                      total: main_page_pagination.total,
                      showQuickJumper: true,
                      onChange: currentChange
                  }"
          >
            <div slot="goods_img" class="goods_img" slot-scope="text, record">
              <img :src="record.thumb"/>
            </div>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="3" tab="商品分类" force-render v-if="is_from !== 'store'">
          <a-input-search
              v-model.trim="keywords_tree"
              placeholder="请输入分类名称进行搜索"
              enter-button="搜索"
              @search="currentChangeTree(1)"
          />
          <a-table class="goods_tab"
                   :row-selection="{ selectedRowKeys: selectedRowKeys_tree, onChange: onSelectChangeTree, type: 'radio'}"
                   :columns="tree_columns" rowKey="id"
                   :data-source="main_page_list_tree"
                   :pagination="{
                      pageSize: main_page_pagination_tree.pageSize,
                      current: main_page_pagination_tree.current,
                      total: main_page_pagination_tree.total,
                      showQuickJumper: true,
                      onChange: currentChangeTree
                  }"
          >
            <div slot="name" slot-scope="text, record">
              <span>{{record.name}} </span><span class="gray ml" v-if="is_search">{{record.level == 1 ? '一' : record.level == 2 ? '二' : '三'}}级分类；</span><span class="gray ml" v-if="record.belongs_to_children && is_search">上级分类：<span v-if="record.belongs_to_children.belongs_to_children">{{record.belongs_to_children.belongs_to_children.name}} > </span>{{record.belongs_to_children.name}}</span>
            </div>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="4" tab="商品品牌" force-render v-if="is_from !== 'store'">
          <a-input-search
              v-model.trim="keywords_brand"
              placeholder="请输入商品品牌进行搜索  直接点击搜索可显示全部品牌"
              enter-button="搜索"
              @search="currentChangeBrand(1)"
          />
          <a-table class="goods_tab"
                   :row-selection="{ selectedRowKeys: selectedRowKeys_brand, onChange: onSelectChangeBrand, type: 'radio'}"
                   :columns="brand_columns" rowKey="id"
                   :data-source="main_page_list_brand"
                   :pagination="{
                      pageSize: main_page_pagination_brand.pageSize,
                      current: main_page_pagination_brand.current,
                      total: main_page_pagination_brand.total,
                      showQuickJumper: true,
                      onChange: currentChangeBrand
                  }"
          >
          </a-table>
        </a-tab-pane>
      </a-tabs>

      <!--H5-->
      <a-tabs v-model="active" v-else @change="callback">
        <a-tab-pane key="1" tab="系统页面">
          <div class="link-box" v-if="is_from === 'store'">
            <p class="title">门店页面</p>
            <div class="links">
              <span @click="handleChange('o2o/store_v2/','store')" :class="{active: local_link === 'o2o/store_v2/'}">门店商品</span>
              <span @click="handleChange('cashier_pay/','store')" :class="{active: local_link === 'cashier_pay/'}">优惠买单</span>
              <span @click="handleChange('o2o/cupcon/','store')" :class="{active: local_link === 'o2o/cupcon/'}">门店优惠券</span>
              <span @click="handleChange('member')" :class="{active: local_link === 'member'}">会员中心</span>
              <span @click="handleChange('member/orderList/0')" :class="{active: local_link === 'member/orderList/0'}">我的订单</span>
            </div>
          </div>
          <div class="link-box" v-if="is_from !== 'store'">
            <p class="title">商城页面</p>
            <div class="links">
              <span @click="handleChange('home')" :class="{active: local_link === 'home'}">商城首页</span>
              <span @click="handleChange('category')" :class="{active: local_link === 'category'}">分类导航</span>
              <span @click="handleChange('searchAll')" :class="{active: local_link === 'searchAll'}">全部商品</span>
              <span @click="handleChange('o2o/home')" :class="{active: local_link === 'o2o/home'}">门店聚合页</span>
            </div>
          </div>
          <div class="link-box" v-if="is_from !== 'store'">
            <p class="title">会员中心</p>
            <div class="links">
              <span @click="handleChange('member')" :class="{active: local_link === 'member'}">会员中心</span>
              <span @click="handleChange('member/orderList/0')" :class="{active: local_link === 'member/orderList/0'}">我的订单</span>
              <span @click="handleChange('cart')" :class="{active: local_link === 'cart'}">购物车</span>
              <span @click="handleChange('member/collection')" :class="{active: local_link === 'member/collection'}">我的收藏</span>
              <span @click="handleChange('member/footprint')" :class="{active: local_link === 'member/footprint'}">我的足迹</span>
              <span @click="handleChange('coupon/coupon_index')" :class="{active: local_link === 'coupon/coupon_index'}">我的优惠券</span>
              <span @click="handleChange('member/balance')" :class="{active: local_link === 'member/balance'}">会员充值</span>
              <span @click="handleChange('member/detailed')" :class="{active: local_link === 'member/detailed'}">余额明细</span>
            </div>
          </div>
          <div class="link-box" v-if="is_from !== 'store'">
            <p class="title">其他链接</p>
            <div class="links">
              <span @click="handleChange('member/info')" :class="{active: local_link === 'member/info'}">会员信息</span>
              <span @click="handleChange('member/integral_v2')" :class="{active: local_link === 'member/integral_v2'}">积分</span>
              <!--<span @click="handleChange('member/income')" :class="{active: local_link === 'member/income'}">收入</span>-->
              <span @click="handleChange('member/withdrawal')" :class="{active: local_link === 'member/withdrawal'}">收入提现</span>
              <span @click="handleChange('member/incomedetails')" :class="{active: local_link === 'member/incomedetails'}">收入明细</span>
              <!--<span @click="handleChange('member/presentationRecord')" :class="{active: local_link === 'member/presentationRecord'}">提现记录</span>-->
              <span @click="handleChange('member/address')" :class="{active: local_link === 'member/address'}">收货地址</span>
              <span @click="handleChange('member/appendAddress')" :class="{active: local_link === 'member/appendAddress'}">添加收货地址</span>
              <span @click="handleChange('member/myrelationship')" :class="{active: local_link === 'member/myrelationship'}">我的客户</span>
              <span @click="handleChange('member/myEvaluation')" :class="{active: local_link === 'member/myEvaluation'}">我的评价</span>
              <span @click="handleChange('member/extension')" :class="{active: local_link === 'member/extension'}">推广中心</span>
              <span @click="handleChange('extension/distribution')" :class="{active: local_link === 'extension/distribution'}">分销商</span>
              <span @click="handleChange('extension/distributionOrder')" :class="{active: local_link === 'extension/distributionOrder'}">分销订单</span>
              <span @click="handleChange('member/aftersaleslist')" :class="{active: local_link === 'member/aftersaleslist'}">售后列表</span>
              <span @click="handleChange('coupon/coupon_store')" :class="{active: local_link === 'coupon/coupon_store'}">领券中心</span>
              <span @click="handleChange('search')" :class="{active: local_link === 'search'}">搜索</span>
              <span @click="handleChange('login')" :class="{active: local_link === 'login'}">登录</span>
              <span @click="handleChange('register')" :class="{active: local_link === 'register'}">注册</span>
              <span @click="handleChange('brand')" :class="{active: local_link === 'brand'}">品牌列表</span>
              <span @click="handleChange('voiceList')" :class="{active: local_link === 'voiceList'}">音频文章</span>
              <span @click="handleChange('business_card/card_center')" :class="{active: local_link === 'business_card/card_center'}">名片中心</span>
              <span @click="handleChange('Rankings')" :class="{active: local_link === 'Rankings'}">排行榜</span>
              <span @click="handleChange('liveList')" :class="{active: local_link === 'liveList'}">带货直播列表</span>
              <span @click="handleChange('group_list')" :class="{active: local_link === 'group_list'}">拼团列表</span>
              <span @click="handleChange('mygroups')" :class="{active: local_link === 'mygroups'}">我的拼团</span>
              <span @click="handleChange('videoList')" :class="{active: local_link === 'videoList'}">发现视频</span>
              <span @click="handleChange('microHome/microIndex')" :class="{active: local_link === 'microHome/microIndex'}">微社区</span>
              <span @click="handleChange('member/sign')" :class="{active: local_link === 'member/sign'}">签到</span>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="商品链接" force-render v-if="is_from !== 'store'">
          <a-input-search
              v-model.trim="keywords"
              placeholder="请输入商品名称进行搜索（多规格商品不支持一键下单）  直接点击搜索可显示全部商品"
              enter-button="搜索"
              @search="currentChange(1)"
          />
          <a-table class="goods_tab"
                   :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio'}"
                   :columns="good_columns" rowKey="id"
                   :data-source="main_page_list"
                   :pagination="{
                      pageSize: main_page_pagination.pageSize,
                      current: main_page_pagination.current,
                      total: main_page_pagination.total,
                      showQuickJumper: true,
                      onChange: currentChange
                  }"
          >
            <div slot="goods_img" class="goods_img" slot-scope="text, record">
              <img :src="record.thumb"/>
            </div>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="3" tab="商品分类" force-render v-if="is_from !== 'store'">
          <a-input-search
              v-model.trim="keywords_tree"
              placeholder="请输入分类名称进行搜索"
              enter-button="搜索"
              @search="currentChangeTree(1)"
          />
          <a-table class="goods_tab"
                   :row-selection="{ selectedRowKeys: selectedRowKeys_tree, onChange: onSelectChangeTree, type: 'radio'}"
                   :columns="tree_columns" rowKey="id"
                   :data-source="main_page_list_tree"
                   :pagination="{
                      pageSize: main_page_pagination_tree.pageSize,
                      current: main_page_pagination_tree.current,
                      total: main_page_pagination_tree.total,
                      showQuickJumper: true,
                      onChange: currentChangeTree
                  }"
          >
            <div slot="name" slot-scope="text, record">
              <span>{{record.name}} </span><span class="gray ml" v-if="is_search">{{record.level == 1 ? '一' : record.level == 2 ? '二' : '三'}}级分类；</span><span class="gray ml" v-if="record.belongs_to_children && is_search">上级分类：<span v-if="record.belongs_to_children.belongs_to_children">{{record.belongs_to_children.belongs_to_children.name}} > </span>{{record.belongs_to_children.name}}</span>
            </div>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="4" tab="商品品牌" force-render v-if="is_from !== 'store'">
          <a-input-search
              v-model.trim="keywords_brand"
              placeholder="请输入商品品牌进行搜索  直接点击搜索可显示全部品牌"
              enter-button="搜索"
              @search="currentChangeBrand(1)"
          />
          <a-table class="goods_tab"
                   :row-selection="{ selectedRowKeys: selectedRowKeys_brand, onChange: onSelectChangeBrand, type: 'radio'}"
                   :columns="brand_columns" rowKey="id"
                   :data-source="main_page_list_brand"
                   :pagination="{
                      pageSize: main_page_pagination_brand.pageSize,
                      current: main_page_pagination_brand.current,
                      total: main_page_pagination_brand.total,
                      showQuickJumper: true,
                      onChange: currentChangeBrand
                  }"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="5" tab="自定义链接">
          <span style="margin-left: 3%">链接地址： </span><a-input v-model.trim="local_link" placeholder="请以https://开头" style="width: 85%"/>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!--<div style="position: absolute;bottom: 80px;left: 50%;transform: translateX(-50%);">-->
      <!--<a-pagination-->
          <!--style="margin-top: 15px;text-align: center"-->
          <!--showQuickJumper-->
          <!--:pageSize="main_page_pagination.pageSize"-->
          <!--:current="main_page_pagination.current"-->
          <!--:total="main_page_pagination.total"-->
          <!--@change="currentChange"/>-->
    <!--</div>-->

  </design-dialog>
</template>

<script>
	const good_columns = [
		{title: '商品ID', align: 'center', dataIndex: 'id', },
		{
			title: '商品图片',
			align: 'center',
			dataIndex: 'thumb',
			width: 100,
			scopedSlots: {customRender: 'goods_img'}
		},
		{title: '商品名称', align: 'center', dataIndex: 'title', width: 350,},
		{title: '商品原价', align: 'center', dataIndex: 'market_price', },
		{title: '商品现价', align: 'center', dataIndex: 'price',},
	];

	const tree_columns = [
		{title: '分类ID', align: 'center', dataIndex: 'id', width: 300, },
		{title: '分类标题', align: 'left', dataIndex: 'name', scopedSlots: {customRender: 'name'}},
	];

	const brand_columns = [
		{title: '品牌ID', align: 'center', dataIndex: 'id', width: 300, },
		{title: '品牌标题', align: 'center', dataIndex: 'name', },
	];

	export default {
		name: 'link-modal',

		props: {
			value: {
				type: String,
				default: ""
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
				good_columns,
				tree_columns,
				brand_columns,

        //门店装修标识
				is_from: '',
        choose_store: false,

				page_sort: '',
				active: '1',
				local_link: '',
				visible: false,

        //商品列表
				selectedRowKeys: [],
				keywords: '',
				main_page_list: [],
				// 主分页的页码
				main_page_pagination: {
					current: 1,
					pageSize: 20,
					total: 0
				},

				//分类列表
				selectedRowKeys_tree: [],
				keywords_tree: '',
        is_search: false,
				main_page_list_tree: [],
				// 主分页的页码
				main_page_pagination_tree: {
					current: 1,
					pageSize: 20,
					total: 0
				},

				//品牌列表
				selectedRowKeys_brand: [],
				keywords_brand: '',
				main_page_list_brand: [],
				// 主分页的页码
				main_page_pagination_brand: {
					current: 1,
					pageSize: 20,
					total: 0
				},
			};
		},
    mounted() {
			if(this.fun.getKey('store_id') && window.location.href.indexOf('store_design') > -1) {
				this.is_from = 'store';
      }
    },
		methods: {
			show (str) {
				this.active = '1';
				this.local_link = '';
				this.selectedRowKeys = [];
				this.selectedRowKeys_tree = [];
				this.selectedRowKeys_brand = [];
				this.visible = true;
				if(str) {
					this.page_sort = str;
        }
			},
			/**
			 * 弹窗按钮 - 确认
			 */
			handle_confirm () {
				let link = '';
				switch(this.active) {
					case '1':
						if(this.fun.getKey('page_sort') == 2 || this.page_sort == 2) {
							if(this.is_from === 'store' && this.choose_store) {
								link = this.local_link + this.fun.getKey('store_id');
							}else {
								link = this.local_link;
							}
            }else {
							if(this.is_from === 'store' && this.choose_store) {
								link = this.fun.getSiteRoot()+'/addons/yun_shop/?menu#/'+this.local_link+this.fun.getKey('store_id')+'?i='+this.fun.getKeyByI();
              }else {
								link = this.fun.getSiteRoot()+'/addons/yun_shop/?menu#/'+this.local_link+'?i='+this.fun.getKeyByI();
              }
            }
						break;
					case '2':
            if(this.selectedRowKeys.length > 0) {
	            if(this.fun.getKey('page_sort') == 2 || this.page_sort == 2) {
		            link = '/packageA/detail_v2/detail_v2?id='+this.selectedRowKeys[0];
	            }else {
		            link = this.fun.getSiteRoot()+'/addons/yun_shop/?menu#/goods/'+this.selectedRowKeys[0]+'?i='+this.fun.getKeyByI();
	            }
            }else {
							link = '';
            }
						break;
					case '3':
						if(this.selectedRowKeys_tree.length > 0) {
							if(this.fun.getKey('page_sort') == 2 || this.page_sort == 2) {
								link = '/packageB/member/category/catelist/catelist?id='+this.selectedRowKeys_tree[0];
							}else {
								link = this.fun.getSiteRoot()+'/addons/yun_shop/?menu#/catelist/'+this.selectedRowKeys_tree[0]+'?i='+this.fun.getKeyByI();
							}
						}else {
							link = '';
						}
						break;
					case '4':
						if(this.selectedRowKeys_brand.length > 0) {
							if(this.fun.getKey('page_sort') == 2 || this.page_sort == 2) {
								link = '/packageB/member/category/brandgoods/brandgoods?id='+this.selectedRowKeys_brand[0];
							}else {
								link = this.fun.getSiteRoot()+'/addons/yun_shop/?menu#/brandgoods/'+this.selectedRowKeys_brand[0]+'?i='+this.fun.getKeyByI();
							}
						}else {
							link = '';
						}
						break;
					case '5':
						link = this.local_link;
						break;
					default:
						return '';
				}
				this.$emit('confirm', link);
				this.visible = false;
			},

			handleChange (value, flag) {
				if(flag === 'store') {
					this.choose_store = true;
        }else {
					this.choose_store = false;
        }
				this.local_link = value;
			},

			onSelectChange(selectedRowKeys,selectedRows) {
				this.selectedRowKeys = selectedRowKeys;
				// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			},
			onSelectChangeTree(selectedRowKeys,selectedRows) {
				this.selectedRowKeys_tree = selectedRowKeys;
      },
			onSelectChangeBrand(selectedRowKeys,selectedRows) {
				this.selectedRowKeys_brand = selectedRowKeys;
      },
			currentChange(page) {
				this.main_page_pagination.current = page;
				$http
						.post('plugin.decorate.admin.decorate-common.search-goods',{
							page: page,
							goods_name: this.keywords,
							pageSize: 20
						},"loading")
						.then(response => {
							if (response.result === 1) {
                this.main_page_pagination.total = response.data.total;
                this.main_page_pagination.pageSize = response.data.per_page;
                this.main_page_list = response.data.data;
							} else {
								this.main_page_list = [];
								if (response.data.status === -1) {
									this.currentChange(1);
								}
								// this.$message.error(response.msg);
							}
						})
						.catch(err => {
							console.error(err);
						});
			},
			callback() {
				if(this.active == 3 && this.main_page_list_tree.length <= 0) {
					this.currentChangeTree(1);
        }
      },
			currentChangeTree(page) {
				this.main_page_pagination_tree.current = page;
				let url = "";
				let json = {};
				if(this.keywords_tree) {
					this.is_search = true;
					url = "plugin.decorate.admin.decorate-common.get-category";
					json = {
						page: page,
						categoryName: this.keywords_tree
					};
        }else {
					this.is_search = false;
					url = "plugin.decorate.admin.decorate-common.search-category";
					json = {
						page: page
					};
        }

				$http
						.post(url,json,"loading")
						.then(response => {
							if (response.result === 1) {
								this.main_page_pagination_tree.total = response.data.total;
								this.main_page_pagination_tree.pageSize = response.data.per_page;
								this.main_page_list_tree = response.data.data;
							} else {
								this.main_page_list_tree = [];
								if (response.data.status === -1) {
									this.currentChangeTree(1);
								}
							}
						})
						.catch(err => {
							console.error(err);
						});
			},
			currentChangeBrand(page) {
				this.main_page_pagination_brand.current = page;
				$http
						.post('plugin.decorate.admin.decorate-common.get-brand-list',{
							page: page,
							brand_name: this.keywords_brand,
						},"loading")
						.then(response => {
							if (response.result === 1) {
								this.main_page_pagination_brand.total = response.data.total;
								this.main_page_pagination_brand.pageSize = response.data.per_page;
								this.main_page_list_brand = response.data.data;
							} else {
								this.main_page_list_brand = [];
								if (response.data.status === -1) {
									this.currentChangeBrand(1);
								}
								// this.$message.error(response.msg);
							}
						})
						.catch(err => {
							console.error(err);
						});
			},

			/**
			 * 弹窗按钮 - 取消
			 */
			handle_cancel () {
				this.visible = false;
			},
		},
	};
</script>

<style lang="less" scoped>
  .link-box {
    margin: 10px 10px;
    .title {
      position: relative;
      font-weight: bold;
      margin-left: 10px;
      color: #29ba9c;
      font-size: 15px;
    }
    .title::before {
      content: "";
      width: 5px;
      height: 20px;
      position: absolute;
      top: 0;
      left: -10px;
      background: #29ba9c;
    }
    .links {
      margin-left: 15px;
      display: flex;
      flex-wrap: wrap;
      font-size: 15px;
      span {
        cursor: pointer;
        margin: 10px 0 0 20px;
      }
      span.active {
        color: #29ba9c;
        font-weight: bold;
      }
    }
  }

  .search-result {
    margin-top: 20px;
  }

  .goods_tab {
    margin-top: 15px;
    // 序号
    .number {
      width: 80px;
      margin-left: 10px;
    }

    .goods_img {
      height: 60px;
      line-height: 60px;

      & > img {
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
      }
    }

    .ant-checkbox-wrapper, .ant-checkbox-wrapper + .ant-checkbox-wrapper {
      margin-right: 0px !important;
    }
  }

  .replace-goods-wrap {
    padding-right: 22px;

    .title {
      margin-bottom: 6px;
    }

    .img {
      margin-top: 12px;
      margin-bottom: 6px;
    }

    .goods_image {
      height: 440px;

      & > img {
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
      }
    }
  }

  .gray {
    font-size: 12px;
    color: #adadad;
  }

  .ml {
    margin-left: 10px;
  }
</style>
