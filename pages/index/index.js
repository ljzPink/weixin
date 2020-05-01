//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    windowHeight: app.globalData.windowHeight,
    contentTbas:[]
  },
  //事件处理函数
  
  
  onLoad: function () {
    let contentTbas = [];
    for (var i = 0; i < 30; i++) {
      var item = {
        "iconSrc":"https://www.zhonggg.com/staticFile//xiaochengxu/img/icon/shouye.png",
        "text":"模块"+i
      };
      contentTbas.push(item)
    }
    this.setData({
      contentTbas: contentTbas
    })
  },

  intopart:function(e){
    var json = {
      pageInfo: e.currentTarget.id,
      pageTitle:""
    }
    wx.navigateTo({
      url: '../part/part?pageInfo = ' + e.currentTarget.id,//
      success: function () {

      },       //成功后的回调；
      fail: function () { },         //失败后的回调；
      complete: function () { }      //结束后的回调(成功，失败都会执行)
    })
  }
 
  
})
