<template>
	<view class="page">
				<u-navbar
									leftIconSize="16px"	
									:autoBack="false"
										bgColor="#161936"
										@leftClick="goback()"
				
				>
							<view
				                class="u-nav-slot"
				                slot="left"
				            >
							<u-icon name="arrow-left" size="40" color="#fff"></u-icon>
					 取出密码
				 </view>
				</u-navbar>
		<view class="topher"></view>
		<view>
			<view class="pay-title">
				<text v-show="AffirmStatus === 1">请输入6位支付密码</text>
				<text v-show="AffirmStatus === 2">请确认6位支付密码</text>
			</view>
			<view class="pay-password" @click="onPayUp">
				<view class="list"> 
					<text v-show="passwordArr.length >= 1">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 2">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 3">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 4">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 5">●</text>
				</view>
				<view class="list">
					<text v-show="passwordArr.length >= 6">●</text>
				</view>
			</view>
			<view class="hint">
				<!-- <text>忘记支付密码？</text> -->
			</view>
		</view>
		<!-- <CodeKeyboard ref="CodeKeyboard" passwrdType="pay" @KeyInfo="KeyInfo"></CodeKeyboard> -->
		<u-keyboard mode="number" 
		@change="valChange" 
		@backspace="backspace" 
		:dotDisabled="true" 
		:overlay="false"
		:show="uviewkey"
		:tooltip="false"
		></u-keyboard>
	</view>
</template>

<script>
	import CodeKeyboard from '../../../components/CodeKeyboard/CodeKeyboard.vue';
	import { updateCustomData,findCustomData } from "../../../api/index";
	export default {
		components:{
			CodeKeyboard,
		},
		data() {
			return {
				uviewkey:false,
				AffirmStatus: 1,
				passwordArr: [],
				oldPasswordArr: [],
				newPasswordArr: [],
				afPasswordArr: [],
				userinfo:[]
			};
		},
		onLoad() {
			this.checkuserinfo()
		},
		
		methods:{
			checkuserinfo(){
				let _this = this
				
				findCustomData().then(res=>{
					console.log(res)
					_this.userinfo = res.result
				})
			
			},
			/**
			 * 唤起键盘
			 */
			onPayUp(){
				this.uviewkey = true
				// this.$refs['CodeKeyboard'].show();
			},
			valChange(val) {
				console.log(val)
				
				
					this.passwordArr.push(val);

				// 判断是否等于6
				if(this.passwordArr.length === 6){
					this.passwordArr = [];
					this.AffirmStatus = this.AffirmStatus+1;
				}
				console.log(this.passwordArr)
				// 判断到哪一步了
				if(this.AffirmStatus === 1){
					this.oldPasswordArr = this.passwordArr;
				}else if(this.AffirmStatus === 2){
					this.newPasswordArr = this.passwordArr;
				}else{
					if(this.oldPasswordArr.join('') == this.newPasswordArr.join('')){
				
						
						let pwd = this.newPasswordArr.join('')
						
						
						console.log(pwd,this.oldPasswordArr.join(''),'支付密码',this.newPasswordArr.join(''))
						
						updateCustomData({payPwd:pwd,id:this.userinfo.id}).then((res)=>{
							if(res.code == 200){
								uni.setStorage({
								  key: 'userinfo',
								  data: res.result.psCustomMain
								});
								this.checkuserinfo()
							}
						})
						uni.showToast({
							title: '密码设置成功',
							icon: 'none'
						})
						setTimeout(() =>{
							uni.switchTab({
								url:'/pages/my/my'
							})
						},500)
					}else{
						uni.showToast({
							title: '密码不一致',
							icon: 'none'
						})
						this.AffirmStatus = 1
				
					}
					
				
				
				
					
				}
				// this.$forceUpdate();
			},
			goback(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符

				if(this.passwordArr.length) this.passwordArr.splice(this.passwordArr.length-1,1)
				console.log(this.passwordArr);

				
			},
			/**
			 * 支付键盘回调
			 * @param {Object} val
			 */
			KeyInfo(val){
				if(val.index >= 6){
					return;
				}
				// 判断是否删除
				if(val.keyCode === 8){
					this.passwordArr.splice(val.index+1,1)
				}else{
					this.passwordArr.push(val.key);
				}
				// 判断是否等于6
				if(this.passwordArr.length === 6){
					this.passwordArr = [];
					this.AffirmStatus = this.AffirmStatus+1;
				}
				// 判断到哪一步了
				if(this.AffirmStatus === 1){
					this.oldPasswordArr = this.passwordArr;
				}else if(this.AffirmStatus === 2){
					this.newPasswordArr = this.passwordArr;
				}else{
					if(this.oldPasswordArr.join('') == this.newPasswordArr.join('')){

						
						let pwd = this.newPasswordArr.join('')
						
						
						console.log(pwd,this.oldPasswordArr.join(''),'支付密码',this.newPasswordArr.join(''))
						
						updateCustomData({payPwd:pwd,id:this.userinfo.id}).then((res)=>{
							if(res.code == 200){
								uni.setStorage({
								  key: 'userinfo',
								  data: res.result.psCustomMain
								});
								this.checkuserinfo()
							}
						})
						setTimeout(() =>{
							uni.navigateBack();
						},2000)
					}else{
						uni.showToast({
							title: '密码不一致',
							icon: 'none'
						})
						this.AffirmStatus = 1

					}
					



					
				}
				this.$forceUpdate();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'capitalSettings.scss';
</style>
