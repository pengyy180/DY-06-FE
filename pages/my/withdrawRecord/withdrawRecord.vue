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
					<u-icon name="arrow-leftward" size="40" color="#fff"></u-icon>

				 </view>
				 <view
				        class="u-nav-slot"
				        slot="center"
				    >
				 					<view class="navcenter">资金明细</view>
				 					
				 </view>
				</u-navbar>
		<view class="topher"></view>
		<view class="myinfo">
			<view class="left">
				<image src="../../../static/avatar.png" mode=""></image>
			</view>
			<view class="right">
				<view class="t1">上午好，{{userinfo.customName}}</view>
				<view class="t1" @click="checkuserinfo('updata')">用户余额：<text class="name">
				{{userinfo.givenAccount.num}}{{userinfo.givenAccount.unit}}</text>
								<image src="../../../static/icon-refresh.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="tabs">
			
			 <u-subsection :list="list1" :current="curNow" @change="subchange"></u-subsection>
		</view>
		<view class="recharlist" v-if="curNow == 0">
			<view class="ketitle" @click="kefu">
				<image src="../../../static/kefu-icon.png" mode=""></image>
				<view class="">
					<view class="c1">
						联系客服
					</view>
					<view class="c2">
						联系在线客服获取卡号
					</view>
				</view>
			</view>
			
			</view>
		<view class="recharlist" v-if="curNow == 2">
				<view class="li" v-for="(item,index) in czlist">
					<view class="title">
						<text  class="status-1">{{item.accountStatusname}}:<text class="colorb">{{item.accountTitle}}:{{item.accountBigdec}}元</text></text>
						 <br>
						<text> {{item.createTime}}</text>
					</view>
					<view class="status" >
						充值
						<text class="iconfont iconjiantou-01"></text>
					</view>
					
				</view>
			</view>
		<view class="recharlist" v-if="curNow == 3"> 
			<view class="li" v-for="(item,index) in moneylist">
				<view class="title">
					<text  v-if="item.accountStatus==0" class="status-1">{{item.accountStatusname}}:<text class="colorb">{{item.accountTitle}}:{{item.accountBigdec}}元</text></text>
					<text v-if="item.accountStatus==1" class="status-2">{{item.accountStatusname}}:<text class="colorb">{{item.accountTitle}}:{{item.accountBigdec}}元</text></text>
					<text v-if="item.accountStatus==2" class="status-3">{{item.accountStatusname}}:<text class="colorb">{{item.accountTitle}}:{{item.accountBigdec}}元</text></text> <br>
					<text> {{item.createTime}}</text>
				</view>
				<view class="status" v-if="item.accountStatus == 0">
					申请中
					<text class="iconfont iconjiantou-01"></text>
				</view>
				<view class="status" v-if="item.accountStatus == 1">
					提现成功
					<text class="iconfont iconjiantou-01"></text>
				</view>
				<view class="status error" v-if="item.accountStatus == 2">
					提现失败
					<text class="iconfont iconjiantou-01"></text>
				</view>
			</view>
			<!-- <uni-load-more :status="status"></uni-load-more> -->
		</view>
	</view>
</template>

