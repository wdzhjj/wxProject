// pages/policy/policy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync("SHARES_TOKEN"),
    item:{
      title:'策略商城'
    },
    test:{
      'haha':'hehe',
      'test1':'001',
      'test2':'002',
      'test3':'003'
    },
    todaydata:{},
    olddata:{},
    newdata:{},
    showpolicy1:true,
    showpolicy2: false,
    showpolicy3: false,
  },

  //导航栏切换1
  roll1:function(e){
    this.setData({
      roll:1,
      showpolicy1: true,
      showpolicy2: false,
      showpolicy3: false
    })
  },

  //导航栏切换2
  roll2: function (e) {
    this.setData({
      roll: 2,
      showpolicy1: false,
      showpolicy2: true,
      showpolicy3: false,
    })
  },

  //导航栏切换3
  roll3: function (e) {
    this.setData({
      roll: 3,
      showpolicy1: false,
      showpolicy2: false,
      showpolicy3: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN='+token;
    console.log(token);
      wx.request({
        url: 'http://news.hmset.com/shares/wxPolicy',
        data:{},
        header: { 
          'content-type': 'application/json' ,
          'Cookie':token
          },
        method:'GET',
        success:function(res){
          console.log(res);
          if(res.data.status == 0){
            self.setData({
              todaydata: res.data.todaydata,
              newdata: res.data.newdata,
              olddata: res.data.olddata
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