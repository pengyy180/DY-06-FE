<template>
	<view>
		<view class="">
			
		</view>
	</view>
</template>

<script>
	import { findCustomData } from "../api/index";
	export default {
		name:"checkdata",
		data() {
			return {
				
			};
		},
		mounted(){
			this.checkuseinfo()

		},
		onLoad() {
			
			
			
		},
		onshow(){
			this.checkuseinfo()
		},
			
		methods:{
			checkuseinfo(){
				
				let _this = this
				findCustomData().then(res=>{
					let userinfo = res.result
					// if(!userinfo.bankName){
					// 	_this.showmoadl('为了更好的体验，请填写用户银行卡号')
					// 	_this.settimeurl('/pages/SignIn/SignIn')
					// }else if(!userinfo.payPwd){
					// 	_this.showmoadl('为了用户的安全，请设置支付密码')
					// 	_this.settimeurl('/pages/PaymentPassword/PaymentPassword')
					// }else if(!userinfo.addressName){
					// 	_this.showmoadl('为了更好的体验，请填写用户收货地址')
					// 	_this.settimeurl('/pages/AddressEdit/AddressEdit')
					// }
					if(!userinfo.payPwd){
						_this.showmoadl('为了用户的安全，请设置支付密码')
						_this.settimeurl('/pages/PaymentPassword/PaymentPassword')
					}
					
				})
			},
			showmoadl(msg){
				uni.showToast({
					title: msg,
					icon:"none",
					duration: 2000
				});
			},
			settimeurl(url){
				setTimeout(()=>{
					uni.navigateTo({
						url:url
					})
				},2000)
			}
		}
		
	}
</script>

<style lang="scss">

</style>