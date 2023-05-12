<template>
	<view class="page">
		<u-navbar
							leftIconSize="16px"	
							leftIcon=""
							:autoBack="false"
								bgColor="#161936"
								@rightClick="rightClick"
		
		>
					<view
		                class="u-nav-slot"
		                slot="center"
		            >
					<view class="navcenter">个人中心</view>
					
				 </view>
				 <view
				                 class="u-nav-slot"
				                 slot="right"
				             >
				              <view class="loginout">
				              	退出
				              </view>
				  </view>
		</u-navbar>
		<view class="indextop"></view>
		<view class="main">
			<view class="myinfo">
				<view class="left">
					<image src="../../static/avatar.png" mode=""></image>
				</view>
				<view class="right">
					<view class="t1">上午好，{{userinfo.customName}}</view>
					<view class="t1" @click="checkuserinfo('updata')">用户余额：<text class="name">{{userinfo.givenAccount.num}}{{userinfo.givenAccount.unit}}</text>
									<image src="../../static/icon-refresh.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="mylist">
				<view class="li" v-for="(item,i) in mylist" :key="i" @click="gourl(item)">
					<image :src="item.img" mode=""></image>
					<view>{{item.name}}</view>
				</view>
			</view>
			
			

				
				

				  <DialogBox ref="DialogBox"></DialogBox>    



		</view>
	</view>
</template>

<script> 
import { updateCustomData,findCustomData,findKefu,findtixianLis2 ,findConfig } from "../../api/index";
	import __config from "../../config/env.js";
	export default {
		data() {
			return {
				formvalue:[],
				datalist:[1,2,3,4],
				userinfo:'',
				action:__config.basePath,
				djmoney:0,
				ylmoney:0,
				mylist:[
					{name:'资金明细',img:'../../static/my1.png'},
					{name:'下注记录',img:'../../static/my2.png'},
					// {name:'我的消息',img:'../../static/my3.png'},
					{name:'个人资料',img:'../../static/my4.png'},
					{name:'银行账户',img:'../../static/my5.png'},
					{name:'资金管理',img:'../../static/my6.png'},
					{name:'登录密码',img:'../../static/my7.png'},
					{name:'取款密码',img:'../../static/my8.png'},
					{name:'在线客服',img:'../../static/my9.png'},
				]
			}
		},
		onShow() {
			this.checkuserinfo()
		},
		async created() {
			await this.checkuserinfo()
		},
		methods: {
			rightClick(){
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
			},
			datalistbtn(){
				console.log(this.datalist,'---------',this.formvalue)
			},
			gourl(item){
				console.log(item)
				if(item.name=='资金明细'){
					uni.navigateTo({
						url:'/pages/my/withdrawRecord/withdrawRecord'
					})
				}else if(item.name=='资金管理'){
					uni.navigateTo({
						url:'./recharge/recharge'
					})
				}else if(item.name=='取款密码'){
					uni.navigateTo({
						url:'./setting/capitalSettings'
					})
				}else if(item.name=='登录密码'){
					uni.navigateTo({
						url:'./setting/changePassword'
					})
				}else if(item.name=='银行账户'){
					uni.navigateTo({
						url:'./managebankcard/managebankcard'
					})
				}else if(item.name=='个人资料'){
					uni.navigateTo({
						url:'./setting/setting'
					})
				}else if(item.name=='在线客服'){
					findConfig().then((res)=>{
						console.log(res.result)
						window.location.href="https://chatlink.mstatik.com/widget/standalone.html?eid="+res.result.meiqia
					})
				}else if(item.name=='下注记录'){
					uni.navigateTo({
						url:'./gameRecordIndex/gameRecordIndex'
					}) 
				}
			},
			async checkuserinfo(item){
				//获取到前日期
				const nowDate = new Date();
				const date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate(),
				}
				const newmonth = date.month>10?date.month:'0'+date.month
				const day = date.date>=10?date.date:'0'+date.date
				let systemDate = date.year + '-' + newmonth + '-' + day
				//	查询待审核金额
				let _this = this
				await findCustomData().then(res=>{
					_this.userinfo = res.result
					_this.userinfo.id = String(_this.userinfo.id).slice(0,8)
					_this.userinfo.givenAccount = _this.handleMoney(_this.userinfo.givenAccount)
				})
				const  res  = await findtixianLis2()
				let data = res.result
				let money = 0
				for (let i = 0; i < data.length; i++) {
						if(data[i].accountType == 2  && data[i].accountStatus == 0){
							money += data[i].accountBigdec
						}
					}
				this.djmoney = await this.handleMoney(money)
				//统计盈利
				if(item){
					uni.showToast({
						title: '刷新成功',
						icon:'none',
						duration: 2000
					});
				}
			},
			//客服
			kefu() {
				findConfig().then((res)=>{
					console.log(res.result)
					window.location.href="https://chatlink.mstatik.com/widget/standalone.html?eid="+res.result.meiqia
				})

			},
			handleMoney(num) {
			  // 首先先声明一个金额单位数组
					let AmountUnitlist = ["元", "万元", "亿", "兆", '京', '垓', '杼']
					
			  // 将数字金额转为字符串
			  let strnum = num.toString()
			  // 声明一个变量用于接收金额单位
			  let AmountUnit = ''
			  // 循环遍历单位数组
			  AmountUnitlist.find((item, index) => {
			    let newNum = ''
			    // 判断一下传进来的金额是否包含小数点
			    if (strnum.indexOf('.') !== -1) {
			      // 若有则将小数点前的字符截取出来
			      newNum = strnum.substring(0, strnum.indexOf('.'))
			    } else {
			      // 没有则直接等于原金额
			      newNum = strnum
			    }
			    // 判断一下经过小数点截取后的金额字符长度是否小于5
			    if (newNum.length < 5) {
			      // 若小于5则接收当前单位，并跳出迭代
			      AmountUnit = item
			      return true
			    } else {
			      // 若不小于5则将经过小数点截取处理过后的字符除以10000后作为下一轮迭代的初始金额重新判断(每一个单位之间相距4位数，故除以10000)
			      strnum = (newNum * 1 / 10000).toString()
			    }
			  })
			  let money = {num: 0, unit: ""}
			  // 保留2位小数
			  money.num = (strnum * 1).toFixed(2)
			  // 接收单位
			  money.unit = AmountUnit
			  return money
			},
		}
	}
