<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">客户搜索</block>
		</cu-custom>
		
		<form @submit="submitForm">
			<!-- 普通文本框 支持v-model-->
			<view class="cu-form-group  margin-top">
				<view class="title">相关批号</view>
				<input placeholder="两字短标题" v-model="formData.pihao"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view class="cu-form-group ">
				<view class="title">库位选择</view>
				<picker  :value="formData.kuwei" :range="arrayKuwei" @change="pickerChange">
					<view class="picker">
						{{arrayKuwei[formData.kuwei]}}
					</view>
				</picker>
			</view>	
			
			<view class="cu-form-group">
				<view class="title">入库日期</view>
				<picker 
					mode="date" 
					:value="formData.dateRuku" 
					start="2015-09-01" end="2020-09-01" 
					@change="dateChange">
					<view class="picker">
						{{formData.dateRuku}}
					</view>
				</picker>
			</view>
			
			<picker-popup 
				url="../../pages/demo/list4select" 
				value='客户id' 
				title='单客户选择' 
				text='test' 
				@change="changeClient"
				name="clientId"></picker-popup>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue margin-tb-sm lg" form-type="submit">submit</button>
			</view>
		</form>
	</view>
</template>

<script>
	import pickerPopup from "@/components/picker-pop.vue"
	export default {
		components:{pickerPopup},
		data() {
			return {
				formData:{
					pihao:'',
					kuwei:0,
					dateRuku:'2000-01-01',
					clientId:0,
				},
				//库位选项
				arrayKuwei :　['请选择','A01','A02','B01'],	
				
			}
		},
		onUnload() {
			this.$eventHub.$off('listenSearch');
		},
		methods: {
			
			changeClient(data) {
				// console.log(data);
				this.formData.clientId =data.data.id;
			},			
			pickerChange(e) {
				console.log("picker changed",e.detail.value)
				this.formData.kuwei = e.detail.value;
			},
			dateChange(e) {
				this.formData.dateRuku = e.detail.value;
			},
			submitForm(e) {
				console.log(this.formData);
				this.handlOk();
			},
			handlOk() {
				var param=this.formData;
				this.$eventHub.$emit('listenSearch',param)
				uni.navigateBack({
					delta:1
				});
			},
		}
	}
</script>

<style>
	input {
		text-align: right;
	}
	/* webkit solution */
	::-webkit-input-placeholder { text-align:right; }
	/* mozilla solution */
	input:-moz-placeholder { text-align:right; }
</style>
