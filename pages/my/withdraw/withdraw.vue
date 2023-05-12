<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="在线兑换"
		           @rightClick="rightClick"
		           :autoBack="true"
					bgColor="#000"

					:border="true"
		       >
		</u-navbar>
		<view class="topher"></view>
		<view class="topcontent">
			<view class="li">
				<view class="title">
					可兑换金额(元)
				</view>
				<view class="number">
					{{userinfo.givenAccount}}元
				</view>
			</view>
			<view class="li">
				<view class="title">
					手续费
				</view>
				<view class="number">
					0元
				</view>
			</view>
		</view>
		<view class="banknumber">
			{{userinfo.bankName}} ({{userinfo.bankNum}} ) 
			<u-icon name="checkbox-mark" color="#fff"></u-icon>

		</view>
		<view class="info info2">
				  <view class="more">
				    <text >*</text>兑换金额
				  </view>
		  <input
		    type="tel"
		    maxlength="24"
			v-model="money"
		    placeholder="请输入金额(元)"
		  />
		</view>
		<view class="tips">
			<text>注意:</text>
			<br> 兑换时间: <text>24小时</text>
		</view>
		<view class="submit" @click="tx">
			确认出款
		</view>
		<uni-popup ref="popup" :is-mask-click="false" >
			<view class="bgmodal">
				<view class="title">
					请输入支付密码
				</view>
				<view class="pay-password" >
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
				
			</view>
		</uni-popup>
		<u-keyboard
		mode="number"
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
	import { createchongzhi,findCustomData,findKefu,findtixianLis2 } from "../../../api/index";
	import CodeKeyboard from '../../../components/CodeKeyboard/CodeKeyboard.vue';
	import { createtixian,findConfig,orderList2,updateCustomData } from "../../../api/index";
	import __config from "../../../config/env.js";
	export default {
		components: {
			  CodeKeyboard,
		},
		data() {
			return {
				userinfo:'',
				money:'',
				uviewkey:false,
				config:'',
				AffirmStatus: 1,
				passwordArr: [],
				oldPasswordArr: [],
				newPasswordArr: [],
				afPasswordArr: [],
			};
		},
		created() {
			this.checkuserinfo()
			// this.checktime()
		},
		onShow() {
			this.checkuserinfo()
		},
		methods:{
			valChange(val){
				console.log(this.money)
				
				
				this.passwordArr.push(val);
			
				// 判断是否等于6
				if(this.passwordArr.length === 6){
					this.passwordArr = [];
					this.AffirmStatus = this.AffirmStatus+1;
				}
				// 判断到哪一步了
			
				if(this.AffirmStatus === 1){
					this.oldPasswordArr = this.passwordArr;
				}else{
					if(this.oldPasswordArr.join('') == this.userinfo.payPwd){
						
						let pwd = this.afPasswordArr.join('')
						this.$refs.popup.close()
						this.uviewkey = false
			
			
							this.oldPasswordArr = []
							this.passwordArr = []
							this.AffirmStatus = 1
							
							
							createtixian({account:this.money}).then((res)=>{
								if(res.code==200){
									uni.navigateTo({
										url:'./withdrawtips?money='+this.money
									})
									// uni.showToast({
									// 	title: '等待审核',
									// 	duration: 2000,
									// })
									this.checkuserinfo()
									this.money = 0
								}
							})
			
						
					}else{
							this.oldPasswordArr = []
						uni.showToast({
							title: '密码不一致',
							icon: 'none'
						})
						this.AffirmStatus = 1
			
					}
						
					
			
			
			
					
				}
				this.$forceUpdate();
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
			
				if(this.passwordArr.length) this.passwordArr.splice(this.passwordArr.length-1,1)
				console.log(this.passwordArr);
			
				
			},
			tx(){
				
				if(this.userinfo.bankName==null){
					uni.showToast({
						title: '请绑定银行卡',
						icon:'error',
						duration: 2000
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/SignIn/SignIn'
						})
					},1000)
				}else if(!this.money){
					uni.showToast({
						title: '请输入金额',
						icon:'error',
						duration: 2000
					});
				}else if(this.money < this.config.withdrawalSizeMin || this.money > this.config.withdrawalSizeMax){
					uni.showToast({
						title: '提现金额不少于'+this.config.withdrawalSizeMin+'元,大于'+this.config.withdrawalSizeMax+'元',
						icon:'none',
						duration: 2000
					});
				}else if(!this.userinfo.payPwd){
					uni.showToast({
						title: '请设置支付密码',
						icon:'none',
						duration: 2000
					});
					uni.navigateTo({
						url:'/pages/PaymentPassword/PaymentPassword'
					})
				}else{
										  
					  this.$refs.popup.open('center')
					  this.uviewkey = true
				}
				
				
				
				
			},
			async checktime(){
				let _this = this
				//订单数为0
				const  orderlist  = await orderList2()
				
				
				
				await findConfig().then((res)=>{
					console.log(orderlist.result.length,11111111)
					let data = res.result
					this.config = res.result
					this.starttime = res.result.withdrawalStartTime
					this.endtime = res.result.withdrawalEndTime
				
					let date = new Date(parseInt(res.timestamp))
					var minute = date.getHours();
					if(orderlist.result.length == 0){
						_this.timeshow = 2
					}else if(res.result.withdrawalPower ==  'Y'){
							if(minute >= data.withdrawalStartTime && minute <= data.withdrawalEndTime){
								_this.timeshow = 0
							}else{
								_this.timeshow = 1
							}
					}else if(res.result.withdrawalPower == 'N'){
						_this.timeshow = 1
					}
					
				})
			},
			
			checkuserinfo(){
				let _this = this
			findCustomData().then(res=>{
					console.log(res)
					_this.userinfo = res.result
					if(!_this.userinfo.payPwd){
						_this.showmoadl('为了用户的安全，请设置支付密码')
						_this.settimeurl('/pages/my/setting/capitalSettings')
					}else if(!_this.userinfo.bankName){
						_this.showmoadl('未绑定银行卡，现在跳往银行页面')
						_this.settimeurl('/pages/my/managebankcard/managebankcard')
					}
				})
			
			},
			showmoadl(msg){
				uni.showToast({
					title: msg,
					icon:"none",
					duration: 1000
				});
			},
			settimeurl(url){
				setTimeout(()=>{
					uni.navigateTo({
						url:url
					})
				},1000)
			}
		}
	}