<script>
	import { findtixianList,findtixianLis2,findCustomData,findConfig } from "../../../api/index";
	export default {
		data() {
			return {
				curNow: 0,
				 list1: [{
						name: '存款',
					}, {
						name: '取款',
					}, {
						name: '存款记录'
					}, {
						name: '提现记录'
				}], 
				userinfo:'',
				moneylist:[],
				czlist:[],
				status: 'none',
				scrollTop: 0 ,
				pagesize:2,
				pageNo:1,
			};
		},
		created (){
			this.checklist(1)
			this.checkuserinfo()
		},
			// onReachBottom() {
			// 	this.pageNo +=1
			// 	this.checklist(1)
			// 	// uni.$u.toast("上拉触发",this.pageNo)
			// 	//这是上拉触发的函数.一般在这里进行分页操作. 
			//     /*会有一种情况就是当数据已经全部加载完成了,再次触底还会调用接口,
			//       这时就需要去记录一下是否已经全部加载完毕,加载完毕就不去请求接口了.
			//       这时最常见的节流场景*/
			// },
		methods:{
			kefu(){
					findConfig().then((res)=>{
						console.log(res.result)
						window.location.href="https://chatlink.mstatik.com/widget/standalone.html?eid="+res.result.meiqia
					})
			},
			subchange(index){
				if(index == 1){
					uni.navigateTo({
						url:'/pages/my/recharge/recharge'
					})
				}
				this.curNow = index;
			},
			async checklist(index){
				// const  res  = await findtixianList({payType:index,pageNo:this.pageNo,pagesize:this.pagesize})
				const  res  = await findtixianLis2()
					
				this.nowtime = 		new Date(parseInt(res.timestamp)).toLocaleString()
				console.log(res)
					// accountStatus
					res.result.forEach((e)=>{
						if(e.accountStatus == 0){
							e.accountStatusname = '申请中'
						}else if(e.accountStatus == 1){
							e.accountStatusname = '通过'
						}else if(e.accountStatus == 2){
							e.accountStatusname = '拒绝'
						}
						
						
						if(e.accountType == 1){
							e.accountTypename = '充值'
						}else if(e.accountType == 2){
							e.accountTypename = '提现'
						}else if(e.accountType == 3){
							e.accountTypename = '消费'
						}else if(e.accountType == 4){
							e.accountTypename = '返利'
						}else if(e.accountType == 5){
							e.accountTypename = '充值'
						}
					})
					let data = res.result
					// if(index == 0){
						
					// 	data.forEach((e)=>{
					// 		if(e.accountType == 3){
					// 			console.log(e.accountType,'1111')
					// 			this.moneylist.push(e)
					// 		}
					// 	})
					// }else if(index == 1){
					// 	data.forEach((e)=>{
					// 		if(e.accountType == 1 ||  e.accountType == 5){
					// 			console.log(e.accountType,'1111')
					// 			this.moneylist.push(e)
					// 		}
					// 	})
					// }else if(index == 2){
						data.forEach((e)=>{
							if(e.accountType == 2){
								console.log(e.accountType,'2222')
								this.moneylist.push(e)
							}
							if(e.accountType == 1 ||  e.accountType == 5){
								console.log(e.accountType,'2222')
								this.czlist.push(e)
							}
						})
					// }
					console.log(this.moneylist,'111111111')
			},
			async checkuserinfo(item){
				let _this = this
				await findCustomData().then(res=>{
					_this.userinfo = res.result

					_this.userinfo.givenAccount = _this.handleMoney(_this.userinfo.givenAccount)
				})
				
				//统计盈利
				if(item){
					uni.showToast({
						title: '刷新成功',
						icon:'none',
						duration: 2000
					});
				}
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
			goback(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
		}
	}
</script>

<style lang="scss">
::v-deep .u-navbar__content__title{
	color:	#3b9dfd;
}
.recharlist{
	width: 100%;
	height: 100%;
	.ketitle{
		display:flex;
		align-items: center;
		padding: 10px 10px;
		image{
			width: 42px;
			height: 42px;
			margin-right: 10px;
		}
		.c1{
			    font-size: 19px;
			    color: #3c3c3c;
		}
		.c2{
			font-size: 13px;
			color: #5c5c5c;
		}
	}
	.li{

		padding: 0 3%;
		height: 85px;
		border-bottom: 1px solid #f2f2f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title{
			width: 70%;
			font-size: 16px;
			color: #fff;
			text{
				font-size: 14px;
				color: #979799;
			}
		}
		.status{
			color: #2ec210;
			display: flex;
			align-items: center;

			.iconjiantou-01{
				font-size: 12px;
				color: #979799;
			}
		}
		.error{
			color:#d33939;
		}
	}
}
.page{	
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background-color: #f5f5f5;

}
.topher{
	width: 100%;
	height: 44px;
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
</style>
