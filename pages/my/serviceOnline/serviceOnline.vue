<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="账户明细"
		           @rightClick="rightClick"
		           :autoBack="true"
					bgColor="#000"
	
		       >
		</u-navbar>
		<view class="topher"></view>
		<view class="kefuonline">
			<view class="logoicon">
				<image src="https://hongliwqjgczj.oss-cn-hongkong.aliyuncs.com/logo.jpg" mode=""></image>
			</view>
			<view class="title">
				银河娱乐(官方客服)
			</view>
			<view class="us">
				联系
			</view>
			<view class="tips">
				全天7 * 24小时竭诚为您服务
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
::v-deep .u-navbar__content__title{
	color:	#e6b98a;
}
.kefuonline{
	width: 350px;
	height: 120px;
	margin: 0 auto;
	margin-top: 20px;
	background-color: #212121;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	.logoicon{
		width: 20%;
		display: flex;
		align-items: center;
		image{
			width: 50px;
			height: 50px;
			border-radius: 50%;
			margin: 0 auto;
		}
	}
	.title{
		width: 60%;
		color: #e6b98a;
		font-size: 18px;
	}
	.us{
		width: 20%;
		color: #fff;
		font-size: 12px;
	}
	.tips{
		width: 90%;
		margin: 0 auto;
		height: 25px;
		line-height: 25px;
		background: #16151b;
		border-radius: 0.10667rem;
		color: #979799;
		text-align: center;
	}
}
.page{
  width: 100%;
  height: 100vh;
  background-color: #000;
}
.topher{
	width: 100%;
	height: 44px;
}
</style>
