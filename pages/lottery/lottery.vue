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
					<u-icon name="list-dot" size="50" color="#fff"></u-icon>交易中心
				 </view>
				</u-navbar>
		<view class="topher"></view>
		<view class="head">
			<view class="left"> 
				<view >货币:{{userinfo.givenAccount}}</view>
				<view >轮数:{{historylist[0].activityTitile}}</view>
				<view >截止时间  {{downtime[0]}}:{{downtime[1]}}:{{downtime[2]}}</view>
			</view>
			<view class="right" @click="gourl(0)">
				<view >交易记录<text class="iconfont iconjiantou-01"></text></view>
		<!-- 		<view >今日交易量:</view>
				<view >今日盈亏:</view> -->
			</view>
		</view>
		<view class="notice" @click="historyshow = !historyshow" >
			<view>第{{historylist[1].activityTitile}}</view>
			<view class="textc">{{historylist[1].resultNum1}}+{{historylist[1].resultNum2}}={{historylist[1].resultStr}}</view>
			<view class="textc">{{historylist[1].resultOdd==3?'[做多]':'[做空]'}} , {{historylist[1].resultSize==1?'[做高]':'[做低]'}}</view>
			<view class="icon" ><u-icon name="arrow-down" color="#cbcbd6"></u-icon></view>
		</view>
		<view class="buyhistory">
			<view class="li">
				<view>用户</view>
				<view>轮数</view>
				<view>交易品类</view>
				<view>单轮交易</view>
				<view>跟单</view>
			</view>
			<view class="lilist" 	>
				<view class="li" v-for="(item,i) in clist" :key="i">
					<view>{{item.name}}</view>
					<view>{{historylist[0].activityTitile}}</view>
					<view style="width: 25%;">{{item.resultOdd==3?'[做多]':'[做空]'}} , {{item.resultSize==1?'[做高]':'[做低]'}}</view>
					<view>￥{{item.money}}</view>
					<view class="last" @click="gendan(item)"> 
						<view class="btn">
							 跟单
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<u-popup :show="historyshow" mode="right"  @close="close" @open="open">
		        <view class="history"  >
		        	<view class="li"> 
		        		<view>期号</view>
						<view>轮数</view>
		        		<view>交易品类</view>	
		        	</view>
		        	<view class="li" v-for="(item,i) in historylist.slice(1,60)" :key="i"	>
		        		<view>{{item.activityTitile}}</view>
		        		<view>{{item.resultNum1}}+{{item.resultNum2}}+={{item.resultStr}}</view>
		        		<view>{{item.resultOdd==3?'[做多]':'[做空]'}} , {{item.resultSize==1?'[做高]':'[做低]'}}</view>
		        		<!-- <view>{{item.tabs[0]}}{{item.tabs[1]}}</view>	 -->
		        	</view>
					<!-- <uni-load-more :status="status"></uni-load-more> -->
		        </view>
			</u-popup>
			<view class="buylist">
				<u-subsection 
					:list="flist" 
					:current="current"
					@change="sectionChange"
					bgColor="transparent"
					activeColor="#0e72be"
					inactiveColor="#fff"
				></u-subsection>

				<view class="blist">
					<view class="li" 
						v-for="(item,i) in roomlist" :key="i" 
						:class="item.ed == true?'active':''"
						@click="item.ed = !item.ed ,changelist()"
						>
						<view class="t1">做{{item.oddsStr}}</view>
						<view class="t2">{{item.odds}}</view>
					</view>
					
					
					
				</view>
				<view class="buybtn" >
					<input type="number" v-model="buynumber" class="inputbuy" placeholder="请输入数量">
					<view class="btn" @click="checkbuy">购买</view>
				</view>

				<u-modal :show="modalshow" title="确认信息" @confirm="buy" :closeOnClickOverlay="true" @close="closemodal">
					<view class="modalcss">
						<view> <text>购买金额</text> {{buylist.account}}</view>
						
						<view v-for="(item,i) in buylist.objList"> <text>购买类型</text> 做{{item.oddsStr}} 倍率{{item.orderOdds}} </view>

					</view>
				</u-modal>
			</view>
			
		
		
	</view>
