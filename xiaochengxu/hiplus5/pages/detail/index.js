
var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var collected=0;
var video_id;
var video_collect_num=0;
var video;
var user_id;
var startPlay=0;
Page({
    data: {
      modalHidden: true,
      loadingHidden: false  // loading
    },
    onLoad: function(options) {
        user_id = wx.getStorageSync('user_id') || []
        var that = this
        that.setData({
             startPlay: 0,
             video_id:options.id
        })
        this.setData({
        video_id: app.globalData.video_id
        })
        video_id=options.id
        // 视频详情
        wx.request({
            url: servername+'/HJF/user/get_video_info.do?video_id=' + options.id,
            method: 'GET',
            data: {user_id:user_id},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              //  console.log(res)
                that.setData({
                   collected:res.data.data.video_is_collected,
                   video_collect_num:res.data.data.video_collect_num
                })
                collected=that.data.collected;
                video_collect_num=that.data.video_collect_num;
                that.setData({
                    video: res.data.data
                })
               video=that.data.video
               setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 500)
            },
            complete: function(res){
                //console.log(res)
                video_id=res.data.data.video_id
            }
        })
    },
    onShow: function(){
        var that = this
       wx.request({
            url: servername+'/HJF/user/get_video_info.do?video_id=' + video_id,
            method: 'GET',
            data: {user_id:user_id},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                //console.log(res)
                that.setData({
                   collected:res.data.data.video_is_collected,
                   video_collect_num:res.data.data.video_collect_num
                })
                collected=that.data.collected;
                video_collect_num=that.data.video_collect_num;
                that.setData({
                    video: res.data.data
                })
               video=that.data.video
            },
            complete: function(res){
                //console.log(res)
                video_id=res.data.data.video_id
            }
        })
    },
    navigateTo:function(e){
        this.videoContext = wx.createVideoContext('myVideo')
        if(this.videoContext.play){
           this.videoContext.pause()
        }
        wx.navigateTo({ url: '../comment/index?video_id='+video.video_id+'&video_title='+video.video_title+'&video_img_url='+video.video_img_url+'&video_comment_num='+video.video_comment_num })
    },
    collected:function(event){
         console.log(video_id)
          var that = this
          //console.log(collected)
          if(collected==0){
              wx.request({
                    url: servername+'/HJF/user/collect_video.do?video_id=' + video_id,
                    method: 'GET',
                    data: {user_id:user_id,video_is_collected:1},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {
                    that.setData({
                            collected:1,
                            video_collect_num:Number(video_collect_num)+1
                            })
                    collected=that.data.collected
                    video_collect_num=that.data.video_collect_num
                    }
                })
          }else if(collected==1){
                 wx.request({
                    url: servername+'/HJF/user/cancel_collect_video.do?video_id=' + video_id,
                    method: 'GET',
                    data: {user_id:user_id,video_is_collected:0},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {
                        that.setData({
                            collected:0,
                            video_collect_num:Number(video_collect_num)-1
                            })
                        collected=that.data.collected
                        video_collect_num=that.data.video_collect_num
                    }
                })
          }
         
    },
    videoPlay:function(e){
        this.videoContext = wx.createVideoContext('myVideo');
        var that = this;
        that.setData({
             startPlay: 1
        })
        that.videoContext.play()
    },
    modalChange: function(e) {
    this.setData({
      modalHidden: true
    })
  },
  modalTap: function(e) {
    this.setData({
      modalHidden: false
    })
  },
  onShareAppMessage: function () {
      console.log(video.video_id)
    return {
      title: video.video_title,
      desc: video.video_summary,
      path: '/pages/share/index?video_id='+video.video_id
    }
  }
})