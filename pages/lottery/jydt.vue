<template>
	<view  class="page">
					<u-navbar  
					title="" 	
					@leftClick="historyshow = !historyshow"
					:autoBack="false">
					<view class="u-nav-slot" slot="left">
						<u-icon name="arrow-left" size="30" color="#fff"></u-icon>{{gamename}}
					</view>
		

					<view class="u-nav-slot" slot="right">
						{{userinfo.givenAccount}}<image @click="checkfindConfig('updata')" class="navimg" src="../../static/icon-refresh.png" mode="">
							<u-icon @click="guizeshow = !guizeshow" name="list" color="#fff" size="40"></u-icon>
							
					</view>
		
				</u-navbar>
				
				<view class="navmorelist" v-show="guizeshow">
					<view @click="gourl(10)">即时注单</view>
					<view @click="gourl(11)">今日已结</view>
					<view @click="gourl(12)">开奖结果</view>
					<view @click="gourl(13)">游戏规则</view>
					
					
				</view>
				<u-modal :show="gameshow" @confirm="closegz">
					<view class="gamegzcontent">
						<view class="title">{{psCzMain.sortName}}</view>
						{{psCzMain.czDesc}}
					</view>
					</u-modal @confirm="gameshow = false">
				<u-popup :show="historyshow" mode="left"  @close="gameclose" >
				        <view class="history"  >
				        	<view class="li top" @click="gourl(1)">
				        		<view>返回首页</view>
				        		
				        	</view>
				        	<view class="li" v-for="(item,i) in gamelistall" :key="i"	@click="gourl(0,item)">
				        		<view>{{item.sortName}}</view>
				        	</view>

				        </view>
					</u-popup>
		<view class="indextop"></view>
		<view class="main">
			<view class="toptitle">
				<view class="top">
					<view class="left">
						{{lastPsActivity.activityTitile}}
					</view>
					<view class="right">
						<view class="c2" v-if="lastPsActivity.czType == 0">
							<view  v-for="(c1,c1i) in lastPsActivity.resultNum"  class="radio">
								{{c1}}
							</view>
							<!-- <image v-for="(c1,c1i) in lastPsActivity.resultNum" :src="'../../static/s_'+c1+'.png'" mode=""></image> -->
						</view>
						<view class="c1" v-if="lastPsActivity.czType == 1">
							<image v-for="(c1,c1i) in lastPsActivity.resultNum" :src="'../../static/game'+c1+'.png'" mode=""></image>
						</view>
						<view class="c2" v-if="lastPsActivity.czType == 2">
						
							<image v-for="(c1,c1i) in lastPsActivity.resultNum" :src="'../../static/s_'+c1+'.png'" mode=""></image>
						</view>
						<view class="c3"  >
							<view v-for="(c3,c13) in lastPsActivity.resultStr"  class="cn3">{{c3}}</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="left">
						{{psActivity.activityTitile}}
					</view>
					<view class="right">
						封盘 <view class="fp">{{endtime[0]}}:{{endtime[1]}}:{{endtime[2]}}</view> 
						开奖 <view class="kj">{{downtime[0]}}:{{downtime[1]}}:{{downtime[2]}}</view>
					</view>
				</view>
			</view>
			<!-- 列表 -->
			
			<view class="xdcontent">
				<view class="left">
					<view class="name " 
					v-for="(item,index) in psOddsList" :key="index" 
						:class="{active:index==selectPort}"
						@click="roomchange(item,index)"
					>
						<text></text>{{item.oddsName}}
					</view>
				</view>
				<view class="right">
					<view class="li" v-for="(item,i) in oddsChildRepList" :key="i">
						<view class="title">
							{{item.oddsName}}
						</view>
						<view class="list" >
							<view 
							class="i " 
							v-for="(item2,i2) in item.oddsChildRepList" 

							:class="`${item2.ed == true?'active  ':''}${item.sizeNum == '2'?'i4':''}`"
							@click="item2.ed = !item2.ed ,clicked(item,item2)"
							:key="i2">
								
								
									<image class="c1" 
										v-if="item2.imgs"  
										:src="'../../static/'+item2.imgs+'.png'" 
										mode=""></image>
										<text v-else="item2.imgs">{{item2.oddsName}} </text>
										<view 
											class="imglistd"
											v-if="item2.imglist"  
											v-for="(imgi) in item2.imglist" 
										>
												<image class="c1" :src="'../../static/'+imgi+'.png'" mode="">
												</image>
										</view>
									

								
								<text class="redtext" v-if="userinfo.panType == 0">{{item2.oddsA}}</text> 
								<text class="redtext" v-if="userinfo.panType == 1">{{item2.oddsB}}</text> 
							</view>
						</view>
						
					</view>
					
				</view>
			</view>
			
			<view class="fixedbuy">
				<view class="modal" v-if="endtime[1] == 0 &&endtime[2] <= 15">

					已封盘
				</view>
				<view class="left">
					<view class="select">
						已选中 <text>{{buyOrderlist.objList.length}}</text> 注
					</view>
					<view class="">
						<input class="inputcss" type="number" v-model="orderPrice">
					</view>
				</view>
				<view class="right">
					<view class="buyten" @click="buybtn">
						下注
					</view>
					<view class="buyten reset" @click="resetdata">
						重置
					</view>
				</view>
			</view>
			<u-modal :show="buymodal" 
				:showCancelButton="true" 
				title="确认信息" 
				@confirm="submit" 
				:closeOnClickOverlay="true"
				@cancel="closemodal">
				<view class="modalcss">
					<view class="list">
						<view class="li" v-for="(item,i) in buyOrderlist.objList">
							<view class="title">【{{item.oddsName}}】</view>
							@{{item.oddOdd}} <view class="x">x</view>  {{orderPrice}}
						</view>
					</view>
					<view class="heji">
						合计总注数： <text>{{buyOrderlist.objList.length}}</text>
						总金额：<text>{{buyOrderlist.objList.length * orderPrice}}</text>
					</view>
			
				</view>
			</u-modal>
		</view>
		<view class="footercss"></view>
	</view>
