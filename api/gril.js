import request from '../utils/request'

export function findMeiMeiList(data) {//首页-妹妹列表
    return request.request('/applet/base/findMeiMeiList', 'post', data)
}
export function videoCatList(data) {//会员视频分类
    return request.request('/applet/base/videoCatList', 'get', data)
}
export function videoList(data) {//会员视频列表接口
    return request.request('/applet/base/videoList', 'get', data)
}
export function findMeiMei(data) {//妹妹详情
    return request.request('/applet/base/findMeiMei', 'get', data)
}
export function findZbjist(data) {//首页-直播间列表
    return request.request('/applet/base/findZbjist', 'post', data)
}
export function findActivityPage(data) {//活动列表-分页列表查询
    return request.request('/applet/activity/findActivityPage', 'get', data)
}
export function lastAcitiy(data) {//活动倒计时
    return request.request('/applet/base/lastAcitiy', 'post', data)
}
export function buyOrder(data) {//操作-下单
    return request.request('/applet/order/buyOrder', 'post', data)
}
export function findVideo(data) {//活动列表-视频详情
    return request.request('/applet/base/findVideo', 'get', data)
}
export function orderList2(data) {//查询-订单列表2
    return request.request('/applet/order/orderList2', 'get', data)
}
export function findOrder(data) {//查询-订单详情
    return request.request('/applet/order/findOrder', 'get', data)
}
