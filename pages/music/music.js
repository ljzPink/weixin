// pages/music/music.js
const util = require('../../utils/util.js')
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext();
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
    pages: 1,
    windowHeight: app.globalData.windowHeight,
    pauseIcon: "https://www.zhonggg.com/staticFile//xiaochengxu/img/icon/pause.png",
    startIcon: "https://www.zhonggg.com/staticFile//xiaochengxu/img/icon/start.png",
    onloadIndex: -1,
    onloadFlag: false,
    bkimg1: "https://www.zhonggg.com/staticFile//xiaochengxu/img/tree.jpg",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    innerAudioContext.loop = true;
    var para = {
      'pageNo': 1,
      'pageSize': 30
    }
    let that = this;
    util.sendAjax("xiaochengxu/getSongs", "POST", para).then((data) => {
      console.log(data)
      app.setData
      that.setData({
        returnData: that.data.returnData.concat(data.data.data.data),
        view: 'list',
        pageNo: data.data.data.pageNo,
        pageSize: data.data.data.pageSize,
        pages: data.data.data.pages
       

      })
    })
    //this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    innerAudioContext.destroy();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  startOrStop: function(e) {
    let that = this;
    if (that.data.returnData[that.data.onloadIndex] != null && that.data.returnData[that.data.onloadIndex].url == that.data.returnData[e.currentTarget.id].url) {
      if (that.data.onloadFlag) {
        that.data.returnData[e.currentTarget.id].isPlay = false;
        innerAudioContext.pause();
        that.setData({
          onloadFlag: false,
          returnData: that.data.returnData
        });
        console.log("暂停播放")
      } else {
        innerAudioContext.play();
        that.data.returnData[e.currentTarget.id].isPlay = true;
        that.setData({
          onloadFlag: true,
          returnData: that.data.returnData
        });
        console.log("继续播放")
      }
    } else {
      if (that.data.returnData[that.data.onloadIndex] != null) {
        // close last
        that.data.returnData[that.data.onloadIndex].isPlay = false;
      }
      innerAudioContext.src = that.data.returnData[e.currentTarget.id].url;
      console.log("duration" + innerAudioContext.duration);
      innerAudioContext.play();
      that.data.returnData[e.currentTarget.id].isPlay = true;
      console.log("开始播放");
      that.setData({
        onloadUrl: that.data.returnData[e.currentTarget.id].url,
        onloadFlag: true,
        returnData: that.data.returnData,
        onloadIndex: e.currentTarget.id
      });

    }

  }
})