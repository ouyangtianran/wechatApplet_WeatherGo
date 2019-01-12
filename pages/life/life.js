// pages/life/life.js
var app = getApp();
var type = ['舒适度','穿衣','流感','运动','旅行','防晒','洗车','空气'];
Page({
  data: {
    type: type,
  },
  onLoad: function (options) {//程序启动时执行onLoad
    wx.setNavigationBarTitle({//设置标题
      title: '生活指数'
    })
    let lifeindex = wx.getStorageSync('life');//取出标签为life的数据
    console.log(lifeindex);
    console.log(type[1]);
    this.setData({//渲染到wxml
      lifeindex: lifeindex
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
  }
})
