// pages/poem/poem.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnData:[],
    searchVal:'',
    defaultSize:'defaultSize',
    view: 'list',
    contents:[]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://localhost/xiaochengxu/getPoemList',
      method: 'POST',
      data: { "pageNO": 1, pageSize: 30 },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        that.setData({
          returnData: res.data.data.data,
          view: 'list'
        })
      },
      fail: function (res) {
        console.log("失败");
      }

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

  },
  /**
   * 搜索时触发
   */
  query:function(e){
    console.log(e.detail.value);
  },
  /**
   * 根据id查询
   */
  getPoemById:function(e){
    let that = this;
    wx.request({
      url: 'http://localhost/xiaochengxu/getPoemById',
      method: 'POST',
      data: { 'id': 65},
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data.data.content);
        console.log(res.data.data.content.split("。"));
        that.setData({
          returnData: res.data.data,
          view: 'detail',
          contents: res.data.data.content.split("。")
        })
      },
      fail: function (res) {
        console.log("失败");
      }

    })
  },
  query:function(e){
    
  }
})