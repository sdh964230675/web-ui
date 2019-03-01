//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    loadingMoreHidden:true,
    headModel:{
      addMoney:4580,  //昨日充值金额
      sumMoney:11425, //昨日总营收金额
      payNum:60,      //交易笔数
      payManNum:40,   //支付人数
    },
    //积分模块
    integralModel:{
      grantIntegral:200,  //发放积分
      empIntegral:1500,   //员工积分
      memberIntegral:50,  //会员积分
    },
    //会员模块
    memberList:[
      {id:0,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:1,name:'JZM食物摄影',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:2,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:3,name:'JZM食物摄影',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:4,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:5,name:'JZM食物摄影',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:6,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:7,name:'JZM食物摄影',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:8,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
      {id:9,name:'JZM食物摄影',headImage:'../../images/ludan/kezifenxi/chengjiao.png',num:10,money:20000},
    ],
    //员工业绩模块
    empList:[
      {id:0,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',fansNum:1000,num:10,money:20000},
      {id:1,name:'JZM食物摄影',headImage:'../../images/ludan/kezifenxi/chengjiao.png',fansNum:1000,num:10,money:20000},
      {id:2,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',fansNum:1000,num:10,money:20000},
      {id:3,name:'JZM食物摄影',headImage:'../../images/ludan/kezifenxi/chengjiao.png',fansNum:1000,num:10,money:20000},
      {id:4,name:'UFO先生',headImage:'../../images/ludan/kezifenxi/chengjiao.png',fansNum:1000,num:10,money:20000},
    ],
    memberShow:true,    
    empShow:false,    
    memberBG:'#fff',
    empBG:'#eef4f9',
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
  //选择会员table
  selectMember(){
    this.setData({
      memberBG: "#fff",
      empBG:'#eef4f9',
      memberShow:true,
      empShow:false,
    })
    // let sumMoney = "headModel.sumMoney"
    // this.setData({
    //   [sumMoney]: 0
    // })
  },
  //选择员工table 
  selectEmp(){
    this.setData({
      memberBG: "#eef4f9",
      empBG:'#fff',
      memberShow:false,
      empShow:true,
    })
  },
})
