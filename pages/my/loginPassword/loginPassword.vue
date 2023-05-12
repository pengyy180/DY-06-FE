<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="修改登录密码"
		           :autoBack="true"
					bgColor="#000"
					rightText="保存"
		       >
		</u-navbar>
		<view class="topher"></view>
		<view class="settinglist">
			<view class="li">
				<view class="name">
					<input
					  :password="!isPassword"
					  v-model="form.password"
					  maxlength="26"
					  placeholder="请输入您的旧密码"
					/>
				</view>
				<view class="iconright">
					<text
					  class="iconfont"
					  :class="isPassword ? 'icon-eye-on' : 'icon-eye-off'"
					  @click="isPassword = !isPassword"
					></text>
				</view>
			</view>
			<view class="li">
				<view class="name">
					<input
					  :password="!isPassword"
					  v-model="form.password"
					  maxlength="26"
					  placeholder="请输入您的新密码"
					/>
				</view>
				<view class="iconright">
					<text
					  class="iconfont"
					  :class="isPassword ? 'icon-eye-on' : 'icon-eye-off'"
					  @click="isPassword = !isPassword"
					></text>
				</view>
			</view>
			<view class="li">
				<view class="name">
					<input
					  :password="!isPassword"
					  v-model="form.password"
					  maxlength="26"
					  placeholder="请再次输入您的新密码"
					/>
				</view>
				<view class="iconright">
					<text
					  class="iconfont"
					  :class="isPassword ? 'icon-eye-on' : 'icon-eye-off'"
					  @click="isPassword = !isPassword"
					></text>
				</view>
			</view>
			
			
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPassword: false,
				form:{
					password: "",
				}
			};
		}
	}
</script>

<style lang="scss">
.settinglist{
	width: 95%;
	margin: 0 auto;
	.li{
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #fff;
		border-bottom: 1px solid #fff;
		.iconfont{
			font-size: 20px;
			color:#e6b98a;
		}
	}
	
}
::v-deep .uni-input-placeholder{
	font-size: 12px;
}
::v-deep .u-navbar__content__right__text{
	color:	#e6b98a;
	font-size: 12px;
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
