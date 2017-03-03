//logs.js
var app = getApp()
/*var servername ='http://www.hiplus5.com';*/
var servername ='http://192.168.199.114:8080';
Page({
  data: {

  },
  onLoad: function () {
    
  },
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        console.log(res)
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
      }
    })
  }

})
