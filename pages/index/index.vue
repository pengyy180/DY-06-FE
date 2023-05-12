<template>
	<view class="page">
				<u-navbar

		           @rightClick="rightClick"
		           :autoBack="false"
				   

		       >
			   <view
			                   class="u-nav-slot"
			                   slot="left"
			               >
			                <image class="indexlogo" src="../../static/logo.png" mode=""></image>
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
				<view class="banner">
											<u-swiper
														 :list="list1"
														 height="162px"
														 radius="0px"
												 ></u-swiper>
				</view>
				<view class="tablist">
					<view class="li" @click="gourl(5)">
						<image src="../../static/icon01.png" mode=""></image>
						<view class="c1">存款取款</view>
					</view>
					<view class="li"  @click="gourl(3)">
						<image src="../../static/icon02.png" mode=""></image>
						<view class="c2">投注记录</view>
					</view>
					<view class="li" @click="gourl(1)">
						<image src="../../static/icon03.png" mode=""></image>
						<view class="c3">帮助中心</view>
					</view>
					<view class="li" @click="gourl(4)">
						<image src="../../static/icon04.png" mode=""></image>
						<view class="c4">在线客服</view>
					</view>
				</view>
				<view class="notice">
					<u-notice-bar 
						:text="text1"
						bgColor="transparent"
						color="#3c3c3c"
						></u-notice-bar>
				</view>
				<view class="gamelist">
					<view class="li" v-for="(item,i) in gamelist" :key="i" @click="gourl(2,item)">
						<image :src="item.czImg" mode=""></image>
						<view>{{item.sortName}}</view>
					</view>
					
				</view>
					  <DialogBox ref="DialogBox"></DialogBox>
					<!-- <view class="footercss"></view> -->
			</view>
			  
	</view>
</template>

<script>

	import { findMeiMeiList } from "../../api/gril";
	import { findBannerList,findConfig,findCzlist} from "../../api/index";
	import __config from "../../config/env.js";
	export default {
		
		data() {
			return {
				animate:false,
				timer:null,
				datalist: [],
				pplist:[],
				action: __config.basePath, // 图片显示地址
				list1:[ '../../static/banner1.png',
                    '../../static/banner2.png',
                    '../../static/banner3.png',],
				systemDate:'',
				config:'',
				text1:'游戏中遇到任何问题，请联系在线客服解决',
				gamelist:[
					{name:'SG飞艇',img:'../../static/i1.png'},
					{name:'腾讯分分',img:'../../static/i2.png'},
					{name:'三分快三',img:'../../static/i3.png'},
					{name:'重庆时时彩',img:'../../static/i4.png'},
					{name:'天津时时彩',img:'../../static/i5.png'},
					{name:'江苏快三',img:'../../static/i6.png'},
					{name:'吉林快三',img:'../../static/i7.png'},
					{name:'极速飞艇',img:'../../static/i8.png'},
					{name:'澳洲11x5',img:'../../static/i9.png'},
					{name:'五分快三',img:'../../static/i10.png'},
					{name:'极速快三',img:'../../static/i11.png'},
					{name:'十分快三',img:'../../static/i12.png'},
				]
			}
		},
		onLoad() {
			this.timer = setInterval(this.scroll, 3000);
		},
		created() {

			this.createData()

		},
		onShow() {
			this.createData()
		},
		methods: {
			gourl(id,item=null){
				if(id==1){
					uni.switchTab({
						url:'/pages/lottery/jydt'
					})
				}else if(id == 2){
					uni.redirectTo({
						url:'/pages/lottery/jydt?id='+item.id+'&gname='+item.sortName
					})
				}else if(id == 3){
					uni.switchTab({
						url:'/pages/zhudan/zhudan'
					})
				}else if(id == 4){
					findConfig().then((res)=>{
						console.log(res.result)
						window.location.href="https://chatlink.mstatik.com/widget/standalone.html?eid="+res.result.meiqia
					})
				}else if(id == 5){
					uni.navigateTo({
						url:'/pages/my/withdrawRecord/withdrawRecord'
					})
				}
			},
			scroll() {
				this.animate = true;
				setTimeout(() => {
					this.datalist.push(this.datalist[0]);
					this.datalist.shift();
					this.pplist.push(this.pplist[0]);
					this.pplist.shift();
					this.animate = false;
				}, 1000);
			},
			createData: function(){
				let _this = this
				//配置
				findConfig().then((res)=>{
					let data = res.result
					this.config = data
				})
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

					this.gamelist = data
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
				this.datalist = clist
					
					const nowDate = new Date();
					const date = {
						year: nowDate.getFullYear(),
						month: nowDate.getMonth() + 1,
						date: nowDate.getDate(),
					}
					const newmonth = date.month>10?date.month:'0'+date.month
					const day = date.date>=10?date.date:'0'+date.date
					this.systemDate = date.year + '-' + newmonth + '-' + day
					
			},
			
			
			indextabchange(i){
				this.indextype = i;
				this.createData()
			},
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
			}
			
			
		}
	}
</script>

<style lang="scss">
	.indexlogo{
		width: 142px;
		height: 40px;
	}
	.gamelist{
		width:100%;
		// height:70px;
		display:flex;
		flex-wrap: wrap;
		font-size: 12px;
		border-top:1px solid #efefef;
		.li{
			width: 33%;
			padding: 10px 0;
			border-color:#efefef;
			border-width: 0 1px 1px 0;
			border-style: solid;
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
			width: 60px;
			height: 60px;
		}
	}
	.notice{
		width: 100%;
	}
	.tablist{
		width:100%;
		height:70px;
		display:flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		.li{
			display:flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			text-align: center;
			view{
				width:100%;
			}
			.c1{color:#f04b41;}
			.c2{color:#3daef9;}
			.c3{color:#e5a51c;}
			.c4{color:#3daef9;}
		}
		image{
			margin-bottom: 5px;
			width: 30px;
			height: 30px;
		}
		
	}
	.banner{
		width: 100%;
		margin: 0 auto;
		margin-bottom: 10px;
	}
	.indextop{
		width: 100%;
		height: 44px;
	}
	::v-deep .dialog-box .operation-btn .btn .activity {
	    color: #000 !important;
	}
</style>
