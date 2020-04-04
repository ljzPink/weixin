// pages/poem/poem.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnData:[],
    searchVal:'',
    defaultSize:'defaultSize',
    view: 'list',
    contents:[],
    pageNo:0,
    pageSize: 25,
    pages:1

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
    lower();
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
    util.sendAjax("xiaochengxu/getPoemById", "POST", { 'id': e.target.id }).then((data)=>{
      that.setData({
        returnData: data.data.data,
        view: 'detail',
        contents: data.data.data.content.split("。")
      })
    })
    
  },
  query:function(e){
    
  },
  returnList:function(){
    this.data.returnData = [];
    this.onLoad();
  },
  lower(){
    let that = this;
    if(that.data.pageNo == that.data.pages){
      wx.showToast({
        title: '没有更多了',
      })
      return;
    }
    console.log();
    var para = {
      'pageNo': that.data.pageNo+1,
      'pageSize': that.data.pageSize
    }

    util.sendAjax("xiaochengxu/getPoemList", "POST", para).then((data) => {
      that.setData({
        returnData: that.data.returnData.concat(data.data.data.data),
        view: 'list',
        pageNo: data.data.data.pageNo,
        pageSize: data.data.data.pageSize,
        pages: data.data.data.pages
        
      })
    })
  }
})