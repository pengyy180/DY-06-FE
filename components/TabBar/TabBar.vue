<template>
	<view class="page-total">
		<view class="tab-list">
			<view class="list" v-for="(item,index) in TabBarList" 
			@click="onTabBar(item,index)"
			:key="index">
				<image :src="item.acImg" mode="widthFix" v-show="tabBarShow === index"></image>
				<image :src="item.img" mode="widthFix" v-show="tabBarShow != index"></image>
				<text :class="{'action':tabBarShow===index}">{{item.name}}</text>
			</view>
		</view>
		<checkdata v-if="tabBarShow !=0 "></checkdata>
	</view>
</template>

<script>
	import checkdata from "../checkdata.vue";//判断用户信息

	export default {
		components: {
			checkdata,
		},
		data() {
			return {
				TabBarList:[
					{
						index: 0,
						name: this.$t("index.home"),
						img: '/static/tabBar/tab1-1.png',
						acImg: '/static/tabBar/tab1-2.png'
					},
					{
						index: 1,
						name: this.$t("index.pay"),
						img: '/static/tabBar/tab2-1.png',
						acImg: '/static/tabBar/tab2-2.png'
					},
					// {
					// 	index: 2,
					// 	name: '发现',
					// 	img: '/static/tabBar/tab_05.png',
					// 	acImg: '/static/tabBar/tab_06.png'
					// },
					{
						index: 2,
						name: '提现',
						img: '/static/tabBar/tab3-1.png',
						acImg: '/static/tabBar/tab3-2.png'
					},
					{
						index: 3,
						name: '我的',
						img: '/static/tabBar/tab4-1.png',
						acImg: '/static/tabBar/tab4-2.png'
					},
				],
				codeheight: 0,
				isOverall: 0,
				phoneModel: '',
			};
		},
		props:{
			tabBarShow: {
				type: Number,
				default: 0,
			}
		},
		mounted() {
			try {
			    const res = uni.getSystemInfoSync();
					let that = this;
			    // 获取系统信息
			    uni.getSystemInfo({
			    	success(res) {
			    		console.log(res.brand) //手机牌子
			    		console.log(res.model) //手机型号
			    		console.log(res.screenWidth) //屏幕宽度
			    		console.log(res.screenHeight) //屏幕高度
							that.codeheight = Math.round(res.screenHeight);
							that.phoneModel =res.model
							if(res.model.search('iPhone')){
								that.isOverall = 0;
							}else if(Math.round(res.screenHeight)>740){
							 that.isOverall = 1;
							}
							console.log(that.isOverall);
			    	}
			    });
			} catch (e) {
			    // error
			}
		},
		methods:{
			/**
			 * @param {Object} item
			 * @param {Number} index
			 */
			onTabBar(item,index){
				// this.tabBarShow = index;
				switch (index){
					case 0:
						wx.navigateTo({
							url:'/pages/home/home'
						})
						break;
					case 1:
						wx.navigateTo({
							url:'/pages/MyWallet/MyWallet'
						})
						break;
					// case 2:
					// 	wx.navigateTo({
					// 		url:'/pages/discover/discover'
					// 	})
					// 	break;
					case 2:
						wx.navigateTo({
							url:'/pages/cart/cart'
						})
						break;
					case 3:
						wx.navigateTo({
							url:'/pages/my/my'
						})
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'TabBar.scss';
</style>
