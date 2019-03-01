//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    loadingMoreHidden: true,
    headModel: {
      yesdayMoney: 9425,    //昨日创客交易额
      settlementMoney: 60,  //待结算
      todayMoney: 40,       //今日提现
    },
    //提现记录
    withdList: [{
        id: 0,
        date: '2018-10-10',
        widthdMoney:5000,       //申请提现金额
        proceduresMoney: 30,    //提现手续费
        status: '处理中',
      },
      {
        id: 1,
        date: '2018-10-10',
        widthdMoney:5000,       //申请提现金额
        proceduresMoney: 30,    //提现手续费
        status: '处理中',
      },
      {
        id: 2,
        date: '2018-10-10',
        widthdMoney:5000,       //申请提现金额
        proceduresMoney: 30,    //提现手续费
        status: '处理中',
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
})