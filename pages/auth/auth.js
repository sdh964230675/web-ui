// pages/buys/buy.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    wx.reLaunch({
      url: '/pages/microPage/microPage',
    })
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          
          url: 'https://ludanmall.cn/v1/weixin/mini/getOpenId/' + extConfig.merchantId,
          data: {
            code: res.code,
            nickName: e.detail.userInfo.nickName,
            headImg: e.detail.userInfo.avatarUrl
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Content-Type": ""
          },
          success: (res) => {
            // console.log(res);
            let data = res.data.data;
            wx.setStorageSync('n_openid', data.unionid);
            wx.setStorageSync('old_openid', data.openid);
            this.loginFn()
          },
          fail: function (error) {
            // failz
            console.log(error)
          }
        })
      }
    })
  },
  loginFn() {
    let params = {};
    let url = this.globalData.host + '/user/login';
    params = {
      unionId: wx.getStorageSync('n_openid'),
      merchantId: wx.getStorageSync('merchantId')
    }
    util.http(url, params, (data) => {
      data = data.data;
      wx.setStorageSync('n_userid', data.id); // 用户id
      wx.setStorageSync('n_recommentUserId', data.recommentUserId) // 推荐人id
      wx.setStorageSync('n_headimgurl', data.headImg) // 用户头像
      wx.setStorageSync('n_nickname', data.nickName) // 用户昵称
      wx.setStorageSync('n_level', data.level) // 用户等级
      wx.setStorageSync('n_memberId', data.memberId) // 会员id
      wx.setStorageSync('n_memberLevel', data.memberLevel) // 会员等级
      wx.setStorageSync('n_discount', data.discount) // 会员等级
      wx.setStorageSync('n_empId', data.empId) // 用户上级员工id
      wx.setStorageSync('n_recommentUserNickName', data.recommentUserNickName) // 用户推荐人昵称
      wx.setStorageSync('n_twoCodePath', data.twoCodePath) // 用户的二维码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options, event) {
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
    globalData: {
    userInfo: null,
    href: "https://ludanmall.cn",
    host: "https://ludanmall.cn/v1"
  },
  data: {
    userInfo: null
  },
})