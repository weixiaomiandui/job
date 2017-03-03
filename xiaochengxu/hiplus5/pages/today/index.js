//index.js
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
//获取应用实例
var number = 1;
var isLoading = false;
var app = getApp()
Page({
    onPullDownRefresh: function () {
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
      }
    })
  },
  data: {
        todaylist: [],
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多"
    },
  //加载
  onLoad: function() {
        console.log('onLoad')
        number = 1;
        var that = this
            //调用应用实例的方法获取全局数据
       wx.getSystemInfo({
            success: function(res) {
               // console.log(res.windowHeight + "px");
                that.setData({
                    windowHeight: res.windowHeight + "px"
                })
            },
            fail: function(e) {
               // console.log("获取设备信息失败" + e);
            }
        });
        wx.request({
            url: servername+'/HJF/user/get_all_daily_video_list.do',
            method: 'GET',
            data: {
                page:1
            },
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              //console.log(res.data.data)
                that.setData({
                    todaylist: res.data.data.daily_list
                })
                //console.log(that.data.todaylist);
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
  onReachBottom: function(e) {
    console.log(e)
    var that = this;
        if (number < 20 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
                url: servername+'/HJF/user/get_all_daily_video_list.do',
                data: {
                    page: ++number
                },
                success: function(res) {
                    if(res.data.data.is_all==0){
                        that.setData({
                        todaylist: that.data.todaylist.concat(res.data.data.daily_list),
                        lodingInfo: "加载更多",
                         });
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
                    isLoading = false;
                    that.setData({
                        loadingHidden: true,
                    })
                }
            })
        }
  }
})

























