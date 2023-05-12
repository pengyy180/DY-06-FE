<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="基本信息"
		           :autoBack="true"
					bgColor="#000"
		       >
		</u-navbar>
		<view class="topher"></view>
		<!-- 用户信息列表 -->
		<view class="user-list">
			<view class="list" style="height: 160rpx;" @click="uploadimg">
				<view class="title">
					<text>头像</text>
				</view>
				<view class="more-content">
					<image :src="userinfo.headPortrait" mode=""></image>
					<text class="iconfont icon-more more"></text>
				</view>
			</view>
		
			<view class="list">
				<view class="title">
					<text>性别</text>
				</view>
				<view class="more-content">
					<text class="content">{{userinfo.customSex==1?'男':'女'}}</text>
					<text class="iconfont icon-more more"></text>
				</view>
				<view class="picker">
					<picker @change="sexPickerChange" :value="sexIndex" :range="sexArray">
						<view class="uni-input" style="height: 100rpx;">{{sexText}}</view>
					</picker>
				</view>
			</view>
			
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
		

		
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	import { updateCustomData,findCustomData } from "../../../api/index";
	import __config from "../../../config/env.js";
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				// 性别
				action:__config.basePath,
				imgaction:__config.imgaction,
				sexArray: ['男','女'],
				sexIndex: 1,
				sexText: '男',
				// 生日
				birthdayDate: currentDate,
				startDate: this.getDate('start'),
				endDate: this.getDate('end'),
				birthday: '',
				DialogBox: {},
				// 昵称
				nickname: '',
				userinfo:''
			};
		},
		onLoad() {
				this.checkuserinfo()
		},
		methods:{
			uploadimg(){
				let _this = this
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						 uni.uploadFile({
							url: __config.action, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
							  biz: "temp",
							},
							success: (uploadFileRes) => {
								 let data = JSON.parse(uploadFileRes.data)
								console.log(data);
								
								updateCustomData({headPortrait:data.message,id:_this.userinfo.id}).then((res)=>{
									if(res.code == 200){
										uni.setStorage({
										  key: 'userinfo',
										  data: res.result.psCustomMain
										});
										this.checkuserinfo()
									}
								})
							}
						});
				
						
					}
				});
			},
			checkuserinfo(){
				let _this = this
				 
				findCustomData().then(res=>{
					console.log(res)
					_this.userinfo = res.result
					if(res.result.headPortrait == 'https://zh-green.oss-cn-hongkong.aliyuncs.com/head/en/3.png'){
						_this.userinfo.headPortrait = 'https://zh-green.oss-cn-hongkong.aliyuncs.com/head/en/3.png'
					}else{
						_this.userinfo.headPortrait = _this.imgaction+'/'+res.result.headPortrait
					}
					console.log(_this.userinfo.headPortrait)
				})

			},
			/**
			 * 性别
			 * @param {Object} e
			 */
			sexPickerChange(e){
				let customSex = 1
				if(e.detail.value == 0){
					customSex = 1
				}else if(e.detail.value == 1){
					customSex = 2
				}
				console.log(customSex)
				updateCustomData({customSex:customSex,id:this.userinfo.id}).then((res)=>{
					if(res.code == 200){
						uni.setStorage({
						  key: 'userinfo',
						  data: res.result.psCustomMain
						});
						this.checkuserinfo()
					}
				})
				this.sexIndex = e.detail.value;
				this.sexText = this.sexArray[this.sexIndex];
			},
			/**
			 * 生日
			 * @param {Object} e
			 */
			birthdayPickerChange(e){
				
				updateCustomData({customBirth:e.detail.value,id:this.userinfo.id}).then((res)=>{
					if(res.code == 200){
						uni.setStorage({
						  key: 'userinfo',
						  data: res.result.psCustomMain
						});
						this.checkuserinfo()
					}
				})
				

			},
			/**
			 * 获取日期
			 * @param {Object} type
			 */
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
						year = year - 60;
				} else if (type === 'end') {
						year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			/**
			 * 昵称点击
			 */
			onNickname(){
				this.$refs['DialogBox'].confirm({
					title: '更改昵称',
					placeholder: '请输入修改的昵称',
					value: this.nickname,
					DialogType: 'input',
					animation: 0
				}).then((res)=>{
					
					updateCustomData({customName:res.value,id:this.userinfo.id}).then((res)=>{
						if(res.code == 200){
							uni.setStorage({
							  key: 'userinfo',
							  data: res.result.psCustomMain
							});
							this.checkuserinfo()
						}
					})
					this.nickname = res.value;
				})
			},
			/**
			 * 用户信息点击
			 */
			onUserInfo(){
				uni.navigateTo({
					url: '/pages/Information/Information'
				})
			},
			/**
			 * 地址点击
			 */
			onAddress(){
				uni.navigateTo({
					url: '/pages/AddressEdit/AddressEdit?type=1',
				})
			},
			/**
			 * 设置列表点击
			 * @param {String} type
			 */
			onSetting(type){
				switch(type) {
					case 'account':
						uni.navigateTo({
							url: '/pages/AccountSecurity/AccountSecurity'
						})
						break;
					case 'pay':
						uni.navigateTo({
							url: '/pages/PaymentPassword/PaymentPassword'
						})
						break;
					case 'invoice':
						uni.navigateTo({
							url: '/pages/InvoiceList/InvoiceList'
						})
						break;
					case 'vip':
						uni.navigateTo({
							url: '/pages/MyMemberInterest/MyMemberInterest'
						})
						break;
					case 'common':
						uni.navigateTo({
							url: '/pages/SettingCommon/SettingCommon'
						})
						break;
					case 'about':
						uni.navigateTo({
							url: '/pages/AboutUs/AboutUs'
						})
						break;
					case 'password':
						uni.navigateTo({
							url: '/pages/ChangePassword/ChangePassword',
						})
						break;
					case 'phone':
						uni.navigateTo({
							url: '/pages/ModifyPhone/ModifyPhone',
						})
						break;
					case 'mailbox':
						uni.navigateTo({
							url: '/pages/AssociatedmMailbox/AssociatedmMailbox',
						})
						break;
				}
			},
			/**
			 * 退出点击
			 */
			onQuitLogin(){
				this.$refs['DialogBox'].confirm({
					title: '提示',
					content: '是否要退出登录?',
					DialogType: 'inquiry',
					animation: 0
				}).then(()=>{
					uni.clearStorage();
					uni.reLaunch({
						url:'/pages/login/login'
					})
					

				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'infomation.scss';
</style>
