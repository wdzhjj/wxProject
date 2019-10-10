// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'12345678901',
    pwd:'123456'
  },

  usernameinput: function (e) {
    var username = e.detail.value
    this.setData({
      username: username
    });
  },

  pwdinput: function (e) {
    var pwd = e.detail.value
    this.setData({
      pwd: pwd
    });
  },


  submit:function(e){
    wx.showLoading({
      title: '登录中...',
    });
    var username = this.data.username;
    var pwd = this.data.pwd;
    console.log(username);
    console.log(pwd);
    if(username.length<1 || pwd.length<1){
      wx.showToast({
        title: '用户名密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.setData({ disabled: true });
    wx.request({
      url: 'http://news.hmset.com/shares/wxLogin',
      data:{
        username: username,
        password: pwd
      },
      header:{ 'content-type':'application/json'},
      success:function(res){
        console.log(res.data)
        if(res.statusCode == 200){
          if(res.data.status == -1){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }else if(res.data.status == 0){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
            //setcookie
            wx.setStorageSync("SHARES_TOKEN", res.data.token)
            //跳转
            wx.redirectTo({
              url: '../policy/policy'    //登录成功  跳转
            })

          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '发送请求失败',
            icon: 'none',
            duration: 2000
          })
        }
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