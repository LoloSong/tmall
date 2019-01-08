// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    boxes: {
      default: [],
      type: [cc.Node]
    },
    box_text: {
      default: null,
      type: cc.Node
    },
    rdAni: {
      default: null,
      type: cc.Animation
    },
    lhAni: {
      default: null,
      type: cc.Animation
    },
    rhAni: {
      default: null,
      type: cc.Animation
    },
    lmAni: {
      default: null,
      type: cc.Animation
    },
    rmAni: {
      default: null,
      type: cc.Animation
    },
    lsAni: {
      default: null,
      type: cc.Animation
    },
    rsAni: {
      default: null,
      type: cc.Animation
    },
    preTime: '0000000',
    isClickBox: [0, 0, 0, 0, 0, 0]
  },

  onLoad() {
    var _this = this
    // 倒计时
    this.schedule(this.intervalCount.bind(this), 1)

    // 随机宝箱领取
    let ranNum = Math.floor(Math.random() * (5 - 0 + 1) + 0)
    this.clickBox(ranNum)
  },

  start() {

  },

  update (dt) {
    
  },

  clickBox(ranNum) {
    for (let i = 0; i < this.boxes.length; i++) {
      this.boxes[i].on(cc.Node.EventType.TOUCH_END, function () {
          if (!this.isClickBox[i]) {
            if (ranNum === i) {
              let x = this.boxes[i].x
              let y = this.boxes[i].y + 30
              this.box_text.x = x;
              this.box_text.y = y;
              this.box_text.getComponent(cc.Label).string = window.peopleNum + '人已领取'
              this.box_text.active = true
              window.clickBox(true)
            } else {
              window.clickBox(false)
            }
            this.boxes[i].getComponent(cc.Animation).play('box_open')
            this.isClickBox[i] = 1
          }
      }, this)
    }
  },

  intervalCount () {
    let endTime = window.endTime
    // let endTime = new Date(2019, 0, 10, 0, 0).getTime()
    let now = new Date().getTime();
    let leftTime = endTime - now;
    if (leftTime <= 0) {
      this.unschedule(this.intervalCount)
    }
    this.countDown(leftTime)
  },

  countDown(leftTime) {
    var dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
    var hh = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
    var mm = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟数
    var ss = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数

    hh = hh < 10 ? '0' + hh : hh
    mm = mm < 10 ? '0' + mm : mm
    ss = ss < 10 ? '0' + ss : ss

    var currentTime = dd.toString() + hh.toString()[0] + hh.toString()[1] + mm.toString()[0] + mm.toString()[1] + ss.toString()[0] + ss.toString()[1]
    var changeArrObj = this.comparisonTime(this.preTime, currentTime)
    this.changeTime(changeArrObj)
    this.preTime = currentTime
  },

  changeTime (changeArrObj) {
    for (var i = 0; i < changeArrObj.length; i++) {
      switch (changeArrObj[i].index) {
        case 0:
          this.rdAni.play(changeArrObj[i].num)
          break;
        case 1:
          this.lhAni.play(changeArrObj[i].num)
          break;
        case 2:
          this.rhAni.play(changeArrObj[i].num)
          break;
        case 3:
          this.lmAni.play(changeArrObj[i].num)
          break;
        case 4:
          this.rmAni.play(changeArrObj[i].num)
          break;
        case 5:
          this.lsAni.play(changeArrObj[i].num)
          break;
        case 6:
          this.rsAni.play(changeArrObj[i].num)
          break;
        default:
          break;
      }
    }
  },

  comparisonTime(preTime, currentTime) {
    var arr = []
    for (var i = 0; i < preTime.length; i++) {
      if(currentTime[i] != preTime[i]) {
        arr.push({
          index: i,
          num: currentTime[i].toString()
        })
      }
    }
    return arr;
  }
});
