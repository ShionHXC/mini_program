const app = getApp()
Page({
  data: {
      remind: true,
      angle: 0,
      userInfo: {}
  },
  onLoad(){
      wx.setNavigationBarTitle({
        title: wx.getStorageSync('mallName')
      })
      app.getUserInfo().then(res => {this.setData({ userInfo: res})})
  },
  onReady(){
    setTimeout(() => {
       this.setData({remind: false})
    }, 1000);
    // 重力感应  x => 水平轴
    wx.onAccelerometerChange(res=>{
      let angle = -(res.x * 30 ).toFixed(1)
      if(angle > 14) { angle = 14 }
      if(angle < -14){ angle = -14 }
      if(this.data.angle !== angle){
        this.setData({angle})
      }
    })
  },
  goToIndex(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})