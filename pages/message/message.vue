<template>
	<view>
		<u-navbar
		
		    @rightClick="rightClick"
		    :autoBack="false"
			leftIcon=""
		
		>
			<view
			    class="u-nav-slot"
			    slot="center"
			>
			<view class="navcenter">消息中心</view>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			window.location.href="/static/chatlink.html"
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.navcenter{
		font-weight: 600;
		font-size: 20px;
	}
</style>
