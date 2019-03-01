//login.js
//获取应用实例
var app = getApp();
Page({
  //页面的初始数据
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  //生命周期回调—监听页面加载
  onLoad:function(){
    var that = this
    wx.setNavigationBarTitle({
      //设置标题
      // title: wx.getStorageSync('mallName')
    })
  },
  //页面显示/切入前台时触发。
  onShow:function(){
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  //页面初次渲染完成时触发。
  onReady: function(){
    var that = this;
    setTimeout(function(){
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(that.data.angle !== angle){
        that.setData({
          angle: angle
        });
      }
    });
  }
});