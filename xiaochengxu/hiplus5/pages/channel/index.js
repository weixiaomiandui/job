//index.js
//获取应用实例
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var number = 1;
var isLoading = false;
var user_id;
var channel_is_followed;
var channel_id;
var idx;
var channellist;
var hot_list;
var recent_list;
var app = getApp()
Page({
  onPullDownRefresh: function () {
      //console.log(1)
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
         

      }
    })
  },
  data: {
        
        loadingHidden: false , // loading
        logeShow:false,
        nomessage:"加关注",
        yesmessage:"已关注",
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多",
    },
  //加载
  onLoad: function() {
      user_id = wx.getStorageSync('user_id') || []
        number=1;
        var that = this
             //调用应用实例的方法获取全局数据
       wx.getSystemInfo({
            success: function(res) {
                console.log(res.windowHeight + "px");
                that.setData({
                    windowHeight: res.windowHeight + "px"
                })
            },
            fail: function(e) {
                console.log("获取设备信息失败" + e);
            }
        });
        
        wx.request({
            url: servername+'/HJF/user2/get_channel.do',
            method: 'GET',
            data: {
               page:1,
               user_id:user_id
            },
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                if(res.data!=''){
                    that.setData({
                        logeShow: true
                    })
                }
                that.setData({
                    hot_list:res.data.hot_list,
                    recent_list:res.data.recent_list
                })
                 hot_list=that.data.hot_list
                 recent_list=that.data.recent_list
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 500)
            }
        })
        wx.request({
            url: servername+'/HJF/user/get_channel_list.do',
            method: 'GET',
            data: {
               page:1,
               user_id:user_id
            },
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    channellist: res.data.data.channel_list
                })
                channellist=that.data.channellist
                
            }
        })
  },
   //滑到底部监听事件
  onReachBottom: function(e) {
    var that = this;
        if (number < 20 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
                url: servername+'/HJF/user/get_channel_list.do',
                data: {
                    page: ++number,
                    user_id:user_id
                },
                 header: {
                'Accept': 'application/json'
                },
                success: function(res) {
                    that.setData({
                        channellist: that.data.channellist.concat(res.data.data.channel_list),
                        lodingInfo: "加载更多",
                    });
                    channellist=that.data.channellist
                    if(res.data.data.is_all==0){
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
    var that = this;
    channel_is_followed=e.currentTarget.dataset.followed;
    channel_id=e.currentTarget.id;
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
                        channellist[idx].channel_is_followed=that.data.channel_is_followed;
                        that.setData({
                        channellist:channellist
                        })
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
                         that.setData({
                            channel_is_followed:1
                            })
                        channellist[idx].channel_is_followed=that.data.channel_is_followed;
                        that.setData({
                        channellist:channellist
                        })
                    }
                })
        }
  },
  hotChannelFocus:function(e){
    var that = this;
    channel_is_followed=e.currentTarget.dataset.followed;
    channel_id=e.currentTarget.id;
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
                        hot_list[idx].channel_is_followed=that.data.channel_is_followed;
                        that.setData({
                        hot_list:hot_list
                        })
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
                         that.setData({
                            channel_is_followed:1
                            })
                        hot_list[idx].channel_is_followed=that.data.channel_is_followed;
                        that.setData({
                        hot_list:hot_list
                        })
                    }
                })
        }
  },
  newChannelFocus:function(e){
    var that = this;
    channel_is_followed=e.currentTarget.dataset.followed;
    channel_id=e.currentTarget.id;
    idx=e.currentTarget.dataset.index;
    console.log(channel_is_followed)
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
                        recent_list[idx].channel_is_followed=that.data.channel_is_followed;
                        that.setData({
                        recent_list:recent_list
                        })
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
                         that.setData({
                            channel_is_followed:1
                            })
                        recent_list[idx].channel_is_followed=that.data.channel_is_followed;
                        that.setData({
                        recent_list:recent_list
                        })
                    }
                })
        }
  }
})

























