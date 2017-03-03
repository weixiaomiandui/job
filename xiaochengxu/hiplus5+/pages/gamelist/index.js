
var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var number = 1;
var isLoading = false;
var game_id;
var video_id;
var idx;
var arr;
var timer;
var game_name;
var game_img_url;
var is_all;
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
        windowHeight: "auto",
        loadingHidden: false 
        
    },
  //加载
  onLoad: function(options) {
      //console.log(options)
        number = 1;
        var that = this
           that.setData({
            game_name: options.game_name,
            game_img_url:options.game_img_url,
            game_ch_name:options.game_ch_name
                })
             game_id=options.id  
          // 动态设置标题栏。。。无效
        wx.setNavigationBarTitle({
            title: options.game_name,
            fail: function() {
               // console.log("更改标题失败");
            },
            success: function() {
                //console.log("更改标题成功");
            }
        });
            //调用应用实例的方法获取全局数据
       wx.getSystemInfo({
            success: function(res) {
              //  console.log(res.windowHeight + "px");
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
                is_all=res.data.data.is_all
              if(res.data!=''){
                 that.setData({
                    loadingHidden: true
                })
             }
              arr = new Array(500); 
              for(var i=0;i<arr.length;i++){
                    arr[i]=0;
              }
                that.setData({
                    gamelist: res.data.data.video_list,
                    arr:arr
                })
            }
        })
  },
  //滑到底部监听事件
  onReachBottom: function(e) {
        //console.log(is_all)
        var that = this;
        if(is_all==0){
             if (number < 20 && !isLoading) {
            wx.request({
              url: servername+'/HJF/user/get_game_video_list.do?game_id=' + game_id,
              method: 'GET',
                data: {
                    page: ++number
                },
                success: function(res) {
                    //console.log(res)
                    is_all=res.data.data.is_all
                    that.setData({
                        gamelist: that.data.gamelist.concat(res.data.data.video_list),
                        lodingInfo: "加载更多",
                    });
                },
                fail: function(error) {
                    number--;
                },
                complete: function() {
                }
            })
        }
        }
  },
  videoPlay:function(e){
       video_id=e.currentTarget.id;
      idx=e.currentTarget.dataset.index;
      for(var i=0;i<arr.length;i++){
                    arr[i]=0;
        }
        arr[idx]=1;
        this.videoContext = wx.createVideoContext(video_id);
        var that = this;
        that.setData({
             startPlay: 1,
             arr:arr
        })
        that.videoContext.play()
    }
})

