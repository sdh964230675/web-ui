//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    autoplay: true,   //自动播放
    interval: 3000,   //间隔时间
    duration: 2000,   //期间
    circular:true,
    loadingMoreHidden:true,
    //头部模块
    head:{
      text1:'今日成交10笔，待付款20笔，成交金额',
      text2:'1,425.00'
    },
    //数据显示模块
    dataModel:{
      visitNum:20,
      newAddNum:15,
      addFansNum:50
    },
    //平台公告模块
    noticeModel:[
      {id:0,text:'中秋节与国庆节期间商户提现业务暂停处理及...',date:'09月25日'},
      {id:1,text:'中秋节与国庆节期间商户提现业务暂停处理及...',date:'09月25日'},
      {id:2,text:'新功能上线',date:'08月20日'},
    ],
    //最新公告模块
    newList:[
      {id:0,picUrl:'../../images/ludan/test1.jpg'},
      {id:1,picUrl:'../../images/ludan/test2.jpg'},
    ],
    scrollTop:0,
  },
  //生命周期回调—监听页面加载
  onLoad:function(){
    this.getSurvey();
  },
  //页面滚动事件
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      [scrollTop]: e.scrollTop
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
    this.getSurvey();
  },
  //获取经营概况数据
  getSurvey(){
    let _this=this;
    var merId=wx.getStorageSync('merchantId');
    let url=app.globalData.href+'/survey/?merId='+merId;
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log('经营概况--');
        console.log(res.data)
      },
      fail: function() {
        // fail
        // wx.showModal({
        //   title: '提示',
        //   content: '失败',
        //   showCancel:false,
        //   success: function (res) {
        //     console.log(res.errMsg);
        //   }
        // })
      },
      complete: function() {
        // complete
        
      }
    })
  },
  //平台公告跳转
  noticeNextTo(event){
    var id=event.currentTarget.dataset.id;
    var text=event.currentTarget.dataset.text;
    var date=event.currentTarget.dataset.date;
    console.log('公告信息',id,text,date);
    wx.navigateTo({
      // url: "/pages/authorize/index"
    })
  },
  //最新动态跳转
  tapBanner(e){
    var id=e.currentTarget.dataset.id;
    console.log('最新动态ID',id);
    wx.navigateTo({
      // url: "/pages/authorize/index"
    })
  }
})
