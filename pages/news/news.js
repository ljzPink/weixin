// pages/news/news.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnData: [],
    searchVal: '',
    defaultSize: 'defaultSize',
    view: 'list',
    contents: [],
    pageNo: 0,
    pageSize: 25,
    pages: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lower();
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

  },
  lower() {
    let that = this;
    if (that.data.pageNo == that.data.pages) {
      wx.showToast({
        title: '没有更多了',
      })
      return;
    }
    console.log();
    var para = {
      'pageNo': that.data.pageNo + 1,
      'pageSize': that.data.pageSize
    }

    util.sendAjax("xiaochengxu/getNews", "POST", para).then((data) => {
      console.log(data.data.data);
      that.setData({
        returnData: that.data.returnData.concat(data.data.data.data),
        view: 'list',
        pageNo: data.data.data.pageNo,
        pageSize: data.data.data.pageSize,
        pages: data.data.data.pages

      })
    })
  } ,

  goBaidu: function (e) {
    app.globalData.outurl = e.target.id;
    console.log(e.target.id);
    console.log(app.globalData.outurl);
    wx.navigateTo({
      url: '../out/out', //
      success: function () {

      },       //成功后的回调；
      fail: function () { },         //失败后的回调；
      complete: function () { }      //结束后的回调(成功，失败都会执行)
    })
  }
})