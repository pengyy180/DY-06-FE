<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="提现申请成功"
		           :autoBack="true"
					bgColor="#000"
		       >
		</u-navbar>
		<view class="topher"></view>
		<view class="top">
			<image src="../../../static/nick.png" mode=""></image>
			<view class="text">
				提现申请完成，您的提现申请已经提交成功 <br>
				<text>兑换积分{{money}}</text>
			</view>
		</view>
		<view class="bottom">
			<image src="../../../static/money.png" mode=""></image>
			<view class="text">
				提现到账 <br>
				<text>提现申请成功后，请等待财务审核</text><br>
				<text>审核成功后，若届时仍未到账，请联系在线客服请联系我 <text class="kf">我的客服</text></text>
			</view>
		</view>
		<view class="loginout" @click="goback">
			完成
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:''
			}
		},
		onLoad(options) {
			this.money = options.money
		},
		methods: {
			goback(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			}
		}
	}
</script>

<style lang="scss">
	.loginout{
		width: 95%;
		margin: 10px auto;
		height: 50px;
		line-height: 50px;
		text-align: center;
		margin: 20px auto;
		background: linear-gradient(#fde3ca,#e7b486);
		color: #885b3a;
		border-radius: 50px;
	}
	.bottom{
		width: 95%;
		margin: 10px auto;
		display: flex;
		align-items: center;
		// justify-content: center;
		color: #ccc;
		font-size: 14px;
		padding-bottom:10px;
		image{
			width: 20px;
			height: 20px;
			margin-right: 10px;
		}
		text{
			font-size: 12px;
		}
		.kf{
			color: orangered;
			text-decoration: underline;
		}
	}
.top{
	width: 95%;
	margin: 10px auto;
	border-bottom: 1px solid #fff;
	display: flex;
	align-items: center;
	// justify-content: center;
	color: #ccc;
	font-size: 14px;
	padding-bottom:10px;
	image{
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
	text{
		font-size: 12px;
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
