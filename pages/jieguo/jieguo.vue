<template>
	<view>
		<u-navbar
		
		    @rightClick="rightClick"
		    :autoBack="false"
			leftIcon=""
		
		>
			<view
			    class="u-nav-slot"
			    slot="center"
			>
			<view class="navcenter">开奖结果</view>
			</view>
		</u-navbar>
		<view class="indextop"></view>
		<view class="jtop">
			<view class="cl" @click="pjshow = !pjshow">{{pjname}}</view>
			<view class="cl" @click="dayshow = !dayshow">{{systemDate}}</view>
		</view>
		<view class="gamelist">
			<view class="li">
				<view class="v1">期数</view>
				<view class="v2">开奖金额</view>

			</view>
			<view class="ovhif">
				
			
				<view class="li " v-for="(item,i) in gamelist" :key="i">
					<view class="v1 child">{{item.activityStartTime}}</view>
					<view class="v2 child">
						
							<view class="c2" v-if="item.czType == 0">
								<view  v-for="(c1,c1i) in item.resultNum"  class="radio">
									{{c1}}
								</view>
								<!-- <image v-for="(c1,c1i) in item.resultNum" :src="'../../static/s_'+c1+'.png'" mode=""></image> -->
							</view>
							<view class="c1" v-if="item.czType == 1">
								<image v-for="(c1,c1i) in item.resultNum" :src="'../../static/game'+c1+'.png'" mode=""></image>
							</view>
							<view class="c2" v-if="item.czType == 2">

								<image v-for="(c1,c1i) in item.resultNum" :src="'../../static/s_'+c1+'.png'" mode=""></image>
							</view>
							<view class="c3"  >
								<view v-for="(c3,c13) in item.resultStr"  class="cn3">{{c3}}</view>
							</view>
					</view>
				</view>
			</view>
			
		</view>
		
		
		<u-picker 
			:show="pjshow" 
			:columns="pjcolumns" 
			keyName="sortName" 
			@cancel="pjshow = false"
			@confirm="pjconfirm" >
		</u-picker>
		<u-datetime-picker
			:show="dayshow"
			v-model="systemDate"
			mode="date"
			@cancel="dayshow = false"
			@confirm="dayconfirm" 
		></u-datetime-picker>
	</view>
</template>

<script>
	
	import { findActivityList,findCzlist} from "../../api/index";
	export default {
		data() {
			return {
				pjshow:false,
				dayshow:false,
				gamelist:'',
				pjcolumns:[
					[{name:'SG飞艇' },
					{name:'腾讯分分'},
					{name:'三分快三'},
					{name:'重庆时时彩'},
					{name:'天津时时彩'},
					{name:'江苏快三'},
					{name:'吉林快三'},
					{name:'极速飞艇'},
					{name:'澳洲11x5'},
					{name:'五分快三'},
					{name:'极速快三'},
					{name:'十分快三'}],
				],
				value1: Number(new Date()),
				pjname:'',
				systemDate:'',
				selectid:''
			}
		},
		onLoad() {

			this.createdata()
		},
		methods: {
			pjconfirm(e){
				console.log('confirm', e)
				this.pjname = e.value[0].sortName
				this.selectid = e.value[0].id
				this.getgamelist(this.selectid,this.systemDate)
				this.pjshow = false
			},
			async dayconfirm(e){
				const timeFormat = uni.$u.timeFormat;
				let timeValue = await timeFormat(e.value, 'yyyy-mm-dd');
				this.systemDate = timeValue
				this.getgamelist(this.selectid,this.systemDate)
				this.dayshow = false
			},
			createdata(){
				//获取当前时间
				const nowDate = new Date();
				const date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate(),
				}
				const newmonth = date.month>10?date.month:'0'+date.month
				const day = date.date>=10?date.date:'0'+date.date
				this.systemDate = date.year + '-' + newmonth + '-' + day
				//设置默认值
				//彩总
				findCzlist().then((res)=>{
					let data = res.result
					let dataarray = [
						[{name:''}]
					]
					
					  data.sort(function(a, b){
					        return a.orderNum - b.orderNum
					    })
						
						
					dataarray[0] = data
					// dataarray = dataarray[0]

					this.pjcolumns = dataarray	
					this.pjname = this.pjcolumns[0][0].sortName	
					this.selectid = dataarray[0][0].id
					this.getgamelist(dataarray[0][0].id,this.systemDate)
				})
				
				
			},
			getgamelist(czId,avdate){
				findActivityList({czId:czId,avdate:avdate}).then((res)=>{
					
					let data = res.result
					data.forEach(function (item, index) {
									   // let li = {}
									   item.resultNum = item.resultNum.split("[")
									   item.resultNum = item.resultNum[1].split("]")
									   item.resultNum = item.resultNum[0].split(",")
										item.resultStr = JSON.parse(item.resultStr)
				
										// data.push(li)
					});
					console.log(data)
					this.gamelist = data
				})
			},
			//秒转换时分秒
			timestampToTime(timestamp) {
			  // 时间戳为10位需*1000，时间戳为13位不需乘1000
			  var date = new Date(timestamp * 1000);
			  var Y = date.getFullYear() + "-";
			  var M =
			    (date.getMonth() + 1 < 10
			      ? "0" + (date.getMonth() + 1)
			      : date.getMonth() + 1) + "-";
			  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
			  var h = date.getHours() + ":";
			  var m = date.getMinutes() + ":";
			  var s = date.getSeconds();
			  return Y + M + D + h + m + s;
			}
		}
	}
</script>

<style scoped lang="scss">
	.gamelist{
		margin-top: 10px;
			width:100%;
			height:70px;
			display:flex;
			flex-wrap: wrap;
			font-size: 12px;
			border-top:1px solid #efefef;
			.ovhif{
				width: 100%;
				height: 610px;
				overflow-y: auto;
			}
			.li{
				width: 100%;
				display:flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				text-align: center;
				view{
					// padding: 10px 0;
					border-color:#efefef;
					border-style: solid;
					border-width: 0 1px 1px 0;
				}
				.v1{
					width: 30%;
				}
				.v2{
					width: 69%;
					// border-width: 0 1px 1px 0;
				}
				.child{
					// height: 40px;
					height: 60px;
					display:flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;
				}
				.c1{
					width: 100%;
					display:flex;
					justify-content: center;
					align-items: center;
					border:0;
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
					border:0;
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
					border:0;
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
	.jtop{
		width: 100%;
		height: 44px;
		display: flex;
		align-items: center;
		.cl{
			width: 150px;
			margin-left: 10px;
			padding: 3px 2px;
			border-radius: 2px;
			text-align: center;
			border: 1px solid #b5b5b5;
		}
	}
.navcenter{
		font-weight: 600;
		font-size: 20px;
	}
	.indextop{
		width: 100%;
		height: 44px;
	}
</style>
