//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    loadingMoreHidden:true,
    headModel:{
      newCustomerNum:2500,  //新顾客数
      customerCount:2800,   //消费顾客总数
    },
    totalModel:{
      title:'顾客数量趋势统计',
      img:'../../images/ludan/total.png',
      list:[
        {id:0,title:'2018年8月新顾客数2100，顾客总数',customerCount:2600},
        {id:1,title:'2018年8月新顾客数2100，顾客总数',customerCount:2600},
        {id:2,title:'2018年8月新顾客数2100，顾客总数',customerCount:2600},
        {id:3,title:'2018年8月新顾客数2100，顾客总数',customerCount:2600},
        {id:4,title:'2018年8月新顾客数2100，顾客总数',customerCount:2600},
        
      ]
    },
  },
  //生命周期回调—监听页面加载
  onLoad:function(){
    
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
      title:'卤蛋助手——' + app.globalData.shareProfile,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        if(res.errMsg=="shareAppMessage:ok"){
          wx.showToast({
              title: '成功',
              icon: 'succes',
              duration: 2000,
              mask:true
          })
        }
      },
      fail: function (res) {
        // 转发失败
        wx.showModal({
          title: '提示',
          content: '转发失败',
          showCancel:false,
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
      curPage: this.data.curPage+1,
      loadingMoreHidden:false,
    });
    // this.getGoodsList(this.data.activeCategoryId, true)
  },
  //监听用户下拉动作
  onPullDownRefresh: function(){
    //下拉就刷新数据
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    // this.getSurvey();
  },

})
