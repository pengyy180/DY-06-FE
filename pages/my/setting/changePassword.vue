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
			 修改登录密码
		 </view>
	
		</u-navbar>
		<view class="topher"></view>
		<view class="setting-password" >
			<view class="inpu-password">
				<text>输入旧密码</text>
				<input type="password" v-model="oldPwd" placeholder="请输入旧的密码" />
				<!-- <text class="iconfont icon-eye-on icon"></text> -->
			</view>
			<view class="inpu-password">
				<text>输入新密码</text>
				<input type="password" v-model="newPwd" placeholder="请输入新密码" />
				<!-- <text class="iconfont icon-eye-on icon"></text> -->
			</view>
			<view class="inpu-password">
				<text>再次输入密码</text>
				<input type="password" v-model="customPwd" placeholder="请输入再次输入密码" />
				<!-- <text class="iconfont icon-eye-on icon"></text> -->
			</view>
			<view class="btn" @click="savepwd">
				<text>确认</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { updateCustomData,findCustomData } from "../../../api/index";
	export default {
		data() {
			return {
				isSetting: false,
				userinfo:[],
				oldPwd:'',
				newPwd:'',
				customPwd:''
			};
		},
		onLoad() {
				this.checkuserinfo()
		},
		methods:{
			goback(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
			checkuserinfo(){
				let _this = this
				
				findCustomData().then(res=>{
					console.log(res)
					_this.userinfo = res.result
				})
			
			},
			savepwd(){
				if(this.oldPwd != this.userinfo.customPwd){
					uni.showToast({
						title: '原密码不一致',
						icon: 'none'
					})
					return;
				}
				
				if(this.newPwd == ''  || this.customPwd ==''){
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
					return;
				}
				
				if(this.newPwd != this.customPwd){
					uni.showToast({
						title: '密码不一致',
						icon: 'none'
					})
					return;
				}
				updateCustomData({customPwd:this.customPwd,id:this.userinfo.id}).then((res)=>{
					if(res.code == 200){
						uni.setStorage({
						  key: 'userinfo',
						  data: res.result.psCustomMain
						});
						this.checkuserinfo()
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
					}
				})
				setTimeout(() =>{
					uni.navigateBack();
				},2000)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'changePassword.scss';
</style>
