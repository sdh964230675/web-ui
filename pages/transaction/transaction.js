//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "day",
    reportHidden: '',
    loadingMoreHidden: true,
    //日报
    dateList:[
      {
        id:0,
        date:'9月28日',
        memberPay:6500,     //会员充值
        countMoney:11425,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
      {
        id:1,
        date:'9月27日',
        memberPay:6500,     //会员充值
        countMoney:11425,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
      {
        id:2,
        date:'9月26日',
        memberPay:6500,     //会员充值
        countMoney:11425,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
      {
        id:3,
        date:'9月25日',
        memberPay:6500,     //会员充值
        countMoney:11425,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
    ],
    //月报
    monthList:[
      {
        id:0,
        date:'2018年8月',
        memberPay:6500,     //会员充值
        countMoney:11425,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
      {
        id:1,
        date:'2018年7月',
        memberPay:6500,     //会员充值
        countMoney:15000,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
      {
        id:2,
        date:'2018年6月',
        memberPay:6500,     //会员充值
        countMoney:11425,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
      {
        id:3,
        date:'2018年5月',
        memberPay:6500,     //会员充值
        countMoney:11425,   //总营收
        payNum:60,          //交易笔数
        payPeopleNum:40     //支付人数
      },
    ],
  },
  //生命周期回调—监听页面加载
  onLoad: function () {

  },
  //页面滚动事件
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  //分享转发
  onShareAppMessage: function () {
    return {
      title: '卤蛋助手——' + app.globalData.shareProfile,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        if (res.errMsg == "shareAppMessage:ok") {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: function (res) {
        // 转发失败
        wx.showModal({
          title: '提示',
          content: '转发失败',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log(res.errMsg);
            }
          }
        })
      }
    }
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log('上拉至底部...');
    this.setData({
      curPage: this.data.curPage + 1,
      loadingMoreHidden: false,
    });
    // this.getGoodsList(this.data.activeCategoryId, true)
  },
  //监听用户下拉动作
  onPullDownRefresh: function () {
    //下拉就刷新数据
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    // this.getSurvey();
  },
  /**
   * 顶部样式切换
   */
  reportChoose: function (msg) {
    let data = msg.currentTarget.dataset
    this.setData({
      type: data.type,
      reportHidden: data.reporthidden
    })
  }
})