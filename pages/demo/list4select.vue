<!-- 选择列表 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择客户</block>
			<view class="action" slot="right" @click="clearClick">
				<text class="cuIcon-roundclosefill" ></text>清空
			</view>
		</cu-custom>
		
		<view class="cu-list menu" >	
			<view class="cu-item arrow" v-for="(row,index) in rows" :key="index">
				<view class="content padding-tb-sm" @click="itemClick(arguments,index)">
					<view>
						<text class="cuIcon-friend text-blue margin-right-xs text-left"></text>{{row.compName}}						
					</view>						
					<view class="flex text-gray text-sm">
						<view class="flex-sub margin-right-xs">联系人：{{row.con}}</view>
						<view class="flex-sub margin-right-xs">电话:{{row.tel}}</view>
					</view>
					<view class="flex text-gray text-sm">
						<view class="flex-sub margin-right-xs">客户类型：vip</view>
						<view class="flex-sub margin-right-xs">传真:{{row.tel}}</view>
					</view>
					<view class="text-gray text-sm">
						<view class="flex-sub margin-right-xs">地址：{{row.address}}</view> 
					</view>
				</view>	
			</view>
			<view class="uni-loadmore text-center" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		
		<!-- 顶部模态窗口 -->
		<view class="cu-modal top-modal show" v-if="showTopModal" >
			<view class="cu-dialog" :style="topModalStyle">	
				<view class="cu-list menu" >	
					<view class="cu-item" v-for="(btn,index) in btnGroupTop" :key="index" @click="call(btn.handle)">
						<view class="content">
							<text class="text-grey" :class="btn.icon?`cuIcon-${btn.icon}`:''"></text>
							<text class="text-grey text-lg">{{btn.text}}</text>
						</view>
					</view>					
				</view>
			</view>
		</view>
		
		<!-- 筛选模态窗口 -->
		<view class="cu-modal top-modal show" v-if="showFilterModal" >
			<view class="cu-dialog" :style="topModalStyle">	
				<view class="cu-list menu" >	
					<view class="cu-item" v-for="(btn,index) in btnGroupFilter" :key="index" @click="call(btn.handle)">
						<view class="content">
							<text class="text-grey" :class="btn.icon?`cuIcon-${btn.icon}`:''"></text>
							<text class="text-grey text-lg">{{btn.text}}</text>
						</view>
					</view>					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//需要获取导航栏的高度，不同终端下不一样
				topModalStyle:"margin-top:"+ (this.CustomBar+1) + "px;",
				//数据获取url
				url :"https://www.fastmock.site/mock/5ac037a8ecc6af666419e1e746d2172f/uniapp/getClientList",
				//数据集
				rows :[],
				//数据集允许的最大条数，纺织内存溢出
				maxLength:40,
				//是否显示加载更多
				showLoadMore:false,
				//加载更多时的文字
				loadMoreText:'加载中..',				
				//模态窗是否显示
				// showMore: false,
				//顶部模态窗
				showTopModal: false,
				// 筛选模态窗
				showFilterModal:false,
				//当前页
				currentPage:0,
				//当前记录key
				itemKey:-1,				
				btnGroupTop:[
					{text:'筛选',icon:'search',handle:()=>{
						// var rowCur = this.rows[this.itemKey];
						console.log("跳转搜索页面:");
						this.showTopModal = false;
					}},
					{text:'首页',icon:'home',handle:()=>{
						// var rowCur = this.rows[this.itemKey];
						uni.reLaunch({
							url:"../../pages/home/home"
						})
					}},
					
				],
				btnGroupFilter:[
					{text:'全部',icon:'search',handle:()=>{
						// var rowCur = this.rows[this.itemKey];
						console.log("跳转搜索页面:");
						this.showTopModal = false;
					}},
					{text:'已审',icon:'home',handle:()=>{
						// var rowCur = this.rows[this.itemKey];
						uni.reLaunch({
							url:"../../pages/home/home"
						})
					}},
					{text:'未审',icon:'home',handle:()=>{
						// var rowCur = this.rows[this.itemKey];
						uni.reLaunch({
							url:"../../pages/home/home"
						})
					}},
				],
			}
		},
		
		onLoad(options) {
			this.loadData();
		},
		onReachBottom() {
			console.log("onReachBottom");
			if (this.rows.length > this.maxLength) {
				this.loadMoreText = "超过最大记录条数限制或者没有更多数据了!"
				return;
			}
			this.showLoadMore = true;			
			this.loadData(this.currentPage+1);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.loadData();
		},
		onUnload() {
			// console.log('注销 eventSelect');
			this.$eventHub.$off('eventSelect');
			
			// this.max = 0,
			this.rows = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		methods: {
			//切换顶部模态窗的可见状态
			toggleTopModel() {
				// this.showMore = false;
				this.showFilterModal = false;
				this.showTopModal = (this.showTopModal+1)%2;
			},
			//切换筛选窗窗口的可见
			toggleFilterModel() {
				// this.showMore = false;
				this.showTopModal = false;
				this.showFilterModal = (this.showFilterModal+1)%2;
			},
			//调用某个函数,
			//如果在模板中使用@click="item.handle",在app中编译不通过，app中需要显式声明函数
			call(fn) {
				fn();
				this.showMore =false;
			},
			loadData(pageIndex) {
				pageIndex = pageIndex||0;
				uni.showLoading({
					mask:true
				});
				
				var url=this.url;
				var data={page:pageIndex};
				uni.request({
					url:url,
					data:data,
					success: (res) => {
						if(res.data.status!=200) {
							uni.showToast({
								icon:'none',
								title:"服务器出错",
								duration:1500,
								mask:false
							});
							return false;
						}
						if(!res.data.success) {
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								duration:2000,
							});
							return false;
						}
						if(pageIndex==0) {
							this.rows = res.data.data;
						} else {							
							this.rows = this.rows.concat(res.data.data);						
						}
					},
					complete(res) {
						//隐藏载入效果
						uni.hideLoading();
						uni.stopPullDownRefresh();
					},				
				});
			},
			itemClick() {
				var currentRow = this.rows[arguments[1]];				
				console.log("选择页中选中记录:",currentRow);
				//注意，返回的数据中必须有text和value属性，组件需要的，后面的data是回传用的参数
				this.$eventHub.$emit('eventSelect',{value:currentRow.id,text:currentRow.compName,data:currentRow});
				// this.$eventHub.$off('eventSelect');
				uni.navigateBack({
					delta: 1
				});
			},
			clearClick(){
				this.$eventHub.$emit('eventSelect',{value:null,text:'',data:null});
				// this.$eventHub.$off('eventSelect');
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	
</style>
