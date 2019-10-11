// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
      title:'账户详情'
    },
    showModalStatus: false,
    money:[
      100,500,1000,5000,50000
    ],
    way:[
      '支付宝', '微信','银行卡'
    ],
    type: [
      { name: '0', value: '模拟跟投' },
      { name: '1', value: '手动跟投' },
      { name: '2', value: '自动跟投' },    //, checked: 'true' 
      { name: '3', value: '暂停跟投' },
    ],
    rate: [
      { name: '0', value: '原价' },
      { name: '1', value: '±1%' },
      { name: '2', value: '涨跌停' },
    ]
  },

  //绑定选择的值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //充值金额改变
  radioChange1:function(e) {
    this.setData({
      postmoney: e.detail.value
    })
  },

  //付款方式
  radioChange2: function (e) {
    this.setData({
      posttype: e.detail.value
    })
  },


  //提交数据到后台
  formSubmit1:function (e){
    var self = this;
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN=' + token;
    var type = this.data.posttype;
    var money = this.data.postmoney;
    if(!type || !money){
      wx.showToast({
        title: '信息不全，无法提交',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    wx.request({
      url: 'http://news.hmset.com/shares/wxAddMoney',
      data: {
        money:money,
        type:type
      },
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if(res.data.status == 0){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          wx.redirectTo({
            url: '../my/my',
          })
        }
      }
    })
  },


  //绑定数据到后台
  formSubmit: function (e) {
    var self = this;
    var company = e.detail.value.company;
    var account = e.detail.value.account;
    var acc_pwd = e.detail.value.acc_psd;
    if (!company || !account || !acc_pwd) {
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
      data: {
        company: company,
        account: account,
        acc_pwd: acc_pwd
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
          url: '../my/my',
        })
      }

    })
  },


  //设置跟投策略 提交数据
  formSubmit2: function (e) {
    var self = this;
    var token = wx.getStorageSync("SHARES_TOKEN");
    token = 'SHARES_TOKEN=' + token;
    var id = self.data.settid;
    var type = self.data.settype;
    var rate = self.data.setrate;
    var money = self.data.setmoney;
    console.log('id', id);
    console.log('type', type);
    console.log('rate', rate);
    console.log('money:', money);
    if (!id || !type || !rate || !money) {
      wx.showToast({
        title: '信息不全，无法提交',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: 'http://news.hmset.com/shares/ChooseTeacher',
      data: {
        t_id: id,
        money: money,
        rate: rate,
        type: type
      },
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.status != 0) {
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
          url: '../my/my',
        })
      }

    })
  },

//展示隐藏支付弹窗
  powerDrawer:function(e){
    var currentStatu = e.currentTarget.dataset.statu;
    //关闭
    if(currentStatu == 'close'){
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


  //展示隐藏修改账户弹窗
  powerDrawer1: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    //关闭
    if (currentStatu == 'close') {
      console.log('close');
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



  //展示隐藏修改策略弹窗
  powerDrawer2: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var tid = e.target.id;
    var money = e.currentTarget.dataset.money;
    var type = e.currentTarget.dataset.type;
    var rate = e.currentTarget.dataset.rate;
    this.setData({
      settid: tid,
      settype:type,
      setrate:rate,
      setmoney:money
    })
    //关闭
    if (currentStatu == 'close') {
      console.log('close');
      this.setData(
        {
          showModalStatus2: false
        }
      );
    }
    // 显示 
    if (currentStatu == "open") {
      console.log('open');
      this.setData(
        {
          showModalStatus2: true
        }
      );
    }
  },

  logout:function(e){
    //注销token 退出登录
    wx.setStorageSync("SHARES_TOKEN",'');
    wx.redirectTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var token = wx.getStorageSync("SHARES_TOKEN");
    if(token.length<1){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    token = 'SHARES_TOKEN=' + token;
    wx.request({
      url: 'http://news.hmset.com/shares/wxMy',
      data: {},
      header: {
        'content-type': 'application/json',
        'Cookie': token
      },
      method: 'GET',
      success: function (res) {
        if (res.data.status == 0) {
          self.setData({
            userinfo: res.data.userinfo,
            teacher: res.data.gold_teacher,
            data:res.data.data,
            info:res.data.info
          })
          console.log(res.data)
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
          company_list: res.data
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