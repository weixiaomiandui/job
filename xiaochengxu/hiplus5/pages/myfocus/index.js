//logs.js

var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var user_id='8f4ef453bc0c4d5fa6773a1142c9b8ee';
var isLoading = false;
var myfocuslist;
Page({
  data: {

  },
  onLoad: function () {
    var that = this
    user_id = wx.getStorageSync('user_id') || []
    wx.request({
          url: servername+'/HJF/user/get_user_channel_list.do',
          method: 'GET',
          data: {
             user_id:user_id,
             page:1
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              that.setData({
                   myfocuslist:res.data.data
                })
              console.log(res)
          }
      })
  },
   //滑到底部监听事件
  lower: function(e) {
    var that = this;
        if (number < 20 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
               url: servername+'/HJF/user/get_user_channel_list.do',
              method: 'GET',
                data: {
                     user_id:user_id,
                    page: ++number
                },
                success: function(res) {
                  
                },
                fail: function(error) {
                    number--;
                    console.log(error);
                    that.setData({
                        lodingInfo: "加载失败",
                    })
                },
                complete: function() {
                    isLoading = false;
                    that.setData({
                        loadingHidden: true,
                    })
                }
            })
        }
  },
  onShow:function(){
       var that = this
    user_id = wx.getStorageSync('user_id') || []
    wx.request({
          url: servername+'/HJF/user/get_user_channel_list.do',
          method: 'GET',
          data: {
             user_id:user_id,
             page:1
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              that.setData({
                   myfocuslist:res.data.data
                })
              console.log(res)
          }
      })
  }
})
