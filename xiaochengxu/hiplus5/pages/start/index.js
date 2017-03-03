var  app = getApp()
var user_id
Page({
    data: {
        indicatorDots: !1,
        autoplay: !1,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !1,
    },
    onLoad() {
        user_id = wx.getStorageSync('user_id') || []
    //console.log(user_id)
    //logs.unshift(Date.now())
   // wx.setStorageSync('logs', logs)
   //调用登录接口
    
    },
    onShow() {
        setTimeout(function(){
            if(user_id==''){
            wx.navigateTo({ url: '../registered/index' })
            }else{
            wx.switchTab({
                url: '../index/index'
                })
            }
        }, 3000)
    }
    
})
