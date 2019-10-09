// pages/sboard/sboard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
      'msg':'二板详情'
    },
    br:"\n",
  },

  ding:function(e){
    var a = e.currentTarget.dataset.index;
    var val = wx.getStorageSync("ding");
    //判断是否已经在数组中 在则删除  否则加入
    if(val.match(a) > 0 ){
      val = val.replace(a," ");
    }else{
      val = val + ';' + a;
    }
    wx.setStorageSync("ding",val);

    console.log(wx.getStorageSync("ding"));
    
    wx.redirectTo({
      url: '../sboard/sboard',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN=' + token;
    wx.request({
      url: 'http://news.hmset.com/shares/wxSboard',
      data: {},
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        if (res.data.status == 0) {
          self.setData({
            data:res.data.data
          });
        }
      }
    })


    var ding = wx.getStorageSync("ding");
    this.setData({
      ding:ding
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