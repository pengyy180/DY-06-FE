import request from '../utils/request'

export function register(data) {//注册
    return request.request('/applet/custom/register', 'post', data, false,)
}

export function login(data) {//登录
    return request.request('/applet/custom/login', 'post', data, false,)
}