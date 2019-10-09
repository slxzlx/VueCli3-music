<template>
  <div class="process-tontainer">
    <span class="time curTime">{{current|formateTime}}</span>
    <div ref="bar" class="bg-bar" @click="barClick">
      <div ref="buffer" class="buffer-bar"></div>
      <div ref="cur" class="cur">
        <div class="btn-wrap" @touchstart="touchstart"  @touchmove="touchmove" @touchend="touchend">
          <div class="btn" tagg="bbbbb"></div>
        </div>
      </div>
    </div>
    <span class="time totalTime">{{total|formateTime}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handle: false
    };
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    buffer: {
      type: Number,
      default: 0
    }
  },
  filters: {
    formateTime(val) {
      let m = (val / 60) | 0;
      let s = val % 60 | 0;
      if (s.toString().length < 2) s = "0" + s;
      return m + ":" + s;
    }
  },
  created() {
    this.barInfo = {};
  },
  mounted() {
    this.barWidth = this.$refs.bar.clientWidth;
  },
  watch: {
    current(newCur) {
      if (!this.handle) {
        let percent = newCur / this.total;
        this.moveBar(this.barWidth * percent);
      }
    },
    buffer(newBuff) {
      let percent = newBuff / this.total;
      this.$refs.buffer.style.width = this.barWidth * percent + "px";
    }
  },
  methods: {
    moveBar(width) {
      this.$refs.cur.style.width = width + "px";
    },
    touchstart(e) {
      this.handle = true;
      this.barInfo.startX = e.touches[0].clientX; //初始点里屏幕左侧的距离
      this.barInfo.startwidth = this.$refs.cur.clientWidth; //初始进度条的宽度
    },
    touchmove(e) {
      let offsetX = e.touches[0].clientX - this.barInfo.startX; //要移动的宽度
      let curwidth = Math.max(
        0,
        Math.min(this.barInfo.startwidth + offsetX, this.barWidth)
      );
      this.moveBar(curwidth);
    },
    touchend(e) {
      this.handle = false;
       this.callChange(this.$refs.cur.clientWidth);
    },
    //改变宽度后通知改变播放位置
    callChange(curWidth) {
      let curTime = this.total * (curWidth / this.barWidth);
      this.$emit("curTimeChanged", curTime);
    },
    barClick(e) {
      let barLeft = this.$refs.bar.getBoundingClientRect().left;
      let offsetWidth = e.clientX - barLeft;
      this.moveBar(offsetWidth);
      this.callChange(offsetWidth);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';

.process-tontainer {
  display: flex;
  width: 400px;
  align-items: center;

  .time {
    font-size: 18px;
    line-height: 24px;
  }

  .bg-bar {
    flex: 1;
    // width: 200px;
    height: 4px;
    border-radius: 2px;
    background-color: $color-dialog-background;
    position: relative;
    margin: 0 10px;

    .cur {
      background-color: $color-theme;
    }

    .buffer-bar {
      background-color: $color-background-d;
    }

    .cur, .buffer-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 4px;
      border-radius: 2px;

      .btn-wrap {
        float: right;
        width: 30px;
        height: 30px;
        transform: translate(50%, -13px);

        .btn {
          height: 15px;
          width: 15px;
          box-sizing: border-box;
          background-color: $color-theme;
          border: 2px solid #fff;
          border-radius: 50%;
          position: relative;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>