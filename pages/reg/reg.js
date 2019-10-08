// pages/reg/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      index: 0,
      msg: '注册',
      time: '2019-10-08'
    },
    code:338180,
    email:'',
    pwd:'',
    repwd:'',
    nickname:''
  },

  emailinput:function(e){
    var email = e.detail.value;
    this.setData({
      email:email
    });
  },
  pwdinput: function (e) {
    var pwd = e.detail.value;
    this.setData({
      pwd: pwd
    });
  },
  repwdinput: function (e) {
    var repwd = e.detail.value;
    this.setData({
      repwd: repwd
    });
  },
  nickinput: function (e) {
    var nick = e.detail.value;
    this.setData({
      nickname: nick
    });
  },

//注册事件
  reg:function(e){
    var email = this.data.email;
    var pwd = this.data.pwd;
    var repwd = this.data.repwd;
    var nickname = this.data.nickname;
    var code = this.data.code;


    console.log(email);
    console.log(pwd);
    console.log(nickname);
    console.log(repwd);

    if(email.length<6 || pwd.length<6 || nickname.length<1){
      wx.showToast({
        title: '请填写完整的信息',
        icon: 'none',
        duration: 2000
      })
    }
    if(pwd != repwd){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      })
    }
    wx.showLoading({
      title: '注册中...',
    });

    //发送url请求
    wx.request({
      url: 'http://news.hmset.com/shares/wxReg',
      data:{
        username:email,
        pwd:pwd,
        nickname:nickname,
        code:code
      },
      header: { 'content-type': 'application/json' },
      success:function(res){
        console.log(res.data);
        if (res.statusCode == 200) {
          if(res.data.status == 0){
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000
            })
            //跳转到 login/login
            wx.redirectTo({
              url: '../login/login'    //登录成功  跳转
            })
          }else if(res.data.status == -1){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
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