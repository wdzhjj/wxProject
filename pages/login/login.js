// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    pwd:''
  },

  usernameinput: function (e) {
    username = e.detail.value
    this.setData({
      username: e.detail.value
    })
    console.log(username)

  },

  pwdinput: function (e) {
    pwd = e.detail.value
    this.setData({
      pwd: e.detail.value
    })
    console.log(pwd)
  },


  formSubmit:function(e){
    wx.showLoading({
      title: '登录中...',
    })
    this.setData({ disabled: true });
    wx.request({
      url: 'http://news.hmset.com/shares/wxLogin',
      data:{
        username:'heiheihei',
        password:'hahaha'
      },
      header:{ 'content-type':'application/json'},
      success:function(res){
        console.log(res)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

function login(){
  alert(1);
}