</template>

<script>
	import { findActivityPage,lastAcitiy,buyOrder } from "../../api/gril";
	import {findCustomData,oddsList,findConfig } from "../../api/index";
	import fjjCondition from '@/components/fjj-condition/fjj-condition.vue';
	export default {
		components: {

		},
		data() {
			return {
				modalshow:false,
				buynumber:0,
				config:'',
				overlayshow:true,
				downtime:[],
				historylist:[{activityTitile:''},{activityTitile:''}],
				historyshow:false,
				pageNo:1,
				pagesize:100,
				flist:['常规'],
				clist:[],
				current: 0,
				currentId:0,
				userinfo:'',
				timearray:'',
				roomtype:'',
				roomlist:[],
				countnum:0,
				buylist:{
					account:'',
					objList: ''
				}
			}
		},
		async onLoad(option) {
			this.roomtype = option.roomType
			await this.historyapi()
			this.checkapitime()
			this.checkodd()
		},
		onShow () {
			 this.historyapi()
			this.checkapitime()
			this.checkodd()
		},

		mounted(){
		    this.$nextTick(() => { // 动态时间展示
		    	setInterval(this.timeup, 1000);
		    });
		  },
		methods: {
			checkbuy(){
				
				if(this.buynumber == 0){
					this.showmoadl('请输入数量','error')
				}else{
					this.modalshow = true
					this.buylist = {
						account:'',
						objList: ''
					}
					let roomlist = this.roomlist
					let resultTypeList = []
					roomlist.forEach(function (item, index) {
							let li = {}
							if(item.ed == true){
								li.orderOdds = item.odds
								li.resultType = item.orderNum
								li.oddsStr = item.oddsStr
								resultTypeList.push(li)
							}
						   });
						   console.log(resultTypeList)
					
					let data = {
						account:this.buynumber,
						objList: resultTypeList,
					}
					this.buylist = data
				}
				
				
				
			},
			closemodal(){
			
				this.modalshow = false
				this.checkodd()
				this.buylist = {
					account:'',
					objList: ''
				}
			},
			gendan(item){
				// console.log(item,'22')
				// console.log(this.roomlist,'222')
				// this.checkapitime()
				let resultOdd =item.resultOdd==3?'多':'空'
				let resultSize =item.resultSize==1?'高':'低'
				let roomlist = this.roomlist
				
				this.buynumber =item.money
				roomlist.forEach(function (item, index) {
						if(item.oddsStr == resultOdd){
							item.ed = true
						}else if(item.oddsStr == resultSize){
							item.ed = true
						}else{
							item.ed = false
						}
					   });
					   this.roomlist = roomlist
			},
			buy(){
				let config = this.config
				let roomtype = this.roomtype
				let roomlist = this.roomlist
				let resultTypeList = []
				roomlist.forEach(function (item, index) {
						let li = {}
						if(item.ed == true){
							li.orderOdds = item.odds
							li.resultType = item.orderNum
							resultTypeList.push(li)
						}
					   });
				
				let data = {
					account:this.buynumber,
					objList: resultTypeList,
					roomType: roomtype
				}
			
				
				if(roomtype == 1){
					
					if(this.buynumber >= config.thresholdInterMin){
						data.account = this.buynumber 
						buyOrder(data)
						this.closemodal()
						this.showmoadl('下单成功','success')
						this.checkapitime()
						this.checkodd()
					}else{
						this.closemodal()
						this.showmoadl('下单数量不能低于￥'+config.thresholdInterMin)
					}
					
				
					
				}else if(roomtype == 2){
					if(this.buynumber >=config.thresholdAdvMin){
						data.account = this.buynumber 
						buyOrder(data)
						this.closemodal()
						this.showmoadl('下单成功','success')
						this.checkapitime()
						this.checkodd()
					}else{
						this.closemodal()
						this.showmoadl('下单数量不能低于￥'+config.thresholdAdvMin)
					}
					
				}else if(roomtype == 3){
					if(this.buynumber >=config.thresholdVipMin){
						data.account = this.buynumber 
						buyOrder(data)
						this.closemodal()
						this.showmoadl('下单成功','success')
						this.checkapitime()
						this.checkodd()
					}else{
						this.closemodal()
						this.showmoadl('下单数量不能低于￥'+config.thresholdVipMin)
					}
					
				}
			
				
			},
			async historyapi(){
					let _this = this
					const  res  = await findActivityPage({pageNo:this.pageNo,pageSize:this.pagesize});
					let newarray = []
			
					res.result.records.forEach(function(res,index){
						if(_this.roomtype == res.roomType){
							

							newarray.push(res)
						}
					})
			
			// 		if(res.result.records.length == 0){
			// 			this.status = 'no-more'
			// 		}
				
					this.historylist = newarray
			},
			async checkodd(){
				this.buynumber = 0
				await oddsList().then(res=>{
					let roomtype = this.roomtype
					let roomlist = res.result
					let rooml = []
					roomlist.forEach((item,index) =>{
							let li = {}
							if(roomtype == item.roomType){
								li = item
								li.ed = false

								if(index==0){
									li.ed = true
								}
								rooml.push(li)
							}
						   });
						   rooml[0].ed = true
						   this.roomlist = rooml
						   console.log(rooml,'rooml')
				})
				let clist = []
				for (let i = 0; i < 30; i++) {
					let li = {}
					li.name = '***'+(Math.random()*(90000-10000)).toFixed(0)
					li.resultOdd = (Math.random()*(4-3)+3).toFixed(0)
					li.resultSize = (Math.random()*(2-1)+1).toFixed(0)
					li.money = (Math.random()*(90000-50000)).toFixed(0)
					clist.push(li)
				}
				this.clist = clist
			},
			async checkapitime(){
				await lastAcitiy().then((res)=>{
					this.timearray = res.result
					})
					
					await findCustomData().then(res=>{
						this.userinfo = res.result
					})
					await findConfig().then((res)=>{
						let data = res.result
						this.config = data
					})
					
					
			},
			//倒计时
			  timeup() {
							this.checkapitime()

							  // 开始时间
							  let starttime = this.timearray[0].split(' ')
							  starttime = starttime[1].split(':')
							  //当前时间
							  let nowttime = this.timearray[1].split(' ')
							  nowttime = nowttime[1].split(':')
							  //结束时间
							  let endtime = this.timearray[2].split(' ')
							  endtime = endtime[1].split(':')
							  // let start = (new Date(res.result[1])).getTime();
							  let date = new Date()
							  // let start = (new Date(date)).getTime();
							  let start = (new Date(this.timearray[1])).getTime();
							  let end = (new Date(this.timearray[2])).getTime();
							  let downtime = this.getTimem((end - start) / 1000)
							  if(downtime[2] <= 0){
								  this.checkapitime()
								  this.historyapi()
							  }
							   this.downtime = downtime
							  // console.log(downtime,'我到执行的',endtime,nowttime)
			},
			gourl(item){
					if(item==0){
						uni.navigateTo({
							url:'/pages/my/gameRecordIndex/gameRecordIndex'
						})
					}
			},
			//秒转换时分秒
			getTimem(time) {
			            // 转换为式分秒
			            let h = parseInt(time / 60 / 60 % 24)
			            h = h < 10 ?  h : h
			            let m = parseInt(time / 60 % 60)
			             m = m < 10 ?  m : m
			            let s = parseInt(time % 60)
			             s = s < 10 ?  s : s
			            // 作为返回值返回
			            return [h, m, s]
			},
			open() {
					this.historyshow = true
			  },
			  close() {
				this.historyshow = false
			  },
			changelist(){

				let ai = 0
				for (let i = 0; i < this.roomlist.length; i++) {
						if(this.roomlist[i].ed == true){
							ai += 1
						}
					}
					console.log(ai,'一共几个')
					// this.countnum = ai

				
				
				
			},
			sectionChange(index) {
				this.current = index;
			},
			showmoadl(msg,icon='none'){
				
				uni.showToast({
					title: msg,
					icon:icon,
					duration: 3000
				});
			},
			goback(){
				uni.switchTab({
					url:'./jydt'
				})
			},
		}
	}
