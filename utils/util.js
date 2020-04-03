const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const sendAjax = (url, type, para)=>{
  return new Promise((resolve, reject) => {
    var baseUrl = "http://zhonggg.com/";
    wx.request({
      url: baseUrl + url,
      method: type,
      data: para,
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        resolve(data)
      }

    })
  })
}

module.exports = {
  formatTime: formatTime,
  sendAjax: sendAjax
}
