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
 
  
})
