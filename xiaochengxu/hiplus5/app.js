//app.js
var userInfo;
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var user_id = wx.getStorageSync('user_id') || []
    //console.log(user_id)
    //logs.unshift(Date.now())
   // wx.setStorageSync('logs', logs)
   //调用登录接口
    var that = this
    wx.login({
        success: function (res) {
          console.log(res.code)
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res.code)
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }    
})