//index.js
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
//获取应用实例
var user_id='8f4ef453bc0c4d5fa6773a1142c9b8ee';
var isLoading = false;
var app = getApp()
var number=1;
var is_all;
Page({
 
  data: {
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多"
    },
  //加载
  onLoad: function() {
    var that=this;
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
        url: servername+'/HJF/user/get_collect_list.do',
        method: 'GET',
        data: {user_id:user_id,page:number},
        header: {
            'Accept': 'application/json'
        },
        success: function(res) {
           console.log(res)
          that.setData({
            video_list : res.data.data.video_list
          })
          is_all=res.data.data.is_all
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
               url: servername+'/HJF/user/get_collect_list.do',
              method: 'GET',
                data: {
                     user_id:user_id,
                    page: ++number
                },
                success: function(res) {
                    that.setData({
                        video_list: that.data.video_list.concat(res.data.data.video_list),
                        lodingInfo: "加载更多",
                    });
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
  },
  onShow: function(){
      var that=this;
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
        url: servername+'/HJF/user/get_collect_list.do',
        method: 'GET',
        data: {user_id:user_id,page:1},
        header: {
            'Accept': 'application/json'
        },
        success: function(res) {
           console.log(res)
          that.setData({
            video_list : res.data.data.video_list
          })
          setTimeout(function () {
                    isLoading = false;
                that.setData({
                    loadingHidden: true
                })
            }, 1000)
        }
    })
  }
 
})

























