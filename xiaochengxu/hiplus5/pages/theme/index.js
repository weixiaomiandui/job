
var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var number = 1;
var isLoading = false;
var video_list;
var is_all;
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
        gamelist: [],
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多",
        
    },
  //加载
  onLoad: function(options) {
        number = 1;
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
           url: servername+'/HJF/user2/get_subject_list.do' ,
            method: 'GET',
            data: {
                page:1
            },
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              console.log(res.data.data)
                that.setData({
                   subject_list: res.data.data.subject_list
                })
                is_all=res.data.data.is_all;
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
    if(is_all==0){
        if (number < 20 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
              url: servername+'/HJF/user2/get_subject_list.do',
              method: 'GET',
                data: {
                    page: ++number
                },
                success: function(res) {
                    is_all=res.data.data.is_all;
                    if(res.data.data.is_all==0){
                        that.setData({
                       subject_list: that.data.subject_list.concat(res.data.data.subject_list),
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
  }
})

