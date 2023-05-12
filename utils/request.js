import __config from '../config/env.js'

const request = (url, method, data, showLoading, header) => {
  let _url = __config.basePath + url
  return new Promise((resolve, reject) => {
    if (showLoading) {
      uni.showLoading({
        title: '加载中',
      })
    }
    var head = {
      "Accept": "application/json",
      "token": uni.getStorageSync('token'),
    }
    if (header == 'formData') {
      head = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "token": uni.getStorageSync('token')
      }
    }
    uni.request({
      url: _url,
      method: method,
      data: data,
      header: head,
      success(res) {

        if (res.data.code == 200) {
          resolve(res.data)
        } else if (res.data.code == 10086) {
         
			  uni.clearStorage();
			  setTimeout(function () {
			    uni.reLaunch({
			      url: "/pages/login/login"
			    })
			  }, 1000)
			
        }else if (res.data.code == 500) {
          // uni.showModal({
          //   title: '提示',
          //   content: res.data.message == '' ? '系统繁忙' : res.data.message,
          // })
		  uni.showToast({
		  	title: res.data.message == '' ? '系统繁忙' : res.data.message,
		  	duration: 2000,
		  	icon:"none"
		  });
		  // setTimeout(function () {
		  //   uni.reLaunch({
		  //     url: "/pages/login/login"
		  //   })
		  // }, 1000)
          reject(res.data.message)
			
        } else {
			uni.showToast({
				title: res.data.message,
				duration: 2000,
				icon:"none"
			});
          // uni.showModal({
          //   title: '提示',
          //   content: res.data.msg,
          // })

          reject(res.data.message)
        }
      },
      fail(error) {
        console.log(error)
        // uni.showModal({
        //   title: '提示',
        //   content: '接口请求出错：' + error.errMsg,
        //   success(res) {

        //   }
        // })
        // reject(error)
      },
      complete(res) {
        uni.hideLoading()
      }
    })
  }
  )
}
module.exports = {
  request
}
