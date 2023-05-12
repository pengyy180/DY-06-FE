<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="兑换详情"
		           :autoBack="true"
					bgColor="#000"
		       >
		</u-navbar>
		<view class="topher"></view>
		<view class="details">
			<view class="li">
				<view class="left">交易单号: </view>
				<view class="right"> {{details.id}}</view>
			</view>
			<view class="li">
				<view class="left">交易时间: </view>
				<view class="right"> {{details.createTime}}</view>
			</view>
			<view class="li">
				<view class="left">银行卡名称: </view>
				<view class="right"> {{details.bankName}}</view>
			</view>
			<view class="li">
				<view class="left">持卡人姓名: </view>
				<view class="right"> {{details.bankCustomName}}</view>
			</view>
			<view class="li">
				<view class="left">银行卡号:</view>
				<view class="right"> {{details.bankNum}}</view>
			</view>
			<view class="li">
				<view class="left">交易状态:</view>
				<view class="right"> {{details.accountStatusname}}</view>
			</view>
			<view class="li">
				<view class="left">兑换积分: </view>
				<view class="right"> {{details.accountBigdec}}元</view>
			</view>
			<view class="li">
				<view class="left">手续费: </view>
				<view class="right"> 0元</view>
			</view>
			<view class="li">
				<view class="left">备注: </view>
				<view class="right"> {{details.accountDesc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:''
			}
		},
		onLoad(option) {
			this.details = JSON.parse(option.item)
			
			if(this.details.accountStatus == 0){
				this.details.accountStatusname = '申请中'
			}else if(this.details.accountStatus == 1){
				this.details.accountStatusname = '通过'
			}else if(this.details.accountStatus == 2){
				this.details.accountStatusname = '拒绝'
			}
			console.log(this.details)
		},
		methods: {
			
		}
	}
</script>
 
<style lang="scss">
.details{
	width: 100%;
	margin-top: 20px;
	.li{
		width: 95%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #fff;
	}
}
::v-deep .u-navbar__content__title{
	color:	#e6b98a;
}
.page{
  width: 100%;
  height: 100vh;
  background-color: #282828;
}
.topher{
	width: 100%;
	height: 44px;
}
</style>
