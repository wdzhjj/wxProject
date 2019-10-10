// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    showModalStatus1:false,
    type: [
      { name: '0', value: '模拟跟投' },
      { name: '1', value: '手动跟投' },
      { name: '2', value: '自动跟投', checked: 'true' },
      { name: '3', value: '暂停跟投' },
    ],
    rate:[
      { name: '0', value: '原价' },
      { name: '1', value: '±1%' },
      { name: '2', value: '涨跌停' },
    ]
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  powerDrawer1:function(e){
    var currentStatu = e.currentTarget.dataset.statu;
    //关闭
    if(currentStatu == 'close'){
      this.setData(
        {
          showModalStatus1: false
        }
      );
    }
    // 显示 
    if (currentStatu == "open") {
      console.log('open');
      this.setData(
        {
          showModalStatus1: true
        }
      );
    }
  },

  util: function (currentStatu) {
    //关闭 
    if (currentStatu == "close") {
      console.log('close');
      this.setData(
        {
          showModalStatus: false
        }
      );
    }

    // 显示 
    if (currentStatu == "open") {
      console.log('open');
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },



  radioChange1:function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      posttype:e.detail.value
    })
  },


  radioChange2: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      postrate: e.detail.value
    })
  },


  //绑定选择的值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  

  formSubmit:function(e){
    var self = this;
    var company = e.detail.value.company;
    var account = e.detail.value.account;
    var acc_pwd = e.detail.value.acc_psd;
    if (!company|| !account || !acc_pwd ){
      wx.showToast({
        title: '信息不全，无法提交',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN=' + token;
    wx.request({
      url: 'http://news.hmset.com/shares/wxUpdateuser',
      data:{
        company:company,
        account:account,
        acc_pwd:acc_pwd
      },
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
            wx.showToast({
              title: '更新成功',
              icon: 'none',
              duration: 2000
            })

          wx.redirectTo({
            url: '../detail/detail?id='+self.data.id,
          })
      }

    })
  },

  moneyinput:function(e){
      var money = e.detail.value;
      this.setData({
       money:money 
      })
  },

  //设置跟投策略 提交数据
  formSubmit1:function(e){
    var self = this;
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN=' + token;
    var id = self.data.id;
    var type = self.data.posttype;
    var rate = self.data.postrate;
    var money = self.data.money;
    console.log('id',id);
    console.log('type',type);
    console.log('rate',rate);
    console.log('money:',money);
    if(!id || !type || !rate || !money){
      wx.showToast({
        title: '信息不全，无法提交',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: 'http://news.hmset.com/shares/ChooseTeacher',
      data:{
        t_id:id,
        money:money,
        rate:rate,
        type:type
      },
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if(res.data.status!=0){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return;
        }
        wx.showToast({
          title: '更新成功',
          icon: 'none',
          duration: 2000
        })
        wx.redirectTo({
          url: '../detail/detail?id=' + self.data.id,
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id:id
    });
    console.log(id);
    var self = this;
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN=' + token;
    wx.request({
      url: 'http://news.hmset.com/shares/wxDetail',
      data: {
        id:id
      },
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        if (res.data.status == 0) {
          console.log(res.data)
          self.setData({
            data: res.data.data,
            teacher:res.data.gold_teacher,
            my:res.data.my,
            stock:res.data.stock
          })
        }
      }
    })

    wx.request({
      url: 'http://news.hmset.com/shares/wxDetailClist',
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        self.setData({
          company_list:res.data
         })
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