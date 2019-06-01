const files = require('../../utils/files.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageWidth:0,
    pageHeight:0,
    selectIndex: 0,
    list: files.fileList,
    article:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let width = wx.getSystemInfoSync().windowWidth;
    let height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      pageWidth:width,
      pageHeight:height
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


  selectGroup: function(e) {
    this.setData({"selectIndex": e.currentTarget.id});
  },

  selectArticle: function(e) {
    this.setData({
      "article": e.currentTarget.id
    });
    files.selectFile = files[e.currentTarget.id];
    wx.navigateTo({
      url: '/pages/article/article'
    })    
  }
})