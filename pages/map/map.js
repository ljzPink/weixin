// pages/map/map.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 121.38206,
    latitude: 31.11325,
    windowHeight: app.globalData.windowHeight,
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let that = this;
    wx.getLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers:[{
            latitude: res.latitude,     
            longitude: res.longitude, 
            iconPath: app.globalData.userInfo.avatarUrl,
            width: 128,
            height: 128
            
          }]
        })
      },
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