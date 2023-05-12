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
					 存入记录
				 </view>
				</u-navbar>
		<view class="topher"></view>
		<view class="recharlist" > 
			<view class="li" v-for="(item,index) in moneylist">
				<view class="title">
					<text  v-if="item.accountStatus==0" class="status-1">{{item.accountStatusname}}:<text class="colorb">{{item.accountTitle}}:{{item.accountBigdec}}元</text></text>
					<text v-if="item.accountStatus==1" class="status-2">{{item.accountStatusname}}:<text class="colorb">{{item.accountTitle}}:{{item.accountBigdec}}元</text></text>
					<text v-if="item.accountStatus==2" class="status-3">{{item.accountStatusname}}:<text class="colorb">{{item.accountTitle}}:{{item.accountBigdec}}元</text></text> <br>
					<text> {{item.createTime}}</text>
				</view>
				<view class="status">
					充值成功
					<text class="iconfont iconjiantou-01"></text>
				</view>
			</view>
			<!-- <uni-load-more :status="status"></uni-load-more> -->
		</view>
	</view>
</template>

<script>
	import { findtixianList,findtixianLis2,findCustomData } from "../../../api/index";
	export default {
		data() {
			return {
				moneylist:[],
				status: 'none',
				scrollTop: 0 ,
				pagesize:2,
				pageNo:1,
			};
		},
		created (){
			this.checklist(1)
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
					if(index == 0){
						
						data.forEach((e)=>{
							if(e.accountType == 3){
								console.log(e.accountType,'1111')
								this.moneylist.push(e)
							}
						})
					}else if(index == 1){
						data.forEach((e)=>{
							if(e.accountType == 1 ||  e.accountType == 5){
								console.log(e.accountType,'1111')
								this.moneylist.push(e)
							}
						})
					}else if(index == 2){
						data.forEach((e)=>{
							if(e.accountType == 2){
								console.log(e.accountType,'2222')
								this.moneylist.push(e)
							}
						})
					}
					console.log(this.moneylist)
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

	.li{
		// width: 100%;
		padding: 0 3%;
		height: 85px;
		border-bottom: 1px solid #f2f2f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title{
			width: 70%;
			font-size: 14px;
			color: #fff;
			text{
				font-size: 12px;
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
</style>
