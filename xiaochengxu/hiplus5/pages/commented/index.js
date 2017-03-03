//logs.js

var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var user_id='8f4ef453bc0c4d5fa6773a1142c9b8ee';
var isLoading = false;
var comment_is_laud=0;
var comment_id;
var comment_laud_num;
var comment_list;
var idx;
Page({
  data: {
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多"
  },
  onLoad: function () {
    var that = this
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
          url: servername+'/HJF/user/get_user_comment_list.do',
          method: 'GET',
          data: {
             user_id:user_id,
             page:1
          },
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              console.log(res)
              that.setData({
                comment_list : res.data.data.comment_list
            })
            comment_list=that.data.comment_list
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
               url: servername+'/HJF/user/get_user_comment_list.do',
              method: 'GET',
                data: {
                     user_id:user_id,
                    page: ++number
                },
                success: function(res) {
                    that.setData({
                        comment_list: that.data.comment_list.concat(res.data.data.comment_list),
                        lodingInfo: "加载更多",
                    });
                    comment_list=that.data.comment_list
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
  },
   commentzan:function(e){
       console.log(e)
      var that = this;
        comment_is_laud=e.currentTarget.dataset.laud;
        comment_id=e.currentTarget.id;
        idx=e.currentTarget.dataset.index;
        if(comment_is_laud==1){
              wx.request({
                    url: servername+'/HJF/user/cancel_laud_video_comment.do?user_id=' + user_id + '&comment_id=' + comment_id,
                    method: 'GET',
                    data: {},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {
                      //  console.log(res)
                      var comment_laud_num;
                       comment_laud_num=comment_list[idx].comment_laud_num;
                        that.setData({
                            comment_is_laud:0,
                            comment_laud_num:Number(comment_laud_num)-1
                            })
                        comment_list[idx].comment_is_laud=that.data.comment_is_laud;
                        comment_list[idx].comment_laud_num=that.data.comment_laud_num;
                        that.setData({
                        comment_list:comment_list
                        })
                    }
                })
        }else if(comment_is_laud==0){
            wx.request({
                    url: servername+'/HJF/user/laud_video_comment.do?user_id=' + user_id + '&comment_id=' + comment_id,
                    method: 'GET',
                    data: {},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {
                         //console.log(res)
                         comment_laud_num=comment_list[idx].comment_laud_num
                        that.setData({
                            comment_is_laud:1,
                            comment_laud_num:Number(comment_laud_num)+1
                            })
                         comment_list[idx].comment_is_laud=that.data.comment_is_laud;
                         comment_list[idx].comment_laud_num=that.data.comment_laud_num;
                         that.setData({
                        comment_list:comment_list
                        })
                    }
                })
        }
  },
})
