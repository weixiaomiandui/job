
var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var number = 1;
var isLoading = false;
var game_id;
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
       
              game_id=options.id   
                console.log(game_id)
          // 动态设置标题栏。。。无效
        wx.setNavigationBarTitle({
            title: options.game_name,
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
                console.log("获取设备信息失败" + e);
            }
        });
        wx.request({
           url: servername+'/HJF/user/get_game_video_list.do?game_id=' + options.id,
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
                    gamelist: res.data.data.video_list
                })
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
      console.log(game_id)
    var that = this;
        if (number < 20 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
              url: servername+'/HJF/user/get_game_video_list.do?game_id=' + game_id,
              method: 'GET',
                data: {
                    page: ++number
                },
                success: function(res) {
                    that.setData({
                        gamelist: that.data.gamelist.concat(res.data.data.video_list),
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
})

