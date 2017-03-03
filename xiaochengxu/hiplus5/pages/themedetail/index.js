var servername='https://www.hiplus5.com'
//var servername ='http://192.168.199.114:8080';
var user_id='8f4ef453bc0c4d5fa6773a1142c9b8ee'
var app = getApp()
var video_id;
var video_title;
var video_img_url;
var video_comment_num;
var number = 1;
var isLoading = false;
var comment_id;
var comment_is_laud=0;
var comment_laud_num;
var idx;
var comment_list;
var focus=0;
var textvalue=0;
var is_all;
var subject_id;
var arr;
Page({
    data: {
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多",
        modalHidden2: true
    },
    onLoad: function(options) {
         number = 1;
          console.log(options)
        var that = this
        that.setData({
             startPlay: 0
        })
          // 动态设置标题栏。。。无效
        wx.setNavigationBarTitle({
            title: options.subject_title,
            fail: function() {
                //console.log("更改标题失败");
            },
            success: function() {
               // console.log("更改标题成功");
            }
        });
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
        arr = new Array(500); 
              for(var i=0;i<arr.length;i++){
                    arr[i]=0;
              }
        subject_id=options.subject_id
            // 视频列表
        wx.request({
            url: servername+'/HJF/user2/get_subject_info.do?subject_id=' + options.subject_id,
            method: 'GET',
            data: {page:1},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                  subject:res.data.data,
                  arr:arr
                })
            }
        })
         // 评论列表
        wx.request({
            url: servername+'/HJF/user2/get_subject_comment_list.do?subject_id=' + subject_id,
            method: 'GET',
            data: {page:1},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                 console.log(res)
                that.setData({
                  comment_list:res.data.data.comment_list
                })
                comment_list=that.data.comment_list
                is_all=res.data.data.is_all
            }
        })
    },
     //滑到底部监听事件
  onReachBottom: function(e) {
    var that = this;
    if(is_all==0){
       if (number < 20 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
              url: servername+'/HJF/get_subject_comment_list.do?user_id=' + user_id + '&subject_id=' + subject_id,
              method: 'GET',
                data: {
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
    }
  },
  commentzan:function(e){
      var that = this;
        comment_is_laud=e.currentTarget.dataset.laud;
        comment_id=e.currentTarget.id;
        idx=e.currentTarget.dataset.index;
        if(comment_is_laud==1){
              wx.request({
                    url: servername+'/user2/laud_subject_comment.do?user_id=' + user_id + '&comment_id=' + comment_id,
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
                    url: servername+'/user2/add_subject_comment.do?user_id=' + user_id + '&comment_id=' + comment_id,
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
  tapwrite:function(e){
      var that = this;
      console.log(e)
      that.setData({
        textvalue:1,
        focus:1,
        })
  },
  keybord:function(e){
       var that = this;
     that.setData({
        textvalue:0,
        focus:0,
        }) 
  },
  bindKeyInput: function(e) {
   this.setData({
      inputValue: e.detail.value
    })
    textvalue=this.data.inputValue
    console.log(this.data.inputValue)
  },
  formSubmit:function(e){
      console.log(e)
       var that = this;
      that.setData({
      inputValue: e.detail.value.input
    })
    textvalue=that.data.inputValue
    console.log(that.data.inputValue)
     
       if(textvalue==''){
          that.setData({
            modalHidden2: false
        })
      }else{
       wx.request({
            url: servername+'/HJF/user/add_video_comment.do?user_id=' + user_id + '&video_id=' + video_id+'&comment_content='+textvalue,
            method: 'GET',
            data: {},
         header: {
                 'Accept': 'application/json'
             },
             success: function(res) {
                 that.setData({
                     textvalue:0,
                      focus:0,
                 })
                    // 评论列表
                    wx.request({
                        url: servername+'/HJF/user/get_video_comment_list.do?user_id=' + user_id + '&video_id=' + video_id,
                        method: 'GET',
                        data: {page:1},
                        header: {
                            'Accept': 'application/json'
                        },
                        success: function(res) {
                            console.log(res)
                            that.setData({
                                comment_list: res.data.data.comment_list,
                                video_comment_num:res.data.data.comment_list.length
                            })
                            comment_list=that.data.comment_list
                            
                        }
                    })
             }
         })
       }
  },
   modalChange2: function(e) {
    this.setData({
      modalHidden2: true
    })
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