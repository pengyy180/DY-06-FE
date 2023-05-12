<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="我的钱包"
		           @rightClick="rightClick"
		           :autoBack="true"
					bgColor="#000"
					leftIconColor="#e6b98a"
					:border="true"
		       >
		</u-navbar>
		<view class="topher">
			
		</view>
		<view class="imgicon">

				
			<!-- <image src="../../../static/m1.png" mode=""></image> -->
				<view class="name">
					积分
				</view>
				<view class="name2">
					￥ {{userinfo.givenAccount}}
				</view>

		</view>   
		<view class="wallet">
			<view class="dh" @click="gotourl('/pages/my/withdraw/withdraw')">
				兑换
			</view>
			<view class="cz" @click="gotourl('/pages/my/recharge/recharge')">
				充值
			</view>
		</view>
			   
			   
	</view>
</template>

<script>
	import { findCustomData } from "../../../api/index";
	export default {
		data() {
			return {
				userinfo:''
			}
		},created() {
			this.checkuserinfo()
		},

			
		methods: {
			checkuserinfo(){
				let _this = this
				
				findCustomData().then(res=>{
					_this.userinfo = res.result
						
				})
			},
			gotourl(type){
				console.log(type)
				uni.navigateTo({
				  url: type,
				});
			},
		}
	}
</script>

<style scoped lang="scss">
@import 'recordCenter.scss';
</style>
