<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="会员管理"
		           :autoBack="true"
					bgColor="#16151b"
		       >
		</u-navbar>
		<view class="topher"></view>
		<view class="search">
			<u-search 
				placeholder="请输入会员名称" 
				height="34px"
				bgColor="#535353"
			></u-search>
		</view>
		<view class="tabletitle">
			<view >会员名</view>
			<view >代理返点</view>
			<view >操作</view>
		</view>
		<view class="tableli">
			<view class="li">
				<view>ling100</view>
				<view>99%(999)</view>
				<view class="btnlist">
					<view class="btn">报表</view>
					<view class="btn" @click="show = true">详情</view>
				</view>
				<view class="name">
					<text class="iconfont iconjiantou-01"></text>
				</view>
			</view>
		</view>
		<u-popup :show="show" @close="close" :closeable="true">
		         <view class="userinfo">
		         	<view class="userauthor">
		         		<view class="author" >
		         			<image src="https://zh-green.oss-cn-hongkong.aliyuncs.com/head/en/3.png" mode=""></image>
		         		</view>
		         		<view class="name">
		         			<view class="username">
		         				用户:Liudehua99
		         			</view>
		         		</view>
		         	</view>
					<view class="userlist">
						<view class="li">
							<view>代理返点:</view>
							<view>99%(999)</view>
						</view>
						<view class="li">
							<view>账户积分:</view>
							<view>99%(999)</view>
						</view>
						<view class="li">
							<view>个人充值:</view>
							<view>99%(999)</view>
						</view>
						<view class="li">
							<view>个人提款:</view>
							<view>99%(999)</view>
						</view>
						<view class="li">
							<view>最后登录时间:</view>
							<view>99%(999)</view>
						</view>
						<view class="li">
							<view>当前在线状态:</view>
							<view>99%(999)</view>
						</view>
						<view class="li">
							<view>离线天数:</view>
							<view>99%(999)</view>
						</view>
					</view>
		         </view>  
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false
				
			}
		},
		methods: {
			close(){
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.userinfo{
		width: 100%;
		height: 350px;
		background-color: #212121;
		.userlist{
			width: 100%;
			margin: 20px auto;
			.li{
				width: 95%;
				margin: 0 auto;
				height: 30px;
				display: flex;
				align-items: center;
				font-size: 14px;
				view:nth-child(1){
					width: 120px;
					color: #979799;
				}
				view:nth-child(2){
					color: #ff253f;
				}
			}
		}
		.userauthor{
			width: 100%;
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid #fff;
			.author{
				width: 25%;
				display: flex;
				align-items: center;
				image{
					width: 95rpx;
					height: 95rpx;
					margin: 0 auto;
					border-radius: 50%;
					border: 2px solid #fff;
				}
			}
			.name{
				width: 75%;
				color: #fff;
				font-size: 12px;
				.username{
					font-size: 14px;
				}
			}
		}
	}
	.tableli{
		width: 100%;
		.li{
			width: 100%;
			height: 50px;
			border-bottom: 1px solid #fff;
			font-size: 12px;
			display: flex;
			align-items: center;
			color: #fff;
			text-align: center;
			view:nth-child(1){
				width: 30%;
			}
			view:nth-child(2){
				width: 30%;
			}
			.btnlist{
				width: 40%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.btn{
					width: 64px;
					height: 24px;
					line-height: 24px;
					background: #07c160;
					    border-radius: 5px;
				}
			}
			.iconjiantou-01{
				font-size: 12px;
			}
		}
	}
	.tabletitle{
		width: 100%;
		height: 50px;
		    background-color: #e6b98a;
		    color: #fff;
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    font-size: 12px;
		    text-align: center;
			view:nth-child(1){
				width: 30%;
			}
			view:nth-child(2){
				width: 30%;
			}
			view:nth-child(3){
				width: 40%;
			}
	}
	.search{
		width: 100%;
		height: 54px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
::v-deep .u-search__action{
	color:	#e6b98a;
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
