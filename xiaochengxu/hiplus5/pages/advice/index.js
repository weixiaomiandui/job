//logs.js
var app = getApp()
/*var servername ='http://www.hiplus5.com';*/
var servername ='http://192.168.199.114:8080';
Page({
  data: {
      modalHidden2: true,
      showlog:true
  },
  onLoad: function () {
    
  },
  bindFormSubmit:function(e){
    if(e.detail.value.textarea==''){
      this.setData({
      modalHidden2: false
    })
    }else{
      console.log(e.detail.value.textarea)
       this.setData({
      showlog: false
    })
    }    
  },
  modalChange2: function(e) {
    this.setData({
      modalHidden2: true
    })
  }
})
