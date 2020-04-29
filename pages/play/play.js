// pages/play/play.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playdata: [], //播放页显示的数据
    btnP: 0, //播放暂停按钮图片
    btnE: 0, //上一首按钮图片
    btnT: 0, //下一首按钮图片
    timeNow: 0, //当前时间
    timeAll: 0, //总时间
    blockColor: "white", //滑块颜色
    angle: 0, //旋转角度
    lrcRow: 0, //当前歌词行数
    lrc: null, //歌词
    marginTop: 0, //滚动行数
    line: 0, //高亮行
    ctime: 1, //时间校验
    lrcH: 60, //滚动歌词高度
    updown: 0 //cd歌词是否上移
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var playdata = app.globalData.musicLib.music[options.index]
    //请求歌词
    this.getLRC(playdata)
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if (app.globalData.index == null || app.globalData.index != options.index) {
      app.globalData.index = options.index
      app.globalData.bgm = 1;
      app.globalData.playing = 1;
      //背景音乐播放
      //微信小程序旧版代码
      // wx.playBackgroundAudio({
      //   dataUrl: playdata.downloadURL,
      //   title: playdata.name,
      //   coverImgUrl: playdata.pic
      // })
      //微信小程序新版代码
      backgroundAudioManager.title = playdata.name
      backgroundAudioManager.epname = 'nnn'
      backgroundAudioManager.singer = playdata.singer
      backgroundAudioManager.coverImgUrl = playdata.pic
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = playdata.downloadURL
      backgroundAudioManager.onEnded(function () { //播放完毕
        app.globalData.bgm = 0
        app.globalData.playing = 0
        that.setData({
          btnP: app.globalData.playing,
          lrcRow: 0
        })
      })
    }
    backgroundAudioManager.onTimeUpdate(function () { //播放中
      that.setData({
        timeNow: backgroundAudioManager.currentTime, //更新进度条
        angle: backgroundAudioManager.currentTime * 0.65, //更新旋转角度
      })
      if (that.data.lrc.length > 1) { //如果有歌词
        if (that.data.lrcRow >= that.data.line) { //超过line行开始滚动
          that.setData({
            marginTop: (that.data.lrcRow - that.data.line) * 28.8
          })
        }
        // 文稿对应行颜色改变
        if (that.data.lrcRow != that.data.lrc.length - 1) { //
          var j = 0;
          for (var j = that.data.lrcRow; j < that.data.lrc.length; j++) {
            // 当前时间与前一行，后一行时间作比较， j:代表当前行数
            if (that.data.lrcRow == that.data.lrc.length - 2) {
              //最后一行只能与前一行时间比较
              if (parseFloat(backgroundAudioManager.currentTime + that.data.ctime) > parseFloat(that.data.lrc[that.data.lrc.length - 1][0])) {
                that.setData({
                  lrcRow: that.data.lrc.length - 1
                })
                return;
              }
            } else {
              if (parseFloat(backgroundAudioManager.currentTime + that.data.ctime) > parseFloat(that.data.lrc[j][0]) && parseFloat(backgroundAudioManager.currentTime + that.data.ctime) < parseFloat(that.data.lrc[j + 1][0])) {
                that.setData({
                  lrcRow: j
                })
                return;
              }
            }
          }
        }
      }
    })
    this.setData({
      playdata: playdata,
      timeAll: playdata.time,
      btnP: app.globalData.playing,
      //timeNow: backgroundAudioManager.currentTime,
      angle: backgroundAudioManager.currentTime * 0.65,
      lrcH: app.globalData.height - 545
    })

  },

  /**
   * 上一首
   */
  pre: function () {
    var that = this
    var index = app.globalData.index
    if (index == 0) {
      index = (+app.globalData.musicLib.music.length);
    }
    index--
    app.globalData.index = index
    app.globalData.playing = 1
    var playdata = app.globalData.musicLib.music[index]
    //请求歌词
    this.getLRC(playdata)
    // wx.playBackgroundAudio({
    //   dataUrl: playdata.downloadURL,
    //   title: playdata.name,
    //   coverImgUrl: playdata.pic
    // })
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = playdata.name
    backgroundAudioManager.epname = 'nnn'
    backgroundAudioManager.singer = playdata.singer
    backgroundAudioManager.coverImgUrl = playdata.pic
    backgroundAudioManager.src = playdata.downloadURL
    this.setData({
      playdata: playdata,
      timeAll: playdata.time,
      btnP: 1,
      btnE: 0,
      lrcRow: 0
    })
  },

  /**
   * 下一首
   */
  next: function () {
    var that = this
    var index = (+app.globalData.index) + 1
    if (index == app.globalData.musicLib.music.length) {
      index = 0;
    }
    app.globalData.index = index
    app.globalData.playing = 1
    var playdata = app.globalData.musicLib.music[index]
    //请求歌词
    this.getLRC(playdata)
    // wx.playBackgroundAudio({
    //   dataUrl: playdata.downloadURL,
    //   title: playdata.name,
    //   coverImgUrl: playdata.pic
    // })
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = playdata.name
    backgroundAudioManager.epname = 'nnn'
    backgroundAudioManager.singer = playdata.singer
    backgroundAudioManager.coverImgUrl = playdata.pic
    backgroundAudioManager.src = playdata.downloadURL
    this.setData({
      playdata: playdata,
      timeAll: playdata.time,
      btnP: 1,
      btnT: 0,
      lrcRow: 0
    })
  },

  /**
   * 播放/暂停
   */
  playOrpause: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    var playdata = this.data.playdata
    if (app.globalData.bgm == 0) { //在播放页放完一首后，点击播放继续放当前歌曲
      backgroundAudioManager.title = playdata.name
      backgroundAudioManager.epname = 'nnn'
      backgroundAudioManager.singer = playdata.singer
      backgroundAudioManager.coverImgUrl = playdata.pic
      backgroundAudioManager.src = playdata.downloadURL
      app.globalData.bgm = 1
      app.globalData.playing = 1
    } else if (app.globalData.playing == 0) { //播放
      //wx.playBackgroundAudio()
      backgroundAudioManager.play()
      app.globalData.playing = 1
    } else { //暂停
      //wx.pauseBackgroundAudio()
      backgroundAudioManager.pause()
      app.globalData.playing = 0
    }
    this.setData({
      btnP: app.globalData.playing
    })
  },

  /**
   * 触摸播放按钮切换图片
   */
  touchPlayBtn: function () {
    if (this.data.btnP == 0) {
      this.setData({
        btnP: 2
      })
    } else {
      this.setData({
        btnP: 3
      })
    }
  },

  /**
   * 触摸上一首按钮切换图片
   */
  touchPreBtn: function () {
    this.setData({
      btnE: 1
    })
  },

  /**
   * 触摸下一首按钮切换图片
   */
  touchNextBtn: function () {
    this.setData({
      btnT: 1
    })
  },

  /**
   * 切换播放进度(单位：秒)
   */
  playHere: function (event) {
    //微信小程序旧版代码
    // wx.seekBackgroundAudio({
    //   position: 30
    // })
    //微信小程序新版代码
    var that = this
    var playdata = that.data.playdata
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.seek(event.detail.value)
    //进度前拉歌词处理
    if (backgroundAudioManager.currentTime < this.data.timeNow) {
      for (var i = 1; i < that.data.lrc.length; i++) {
        if (that.data.lrc[i][0] > backgroundAudioManager.currentTime) {
          that.setData({
            lrcRow: i - 1
          })
          break;
        }
      }
    } else {//进度后拉歌词处理
      for (var i = that.data.lrcRow; i < that.data.lrc.length; i++) {
        if (that.data.lrc[i][0] > backgroundAudioManager.currentTime) {
          that.setData({
            lrcRow: i
          })
          break;
        }
      }
    }
    backgroundAudioManager.onTimeUpdate(function () { //播放中
      that.setData({
        timeNow: backgroundAudioManager.currentTime, //更新进度条
        angle: backgroundAudioManager.currentTime * 0.65, //播放时旋转
        //marginTop: row * 28.9
      })
      if (that.data.lrc.length > 1) { //如果有歌词
        if (that.data.lrcRow >= that.data.line) { //超过line行开始滚动
          that.setData({
            marginTop: (that.data.lrcRow - that.data.line) * 28.8
          })
        }
        // 文稿对应行颜色改变
        if (that.data.lrcRow != that.data.lrc.length - 1) { //
          var j = 0;
          for (var j = that.data.lrcRow; j < that.data.lrc.length; j++) {
            // 当前时间与前一行，后一行时间作比较， j:代表当前行数
            if (that.data.lrcRow == that.data.lrc.length - 2) {
              //最后一行只能与前一行时间比较
              if (parseFloat(backgroundAudioManager.currentTime + that.data.ctime) > parseFloat(that.data.lrc[that.data.lrc.length - 1][0])) {
                that.setData({
                  lrcRow: that.data.lrc.length - 1
                })
                return;
              }
            } else {
              if (parseFloat(backgroundAudioManager.currentTime + that.data.ctime) > parseFloat(that.data.lrc[j][0]) && parseFloat(backgroundAudioManager.currentTime + that.data.ctime) < parseFloat(that.data.lrc[j + 1][0])) {
                that.setData({
                  lrcRow: j
                })
                return;
              }
            }
          }
        }
      }
    })
    that.setData({
      blockColor: "white"
    })
  },

  /**
   * 拖动进度条滑块变色
   */
  touchSli: function (event) {
    var that = this
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onTimeUpdate(function () { //播放中 进度条不随播放变化
      that.setData({
        timeNow: event.detail.value
      })
    })
    that.setData({
      blockColor: "yellow"
    })
  },

  /**
   * cd向上滑动
   */
  up: function () {
    var that = this
    if (that.data.updown == 0) {
      that.setData({
        line: 4,
        lrcH: app.globalData.height - 350,//"330px",
        updown: 1
      })
      var animation = wx.createAnimation({
        duration: 500,//动画持续多少毫秒
        timingFunction: 'ease',//“运动”的方式，例子中的 'ease'代表动画以低速开始，然后加快，在结束前变慢  
        delay: 0//多久后动画开始运行
      })
      animation.translate(0, -180).step()
      that.setData({
        ani: animation.export()
      })
    }
  },

  /**
   * cd向下滑动
   */
  down: function () {
    var that = this
    if (that.data.updown == 1) {
      var animation = wx.createAnimation({
        duration: 500,//动画持续多少毫秒
        timingFunction: 'ease',//“运动”的方式，例子中的 'ease'代表动画以低速开始，然后加快，在结束前变慢  
        delay: 0//多久后动画开始运行
      })
      animation.translate(0, 0).step()
      that.setData({
        ani: animation.export()
      })
      that.setData({
        line: 0,
        lrcH: app.globalData.height - 545,
        updown: 0
      })
    }
  },

  /**
   * 获取歌词
   */
  getLRC: function (playdata) {
    var that = this
    if (playdata.lrc != null || playdata.lrc != "") {
      wx.request({
        url: playdata.lrc,
        success: function (res) {
          var lrc = that.sliceNull(that.parseLyric(res.data))
          that.setData({
            lrc: lrc
          })
        },
        fail: function (res) {
          that.setData({
            lrc: [
              [0, "暂无歌词"]
            ]
          })
        },
        complete: function (res) { },
      })
    }
  },

  /**
   * 解析歌词 来自https://www.jianshu.com/p/34efd94647b7
   */
  parseLyric: function (text) {
    var result = []
    var lines = text.split('\n') //切割每一行
    var pattern = /\[\d{2}:\d{2}.\d{2}\]/g //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    }
    //上面用'\n'生成数组时，结果中最后一个为空元素，这里将去掉
    if (lines[lines.length - 1].length == 0) {
      lines.pop()
    }
    lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
      //提取出时间[xx:xx.xx]
      var time = v.match(pattern),
        //提取歌词
        value = v.replace(pattern, '');
      // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function (v1, i1, a1) {
        //去掉时间里的中括号得到xx:xx.xx
        var t = v1.slice(1, -1).split(':');
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function (a, b) {
      return a[0] - b[0];
    });
    return result;
  },

  //去除空白
  sliceNull: function (lrc) {
    var result = []
    for (var i = 0; i < lrc.length; i++) {
      if (lrc[i][1] == "") { } else {
        result.push(lrc[i]);
      }
    }
    return result
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

  }
})

