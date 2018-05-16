// 获取商城名称
const baseUrl = "https://api.it120.cc/tz/"
// 商城全称
function getFullName(){
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + '/config/get-value',
            data: {
                key: 'mallName'
            },
            success : res => {
                resolve(res.data)
            },
            fail: res => {
                reject(res.data)
            }
        })
    })
}
// 奖励积分
function orderReputationScore(){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/score/send/rule`,
            data: {
                code: 'goodReputation'
            },
            success: res => {
                resolve(res.data)
            },
            fail: res => {
                reject(res.data)
            }
        })
    })
}
// 获取最少充值金额
function rechargeAmountMin(){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/config/get-value`,
            data: {
                key: 'recharge_amount_min'
            },
            success: res => {
                resolve(res.data)
            },
            fail: res => {
                reject(res.data)
            }
        })
    })
}
// 获取砍价设置
function kanjiaList(){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/shop/goods/kanjia/list`,
            data: {},
            success :res => {
                resolve(res.data)
            },
            fail: res => {
                reject(res.data)
            }
        })
    })
}
// 登录
function login(code){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/user/wxapp/login`,
            data: { code },
            success: res => {
                resolve(res.data)
            },
            fail: res => {
                reject(res.data)
            }
        })
    })
}
// 检车 token
function checkToken(token){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/user/check-token`,
            data: { token },
            success: res => {
                resolve(res.data)
            },
            fail: res => {
                reject(res.data)
            }
        })
    })
}
module.exports = {
    getFullName, orderReputationScore, rechargeAmountMin, kanjiaList, login, checkToken
}