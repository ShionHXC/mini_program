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

// 获取首页数据
function getBanner(){
    return new Promise((resolve,reject) => {
        wx.request({
            url: `${baseUrl}/banner/list`,
            data:{
                key: "mallName"
            },
            success: res => resolve(res.data),
            fail: res => reject(res.data)
        })
    })
}
// 获取商品 类目
function getCategories(){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/shop/goods/category/all`,
            success: res => resolve(res.data),
            fail: res => reject(res.data)
        })
    })
}
// 获取通知
function getNotice(pageSize){
    return new Promise((resolve,reject) => {
        wx.request({
            url: `${baseUrl}/notice/list`,
            data: { pageSize },
            success: res => resolve(res.data),
            fail: res => reject(res.data)
        })
    })
}
// 获取优惠券信息
function getCoupons(){
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/discounts/coupons`,
            data: { type: '' },
            success: res => resolve(res.data),
            fail: res => reject(res.data)
        })
    })
}
// 商品列表
function getGoodsList(params){
    const { categoryId, nameLike } = params
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/shop/goods/list`,
            data: { 
                categoryId: categoryId !== "0" ? categoryId : "", 
                nameLike 
            },
            success: res => resolve(res.data),
            fail: res => reject(res.data)
        })
    })
}
module.exports = {
    getFullName, orderReputationScore, rechargeAmountMin, kanjiaList, login, checkToken, 
    getBanner, getCategories, getNotice, getCoupons, getGoodsList
}