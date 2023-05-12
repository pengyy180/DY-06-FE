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
		<view class="gamelist">
			<view class="li">
				<view>时间</view>
				<view>笔数</view>
				<view>下注金额</view>
				<view>中奖金额</view>
			</view>
			<view class="li" v-for="(item,i) in gamelist" :key="i" @click="details(item)">
				<view>{{item.activityDate}}</view>
				<view>{{item.countBi}}</view>
				<view>{{item.account}}</view>
				<view>{{item.zongAccount}}</view>
			</view>
			<view class="li green">
				<view>{{gamelist.length}}天总计</view>
				<view>{{countlist.countBi}}</view>
				<view>{{countlist.account}}</view>
				<view>{{countlist.zongAccount}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { findOrderDay} from "../../../api/index";
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
		onLoad() {
			this.checkinfo()
		},
		onShow() {
			this.checkinfo()
		},
		methods: {
			details(item){
				console.log(item)
				uni.navigateTo({
					url:'./gamerecorddetail?orderDate='+item.activityDate
				})
			},
			checkinfo(){
				findOrderDay().then((res)=>{
					this.gamelist = res.result
					
					let countBi = 0
					let account = 0
					let zongAccount = 0
					
					for (let i = 0; i < res.result.length; i++) {
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
	margin-top: 44px;
		width:100%;
		height:70px;
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
			view{
				width:24.5%;
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
