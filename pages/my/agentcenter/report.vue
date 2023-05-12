<template>
	<view class="page">
				<u-navbar
					leftIconSize="16px"	
					
		           title="团队报表"
		           :autoBack="true"
					bgColor="#16151b"
					rightText="筛选"
					@rightClick="rightClick"
		       >
		</u-navbar>
		<view class="topher"></view>
		<fjj-condition ref='condition' @touchmove.stop :color="color" :list="menuList" :defaultValue="defaultValue" @result="resultConditon" />
		<view class="reprotlist">
			<view class="li" v-for="(item,i) in detailsdata" :key="i">
				<view class="num">{{item.num}}</view>
				<view class="name">{{item.name}}</view>
				<view class="line-bottom" ></view>
				<view class="line-right" v-if="i != 2 && i != 5 && i != 8 && i != 11 && i != 13" ></view>
			</view>
		</view>
	</view>
</template>

<script>
	import fjjCondition from '@/components/fjj-condition/fjj-condition.vue';
	export default {
		components: {
			fjjCondition,
		},
		data() {
			return {
				color: '#e6b98a',
				hasChoose: false,
				detailsdata:[
					{name:'任务盈利',num:0},
					{name:'团队佣金',num:0},
					{name:'下级总数',num:0},
					{name:'任务积分',num:0},
					{name:'派彩金额',num:0},
					{name:'活动礼金',num:0},
					{name:'投注人数',num:0},
					{name:'首冲人数',num:0},
					{name:'注册人数',num:0},
					{name:'三方盈利',num:0},
					{name:'三方投注',num:0},
					{name:'三方人数',num:0},
					{name:'充值金额',num:0},
					{name:'兑换积分',num:0},
				],
				menuList: [
				{
					'title': '会员名称',
					'placeholder':'请输入会员名称',
					'type': 'singleinput',
					'key': 'input',
				},
				{
					'title': '日期范围',
					'type': 'range',
					'key': 'time1',
					'minName': 'time1MinName',
					'maxName': 'time1MaxName',
				}],
				defaultValue: {time1: ['2021/02/01', '2021/02/03']},
				
			}
		},
		methods: {
			//筛选返回值
			resultConditon(obj) {
				this.$refs.condition.visibleDrawer = false;
				this.hasChoose = obj.hasChoose;
				console.log(obj);
			},
			rightClick(obj){
				this.$refs.condition.visibleDrawer = true;
			}
		}
	}
</script>

<style lang="scss">
.reprotlist{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	.li{
		height: 100px;
		color: #e6b98a;
		font-size: 12px;
		width: 33.33%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		.line-bottom{
			bottom: 0;
			position: absolute;
			border-bottom: 1px solid #f2f2f5;
			width: 30px;
		}
		.line-right{
			right: 0;
			position: absolute;
			border-right: 1px solid #f2f2f5;
			height: 20px;
		}
	}
}
::v-deep .uni-drawer__content{
	width: 300px;
	background-color: #282828 !important; 
}	
::v-deep .u-navbar__content__title{
	color:	#e6b98a;
}
::v-deep .u-navbar__content__right__text{
	color:	#fff;
	font-size: 12px;
}	
.page{
  width: 100%;
  height: 100vh;
  background-color: #282828;
}
.topher{
	width: 100%;
	height: 44px;
}
</style>
