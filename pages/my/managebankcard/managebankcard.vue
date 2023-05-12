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
					<u-icon name="arrow-left" size="40" color="#fff"></u-icon>
					银行卡管理
				 </view>
				</u-navbar>
		<view class="topher"></view>
		<view v-if="usershow == false"> 
			<view class="savebank" >
				<view><text>银行名称:</text>{{userinfo.bankName}}</view>
				<view><text>开户行:</text>	{{userinfo.bankNameDesc}}</view>
				<view><text>银行卡号:</text>	{{userinfo.bankNum}}</view>
				<view><text>持卡人姓名:</text>	{{userinfo.bankCustomName}}</view>
			</view>
			
			<view class="kefubtn" @click="kefu()">
				修改取出信息请联系客服
			</view>
		</view>
		<view class="" v-if="usershow == true">
			<view class="user-list">
				<view class="list" style="height: 160rpx;">
					<view class="title">
						<text>银行信息设置</text>
					</view>
					
				</view>
				<view class="list" >
					<view class="title">
						<text>银行名称</text>
					</view>
					<view class="more-content" @click="showbank" >
						<text class="content">{{userinfo.bankName==null?'请输入银行名称':userinfo.bankName}}</text>
						<text class="iconfont icon-more more"></text>
						<u-picker :show="bankshow" @cancel="closebank" itemHeight="100" :columns="bankarray" @confirm="confirm"></u-picker>
					</view>
				</view>
				<view class="list" @click="onNickname">
					<view class="title">
						<text>开户行</text>
					</view>
					<view class="more-content"  >
						<text class="content">{{userinfo.bankNameDesc==null?'请输入开户行':userinfo.bankNameDesc}}</text>
						<text class="iconfont icon-more more"></text>
					</view>
				</view>
				<view class="list" @click="onNickname2">
					<view class="title">
						<text>银行卡号</text>
					</view>
					<view class="more-content">
						<text class="content">{{userinfo.bankNum==null?'请输入银行卡号':userinfo.bankNum}}</text>
						<text class="iconfont icon-more more"></text>
					</view>
					
				</view>
				<view class="list" @click="onNickname3">
					<view class="title">
						<text>持卡人姓名</text>
					</view>
					<view class="more-content">
						<text class="content">{{userinfo.bankCustomName==null?'请输入持卡人姓名':userinfo.bankCustomName}}</text>
						<text class="iconfont icon-more more"></text>
					</view>
					
				</view>
			</view>
			
			
			<view class="savebtn" v-show="usershow" @click="save">
				<view class="btncss">保存信息</view>
				
				</view>
			<DialogBox ref="DialogBox"></DialogBox>
		</view>
	</view>
</template>

