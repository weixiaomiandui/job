var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var number = 1;
var isLoading = false;
var app = getApp()
var channel_id;
var user_id;
var channel_is_followed;
var channelvideo;
var idx;
Page({
    onPullDownRefresh: function () {
      console.log(1)
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
      }
    })
  },
  data: {
        gamelist: [],
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多",
        
    },
  //加载
  onLoad: function(options) {
        number = 1;
        var that = this
         user_id = wx.getStorageSync('user_id') || []
         console.log(options)
        channel_id=options.channel_id  
          // 动态设置标题栏。。。无效
        wx.setNavigationBarTitle({
            title: options.channel_name,
            fail: function() {
                console.log("更改标题失败");
            },
            success: function() {
                console.log("更改标题成功");
            }
        });
            //调用应用实例的方法获取全局数据
       wx.getSystemInfo({
            success: function(res) {
                console.log(res.windowHeight + "px");
                that.setData({
                    windowHeight: res.windowHeight + "px"
                })
            },
            fail: function(e) {
                //console.log("获取设备信息失败" + e);
            }
        });
        wx.request({
           url: servername+'/HJF/user/get_channel_video_list.do?channel_id=' + channel_id,
            method: 'GET',
            data: {
                page:1,
                user_id:user_id
            },
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              console.log(res.data.data)
                that.setData({
                    channelvideo: res.data.data.video_list,
                    channel_is_followed:res.data.data.video_list[0].channel_is_followed
                })
                channelvideo=that.data.channelvideo;
                 channel_is_followed==that.data.channel_is_followed
                setTimeout(function () {
                     isLoading = false;
                    that.setData({
                        loadingHidden: true
                    })
                }, 1000)
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
              url: servername+'/HJF/user/get_channel_video_list.do?channel_id=' + channel_id,
              method: 'GET',
                data: {
                    page: ++number,
                    user_id:user_id
                },
                success: function(res) {
                    console.log(res.data.data.is_all)
                    if(res.data.data.is_all==0){
                        that.setData({
                        channelvideo: that.data.channelvideo.concat(res.data.data.video_list),
                        lodingInfo: "加载更多",
                      });
                       channelvideo=that.data.channelvideo
                       isLoading = false;
                    }
                    
                },
                fail: function(error) {
                    number--;
                    console.log(error);
                    that.setData({
                        lodingInfo: "加载失败",
                    })
                },
                complete: function() {
                    that.setData({
                        loadingHidden: true,
                    })
                }
            })
        }
  },
  channelFocus:function(e){
    console.log(e)
    var that = this;
    channel_is_followed=e.currentTarget.dataset.followed;
    idx=e.currentTarget.dataset.index;
       if(channel_is_followed==1){
              wx.request({
                    url: servername+'/HJF/user/cancel_follow_channel.do?user_id=' + user_id + '&channel_id=' + channel_id,
                    method: 'GET',
                    data: {},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {
                     console.log(res)
                      that.setData({
                            channel_is_followed:0
                            })
                         channel_is_followed=that.data. channel_is_followed
                    }
                })
        }else if(channel_is_followed==0){
            wx.request({
                    url: servername+'/HJF/user/follow_channel.do?user_id=' + user_id + '&channel_id=' + channel_id,
                    method: 'GET',
                    data: {},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {
                        console.log(res)
                         that.setData({
                            channel_is_followed:1
                            })
                       channel_is_followed=that.data. channel_is_followed
                    }
                })
        }
  },
  onShareAppMessage: function () {
    return {
      title: channelvideo[0].channel_name,
      desc: channelvideo[0].channel_summary,
      path: '/pages/sharechannel/index?channel_id='+channelvideo[0].channel_id
    }
  }
})

