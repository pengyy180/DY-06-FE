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
				<u-icon name="list-dot" size="50" color="#fff"></u-icon>平台资讯
			 </view>
			</u-navbar>
			
			<u-collapse
			    @change="change"
			    @close="close"
			    @open="open"
			  >
			  <view class="indextop"></view>
			    <u-collapse-item
			      title="# 遇到登陆不成功怎么办?"
			      name="Docs guide"
			    >
			      <text class="u-collapse-content">检查用户名和密码是否正确, 注意区别大小写; 检查用户名是否有空格, 如果有, 请删除空格</text>
			    </u-collapse-item>
			    <u-collapse-item
			      title="# 登录成功跳转首页显示没登陆?"
			      name="Variety components"
			    >
			      <text class="u-collapse-content">检查浏览器是否开启了"无痕浏览器模式", 如果是, 请关闭; 检查浏览器是否"阻止所有Cookie", 如果是, 请取消; 如果还是无法登陆, 请更换其他浏览器试试</text>
			    </u-collapse-item>
			    <u-collapse-item
			      title="# 安卓手机推荐什么浏览器?"
			      name="Numerous tools"
			    >
			      <text class="u-collapse-content">

						<view>X浏览器: 不足1M, 极速轻便 <a href="https://www.xbext.com">前往下载</a></view>
						<view>X浏览器-X5内核版: 不足1M <a href="https://www.coolapk.com/apk/com.x.browser.x5">前往下载</a></view>
						<view>Edge: 微软新版浏览器, 强大 <a href="https://app.xiaomi.com/details?id=com.microsoft.emmx">前往下载</a></view>

					</text>
			    </u-collapse-item>
				<u-collapse-item
				  title="# 苹果手机推荐什么浏览器?"
				  name="Numerous tools"
				>
				  <text class="u-collapse-content">
					  
					  	<view>Safari浏览器: 自带的浏览器 <a href="https://www.apple.com.cn/safari">前往官网</a></view>
					  	<view>Edge: 微软新版浏览器, 强大 <a href="https://apps.apple.com/app/microsoft-edge-web-browser/id1288723196">前往下载</a></view>

					  
				  </text>
				</u-collapse-item>

			  </u-collapse>
		
	</view>
</template>

<script>
	import { findMeiMei } from "../../api/gril";
	import __config from "../../config/env.js";
	export default {
		data() {
			return {
				 mmdetails:'',
				action: __config.basePath, // 图片显示地址
				imgdata:[]
			}
		},
		onLoad(option) {

		},
		methods: {
			open(e) {
			        // console.log('open', e)
			      },
			      close(e) {
			        // console.log('close', e)
			      },
			      change(e) {
			        // console.log('change', e)
			      },
			goback(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	::v-deep .u-collapse-item__content__text[data-v-2675fb21]{
		font-size: 16px;
		color: #cbcbd6;
		// background-color: #151936;
		padding-bottom: 20px;
	}
	::v-deep .u-cell__body{
		// background-color: #31395e;
	}
	::v-deep .u-cell__title-text{
		color:#000;
	}
	.indextop{
		width: 100%;
		height: 50px;
	}
	
.page{
  width: 100%;
  // height: 100vh;

}
// .topher{
// 	width: 100%;
// 	height: 44px;
// }
</style>
