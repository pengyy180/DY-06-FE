<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="会员消息"
		           :autoBack="true"
					bgColor="#000"
		       >
		</u-navbar>
		<view class="topher"></view>
		
		<view class="nodata">
			<image src="https://m.pmcmsbdhsa.cc/static/img/kong.00a22a79.png" mode=""></image>
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.nodata{
		width: 100%;
		color: #fff;
		font-size: 12px;
		text-align: center;
		image{
			display: flex;
			align-items: center;
			margin: 0 auto;
			width: 188px;
			height: 188px;
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
