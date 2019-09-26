<template>
	<view>		
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>	
		
		<!-- 导航区域 -->
		<view v-for="(menu,indexMenu) in ButtonsMenu" :key="indexMenu">
			<view class="cu-bar bg-white solid-bottom margin-top" >
				<view class="action">
					<text class="cuIcon-title text-orange "></text>{{menu.titleBlock}}
				</view>			
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in menu.buttons" :key="index" >
					<navigator :url="item.path">
						<view :class="['cuIcon-' + item.icon,'text-' + (item.color||'blue')]" style="font-size:30px;">						
							<view class="cu-tag badge" v-if="item.badge!=0 && item.badge!=null">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text>{{item.text}}</text>
					</navigator>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [
					{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
				],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				
				gridCol: 3,
				gridBorder: false,
				//仓库菜单
				ButtonsMenu:[
					{
						titleBlock:"demo",
						buttons:[
							{text:"登录页",icon:"cardboardfill",path:"../../pages/login/login",color:'red',badge:1},
							{text:"表单",icon:"cardboardfill",path:"../../pages/demo/form",color:'red',badge:2},
							{text:"列表",icon:"recordfill",path:"../../pages/demo/list"},
							{text:"搜索页",icon:"recordfill",path:"../../pages/demo/search"},
							{text:"表单验证",icon:"recordfill",path:"../../pages/demo/formValidate"},
							{text:"详情页",icon:"recordfill",path:"../../pages/demo/detail"},
							{text:"打印测试",icon:"recordfill",path:"../../pages/demo/list"},
							{text:"扫描测试",icon:"recordfill",path:"../../pages/demo/list"},
						],
					},{
						titleBlock:"面料仓库",
						buttons:[
							{text:"生产入库",icon:"cardboardfill",path:""},
							{text:"采购入库",icon:"recordfill",path:""},
							{text:"客供入库",icon:"picfill",path:""},
							{text:"其他入库",icon:"noticefill",path:""},
							{text:"入库查询",icon:"upstagefill",path:""},
							{text:"领用出库",icon:"clothesfill",path:""},
							{text:"其他出库",icon:"discoverfill",path:""},							
							{text:"出库查询",icon:"questionfill",path:""},
							{text:"补打标签",icon:"commandfill",path:""},
							{text:"库位调整",icon:"brandfill",path:""},
							{text:"库存盘点",icon:"noticefill",path:""},
						],
					},{
						titleBlock:"辅料仓库",
						buttons:[
							{text:"采购入库",icon:"cardboardfill",path:""},
							{text:"客供入库",icon:"recordfill",path:""},
							{text:"其他入库",icon:"picfill",path:""},
							{text:"入库查询",icon:"noticefill",path:""},
							{text:"领用出库",icon:"upstagefill",path:""},
							{text:"其他出库",icon:"clothesfill",path:""},							
							{text:"出库查询",icon:"discoverfill",path:""},
							{text:"补打标签",icon:"questionfill",path:""},
							{text:"库位调整",icon:"commandfill",path:""},
							{text:"库存盘点",icon:"brandfill",path:""},
						],
					},
					//样品库，贸易品库
				],
				// cuIconList : [
				// 	{
				// 		cuIcon: 'cardboardfill',
				// 		color: 'red',
				// 		badge: 1,
				// 		name: '生产入库'
				// 	}
				// ],
			};
		},
		//组件的生命周期：created，beforeCreate，beforeMount，mounted，beforeUpdate，updated,beforeDestroy,destroyed
		onLoad() {
			// console.log('aaaa');
			// this.refresh();
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		mounted() {
			uni.showLoading({
				title: '载入中',
				mask: true
			});
			
			//请求api
			var serverUrl = this.serverUrl;
			var me = this;
			//请求轮播图数据
			uni.request({
				//获得轮播图地址
				url: serverUrl + 'uniapp/api/getSwiperImages', //仅为示例，并非真实接口地址。                
				success: (res) => {
					if(res.data.status!=200) {
						alert('出错');
						return false;
					}
					me.imgList = res.data.data;
					// console.log('api返回成功',me.imgList);
				},
				complete() {
					uni.hideLoading();
					// uni.hideNavigationBarLoading();
					// uni.stopPullDownRefresh();
				}
			});			
		},
		
		// onPullDownRefresh() {
		// 	this.refresh();
		// },
		methods: {			
			// towerSwiper
			// 初始化towerSwiper
			// TowerSwiper(name) {
			// 	let list = this[name];
			// 	for (let i = 0; i < list.length; i++) {
			// 		list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
			// 		list[i].mLeft = i - parseInt(list.length / 2)
			// 	}
			// 	this.swiperList = list
			// },	
			// 
			// refresh : function() {
			// 	//展示载入动画
			// 	uni.showLoading({
			// 		// title: '',
			// 		mask: true
			// 	});
			// 	//导航条上显示载入效果
			// 	uni.showNavigationBarLoading();
			// 	
			// 	//请求api
			// 	var serverUrl = common.serverUrl;
			// 	var me = this;
			// 	//请求轮播图数据
			// 	uni.request({
			// 		//获得轮播图地址
			// 			url: serverUrl + 'uniapp/api/getSwiperImages', //仅为示例，并非真实接口地址。                
			// 			success: (res) => {
			// 			if(res.data.status!=200) {
			// 				alert('出错');
			// 				return false;
			// 			}
			// 			me.imgList = res.data.data;
			// 			console.log(me.imgList);
			// 			},
			// 		complete() {
			// 			uni.hideLoading();
			// 			uni.hideNavigationBarLoading();
			// 			uni.stopPullDownRefresh();
			// 		}
			// 	});
			// }
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