<script>
	import { updateCustomData,findCustomData,findKefu,findConfig } from "../../../api/index";
	export default {
		data() {
			return {
				usershow:true,
				userinfo:'',
				bankshow:false,
				bankarray:[],
				form:{
					bankName:null,
					bankNameDesc:null,
					bankNum:null,
					bankCustomName:null,
				}
			};
		},
		onLoad() {
			this.checkuserinfo()
			this.getBank()
			console.log(this.usershow,'1111111111')
		},
		created() {
		
		},
		methods:{
			//客服
			kefu() {
				findConfig().then((res)=>{
					console.log(res.result)
					window.location.href="https://chatlink.mstatik.com/widget/standalone.html?eid="+res.result.meiqia
				})
			
			},
			checkuserinfo(){
				let _this = this
				
				findCustomData().then(res=>{

					_this.userinfo = res.result
			
					if(_this.userinfo.bankName && _this.userinfo.bankNum && _this.userinfo.bankCustomName && _this.userinfo.bankNameDesc){
						_this.usershow = false
					}else{
						_this.usershow = true
					}
				})
			
			},
			save(){
					if(this.userinfo.bankName == null || this.userinfo.bankName == ''){
						this.showmoadl('请输入银行名称')
					}else if(this.userinfo.bankNum == null || this.userinfo.bankNum == ''){
						this.showmoadl('请输入银行卡号')
					}else if(this.userinfo.bankCustomName == null || this.userinfo.bankCustomName == ''){
						this.showmoadl('请输入持卡人姓名')
					}else{
						updateCustomData({
							bankName:this.userinfo.bankName,
							bankNum:this.userinfo.bankNum,
							bankCustomName:this.userinfo.bankCustomName,
							bankNameDesc:this.userinfo.bankNameDesc,
							id:this.userinfo.id,
						}).then((res)=>{
							if(res.code == 200){
								uni.setStorage({
								  key: 'userinfo',
								  data: res.result.psCustomMain
								});
								this.checkuserinfo()
							}
						})
					}
				},
				showmoadl(msg){
					uni.showToast({
						title: msg,
						icon:"error",
						duration: 2000
					});
				},
				showbank(){
					if(this.userinfo.bankName == null){
						this.bankshow = true
					}
					
					
				},
				closebank(){
					this.bankshow = false
				},
				// 回调参数为包含columnIndex、value、values
							confirm(e) {
								console.log(e)
								this.userinfo.bankName= e.value[0]
								
				                this.bankshow = false
							},
			
				checkuserinfo(){
					let _this = this
					
					findCustomData().then(res=>{
						console.log(res)
						_this.userinfo = res.result
			
						if(_this.userinfo.bankName && _this.userinfo.bankNum && _this.userinfo.bankCustomName && _this.userinfo.bankNameDesc){
							_this.usershow = false
						}
					})
				
				},
				/**
				 * 性别
				 * @param {Object} e
				 */
				sexPickerChange(e){
					this.sexIndex = e.detail.value;
					this.sexText = this.sexArray[this.sexIndex];
				},
				/**
				 * 生日
				 * @param {Object} e
				 */
				birthdayPickerChange(e){
					this.birthday = e.detail.value;
				},
				/**
				 * 获取日期
				 * @param {Object} type
				 */
				getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
				
					if (type === 'start') {
							year = year - 60;
					} else if (type === 'end') {
							year = year + 2;
					}
					month = month > 9 ? month : '0' + month;;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
				},
				/**
				 * 昵称点击
				 */
				onNickname(){
					
					if(this.userinfo.bankNameDesc == null){
						this.$refs['DialogBox'].confirm({
							title: '更改开户行',
							placeholder: '请输入修改的开户行',
							value: this.userinfo.bankNameDesc,
							DialogType: 'input',
							animation: 0
						}).then((res)=>{
							console.log(res.value)
							this.userinfo.bankNameDesc = res.value
							// updateCustomData({bankNameDesc:res.value,id:this.userinfo.id}).then((res)=>{
							// 	if(res.code == 200){
							// 		uni.setStorage({
							// 		  key: 'userinfo',
							// 		  data: res.result.psCustomMain
							// 		});
							// 		this.checkuserinfo()
							// 	}
							// })
						})
					}
					
				},
				/**
				 * 银行卡号
				 */
				onNickname2(){
					
					if(this.userinfo.bankNum == null){
						this.$refs['DialogBox'].confirm({
							title: '银行卡卡号',
							placeholder: '请输入银行卡卡号',
							value: this.userinfo.bankNum,
							DialogType: 'input',
							animation: 0
						}).then((res)=>{
							this.userinfo.bankNum = res.value
							// updateCustomData({bankNum:res.value,id:this.userinfo.id}).then((res)=>{
							// 	if(res.code == 200){
							// 		uni.setStorage({
							// 		  key: 'userinfo',
							// 		  data: res.result.psCustomMain
							// 		});
							// 		this.checkuserinfo()
							// 	}
							// })
						})
					}
					
				},
				/**
				 * 姓名
				 */
				onNickname3(){
					// if(this.userinfo.bankCustomName == null){
						this.$refs['DialogBox'].confirm({
							title: '持卡人姓名',
							placeholder: '请输入持卡人姓名',
							value: this.userinfo.bankCustomName,
							DialogType: 'input',
							animation: 0
						}).then((res)=>{
							this.userinfo.bankCustomName = res.value
							
							// updateCustomData({bankCustomName:res.value,id:this.userinfo.id}).then((res)=>{
							// 	if(res.code == 200){
							// 		uni.setStorage({
							// 		  key: 'userinfo',
							// 		  data: res.result.psCustomMain
							// 		});
							// 		this.checkuserinfo()
							// 	}
							// })
						})
					// }
					
				},
				goback(){
					uni.switchTab({
						url:'/pages/my/my'
					})
				},
				getBank(){//银行列表
				    let list=[
				        {
				            letter:'A',
				            data:[
								{
								    value:'AYCB',
								    text:'其他银行'
								},
				                {
				                    value:'AYCB',
				                    text:'中国银行'
				                },
				                {
				                    value:'ARCU',
				                    text:'工商银行'
				                },
				                {
				                    value:'ASCB',
				                    text:'建设银行'
				                },
								{
								    value:'ASCB',
								    text:'农业银行'
								},
								{
								    value:'ASCB',
								    text:'招商银行'
								},
								{
								    value:'ASCB',
								    text:'邮政银行'
								},
								{
								    value:'ASCB',
								    text:'交通银行'
								},
				            ],
				        },
				        {
				            letter:'B',
				            data:[
				                {
				                    value:'BSB',
				                    text:'包商银行'
				                },
				                {
				                    value:'BJBANK',
				                    text:'北京银行'
				                },
				                {
				                    value:'BJRCB',
				                    text:'北京农商银行'
				                },
				                {
				                    value:'BOHAIB',
				                    text:'渤海银行'
				                },
				            ],
				        },
				        {
				            letter:'C',
				            data:[
				                {
				                    value:'CBBQS',
				                    text:'城市商业银行资金清算中心'
				                },
				                {
				                    value:'CSCB',
				                    text:'长沙银行'
				                },
				                {
				                    value:'BOCY',
				                    text:'朝阳银行'
				                },
				                {
				                    value:'CDRCB',
				                    text:'成都农商银行'
				                },
				                {
				                    value:'BOCD',
				                    text:'承德银行'
				                },
				                {
				                    value:'CDCB',
				                    text:'成都银行'
				                },
				                {
				                    value:'CZCCB',
				                    text:'沧州银行'
				                },
				                {
				                    value:'CQBANK',
				                    text:'重庆银行'
				                },
				                {
				                    value:'CRCBANK',
				                    text:'重庆农村商业银行'
				                },
				                {
				                    value:'CCQTGB',
				                    text:'重庆三峡银行'
				                },
				                {
				                    value:'CSRCB',
				                    text:'常熟农村商业银行'
				                },
				                {
				                    value:'CZRCB',
				                    text:'常州农村信用联社'
				                },
				            ],
				        },
				        {
				            letter:'D',
				            data:[
				                {
				                    value:'DLB',
				                    text:'大连银行'
				                },
				                {
				                    value:'DZBANK',
				                    text:'德州银行'
				                },
				                {
				                    value:'DRCBCL',
				                    text:'东莞农村商业银行'
				                },
				                {
				                    value:'HKBEA',
				                    text:'东亚银行'
				                },
				                {
				                    value:'BOD',
				                    text:'东莞银行'
				                },
				                {
				                    value:'DYCCB',
				                    text:'东营市商业银行'
				                },
				                {
				                    value:'DYCB',
				                    text:'德阳商业银行'
				                },
				                {
				                    value:'BODD',
				                    text:'丹东银行'
				                },
				            ]
				        },
				        {
				            letter:'E',
				            data:[
				                {
				                    value:'ORBANK',
				                    text:'鄂尔多斯银行'
				                }
				            ]
				        },
				        {
				            letter:'F',
				            data:[
				                {
				                    value:'FJHXBC',
				                    text:'福建海峡银行'
				                },
				                {
				                    value:'FSCB',
				                    text:'抚顺银行'
				                },
				                {
				                    value:'FXCB',
				                    text:'阜新银行'
				                },
				                {
				                    value:'FDB',
				                    text:'富滇银行'
				                },
				            ]
				        },
				        {
				            letter:'G',
				            data:[
				                {
				                    value:'CDB',
				                    text:'国家开发银行'
				                },
				                {
				                    value:'GDB',
				                    text:'广发银行'
				                },
				                {
				                    value:'GYCB',
				                    text:'贵阳市商业银行'
				                },
				                {
				                    value:'GDRCC',
				                    text:'广东省农村信用社联合社'
				                },
				                {
				                    value:'GCB',
				                    text:'广州银行'
				                },
				                {
				                    value:'GLBANK',
				                    text:'桂林银行'
				                },
				                {
				                    value:'GZRCU',
				                    text:'贵州省农村信用社'
				                },
				                {
				                    value:'GZB',
				                    text:'赣州银行'
				                },
				                {
				                    value:'BGB',
				                    text:'广西北部湾银行'
				                },
				                {
				                    value:'GRCB',
				                    text:'广州农商银行'
				                },
				                {
				                    value:'GSRCU',
				                    text:'甘肃省农村信用'
				                },
				                {
				                    value:'GXRCU',
				                    text:'广西省农村信用'
				                },
				                {
				                    value:'NYNB',
				                    text:'广东南粤银行'
				                },
				            ]
				        },
				        {
				            letter:'H',
				            data:[
				                {
				                    value:'HXBANK',
				                    text:'华夏银行'
				                },
				                {
				                    value:'EGBANK',
				                    text:'恒丰银行'
				                },
				                {
				                    value:'HSBC',
				                    text:'汇丰银行'
				                },
				                {
				                    value:'HSBL',
				                    text:'恒生银行'
				                },
				                {
				                    value:'HZCB',
				                    text:'杭州银行'
				                },
				                {
				                    value:'HRBCB',
				                    text:'哈尔滨银行'
				                },
				                {
				                    value:'CITIBANK',
				                    text:'花旗银行'
				                },
				                {
				                    value:'HLDBK',
				                    text:'葫芦岛银行'
				                },
				                {
				                    value:'HNRCU',
				                    text:'河南省农村信用'
				                },
				                {
				                    value:'HKB',
				                    text:'汉口银行'
				                },
				                {
				                    value:'HZCCB',
				                    text:'湖州市商业银行'
				                },
				                {
				                    value:'BHB',
				                    text:'河北银行'
				                },
				                {
				                    value:'HRXJB',
				                    text:'华融湘江银行'
				                },
				                {
				                    value:'HBRCU',
				                    text:'河北省农村信用社'
				                },
				                {
				                    value:'HBHSBANK',
				                    text:'湖北银行黄石分行'
				                },
				                {
				                    value:'HBYCBANK',
				                    text:'湖北银行宜昌分行'
				                },
				                {
				                    value:'HDBANK',
				                    text:'邯郸银行'
				                },
				                {
				                    value:'HSBK',
				                    text:'衡水银行'
				                },
				                {
				                    value:'HBC',
				                    text:'湖北银行'
				                },
				                {
				                    value:'HURCB',
				                    text:'湖北省农村信用社'
				                },
				                {
				                    value:'HNRCC',
				                    text:'湖南省农村信用社'
				                },
				            ]
				        },
				        {
				            letter:'J',
				            data:[
				                {
				                    value:'COMM',
				                    text:'交通银行'
				                },
				                {
				                    value:'JSBANK',
				                    text:'江苏银行'
				                },
				                {
				                    value:'JXBANK',
				                    text:'嘉兴银行'
				                },
				                {
				                    value:'JINCHB',
				                    text:'晋城银行'
				                },
				                {
				                    value:'JSRCU',
				                    text:'江苏省农村信用联合社'
				                },
				                {
				                    value:'JZBANK',
				                    text:'晋中市商业银行'
				                },
				                {
				                    value:'JLBANK',
				                    text:'吉林银行'
				                },
				                {
				                    value:'JSB',
				                    text:'晋商银行'
				                },
				                {
				                    value:'JLRCU',
				                    text:'吉林农信'
				                },
				                {
				                    value:'TCRCB',
				                    text:'江苏太仓农村商业银行'
				                },
				                {
				                    value:'JRCB',
				                    text:'江苏江阴农村商业银行'
				                },
				                {
				                    value:'BOJZ',
				                    text:'锦州银行'
				                },
				                {
				                    value:'JJBANK',
				                    text:'九江银行'
				                },
				                {
				                    value:'JXRCU',
				                    text:'江西省农村信用'
				                },
				                {
				                    value:'JNBANK',
				                    text:'济宁银行'
				                },
				                {
				                    value:'JHBANK',
				                    text:'金华银行'
				                },
				            ]
				        },
				        {
				            letter:'K',
				            data:[
				                {
				                    value:'KLB',
				                    text:'昆仑银行'
				                },
				                {
				                    value:'KORLABANK',
				                    text:'库尔勒市商业银行'
				                },
				                {
				                    value:'KSRB',
				                    text:'昆山农村商业银行'
				                },
				                {
				                    value:'CBKF',
				                    text:'开封市商业银行'
				                },
				            ]
				        },
				        {
				            letter:'L',
				            data:[
				                {
				                    value:'DAQINGB',
				                    text:'龙江银行'
				                },
				                {
				                    value:'LYCB',
				                    text:'辽阳市商业银行'
				                },
				                {
				                    value:'LANGFB',
				                    text:'廊坊银行'
				                },
				                {
				                    value:'LSBANK',
				                    text:'莱商银行'
				                },
				                {
				                    value:'LSCCB',
				                    text:'乐山市商业银行'
				                },
				                {
				                    value:'LSBC',
				                    text:'临商银行'
				                },
				                {
				                    value:'LZYH',
				                    text:'兰州银行'
				                },
				                {
				                    value:'LYBANK',
				                    text:'洛阳银行'
				                },
				            ]
				        },
				        {
				            letter:'N',
				            data:[
				                {
				                    value:'NBBANK',
				                    text:'宁波银行'
				                },
				                {
				                    value:'NJCB',
				                    text:'南京银行'
				                },
				                {
				                    value:'NCB',
				                    text:'南昌银行'
				                },
				                {
				                    value:'NHB',
				                    text:'南海农村信用联社'
				                },
				                {
				                    value:'NXBANK',
				                    text:'宁夏银行'
				                },
				                {
				                    value:'NXRCU',
				                    text:'宁夏黄河农村商业银行'
				                },
				                {
				                    value:'H3CB',
				                    text:'内蒙古银行'
				                },
				                {
				                    value:'CGNB',
				                    text:'南充市商业银行'
				                },
				                {
				                    value:'NHQS',
				                    text:'农信银清算中心'
				                },
				            ]
				        },
				        {
				            letter:'P',
				            data:[
				                {
				                    value:'SPDB',
				                    text:'浦发银行'
				                },
				                {
				                    value:'SPABANK',
				                    text:'平安银行'
				                },
				                {
				                    value:'BOP',
				                    text:'平顶山银行'
				                },
				            ]
				        },
				        {
				            letter:'Q',
				            data:[
				                {
				                    value:'QDCCB',
				                    text:'青岛银行'
				                },
				                {
				                    value:'ZBCB',
				                    text:'齐商银行'
				                },
				                {
				                    value:'QLBANK',
				                    text:'齐鲁银行'
				                },
				                {
				                    value:'BOQH',
				                    text:'青海银行'
				                },
				            ]
				        },
				        {
				            letter:'S',
				            data:[
				                {
				                    value:'SHRCB',
				                    text:'上海农村商业银行'
				                },
				                {
				                    value:'SHBANK',
				                    text:'上海银行'
				                },
				                {
				                    value:'SXCB',
				                    text:'绍兴银行'
				                },
				                {
				                    value:'SDEB',
				                    text:'顺德农商银行'
				                },
				                {
				                    value:'BOSZ',
				                    text:'苏州银行'
				                },
				                {
				                    value:'SJBANK',
				                    text:'盛京银行'
				                },
				                {
				                    value:'SRCB',
				                    text:'深圳农村商业银行'
				                },
				                {
				                    value:'SCCB',
				                    text:'三门峡银行'
				                },
				                {
				                    value:'SDRCU',
				                    text:'山东农信'
				                },
				                {
				                    value:'SRBANK',
				                    text:'上饶银行'
				                },
				                {
				                    value:'SCRCU',
				                    text:'四川省农村信用'
				                },
				                {
				                    value:'SXRCCU',
				                    text:'陕西信合'
				                },
				                {
				                    value:'SZSBK',
				                    text:'石嘴山银行'
				                },
				            ]
				        },
				        {
				            letter:'T',
				            data:[
				                {
				                    value:'TZCB',
				                    text:'台州银行'
				                },
				                {
				                    value:'TCCB',
				                    text:'天津银行'
				                },
				                {
				                    value:'TACCB',
				                    text:'泰安市商业银行'
				                },
				                {
				                    value:'TRCB',
				                    text:'天津农商银行'
				                },
				            ]
				        },
				        {
				            letter:'W',
				            data:[
				                {
				                    value:'HSBANK',
				                    text:'徽商银行'
				                },
				                {
				                    value:'WZCB',
				                    text:'温州银行'
				                },
				                {
				                    value:'WJRCB',
				                    text:'吴江农商银行'
				                },
				                {
				                    value:'BANKWF',
				                    text:'潍坊银行'
				                },
				                {
				                    value:'URMQCCB',
				                    text:'乌鲁木齐市商业银行'
				                },
				                {
				                    value:'WRCB',
				                    text:'无锡农村商业银行'
				                },
				                {
				                    value:'WHRCB',
				                    text:'武汉农村商业银行'
				                },
				                {
				                    value:'WHCCB',
				                    text:'威海市商业银行'
				                },
				            ]
				        },
				        
				       
				    ];
					let alist = []
					
					list.forEach(e=>{
						
						e.data.forEach(s=>{
							let a = {}
							
							alist.push(s.text)
						})
					})
					this.bankarray =[alist]
					console.log(this.bankarray )
				},
			
		}
	}