</template>

<script>
	import { findConfig,findCustomData,runAcitiy, findCzlist,lastAcitiy} from "../../api/index";
	import { buyOrder } from "../../api/gril.js";
	export default {
		data() {
			return {
				guizeshow:false,
				gameshow:false,
				historyshow:false,
				buymodal:false,
				roomlist:[{name:'USDT'},{name:'BTC'},{name:'ABC'},],
				gamelist:[
					{gametitle:'abc',gamelist:[{name:'A',ed:false},{name:'B',ed:false},{name:'C',ed:false},{name:'D',ed:false}]},
					{gametitle:'edg',gamelist:[{name:'E',ed:false},{name:'D',ed:false},{name:'G',ed:false}]},
				],
				selectPort:0,
				config:'',
				userinfo:'',
				lastPsActivity:'',
				psActivity:'',
				psOddsList:[],
				oddsChildRepList:[],
				orderPrice:0,
				buyOrderlist:{
					account: 0,
					  activityId: 0,
					  objList: []
				},
				gamelistall:[],
				gameid:0,
				gamename:'',
				downtime:'',
				timearray:'',
				endtime:'',
				psCzMain:''
				
				
			}
		},
		onLoad(option) {
			console.log(option)
			this.gameid = option.id
			this.gamename = option.gname
			this.checkfindConfig()
			this.checkgamelist(this.gameid)
			this.getgame()
			this.checkapitime(this.gameid)
			this.$nextTick(() => { // 动态时间展示
				setInterval(this.timeup, 1000);
			});
		},
		onShow() {
			this.checkfindConfig()
			
		},
		mounted(){
		    
		  },
		methods: {
			//倒计时
			  timeup() {
							this.checkapitime(this.gameid)
							let _this = this
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
							  let entime = this.getTimem((end - start) / 1000)
							  // console.log(downtime,'0')
							  if( downtime[2] == 0){
							  console.log(downtime[2],'是否执行')
								  _this.checkapitime(_this.gameid)
									_this.checkgamelist(_this.gameid)

							  }


							   this.downtime = downtime
							   this.endtime = entime
							  // console.log(downtime,'我到执行的',endtime,nowttime)
			},
			async checkapitime(id){
				await lastAcitiy({czId:id}).then((res)=>{

					this.timearray = res.result
				})
					
					
					
					
			},
			gourl(id,item=null){
				console.log(id,item)
				if(id == 0){
					uni.redirectTo({
						url:'/pages/lottery/jydt?id='+item.id+'&gname='+item.sortName
					})
				}else if(id==1){
					uni.switchTab({
						url:'/pages/index/index'
					})
				}else if(id==10){
					uni.switchTab({
						url:'/pages/zhudan/zhudan'
					})
				}else if(id==11){
					uni.navigateTo({
						url:'/pages/my/gameRecordIndex/gameRecordIndex'
					})
				}else if(id==12){
					uni.switchTab({
						url:'/pages/jieguo/jieguo'
					})
				}else if(id==13){
					this.gameshow = true
					this.guizeshow = false
				}
				
			},
			submit(){
				let buyOrderlist =  this.buyOrderlist
				let psActivity = this.psActivity
				let _this = this
				
				buyOrderlist.objList.forEach(e=>{
					console.log(e)
					e.orderPrice = _this.orderPrice
				})

				let data = {
					account: buyOrderlist.objList.length * _this.orderPrice,
					  activityId: psActivity.id,
					  objList: buyOrderlist.objList
				}
				console.log(buyOrderlist.objList)
				buyOrder(data).then((res)=>{
					console.log(res)
					
					if(res.code == 200){
						_this.buymodal =false
						_this.resetdata()
						_this.checkfindConfig()
						_this.showmoadl('投注成功')
					}
				})
			},
			buybtn(){

				let _this = this
				console.log(_this.orderPrice)
				if(_this.orderPrice == 0){
					_this.showmoadl('金额不能为0')
				}else if(_this.buyOrderlist.objList.length == 0){
					_this.showmoadl('请选择项目')
				}else{
					_this.buymodal =true
				}
			},
			clicked(data,item2){
				
				let psOddsList = this.psOddsList
				let userinfo = this.userinfo
				let _this = this
				let selected = []
				
				
				psOddsList.forEach(function (item, index) {
					if(item.oddsChildRepList){
						item.oddsChildRepList.forEach(function (item2) {
							if(item2.oddsChildRepList){
								item2.oddsChildRepList.forEach(function (item3) {
									if(item3.ed == true){
										let li ={}
										if(userinfo.panType == 0){
											li.oddOdd = item3.oddsA
										}else if(userinfo.panType == 1){
											li.oddOdd = item3.oddsB
										}
										li.orderPrice = _this.orderPrice
										li.oddsId = item3.id
										li.oddsName = item3.oddsName
										selected.push(li)
									}
								});
							}
						});
					}
					
				});

				this.buyOrderlist.objList  = selected
				
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
			roomchange(item,index){

				this.selectPort = index
				
				let data = item.oddsChildRepList
				console.log(data,222222)
				
					this.oddsChildRepList = data

				
			},
			
			async checkgamelist(id){
				await runAcitiy({czId:id}).then((res)=>{
					let psCzMain = res.result.psCzMain
					let lastPsActivity =  res.result.lastPsActivity
					let psActivity =  res.result.psActivity
					let psOddsList =  res.result.psOddsList
					//上一期
				   lastPsActivity.resultNum = lastPsActivity.resultNum.split("[")
				   lastPsActivity.resultNum = lastPsActivity.resultNum[1].split("]")
				   lastPsActivity.resultNum = lastPsActivity.resultNum[0].split(",")
					lastPsActivity.resultStr = JSON.parse(lastPsActivity.resultStr)
					this.lastPsActivity = lastPsActivity
					//
					
					
					if(psOddsList){
						
						let testlist = []
						psOddsList.forEach(function (item, index) {
							if(item.oddsChildRepList){
								item.oddsChildRepList.forEach(function (item2) {
									if(item2.oddsChildRepList){
						
										if(item2.oddsChildRepList.length == 4){
											item.i4 = true
										}
										item2.oddsChildRepList.forEach(function (item3) {
												item3.ed = false
												
												
												if(item3.imgs!=null){

													if(item3.imgs.indexOf(",") != -1){
														item3.imglist = item3.imgs.split(",")
													}
												}
										});
									}
						
								});
							}
							
						});

						this.oddsChildRepList = psOddsList[0].oddsChildRepList
					}
					this.psCzMain = psCzMain
					this.psActivity = psActivity
					this.psOddsList = psOddsList

				})
			},
			getgame(){
				//玩法
								findCzlist().then((res)=>{
									let data = res.result
									
									data.forEach(function (item, index) {
													   // let li = {}
													   item.czImg = '../../static/'+item.czImg+'.png'
									
														// data.push(li)
									});
									//排序
									  data.sort(function(a, b){
									        return a.orderNum - b.orderNum
									    })
										console.log(data)
									this.gamelistall = data
								})
			},
			//重置数据
			resetdata(){
				this.checkgamelist(this.gameid)
				this.orderPrice = 0
				this.buyOrderlist={
					account: 0,
					  activityId: 0,
					  objList: []
				}
			},
			gameclose(){
				this.historyshow = false
			},
			closegz(){
				this.gameshow = false
			},
			checkfindConfig(item=null){
				let _this = this
				findConfig().then((res)=>{
					let data = res.result
					this.config = data
				})
				findCustomData().then(res=>{
					this.userinfo = res.result
				})
				if(item){
					this.showmoadl('已刷新')
				}
				
			},
			closemodal(){
				console.log(this.buymodal)
				this.buymodal = false
			},
			showmoadl(msg){
				uni.showToast({
					title: msg,
					icon:'none',
					duration: 2000
				});
			},
			goback(){
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.footercss{
		height: 64px;
	}
	.gamegzcontent{
		width: 80%;
		padding:20px 10px;
		height: 400px;
		overflow-y: auto;
		.title{
			width: 100%;
			text-align: center;
			height: 30px;
			line-height: 30px;
			font-size: 20px;
			font-weight: 600;
		}
	}
	.navmorelist{
		position: absolute;
		right:3px;
		top: 40px;
		width: 100px;
		z-index: 99999;
		border-radius: 6px;
		background-color: #fff;
			view{
				height:35px;
				text-align: center;
				line-height: 35px;
				border: 1px solid rgba(0,0,0,.1);
			}
			
	}
	.history{
		width: 200px;
		height: 100vh;
		background: #fff;
		
		.li{
			height: 44px;
			line-height: 44px;
			text-align: center;
			font-size: 20px;
			border-bottom: 1px  solid #00000026;
			color: #cb4e3f;
			font-weight: 700;
		}
		.top{
			background: linear-gradient(45deg,#AAAAAA,#666666);
			    font-size: 20px;
			    font-weight: 700;
				color: #fff;
		}
	}
	.modalcss{
		width: 100%;
		.list{
			width: 100%;
			padding: 15px 0;

			border-top: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			.li{
				display: flex;
				.title{
					display: inline-block;
					width: 100px;
				}
				.x{
					display: inline-block;
					padding: 0 5px;
				}
			}
		}
		.heji{
			margin-top: 10px;
			text{
				display: inline-block;
				width: 30px;
				color:#00f;
			}
		}
		
	}
	.fixedbuy{
		width: 100%;
		position: fixed;
		bottom: 0px;
		left: 0px;
		background: #fff;
		border-top: 1px solid #dcdcdc;
		display: flex;
		height: 64px;
		.modal{
			width: 100%;
			height: 64px;
			line-height: 64px;
			background-color: #000000b5;
			position: fixed;
			bottom: 0px;
			left: 0px;
			font-size: 20px;
			color: #fff;
			text-align: center;
		}
		.left{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			width: 50%;
			 margin-left: 10px;
			.inputcss{
				width: 80%;
				border-radius: 2px;
				background: #fff;
				border: 1px solid #ddd;
			}
		}
		.select{
			font-size:14px;
			text{
				color: #cb4e3f;
				    font-weight: 700;
			}
		}
		.right{
			display: flex;
			align-items: center;
		}
		.buyten{
			width: 100px;
			text-align: center;
			height: 40px;
			line-height: 40px;
			border-radius: 40px;
			background-color: #4391e3;
			font-size: 16px;
			    font-weight: 700;
			    color: #fff;
			margin-right: 10px;
		}
		.reset{
			background-color: transparent;
			border: 1px solid #cb4e3f;
			    color: #cb4e3f;
		}
	}
	.xdcontent{
		width: 100%;
		display: flex;
		.right{
			width: 75%;
			.imglistd{
				width: 100%;
			}
			.c2{
				width: 100%;
				display:flex;
				justify-content: center;
				align-items: center;
				margin-bottom:5px;
				image{
					width: 22px;
					height: 22px;
					margin-right: 1px;
				}
				.radio{
					background: linear-gradient(#008ce3,#0058cb);
					color:#fff;
					width: 20px;
					height: 20px;
					line-height: 20px;
					border-radius: 20px;
					
				}
			}
			.list{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.i{
					width: 32.5%;
					background-color: #fff;
					color: rgba(0,0,0,.8);
					padding: 13px 0;
					text-align: center;
					border-color:#efefef;
					border-style: solid;
					// border-width: 0 1px 1px 0;
					border-width: 1px 1px 1px 1px;
					font-size: 20px;
					font-weight: 600;
					// border: 2px solid transparent;
					display: flex;
					align-items: center;
					justify-content: center;
					.redtext{
						padding-left: 5px;
						font-size: 14px;
						color: #d7524e;
						min-width: 30px;
					}
					.c1{
							width: 21px;
							height: 21px;
							margin-right: 1px;
					
					}
				}
				.i4{
					width: 49.2%;
				}
				.active{
					border-color:#e86964;
					border-style: solid;
					border-width: 1px 1px 1px 1px;
					background: url('../../static/touzhu.png')100% 100% no-repeat;
					background-size: 1.12em auto;
				}
			}
			.title{
				width: 100%;
				height: 37px;
				line-height: 37px;
				color: #3c3c3c;
				font-size: 16px;
				text-align: center;
				border-bottom: 1px solid #efefef;
			}
		}
		.left{
			width: 25%;
			background-color: #f1f1f1;
			.name{
				    color: rgba(0,0,0,.85);
				text-align: center;
				border-bottom: 1px solid #b5b5b5;
				padding: 15px 10px;
				text{
					display: inline-block;
					width: 7px;
					height: 7px;
					border-radius: 25px;
					background-color: #a5a9ac;
					border-bottom: 1px solid rgba(250,250,250,.5);
					margin-right: 5px;
				}
			}
			.active{
				    color: #f03525;
				    background: linear-gradient(180deg,#fb274f,#fd3a46,#ff4a3f) 0 100% no-repeat,#fff;
				    border: 0;
				    background-size: 100% 7px;
				    border-bottom: 1px solid #d3d3d3;
			}
		}
	}
	.toptitle{
		width: 100%;
		.top{
			width:100%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #b5b5b5;
			padding: 5px 0;
			.left{
				width: 30%;
				text-align: center;
			}
			.right{
				width: 70%;
				.c1{
					width: 100%;
					display:flex;
					justify-content: center;
					align-items: center;
					margin-bottom:5px;
					image{
						width: 21px;
						height: 21px;
						margin-right: 1px;
					}
				}
				.c2{
					width: 100%;
					display:flex;
					justify-content: center;
					align-items: center;
					margin-bottom:5px;
					image{
						width: 22px;
						height: 22px;
						margin-right: 1px;
					}
					.radio{
						background: linear-gradient(#008ce3,#0058cb);
						color:#fff;
						width: 20px;
						height: 20px;
						line-height: 20px;
						border-radius: 20px;
						
					}
				}
				.c3{
					width: 100%;
					display:flex;
					justify-content: center;
					align-items: center;
					margin-bottom:5px;
					.cn3{
							width: 24px;
							height: 22px;
							line-height: 22px;
						    border: 1px solid rgba(251,79,103,.5);
						    background: hsla(0,0%,98.8%,.5);
						    border-radius: 4px;
							color: #fb4f67;
							text-align: center;
							margin-right: 1px;
					}
				}
			}
		}
		.bottom{
			width:100%;
			display: flex;
			align-items: center;
			padding: 10px 0;
			.left{
				width: 30%;
				text-align: center;
			}
			.right{
				width: 70%;
				display: flex;
				align-items: center;
				.fp{
					border: 1px solid rgba(54,71,81,.5);
					color: #d7524e;
					padding: 1px 10px;
					margin: 0 10px 0 3px;
					border-radius: 15px;
				}
				.kj{
					border: 1px solid rgba(54,71,81,.5);
					color: #00bf71;
					padding: 1px 10px;
					margin: 0 10px 0 5px;
					border-radius: 15px;
				}
			}
		}
	}
	.navimg{
		width: 15px;
		height: 15px;

		margin:-2px 10px 0 5px;
	}
	.main{
		width: 100%;
		margin:0 auto;
		margin-top: 10px;

	}
	.indextop{
		width: 100%;
		height: 44px;
	}
.u-nav-slot{
		display: flex;
		align-items: center;
		color: #fff;
	}
</style>
