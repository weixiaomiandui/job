//logs.js
var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var startPlay=0;
var isLoading = false;
var channel_id;
var index;
//channel_id='2afcf0cce3f549bc91b301d908c53238'
Page({
  data: {

  },
  onLoad: function (options) {
    var that = this
    that.setData({
            startPlay: 0
    })
    channel_id=options.channel_id
    wx.request({
          url: servername+'/HJF/user/get_channel_video_list.do',
          method: 'GET',
          data: {
             channel_id:channel_id
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              console.log(res)
              that.setData({
                   channel_list:res.data.data.video_list
                })
          }
      });
     wx.request({
          url: servername+'/HJF/user/get_home.do',
          method: 'GET',
          data: {
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              console.log(res)
              that.setData({
                daily_list:res.data.daily_list
                })
          }
      });
      wx.request({
          url: servername+'/HJF/user/get_video_comment_list.do',
          method: 'GET',
          data: {
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              console.log(res)
              that.setData({
                   comment_list:res.data.data.comment_list
                })
               length=res.data.data.comment_list.length
               if(length>4){
                    that.setData({
                     index:4
                    }) 
               }else{
                    that.setData({
                      index:res.data.data.comment_list.length
                    }) 
               }
               console.log(length)
          }
      });
  }
})
