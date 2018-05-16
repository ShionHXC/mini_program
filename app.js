const services = require("./services/services.js")
App({
	globalData: {
		userInfo: null,
		order_reputation_score: 0,
		kanjiaList: "",
		token: null,
		uid: ""
	},
	onLaunch() {
		// 获取商城名称
		services.getFullName().then(res => {
			res.code === 0 ? wx.setStorageSync('mallName', res.data.value) : ""
		})
		// 获取奖励积分
		services.orderReputationScore().then(res => {
			res.code === 0 ? this.globalData.order_reputation_score = res.data[0].score : ""
		})
		// 充值最少金额
		services.rechargeAmountMin().then(res => {
			res.code === 0 ? this.globalData.recharge_amount_min = res.data.value : ""
		})
		// 获取砍价列表
		services.kanjiaList().then(res => {
			res.code === 0 ? this.globalData.kanjiaList = res.data.result : ""
		})
		this.login()
	},
	login() {
		const { token } = this.globalData
		if (token) {
			services.checkToken(token).then(res => {
				if (res.code != 0) {
					this.globalData.token = null;
					this.login();
				}
			})
			return
		}
		wx.login({
			success: res => {
				services.login(res.code).then(res => {
					if (res.code === 1000) {
						// 去注册
						that.registerUser()
						return
					}
					if (res.code !== 0) {
						// 登录错误
						wx.hideLoading()
						wx.showModal({
							title: '提示',
							content: '无法登录，请重试',
							showCancel: false
						})
						return
					}
					this.globalData.token = res.data.token
					this.globalData.uid = res.data.uid
				})
			}
		})
	},
	registerUser() {
		wx.login({
			success: res => {
				const code = res.code
				wx.getUserInfo({
					success: function (res) {
						console.log(res)
						// 拿到数据去请求后台接口
					}
				})
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
	}
})