</script>

<style lang="scss">
	.modalcss{
		text{
			display: inline-block;
			width: 80px;
		}
	}
	.buybtn{
		background: #32395e;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 44px;
		padding-bottom: 10px;
		.inputbuy{
			width: 225px;
			border: 1px solid #627ecd;
			border-radius: 5px;
			height: 35px;
			text-indent: 1rem;
			color:#fff;
		}
		.uni-input-placeholder{
			color: #fff;
		}
		.btn{
			    border-radius: 5px;
			    height: 35px;
			    line-height: 35px;
			    width: 125px;
			    color: #fff;
			    background: #06c0ff;
				text-align: center;
				margin-left: 10px;
		}
	}
	::v-deep .u-subsection--button__bar{
		background: #32395e !important;
	}
	.right-aside{
		flex: 1;
		overflow: hidden;
	}
	.buylist{
		width: 100%;

		.blist{
			background: #32395e;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 10px 10px;
			height: 119px;
			// overflow-y: auto;
			.li{
				width: 48%;
				background: #161936;
				border-radius: 5px;
				text-align: center;
				padding: 3px 0px;
				margin-bottom: 10px;
				border: 1px solid #32395e;
				height: 48px;
				.t1{
					color: #0e72be;
					margin-bottom: 5px;
				}
				.t2{
					color: #fff;
				}
			}
			.active{
				border: 1px solid #627ecd;
			}
		}
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.buyhistory{
		width: 90%;
		background: #32395e;
		color: #cbcbd6;
		padding: 10px 10px;
		margin:10px auto;
		border-radius: 10px;
		font-size: 12px;
		height: 350px;
		.lilist{
			overflow-y: auto;
			height: 290px;
		}
		.li{
			display: flex;
			view{
				width:20%;
				height: 36px;
				line-height: 36px;
				text-align:center;
			}
			.last{
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.btn{
				width: 100%;
				    border-radius: 22px;
				    height: 22px;
				    line-height: 22px;
				    width: 52px;
				    color: #fff;
				    background: #06c0ff;
			}
		}
		
	}
	.notice{
		background: #32395e;
		color: #cbcbd6;
		padding: 10px 10px;
		display: flex;
		font-size: 12px;
		margin:5px 0;
		justify-content: space-between;
		align-items: center;
		text-align:center;
		.icon{
			width:25%;
			justify-content: center;
			display: flex;
		}
		.textc{

			color: #1f98ec;
		}
		view{
			width:25%;
		}
	}
	.head{

		display: flex;
		justify-content: space-between;
		background: #32395e;
		color: #cbcbd6;
		font-size: 14px;
		padding: 10px 10px;
		view{
			padding: 3px 0px;
		}
		.iconjiantou-01{
			font-size: 14px;
		}
	}
	.u-nav-slot{
			display: flex;
			color: #fff;
		}
		.history{
			width: 300px;
			height: 100vh;
			background: #32395e;
			.li{
				height: 30px;
				text-align: center;
				font-size: 12px;
				color: #fff;
				display:flex;
				align-items: center;
				view{
					width: 33%;
				}
			}
		}
	//old
	.topher{
		height: 44px;
		width: 100%;
	}


</style>