</script>

<style scoped lang="scss">
	.mylist{
		width:100%;
		display:flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		font-size: 12px;
		.li{
			width: 33%;
			padding:20px 0;
			display:flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			text-align: center;
			view{
				width:100%;
			}
		}
		image{
			margin-bottom: 5px;
			width: 40px;
			height: 40px;
		}
	}
	.myinfo{
		width: 100%;
		background: linear-gradient(45deg,#AAAAAA,#666666);
		padding: 35px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.left{
			image{
				width: 70px;
				height:70px;
			}
		}
		.right{
			margin-left: 30px;
			color: #fff;
			font-size: 17px;
			image{
				width: 20px;
				height: 20px;
				margin-left: 10px;
			}
			.t1{
				display: flex;
				align-items: center;
				margin-bottom: 5px;
			}
			.t1 .name{
				
				color: #ffd800;
			}
		}
	}
	.u-nav-slot{
		display: flex;
		color: #fff;
	}
	.navcenter{
		font-weight: 600;
		font-size: 20px;
	}
	.indextop{
		width: 100%;
		height: 44px;
	}
	.page{
		background: url('../../static/pro-bg2.png') no-repeat;
	}
	.main{
		width: 100%;
		margin:0 auto;

		// background-image: url('../../static/pro-bg2.png') no-repeat;
	}
	::v-deep .dialog-box .operation-btn .btn .activity {
	    color: #000 !important;
	}
</style>
