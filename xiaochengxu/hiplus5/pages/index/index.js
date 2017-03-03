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
       user_id = wx.getStorageSync('user_id') || []
      // console.log(user_id)
        this.setData({
        video_id: app.globalData.video_id
        })
        var that = this
        wx.request({
            url: servername+'/HJF/user/get_home.do',
            method: 'GET',
            data: {user_id:user_id},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
             // console.log(res.data)
             if(res.data!=''){
                 that.setData({
                    logeShow: true
                })
             }
                that.setData({
                    list: res.data
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 500)
            }
        })
  },
  upper: function(e) {
    //console.log(e)
  },
  lower: function(e) {
    //console.log(e)
  },
  scroll: function(e) {
    //console.log(e)
  },
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onShow: function(){
     var that = this
     wx.request({
            url: servername+'/HJF/user/get_home.do',
            method: 'GET',
            data: {user_id:user_id},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
             // console.log(res.data)
                that.setData({
                    list: res.data
                   
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1000)
            }
        })
    },
  onPullDownRefresh: function () {
    user_id = wx.getStorageSync('user_id') || []
       console.log(user_id)
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        });
        
        wx.request({
            url: servername+'/HJF/user/get_home.do',
            method: 'GET',
            data: {user_id:user_id},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
                that.setData({
                    list: res.data
                   
                })
                setTimeout(function () {
                    that.stopPullDownRefresh()
                    that.setData({
                        loadingHidden: true
                    })
                }, 1000)
            }
        })
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
      }
    })
  },
  navigateTo:function(e){
        wx.navigateTo({ url: '../theme/index'})
    },
 onShareAppMessage: function () {
   return {
    title: 'HiPlus5',
    desc: '提供全球无广告高清游戏视频，即可零距离高清观摩电竞大神出装、操作，分享游戏精彩瞬间，为你打造一场独具一格的游戏视听体验。',
    path: '/pages/index/index'
   }
  }
})

