</script>

<style lang="scss">
::v-deep .u-navbar__content__title{
	color:	#e6b98a;
}
.page{
  width: 100%;
  height: 100vh;
  background-color: #373536;
}
.topher{
	width: 100%;
	height: 44px;
}
.bgmodal{
	width: 375px;
	height: 200px;
	background:#fff;
	display: flex;
	// align-items: center;
	justify-content: center;
	border-radius: 15px;
	flex-wrap: wrap;
	.title{
		margin-top: 50px;
	}
	
}
.pay-password{

	display: flex;
	align-items: center;
	width: 90%;
	height: 80rpx;
	margin: 20rpx auto;
	border: 2rpx solid $base;
	background:#fff;

	.list{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16.666%;
		height: 100%;
		border-right: 2rpx solid #EEEEEE;
		text{
			font-size: 32rpx;
		}
	}
	.list:nth-child(6){
		border-right: none;
	}
}
.submit{
	width: 250px;
	    height: 40px;
		line-height: 40px;
	    border-radius: 30px;
		text-align: center;
	    color: #fff;
	    font-weight: 700;
	    margin: 40px auto;
	    background: linear-gradient(#fde3ca,#e7b486);
}
.tips{
	width: 80%;
	height: 50rpx;
	margin:20px auto;
	color:#fff;
	text{
		color:	#e6b98a;
	}
}
.info{
    display: flex;
    align-items:center;
    justify-content: space-between;
    width: 80%;
    height: 100rpx;
	margin:20px auto;
	text-align: center;

    // border-bottom: 2rpx solid #f6f6f6;
    input{
      width: 100%;
      height: 100%;
      font-size: 26rpx;
      color: #fff;
	  background-color: #535353;
    }
	::v-deep .uni-input-placeholder{
		color: #c8c9cc;
	}
	::v-deep .uni-input-input{
		color: #f3c7a2;
	}
	.more{
	  width: 35%;
	  text-align: center;
	  color: #fff;
	  text{
		  color: #ee0d24;
	  }
	}
  
  }
.banknumber{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
}
.topcontent{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	margin: 10px 0;
	.li{
		width: 50%;
		height: 60px;
		text-align: center;
		.title{
			font-size: 16px;
		}
		.number{
			font-size: 14px;
			color: #e6b98a;
			font-weight: 500;
		}
	}
}
</style>
