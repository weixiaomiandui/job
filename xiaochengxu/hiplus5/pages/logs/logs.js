//logs.js
var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
Page({
  data: {
      loadingHidden: false , // loading
  },
  onLoad: function () {
    var that = this
    app.getUserInfo( function( userInfo ) {
      //更新数据
      console.log(userInfo)
      that.setData( {
        userInfo: userInfo
      })
    })
     setTimeout(function () {
        that.setData({
            loadingHidden: true
        })
    }, 500)
  },
  setStorage: function () {
     var key = 'user_id';
    var data = '8f4ef453bc0c4d5fa6773a1142c9b8ee';
    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': 'key 不能为空'
      })
    } else {
      wx.setStorageSync(key, data)
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      })
    }
  },
  clearStorage: function () {
    wx.clearStorageSync()
    this.setData({
      key: '',
      data: '',
      'dialog.hidden': false,
      'dialog.title': '清除数据成功',
      'dialog.content': ''
    })
  }
})
