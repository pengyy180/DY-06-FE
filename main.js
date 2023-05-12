import Vue from 'vue';
import App from './App';
//多语言
import messages from './locale/index'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


uni.$u.config.unit = 'rpx'


let i18nConfig = {
  locale: uni.getLocale(),
  messages
}


import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false




// 弹出框
import DialogBox from './components/DialogBox/DialogBox';



// 全局组件
Vue.component('DialogBox', DialogBox);
//mescroll
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

App.mpType = 'app'

const app = new Vue({
  i18n,
  ...App
})
app.$mount()
