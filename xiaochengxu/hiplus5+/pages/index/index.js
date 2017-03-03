//index.js
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
//获取应用实例
var order = ['', '', '', '', '','']
var user_id;
var app = getApp()
Page({
  
  data: {
        loadingHidden: false , // loading
        logeShow:false
    },
  //加载
  onLoad: function() {
      // console.log(user_id)
        this.setData({
        video_id: app.globalData.video_id
        })
        var that = this
        wx.request({
            url: servername+'/HJF/user2/get_class.do',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
            // console.log(res.data)
             if(res.data!=''){
                 that.setData({
                    logeShow: true,
                    loadingHidden: true
                })
             }
                that.setData({
                    list: res.data.game_list
                })
               // console.log(that.data.list)
            }
        })
  },
 onShareAppMessage: function () {
   return {
    title: '巅峰玩家HiPlus5',
    desc: '巅峰玩家HiPlus5，教学、搞笑、译制游戏视频。分类游戏精彩短视频观看。',
    path: '/pages/index/index'
   }
  }
})

























