<template>
  <view class="page">
	  <u-navbar
	  					leftIconSize="16px"	
	  					:autoBack="false"
	  						bgColor="#161936"
							@leftClick="goback"
	  >
	  			<view
	                  class="u-nav-slot"
	                  slot="left"
	              >
	  	<u-icon name="arrow-leftward" size="40" color="#fff"></u-icon>
	  	<u-icon name="list-dot" size="50" color="#fff"></u-icon>登录
	   </view>
	  </u-navbar>
	  <view class="indextop"></view>
	<view class="title">
		欢迎来到娱乐中心
	</view>
	
	<!-- <view class="loginlogo">
		<image src="../../static/loginlogo2.png" mode=""></image>
	</view> -->
    <!-- 填写区 -->
    <view class="input-info">
      <view class="info">
        <input
          type="text"
          maxlength="12"
          v-model="form.phone"
          placeholder="请输入手机号码"
        />

      </view>
      
      <view class="info" :style="isLoginWay ? 'display: none' : ''">
        <input
          :password="!isPassword"
          v-model="form.password"
          maxlength="26"
          placeholder="请输入密码"
        />
       
      </view>
    </view>
    <!-- 按钮 -->
    <view class="btn-info">
      <view
        class="btn"
        :style="isLogin ? 'opacity:1' : 'opacity:1'"
        @click="onLogin"
      >
        <text>登录</text>
      </view>
    </view>
	<!-- <view class="btn-info">
	  <view
	    class="btn"
		style="opacity: 0.6;"
	    @click="onRegister" 
	  >
	    <text>新用户注册</text>
	  </view>
	</view> -->
    <!-- 操作 -->
   <view class="operation">
    
      <text @click="onRegister" >新用户注册</text>
    </view>
	
  </view>

</template>

<script>
import { login } from "../../api/login";
export default {
  data() {
    return {
      isLogin: false,
      isLoginWay: false,
      isPassword: false,
      // 表单
      form: {
        phone: "",
        // code: "",
        password: "",
      },
    };
  },
  methods: {
	  goback(){
		  uni.switchTab({
		  	url:'/pages/index/index'
		  })
	  },
    onRegister() {
      uni.navigateTo({
        url: "/pages/register/register",
      });
    },
    tips(){
		uni.showToast({
			title: '请联系顾问或接待员',
			duration: 2000,
			icon:"none"
		});
	},
    /**
     * 登录点击
     */
    onLogin() {
      login(this.form).then((res) => {
        uni.setStorageSync("user", res.result.psCustomMain);
        uni.setStorageSync("token", res.result.token);
        console.log(res);
        if (res.code == 200) {
          uni.reLaunch({
            url: "/pages/index/index",
          });
        }
      });
    },
  },
 
};
</script>

<style scoped lang="scss">
	.indextop{
		width: 100%;
		height: 44px;
	}
	.u-nav-slot{
			display: flex;
			color: #fff;
		}
@import "login.scss";
</style>
