<script>
	import { findConfig } from "./api/index";
export default {
  onLaunch: function () {
    console.log("App Launch");
	// this.checkkefu()
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods:{
	 //  checkkefu(){
		//   findConfig().then((res)=>{
		//   	(function(a, b, c, d, e, j, s) {
		//   	        a[d] = a[d] || function() {
		//   	            (a[d].a = a[d].a || []).push(arguments)
		//   	        };
		//   	        j = b.createElement(c),
		//   	            s = b.getElementsByTagName(c)[0];
		//   	        j.async = true;
		//   	        j.charset = 'UTF-8';
		//   	        j.src = 'https://static.meiqia.com/widget/loader.js';
		//   	        s.parentNode.insertBefore(j, s);
		//   	    })(window, document, 'script', '_MEIQIA');
		// 	_MEIQIA('entId', res.result.meiqia);
			
		//   })
		      
		
	 //  }
  }
  
};
</script>

<style  lang="scss">
/*每个页面公共css */

@import "style/FontStyle.css";
@import "@/uni_modules/uview-ui/index.scss";
@import "@/components/iconfont/iconfont.css";

body {
	width: 390px;
	min-width: 390px;
	margin:0 auto;
  -webkit-text-size-adjust: none;
  // font-family: Roboto,Helvetica Neue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
     font-family: Arial,Microsoft YaHei,黑体,宋体,sans-serif;
	// background-color: #050925;
}
// ::v-deep .uicon-arrow-left{
// 	color:#008eff !important; 
// }
.u-nav-slot{
			display: flex;
			align-items: center;
			color: #fff;
		}
		::v-deep .u-navbar__content{
			background: linear-gradient(45deg,#AAAAAA,#666666);
			box-shadow: 0 0 5px -3px rgba(0,0,0,.8);
		}
		.footercss{
			width:100%;
			height: 50px;

		}
		.loginout{
			background-color: #CFCFCF;
			    color: #000000;
			    padding: 3px 8px;
				border-radius: 5px;
		}
</style>
