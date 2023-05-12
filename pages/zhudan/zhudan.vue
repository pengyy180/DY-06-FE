<template>
	<view class="page">
		<u-navbar
		
		    @rightClick="rightClick"
		    :autoBack="false"
			leftIcon=""

		>
			<view
			    class="u-nav-slot"
			    slot="center"
			>
			<view class="navcenter">即时注单</view>
			</view>
		</u-navbar>
		<view class="gamelist">
			<view class="li">
				<view>彩种</view>
				<view>注单笔数</view>
				<view>下注金额</view>
			</view>
			<view class="li" v-for="(item,i) in gamelist" :key="i">
				<view>{{item.czName}}</view>
				<view>{{item.countBi}}</view>
				<view>{{item.account}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { findOrderRun} from "../../api/index";
	export default {
		data() {
			return {
				gamelist:[
				]
			}
		},
		onLoad() {
			this.checkinfo()
		},
		onShow() {
			this.checkinfo()
		},
		methods: {
			checkinfo(){
				findOrderRun().then((res)=>{
					this.gamelist = res.result
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
				width:33%;
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
