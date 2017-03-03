//logs.js

var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var startPlay=0;
var isLoading = false;
var video_id;
Page({
  data: {

  },
  onLoad: function (options) {
    var that = this
    that.setData({
            startPlay: 0
    })
    video_id=options.video_id
    wx.request({
          url: servername+'/HJF/user/get_video_info.do',
          method: 'GET',
          data: {
             video_id:video_id
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              that.setData({
                   shareVideo:res.data.data
                })
          }
      });
     wx.request({
          url: servername+'/HJF/user/get_home.do',
          method: 'GET',
          data: {
             video_id:video_id
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              console.log(res)
              that.setData({
                   daily_list:res.data.daily_list
                })
                console.log(that.data.daily_list)
          }
      });
      wx.request({
          url: servername+'/HJF/user/get_video_comment_list.do',
          method: 'GET',
          data: {
             video_id:video_id
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
  },
  videoPlay:function(e){
        this.videoContext = wx.createVideoContext('myVideo');
        var that = this;
        that.setData({
             startPlay: 1
        })
        that.videoContext.play()
    },
})
