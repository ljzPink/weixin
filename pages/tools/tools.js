// pages/tools/tools.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    contentTbas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let contentTbas = [];
    for (var i = 0; i < 30; i++) {
      var item = {
        "iconSrc": "https://www.zhonggg.com/staticFile//xiaochengxu/img/icon/shouye.png",
        "text": "模块" + i
      };
      contentTbas.push(item)
    }
    this.setData({
      contentTbas: contentTbas
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})