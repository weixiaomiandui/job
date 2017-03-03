
var app = getApp()
var servername ='https://www.hiplus5.com';
//var servername ='http://192.168.199.114:8080';
var inputValue;
var inputValue1;
var time;
Page({
  data: {
       modalHidden: true,
       startMessage:0
    },
  //加载
  onLoad: function(options) {
  },
  bindKeyInput: function(e) {
      inputValue= e.detail.value
      console.log(e.detail.value)
  },
  bindKeyInput1: function(e) {
      inputValue1= e.detail.value
  },
  testPhone:function(){
    var that=this;
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(inputValue))){ 
        this.setData({
        modalHidden: false,
        message:'请输入正确的手机号'
      })  
        return false; 
    } else{
      time=60;
      var timer=setInterval(function  () {
			time--;
			 that.setData({
           startMessage:1,
           time: time
        })
			if (time==0) {
				clearInterval(timer);
			  that.setData({
           startMessage:0
        })
			}
		},1000)
    }
  },
  testMessage:function(){
   wx.switchTab({
            url: '/pages/index/index'
        })
    console.log(inputValue1)
    if(inputValue!=''){
        if(inputValue==1){
           
        }
    }
  },
  modalChange2: function(e) {
    this.setData({
      modalHidden: true
    })
  },
})

