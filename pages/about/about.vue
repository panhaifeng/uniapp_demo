<template name='about'>
	<view>
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于</block>
		</cu-custom> -->
		<view class="header">	
			<view class="flex-sub text-center" v-if="!hasLogin" @click="login">
				<view class="solid-bottom text-xl padding" >
					<text class="text-black text-bold">未登录,请登录</text>
				</view>
			</view>
			<view class="flex-sub text-center" v-else>
				<view class="solid-bottom text-xl padding">
					<text class="text-black text-bold">当前用户:{{userInfo.userName}}</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">系统设置</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @click="clearCache">
				<view class="content" >
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">清除缓存</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../../pages/about/contactus">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-grey">联系我们</text>
				</navigator>
			</view>			
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">版本更新</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">易管宝V1.0</text>
				</view>
			</view>
			
		</view>
		
		<view class="padding flex flex-direction">
			<button plain class="cu-btn bg-grey lg" fotextrm-type="reset" @click="objLogin.handle">{{objLogin.text}}</button>
			<!-- <button plain class="cu-btn bg-grey lg" @click="test">test</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuArrow:true,
				menuBorder: false,
				menuCard: false,
				
				hasLogin:false,
				userInfo:null,
			}
		},
		computed:{
			//注销按钮的显示和方法名
			objLogin:function() {
				if(!this.hasLogin) {
					return {'text':'登 录','handle':this.login};
				}
				return {'text':'注 销','handle':this.logout};
			}
		},
		mounted() {
			var userInfo = uni.getStorageSync('UserInfo');
			if(userInfo=='') {
				this.hasLogin=false;
			} else {
				this.hasLogin=true;
				this.userInfo = userInfo || null;
			}
		},		
		methods: {
			test() {
				// this.userInfo.userName='test';
				// this.hasLogin=false;
				console.log(this.hasLogin,this.userInfo,uni.getStorageSync('UserInfo'));				
			},
			//清理缓存
			clearCache() {
				var me = this;
				uni.showModal({
				    content: '清理所有缓存-不包括登录信息，确认吗？',
				    success: function (res) {
						if (res.cancel) {
							return true;
						}
						uni.clearStorageSync();
						//复制登录信息
						uni.setStorageSync('UserInfo',me.userInfo)
						//提醒
						uni.showToast({
							title:"清理完成",
							mask:false,
							duration:1000
						});
				    }
				});
				
			},
			
			logout() {
				// console.log('注销前userInfo',uni.getStorageSync('UserInfo'));
				uni.removeStorageSync('UserInfo');
				this.hasLogin=false;
				this.userInfo = null;
			},
			login() {
				uni.navigateTo({
					url:"../../pages/login/login"
				})
			}
			
		}
	}
</script>

<style>
	.header {
		/* #ifdef MP */
		padding: 0upx 30upx 40upx 30upx;
		/* #endif */
		
		/* #ifndef MP */
		padding: 120upx 30upx 40upx 30upx;
		/* #endif */
		background-color: #ffd655;
		/* background: url(http://122.152.205.72:88/group1/M00/00/03/CpoxxFwu_10AYFAIAAAO_Q1tPg693.png) repeat; */
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 300upx;
	}
</style>
