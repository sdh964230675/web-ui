function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function http(url, params, callBack, type) {
  wx.request({
    url: url,
    method: type ? type : 'GET',
    data: params,
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      noData('请检查你的网络~')
    }
  })
}
//失败
function noData(res) {
  wx.showToast({
    icon: "none",
    title: res,
    duration: 1500,
    mask: true
  })
}

/**
 * 把日期转为秒 兼容iphone android手机
 * @param date
 * @returns {number}
 */
function getTime(date) {
  let time = 0;
  let curDate = new Date();
  if (!date) {
    time = curDate.getTime();
  } else {
    if (/-/.test(date)) {
      date = date.replace(/-/g, '/');
      time = new Date(date).getTime();
    }
  }
  return time;
}

function telFun(tel) {
  if (tel.length != 11) {
    return false
  } else if (!/^1[0-9]{10}$/.test(tel)) {
    return false
  } else if (!tel) {
    return false
  } else {
    return true
  }
}

function numScale(num, m) {
  var parts = num.toString().split('.');// 拆分整数、小数部分
  var integerLen = parts[0].length;// 原始值的整数位数
  var decimalLen = parts[1] ? parts[1].length : 0;// 原始值的小数位数
  if (m > 0) { // 放大，当放大的倍数比原来的小数位大时，需要在数字后面补零
    // 补多少个零：m - 原始值的小数位数
    var zeros = m - decimalLen;
    while (zeros > 0) {
      zeros -= 1;
      parts.push(0);
    }
    // 缩小，当缩小的倍数比原来的整数位大时，需要在数字前面补零
  } else {
    // 补多少个零：m - 原始值的整数位数
    var zeros = Math.abs(m) - integerLen;
    while (zeros > 0) {
      zeros -= 1;
      parts.unshift(0);
    }
  }

  // 小数点位置，也是整数的位数:
  //    放大：原始值的整数位数 + 放大的倍数
  //    缩小：原始值的整数位数 - 缩小的倍数
  var index = integerLen + m;
  // 将每一位都拆到数组里，方便插入小数点
  parts = parts.join('').split('');
  // 当为缩小时，因为可能会补零，所以使用原始值的整数位数
  // 计算出的小数点位置可能为负，这个负数应该正好是补零的
  // 个数，所以小数点位置应该为 0
  parts.splice(index > 0 ? index : 0, 0, '.');

  return parseFloat(parts.join(''));
}
	/**
	 * 获取小数位数
	 */
	function getExponent(num) {
		return Math.floor(num) === num ? 0 : num.toString().split('.')[1].length;
	}
	/**
	 * 两数相加
	 */
	function numAdd(num1, num2) {
		var num1= num1*1,num2=num2*1;
		var multiple = Math.max(this.getExponent(num1), this.getExponent(num2));
		return this.numScale(this.numScale(num1, multiple) + this.numScale(num2, multiple), multiple * -1);
	}

	/**
	 * 两数相乘
	 */
	function numCheng(num1, num2) {
		var num1= num1*1,num2=num2*1;
		var multiple1 = this.getExponent(num1)
		var multiple2 = this.getExponent(num2);
		return this.numScale(this.numScale(num1, multiple1) * this.numScale(num2, multiple2), this.numAdd(multiple1,multiple2) * -1);
	}

module.exports = {
  http: http,
  noData: noData,
  telFun: telFun,
  getTime: getTime,
  formatTime: formatTime,
  numScale: numScale,
  getExponent: getExponent,
  numAdd: numAdd,
  numCheng: numCheng,
}
