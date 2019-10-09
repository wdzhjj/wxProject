// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
      title:'委托查询'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN=' + token;
    wx.request({
      url: 'http://news.hmset.com/shares/wxSelect',
      data: {},
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data.stock)
          self.setData({
            stock: res.data.stock
          })
        }
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

  }
})