</script>

<style lang="scss">
	.kefubtn{
		width: 95%;
		margin: 10px auto;
		    background: #0a91fb;
		    color: #fff;
			font-size: 14px;
			text-align: center;
			height: 40px;
			line-height: 40px;
			border-radius: 5px;
	}
.savebank{
	width: 95%;
	margin: 10px auto;
	height: 150px;
	color: #fff;
	background-image: linear-gradient(90deg,#3b9dfd,#3d5179);
	font-size: 14px;
	display: flex;
	border-radius: 10px;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	text-indent: 1rem;
	view{
		height: 35px;
		line-height: 35px;
		text{
			display: inline-block;
			width: 100px;
		}
	}
}
::v-deep .dialog-box .operation-btn .btn .activity{
	color:	#3b9dfd !important;
}
::v-deep .u-navbar__content__title{
	color:	#3b9dfd;
}
.page{
  width: 100%;
  height: 100vh;

}
.topher{
	width: 100%;
	height: 44px;
}
/* 用户信息列表 */
.user-list{
	padding: 0 4%;
	border-radius: 20rpx;
	margin: 20rpx auto;
	.list{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #f6f6f6;
		.title{
			display: flex;
			align-items: center;
			text{
				font-size: 28rpx;
				color: #000;
			}
		}
		.more-content{
			display: flex;
			align-items: center;
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 100%;
			}
			.content{
				font-size: 28rpx;
				color: #000;
			}
			.more{
				font-size: 24rpx;
				color: #959595;
				margin-left: 20rpx;
			}
		}
		.picker{
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
}
.savebtn{
	width: 100%;
	height: 50rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 50px;
	.btncss{
		text-align: center;
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
		color: #FFFFFF;
		background: #3b9dfd;
	}
}
</style>
