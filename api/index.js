import request from '../utils/request'

export function findKefu(data) {//商品列表
    return request.request('/applet/base/findKefu', 'post', data)
}
export function findProductList(data) {//商品列表
    return request.request('/applet/product/findProductList', 'post', data)
}
export function findProductDetail(id) {//商品列表
    return request.request('/applet/product/findProductDetail?id='+id, 'get',)
}
export function updateCustomData(data) {//商品列表
    return request.request('/applet/custom/updateCustomData', 'post', data)
}
export function findCustomData(data) {//
    return request.request('/applet/custom/findCustomData', 'post', data)
}
export function createchongzhi(data) {//
    return request.request('/applet/pay/createchongzhi', 'post', data)
}

export function createtixian(data) {//
    return request.request('/applet/pay/createtixian', 'post', data)
}
// export function findPayDetail(data) {//操作-提现申请
//     return request.request('/applet/pay/findPayDetail', 'post', data)
// }

export function findchongzhiList(data) {//查询-提现记录
    return request.request('/applet/pay/findchongzhiList', 'post', data)
}
export function findConfig(data) {//查询配置
    return request.request('/applet/base/findConfig', 'post', data)
}

export function buyOrder(data) {//操作-下单
    return request.request('/applet/order/buyOrder', 'get',data)
}
export function orderList(data) {//订单列表
    return request.request('/applet/order/orderList', 'get',data)
}
export function orderList2(data) {//订单列表
    return request.request('/applet/order/orderList2', 'get',data)
}
export function findOrder(orderId) {//操作-下单
    return request.request('/applet/order/findOrder?orderId='+orderId, 'get')
}
export function findPayDetail(logId) {//
    return request.request('/applet/pay/findPayDetail?logId='+logId, 'get')
}
export function findtixianList(data) {//操作
    return request.request('/applet/pay/findtixianList', 'get',data)
}
export function findtixianLis2(data) {//操作
    return request.request('/applet/pay/findtixianLis2', 'get',data)
}
export function findProductCat(data) {//分类
    return request.request('/applet/product/findProductCat', 'post', data)
}

export function findBannerList(data) {//查询Banner
    return request.request('/applet/base/findBannerList', 'post', data)
}


export function oddsList(data) {//赔率管理-查询
    return request.request('/applet/base/oddsList', 'get', data)
}


export function findCzlist(data) {//赔率管理-查询
    return request.request('/applet/activity/findCzlist', 'get', data)
}
export function findActivityList(data) {//详情-开奖结果
    return request.request('/applet/activity/findActivityList', 'post', data)
}
export function runAcitiy(data) {//赔率管理-查询
    return request.request('/applet/activity/runAcitiy', 'get', data)
}
export function lastAcitiy(data) {//赔率管理-查询
    return request.request('/applet/base/lastAcitiy', 'get', data)
}
export function findOrderRun(data) {//即时注单
    return request.request('/applet/order/findOrderRun', 'get', data)
}
export function findOrderDay(data) {//即时注单
    return request.request('/applet/order/findOrderDay', 'get', data)
}
