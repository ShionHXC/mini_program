//index.js
//获取应用实例
const services = require("./../../services/services.js")
const app = getApp()

Page({
  data: {
    imgUrls:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    categories: [],
    activeCategoryId: "0",
    searchInput: "",
    noticeList: {},
    couponsList: [],
    hasNoCoupons: true,
    goods: [],
  },
  onLoad(){
    // 获取Banner 列表
    services.getBanner().then(res => {
      if(res.code === 0){
        this.setData({imgUrls: res.data})
      }
    })
    // 获取商品类目
    services.getCategories().then(res => {
      const categories = [{ id:"0", name: "全部" }, ...res.data]
      this.setData({ categories })
    })
    // 获取通知
    services.getNotice(5).then(res => {
      this.setData({ noticeList: res.data})
    })
    // 获取优惠信息
    services.getCoupons().then(res => {
      if(res.code === 0){
        this.setData({ 
          hasNoCoupons: false,
          couponsList: res.data
        })
      }
    })
    this.getGoodsList(this.data.activeCategoryId)
  },
  tabClick(e){
    this.setData({ activeCategoryId: e.currentTarget.id })
    this.getGoodsList(e.currentTarget.id)
  },
  listenerSearchInput(e){
    this.setData({ searchInput: e.detail.value})
  },
  toSearch(){
    this.getGoodsList(this.data.activeCategoryId)
  },
  // 获取商品列表
  getGoodsList(activeCategoryId){
    services.getGoodsList({
      categoryId: activeCategoryId,
      nameLike: this.data.searchInput
    }).then(res => {
      if(res.code === 0){
        this.setData({ goods: res.data })
      }else{
        this.setData({ goods: [] })
      }
    })
  }
})
