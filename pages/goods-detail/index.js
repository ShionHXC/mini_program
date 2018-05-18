// pages/goods-detail/index.js
const services = require("./../../services/services")
Page({
  data: {
    pics: [],
    basicInfo: {},
    videoUrl: "",
    hasVideo: false
  },
  onLoad: function (params) {
    const {id} = params
    services.getGoodsDetail(id).then(res => {
      if(res.code === 0){
        console.log(res.data)
        /* 1. 判断是否有视频文件 */
        const { pics, basicInfo } = res.data
        console.log(basicInfo)
        pics.length !== 0 && this.setData({ pics })
        if (basicInfo.videoId) {
          services.getVideo(basicInfo.videoId).then(res => {
            res.code === 0 && this.setData({ videoUrl: res.data.fdMp4, hasVideo: true})
          })
        }
        this.setData({ basicInfo})
      }else {
        wx.showModal({
          title: "提示",
          content: res.msg,
          showCancel: true
        })
      }
    })
  },
})