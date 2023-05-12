<template>
  <view class="page">
	 		<u-navbar
					leftIconSize="16px"	
					
	            title="注册"
	            @rightClick="rightClick"
	            :autoBack="true"
				bgColor="transparent"

	        >
	        </u-navbar>
			<view class="indextop"></view>
		<!-- 	<view class="loginlogo">
				<image src="../../static/loginlogo2.png" mode=""></image>
			</view> -->
			<!-- <u-upload
				class="uploadimg"
			    :fileList="fileList1"
			    @afterRead="afterRead"
			    @delete="deletePic"
			    name="1"
			    multiple
			    :maxCount="1"
				width="250"
					height="250"
			  ></u-upload> -->
			  
    <!-- 填写区 -->
    <view class="input-info input-info2">
	  <view class="info info2">
	  		  <view class="more">
	  		    <text > *</text>账号名称
	  		  </view>
	    <input
	      type="text"
	      maxlength="12"	
	      v-model="form.customName"
		 
	      placeholder="请输入账号名称"
	    />
	   
	  </view>	
     <view class="info info2">
		  <view class="more">
		    <text > *</text>手机号码
		  </view>
        <input
          type="tel"
          maxlength="11"
          v-model="form.phone"
          placeholder="请输入手机号码"
        />

      </view>
	  <view class="info info2">
	  		  <view class="more">
	  		    <text > *</text>登录密码
	  		  </view>
	    <input
	      type="password"
	      maxlength="12"
	      v-model="form.password"
	      placeholder="请输入登录密码"
	    />
	  
	  </view>
	
		
     
    </view>
    <!-- 按钮 -->
    <view class="btn-info">
      <view
        class="btn"
        :style="isLogin ? 'opacity:1' : 'opacity:1'"
        @click="onLogin()"
      >
        <text>注册</text>
      </view>
    </view>
    <!-- 操作 -->
   
	<!-- <img style="margin-top: 100rpx;" src="../../static/styleimg/xinshoutu1.jpeg" alt=""> -->
    <!-- 其他方式登录 -->
    <!-- <view class="other-ways">
      <text>其他登录方式</text>
    </view> -->
    <!-- 登录方式 -->
    <!-- <view class="login-way">
      <view class="way">
        <image src="/static/wx_ico.png" mode=""></image>
        <text>微信登录</text>
      </view>
    </view> -->
  </view>
  <!-- <view><img src="../../static/styleimg/xinshoutu1.jpeg" alt=""></view>
   -->
</template>

<script>
import { register } from "../../api/login";
import __config from "../../config/env.js";
export default {
  data() {
    return {
      isLogin: false,
      isLoginWay: false,
      isPassword: false,
	  fileList1: [],
	  basePath: __config.basePath, // 图片地址
	  action: __config.action, // 图片地址
      // 表单
      form: {
		  customName:'',
		phone:"",
		customSex:"1",
        code: "6688",
        password: "",
		headPortrait:"https://zh-green.oss-cn-hongkong.aliyuncs.com/head/en/3.png"
      },
    };
  },
  methods: {	
	  rightClick(){
		uni.navigateTo({
			url:'/pages/login/login'
		})  
	  },
	  checkchina (e) {
		  // form.phone=form.phone.replace(/[^\w\/]/ig,'')
	        console.log(e)
	        this.form.phone = e.detail.value.replace(/[\u4e00-\u9fa5/\s+/]|[`~!@#$%^&*() \\+ =<>?"{}|, \\/ ;' \\ [ \] ·~！@#￥%……&*（）—— \\+ ={}|《》？：“”【】、；‘’，。、_.-:]/g, "")
	      },
    /**
     * 注册点击
     */
    onLogin() {
		
		this.form.phone = this.form.phone.replace(/[^\w\/]/ig,'')
	  if(!this.form.phone  ){
	  	this.showmoadl('请输入手机号码')
	  }else if(!this.form.customName ){
	  	this.showmoadl('请输入账号名称' )
	  }else if(!this.form.password ){
	  	this.showmoadl('请输入密码(6-12位)' )
	  }else{
		  register(this.form).then((res) => {
			uni.setStorageSync("user", res.result.psCustomMain);
			uni.setStorageSync("token", res.result.token);
			console.log(res);
			if (res.code == 200) {
			  uni.reLaunch({
				url: "/pages/index/index",
			  });
			}
		  });
	  }
    },
	// 新增图片
	async afterRead(event) {
	  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
	  let lists = [].concat(event.file);
	  let fileListLen = this[`fileList${event.name}`].length;
	  lists.map((item) => {
	    this[`fileList${event.name}`].push({
	      ...item,
	      status: "uploading",
	      message: "上传中",
	    });
	  });
	  for (let i = 0; i < lists.length; i++) {
	    const result = await this.uploadFilePromise(lists[i].url);
	    let item = this[`fileList${event.name}`][fileListLen];
	    this[`fileList${event.name}`].splice(
	      fileListLen,
	      1,
	      Object.assign(item, {
	        status: "success",
	        message: "",
	        url: result,
	      })
	    );
	    fileListLen++;
	  }
	  // console.log(this.fileList1, "0000000000000");
	},
	uploadFilePromise(url) {
	  return new Promise((resolve, reject) => {
	    let a = uni.uploadFile({
	      url: this.action, // 仅为示例，非真实的接口地址
	      filePath: url,
	      name: "file",
	      formData: {
	        user: "test",
	      },
	      success: (res) => {
			  
			  let data = JSON.parse(res.data)
	        this.form.headPortrait = data.message;
			console.log(this.form.headPortrait);
	        setTimeout(() => {
	          resolve(res.data.data);
	        }, 1000);
	      },
	    });
	  });
	},
	showmoadl(msg){
		uni.showToast({
			title: msg,
			duration: 2000,
			icon:"none"
		});
	},
  },
 
};
</script>

<style scoped lang="scss">
@import "../login/login.scss";

.indextop{
		width: 100%;
		height: 84px;
	}
.loginlogo{
	display: flex;
	align-items:center;
	justify-content: center;
	margin:10px auto;
	image{
		width: 90px;
		height: 90px;
	}
}
::v-deep .u-navbar__content__title{
	color:	#fff;
}
</style>
