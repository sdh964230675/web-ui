//app.js
var comHost = 'https://ludanmall.cn/v1/helper'; //'https://ludanmall.cn/'
var util = require('./utils/util.js');
var extConfig={
  "extEnable": true,
  "extAppid": "wx4eb4396d4f56b6fc",
  "appId":"wx4eb4396d4f56b6fc",
  "shopId":2,
  "merchantId": 2,
  "mallName":'卤蛋助手'
}
App({
  onLaunch: function () {
    // let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
    wx.setStorageSync('merchantId', extConfig.merchantId);
    wx.setStorageSync('shopId', extConfig.shopId);
    wx.setStorageSync('appId', extConfig.appId);
    wx.setStorageSync('mallName', extConfig.mallName);
    console.log(extConfig);
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log(wx.getStorageSync('logs'));

    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) { 
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              wx.setStorageSync('n_headimgurl', avatarUrl);
              wx.setStorageSync('n_nickname', nickName);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }

          })
          // 登录
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log('https://ludanmall.cn/v1/weixin/mini/getOpenId/' + extConfig.merchantId);
              console.log(res.code);
              console.log(this.globalData.userInfo.nickName);
              console.log(this.globalData.userInfo.avatarUrl);
              wx.request({
                url: 'https://ludanmall.cn/v1/weixin/mini/getOpenId/' + extConfig.merchantId,
                data: {
                  code: res.code,
                  nickName: this.globalData.userInfo.nickName,
                  headImg: this.globalData.userInfo.avatarUrl
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  "Content-Type": ""
                },
                success: (res) => {
                  if(res.data.code==1 || res.data.code==1001){
                    console.log(res);
                  }else{
                    console.log(res);
                    let data = res.data.data;
                    debugger
                    wx.setStorageSync('n_openid', data.unionid);
                    wx.setStorageSync('old_openid', data.openid);
                    this.loginFn()
                  }
                  
                },
                fail: function (error) {
                  // failz
                  console.log(error)
                }
              })
            }
          })
        }else{
          console.log("未授权")
          wx.reLaunch({
            url: "/pages/authorize/index"
            // url: '/pages/auth/auth',
          })
        }
      }
    })

    //接口
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
  //登陆后延迟1秒到授权界面
  goLoginPageTimeOut: function () {
    debugger
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/authorize/index"
        // url: "/pages/auth/auth"
      })
    }, 1000)
  },
  globalData: {
    userInfo: null,
    // subDomain: "tz",
    subDomain: "sdh964230675", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
    version: "4.0.0",
    shareProfile: '百款精品商品，总有一款适合您', // 首页转发的时候话术

    /** 
     * 卤蛋地址
     */
    marketHost: comHost, // 新的微营销 20170215 http://116.62.102.111:8090/
    href: comHost, //http://ludanmall.com/
    host: comHost + 'v1', //201702 商家后台（微页面、商品、团购、作品、优惠券） 'http://101.37.31.113:8031/v1'
    WXhost: "http://ld.ludanmall.com/", //微信第三方 王赟的
    WXhost1: comHost + 'v1', //微信第三方 梁光荣的 "http://116.62.102.111:8034/v1"
    orderHost: comHost + 'v1', //201702 订单host 'http://101.37.31.113:8033/v1'
    PAYHost: comHost + 'v1', //支付API 201702 'http://101.37.31.113:8035/v1'
    customerSystemHost: 'https://kf.ludanmall.com',
    qiniu: {
      URL: '/qiniu/simpUploadToken',
      resource: {
        domain: 'http://odzj1lacf.bkt.clouddn.com/'
      },
      ldmall: {
        name: 'ldmall',
        domain: 'https://qiniu.ludanmall.com/'
      },
      customersystem: {
        name: 'customersystem',
        domain: 'http://or48ys1ta.bkt.clouddn.com/'
      }
    }
  }
  /*
  根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒；
  1、/pages/to-pay-order/index.js 中已添加关闭订单、商家发货后提醒消费者；
  2、/pages/order-details/index.js 中已添加用户确认收货后提供用户参与评价；评价后提醒消费者好评奖励积分已到账；
  3、请自行修改上面几处的模板消息ID，参数为您自己的变量设置即可。  
   */
})