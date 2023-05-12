// <template>
	<view>
		<view class="head-info " >
			<view class="headcontent">
				<view class="logoicon" @click="onSkip('home')" >
					
				</view>
				<!-- 搜索 -->
				<view class="head-search">
					<u-search placeholder="What are you looking for…" :disabled="false" height="60"  :showAction="false"  @focus="onSearch"></u-search>		  
	  
				</view>
				<view class="loginicon">
					<view class="icon-info" v-if="logininfo.id" @click="onSkip('my')">
					   <text class="cuIcon-people"></text>
					</view>
					<view class="icon-info" v-if="!logininfo.id" @click="onSkip('login')">
					  Login <text class="cuIcon-right"></text> <text class="cuIcon-people"></text>
					</view>
				</view>
			</view>
			<!-- <view class="head-logo">
				
				<view class="left">
					<view class="listicon" v-if="logininfo.id" @click="navshow = true">
					
					</view>
					<view class="logoicon" @click="onSkip('home')" >
						
					</view>
					
					<u-popup 
						:show="navshow" 
						@close="navclose" 
						mode="left" 
						:closeable="true"
					>
						<view class="navmodal">
							<view class="myuser">
								您好,{{userinfo.customName}} <br/>
								<text>我的账户</text>
							</view>
							<view class="list">
								<view class="li liblod" @click="onSkip('my')">我的账户</view>	
								<view class="li" @click="onSkip('home')">Alibaba Home</view>
								<view class="li" @click="onSkip('orderlist')">我的订单</view>	
								<view class="li" @click="onSkip('mywallet')">我的钱包</view>	
								<view class="li">我的会员 
									<text v-if="userinfo.customLevel == 0"> 普通会员</text>
									<text v-if="userinfo.customLevel == 1"> 黄金会员</text>
									<text v-if="userinfo.customLevel == 2"> 铂金会员</text>
								</view>	
								<view class="li" @click="onSkip('kefu')">专属客服</view>	
								<view class="li downapp" @click="downladapp">下载APP</view>
								<view class="li" @click="onSkip('loginout')">退出账号</view>	

							</view>

						</view>
					</u-popup>
					
				</view>
				
			</view> -->
		  
		<!--  <view class="classify-list" >
		    <view
		      class="list"
		      v-for="(item, index) in classList"
		      :class="{ action: classifyShow == index }"
		      @click="onClassify(item, index)"
		      :key="index"
		    >
		      <text>{{ item.name }}</text>
		      <text class="line" v-show="classifyShow == index"></text>
		    </view>
		  </view> -->
		  
		 
		  </view>
	</view>
</template>

<script>
	import { findCustomData,findProductCat,findKefu } from "../api/index";
	export default {
		name:"navheader",
		props:{
			navShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				classifyShow: 0,
				classList:[],
				classList2:[],
				navshow:false,
				userinfo:'',
				logininfo:''
			};
		},
		mounted(){

			this.checkuserinfo()
		},
		onLoad() {
			
			
		},
		onshow(){

		},
			
		methods:{
			downladapp(){
				window.location.href="https://app.cooyyds.com/amizaon_z/"
			},
			navclose(){
				this.navshow = false
			},
			checkuserinfo(){
				let userinfo = uni.getStorageSync('user')
				
				if(userinfo){
					this.logininfo = userinfo
					// this.checkuseinfo()
				}
				this.checkprotypelist()
				console.log(userinfo)
			},
			async checkprotypelist(){
					  let _this = this
					  //商品分类
					  findProductCat().then((res)=>{
						  let data = [
							  {
							    id: 0,
							    name: "首页",
							  }
						  ]
						  let data2 = []
						   res.result.forEach(function (item, index) {
							   item.coverImg = item.coverImg.split(",")
							   let li = {}
							   li.id = item.id
								li.name = item.productCatName
								li.coverImg = _this.imgaction+'/'+item.coverImg[0]
								data.push(li)
								data2.push(li)
						   });
						  this.classList = data
						  this.classList2 = data2
					  })
					  
			},
			/**
			 * 跳转点击
			 * @param {String} type 跳转类型
			 */
			onSkip(type) {
			  switch (type) {
			  case "my":
			  		uni.navigateTo({
			  		  url: "/pages/my/my",
			  		});
			  		break;
			    case "home":
			      uni.navigateTo({
			        url: "/pages/home/home",
			      });
			      break;
				  case "login":
				    uni.navigateTo({
				      url: "/pages/login/login",
				    });
				    break;
					case "orderlist":
					  uni.navigateTo({
					    url: "/pages/MyOrderList/MyOrderList",
					  });
					  break;
					 case "mywallet":
					   uni.navigateTo({
					     url: "/pages/MyWallet/MyWallet",
					   });
					   break;
					   case "kefu":
					    findKefu().then((res)=>{
					    	console.log(res.result)
					    	window.location.href="https://chatlink.mstatik.com/widget/standalone.html?eid="+res.result
					    })
					     break;
						 case "loginout":
						  
						  	uni.clearStorage();
						  	uni.reLaunch({
						  		url:'/pages/login/login'
						  	})
						  	
						  
						   break;
					  
				}
			},
			/**
			 * 搜索点击
			 */
			onSearch() {
			  uni.navigateTo({ url: "/pages/search/search" });
			},
			checkuseinfo(){
				
				let _this = this
				findCustomData().then(res=>{
					_this.userinfo = res.result
					
					if(!_this.userinfo.payPwd){
						_this.showmoadl('为了用户的安全，请设置支付密码')
						_this.settimeurl('/pages/PaymentPassword/PaymentPassword')
					}
					
				})
			},
			showmoadl(msg){
				uni.showToast({
					title: msg,
					icon:"none",
					duration: 2000
				});
			},
			settimeurl(url){
				setTimeout(()=>{
					uni.navigateTo({
						url:url
					})
				},2000)
			}
		}
		
	}
</script>

<style lang="scss">
// @import "@/pages/home/home.scss";
.downapp{
	margin-bottom: 50rpx;
}
</style>