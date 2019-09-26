<template name='about'>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">联系我们</block>
		</cu-custom>
		
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">				
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">开发公司</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">常州易奇信息科技有限公司</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">地址</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">常州科教城创研港2号楼1203</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">联系人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">车老师</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">手机</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">137754114</text>
				</view>
			</view>	
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
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
