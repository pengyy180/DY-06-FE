<template>
	<view class="page">
		<u-navbar
		
		    @rightClick="rightClick"
		    :autoBack="true"
			leftIcon="arrow-left"
			leftIconSize="24px"
			leftIconColor="#fff"
		>
			<view
			    class="u-nav-slot"
			    slot="center"
			>
			<view class="navcenter">下注记录</view>
			</view>
		</u-navbar>
		<view style="margin-top: 44px;width: 100%;">
			
		</view>
		<view v-for="(item,i) in gamelist" :key="i"  >
			
	
		<view class="gamelist" >
			<view class="li" >
				
				<view class="c1" style="width: 22%;">期数</view>
				<view class="c1">内容</view>
				<view class="c1">赔率</view>
				<view class="c1">下注金额</view>
				<view class="c1">中奖金额</view>
			</view>
			<view class="li" v-for="(item2,i) in item.childList" :key="i" >
				<view class="c1" style="width: 22%;">{{item.activitTitle}}</view>
				<view class="c1">{{item2.oddName}}</view>
				<view class="c1">{{item2.oddOdd}}</view>
				<view class="c1">{{item2.orderPrice  }}</view>
				<view class="c1">{{item2.zongfanhui }}</view>
			</view>
		</view>
		

			</view>
	</view>
</template>

<script>
	import { findOrderDay,orderList} from "../../../api/index";
	export default {
		data() {
			return {
				gamelist:[
				],
				countlist:{
					countBi:0,
					account:0,
					zongAccount:0
				}
			}
		},
		onLoad(option) {
			this.checkinfo(option.orderDate)
		},
		onShow() {
			// this.checkinfo()
		},
		methods: {
			checkinfo(orderDate){
				orderList({orderDate:orderDate}).then((res)=>{
					this.gamelist = res.result
					
					let countBi = 0
					let account = 0
					let zongAccount = 0
					
					for (let i = 0; i < res.result.length; i++) {
						res.result[i].createTime = res.result[i].createTime.split(" ")
						res.result[i].createTime = res.result[i].createTime[0]
							countBi += res.result[i].countBi
							account += res.result[i].account
							zongAccount += res.result[i].zongAccount
						}
						this.countlist = {
							countBi:countBi,
							account:account,
							zongAccount:zongAccount
						}
				})
			}
		}
	}
</script>

<style scoped lang="scss"> 
.gamelist{
	margin-top: 24px;
		width:100%;

		display:flex;
		flex-wrap: wrap;
		font-size: 12px;
		border-top:1px solid #efefef;
		border-left:1px solid #efefef;
		.li{
			width: 100%;
			display:flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			text-align: center;
			
			.c1{
				width:19%;
				overflow-x: auto;
				padding: 10px 0;
				border-width: 0 1px 1px 0;
				border-color:#efefef;
				border-style: solid;
			}
			.c2{
				width:32.5%;
				overflow-x: auto;
				padding: 10px 0;
				border-width: 0 1px 1px 0;
				border-color:#efefef;
				border-style: solid;
			}
		}
		image{
			margin-bottom: 5px;
			width: 60px;
			height: 60px;
		}
	}
.navcenter{
		font-weight: 600;
		font-size: 20px;
	}
</style>
