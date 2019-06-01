const files = require('../../utils/files.js')

Page({

  /**
   * 页面的初始数据
   */
  //recorddState:  
  //0:准备录音（图标：麦克风）
  //1：录音中（图标：停止）【两侧出重录，上传按钮】
  //2：录音结束，准备播放（图标：播放）
  //3：播放录音中（图标：暂停）
  //4：播放录音结束，准备重播（图标：播放）
  data: {
    pageWidth: 400,
    pageHeight: 600,
    recordState: 0,

    currentTime: 0,
    audioDuration: 0,
    timeLabel1: '00:00',
    timeLabel2: '00:00',
    sliderRate: 0,
    file: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      file: files.selectFile
    })
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(() => {
      showMessage("录音失败！")
    });
    this.recorderManager.onStop((res) => {

      this.stopTimer();
      let audioDuration = parseInt(res.duration / 1000);
      this.setData({
        src: res.tempFilePath,
        audioDuration: audioDuration,
        timeLabel1: "00:00",
        timeLabel2: getTimeString(audioDuration),
        recordState: 2,
        currentTime: 0
      })
    });
    this.recorderManager.onStart(() => {
      this.setData({
        "recordState": 1
      });
      this.beginTimer(true);
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(err => {
      showMessage("播放录音失败！")
      this.stopTimer();
      this.setData({
        timeLabel1: "00:00",
        recordState: 2,
        currentTime: 0
      })
    })
    this.innerAudioContext.onPlay(() => {
      this.setData({
        "recordState": 3
      });
      this.beginTimer();
    });
    this.innerAudioContext.onPause(() => {
      this.setData({
        "recordState": 2
      });
      this.pauseTimer();
    });
    this.innerAudioContext.onStop(() => {
      this.stopTimer();
    });
    this.innerAudioContext.onEnded(() => {
      this.setData({
        "recordState": 2
      });
      this.stopTimer();
      this.setData({
        sliderRate: 0,
        timeLabel1: "00:00",
        recordState: 4,
        currentTime: 0
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let width = wx.getSystemInfoSync().windowWidth;
    let height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      pageWidth: width,
      pageHeight: height
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  doRecord() {
    let recordState = this.data.recordState;
    if (recordState === 0) {
      this.startRecord();
    } else if (recordState === 1) {
      this.stopRecord();
    } else if (recordState === 2) {
      this.playAudio();
    } else if (recordState === 3) {
      this.pauseAudio();
    } else if (recordState === 4) {
      this.playAudio();
    }
  },
  startRecord() {
    this.recorderManager.start({
      duration: 60000, //60秒
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    })
  },
  stopRecord() {
    this.recorderManager.stop();
  },
  playAudio() {
    if (this.data.src) {
      this.innerAudioContext.src = this.data.src;
      this.innerAudioContext.play();
    }
  },
  pauseAudio() {
    if (this.data.src) {
      this.innerAudioContext.pause();
    }
  },
  repeatRecord() { //重录
    this.innerAudioContext.stop();
    this.stopTimer();
    this.setData({
      src: null,
      recordState: 0,
      currentTime: 0,
      audioDuration: 0,
      timeLabel1: '00:00',
      timeLabel2: '00:00',
      sliderRate: 0
    });
  },
  uploadRecord() { //上传
    showMessage("上传功能未实现！")
  },

  sliderChange(e) {
    let value = e.detail.value;
    let currentTime = 0.01 * value * this.data.audioDuration;
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.seek(currentTime);
    this.setData({
      sliderRate: value,
      currentTime: currentTime
    });
    this.innerAudioContext.play();
  },

  beginTimer(isRecord) {
    this.data.timer = setInterval(() => {
      this.data.currentTime += 0.1;
      if (isRecord) {
        this.setData({
          timeLabel1: getTimeString(this.data.currentTime)
        });
      } else {
        if (this.data.currentTime > this.data.audioDuration) {
          return;
        }
        let sliderRate = parseInt(100 * this.data.currentTime / this.data.audioDuration);
        this.setData({
          sliderRate: sliderRate,
          timeLabel1: getTimeString(this.data.currentTime)
        });
      }
    }, 100);
  },
  pauseTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.data.timer = null;
    }
  },
  stopTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.data.timer = null;
    }

  }
})

function getTimeString(theTime) {
  let minute = parseInt(theTime / 60);
  let second = parseInt(theTime % 60);
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return minute + ":" + second;
}

function showMessage(message) {
  wx.showModal({
    title: '提示',
    content: message,
    showCancel: false
  })
}