<template>
  <div class="player" v-if="playList.length>0">
    <transition>
      <div class="full" v-show="fullScreen">
        <div class="background" :style="cdBgimg">
          <!-- <img width="100%" height="100%" :src="curSong.image" /> -->
        </div>
        <div class="top">
          <i class="icon icon-back" @click="closeFull"></i>
          <h1 class="title" >{{curSong.name}}</h1>
          <h2 class="sub-title">{{curSong.singer}}</h2>
        </div>
        <div class="middle">
          <div class="cd" :style="cdBgimg" :class="bgRotate"></div>
          <div class="song-word"></div>
          <div class="process">
            <process
              @curTimeChanged="changeTime"
              :total="totalTime"
              :current="curTime"
              :buffer="buffer"
              class="process-bar"
            ></process>
          </div>
        </div>
        <div class="control">
          <span class="ctr-tiem mode-ctr" :class="modeIcon" @click="changMode"></span>
          <span class="ctr-tiem last-ctr icon-prev" @click="prev"></span>
          <span class="ctr-tiem start-ctr" :class="iconToggle" @click="playToggle"></span>
          <span class="ctr-tiem next-ctr icon-next" @click="next"></span>
          <span class="ctr-tiem col-ctr icon-not-favorite"></span>
        </div>
      </div>
    </transition>
    <div class="mini" v-show="!fullScreen" @click="openFull">
      <div class="bg" :style="cdBgimg" :class="bgRotate"></div>
      <div class="song-info">
        <h1 class="title">{{curSong.name}}</h1>
        <h2 class="sub-title">{{curSong.singer}}</h2>
      </div>
      <div class="right-cotrol">
        <span class="start-ctr" :class="iconToggle" @click.stop="playToggle"></span>
        <span class="meau-ctr icon-playlist"></span>
      </div>
    </div>
    <audio
      ref="audio"
      @error="error"
      @canplay="canplay"
      @timeupdate="timeupdate"
      @progress="processData"
      @ended="ended"
      src="http://sc1.111ttt.cn/2018/1/03/13/396131227447.mp3"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { constants } from "crypto";
import process from "./process";
import { clearInterval, setInterval } from "timers";
import playMode from "../../store/playMode.config";
import { shuffle } from "common/js/util.js";
export default {
  data() {
    return {
      curTime: 0,
      totalTime: 0,
      buffer: 0
    };
  },
  mounted() {
    // setInterval(() => {
    //   const timeRange = this.$refs.audio.buffered;
    //   this.buffer = timeRange.end(timeRange.length - 1);
    //   console.log(buffer);
    // }, 2000);
    console.log("播放器挂载了");
  },
  methods: {
    //关闭全屏播发器
    closeFull() {
      this.set_fullScreen(false);
    },
    //打开全屏播放器
    openFull() {
      this.set_fullScreen(true);
    },
    //播放与暂停按钮
    playToggle() {
      this.set_playing(!this.playing);
    },
    //下一曲
    next() {
      let index = this.curIndex + 1;
      if (index > this.playList.length-1) index = 0;
      if (!this.playing) this.playToggle();
      this.set_curIndex(index);
    },
    //上一曲
    prev() {
      let index = this.curIndex - 1;
      if (index === -1) index = this.playList.length-1;
      if (!this.playing) this.playToggle();
      this.set_curIndex(index);
    },
    //可以播放的时候获得歌曲时长
    canplay() {
      this.totalTime = this.$refs.audio.duration;
    },
    error(e) {
      console.log("歌曲加载出错");
    },
    //随时刷新播放时间
    timeupdate(e) {
      this.curTime = e.target.currentTime;
    },
    //开始下载缓存时定时刷新缓存条
    processData(e) {
      var id = setInterval(() => {
        const timeRange = this.$refs.audio.buffered; //这个不能写在定时器外
        this.buffer = timeRange.end(timeRange.length - 1);
        if (this.buffer >= this.totalTime - 1) clearInterval(id);
      }, 500);
    },
    //获得进手动改变进度条后的播放时间
    changeTime(cur) {
      this.$refs.audio.currentTime = cur;
    },
    //改变播放模式
    changMode() {
      let mode = (this.playMode + 1) % 3;
      this.set_playMode(mode);
      let list = [];
      if (mode == playMode.random) {
        list = shuffle(this.playList);

      } else {
        list = this.playQueue;
      }
      this.resetIndex(list);
      this.set_playList(list);
    },
    resetIndex(list) {
      let id = list.findIndex(item => {
        return item.id === this.curSong.id;
      });
      this.set_curIndex(id);
    },
    ended(){
     if(this.playMode===playMode.loop){
       this.$refs.audio.currentTime=0
       this.$refs.audio.play()
     }
     else{
       this.next()
     }
    },
    ...mapMutations([
      "set_fullScreen",
      "set_playing",
      "set_curIndex",
      "set_playMode",
      "set_playList"
    ])
  },
  watch: {
    playing(newVal) {
      this.$nextTick(() => {
        let audio = this.$refs.audio;
        if (newVal) {
          console.log("播放了");
          audio.play();
        } else {
          console.log("暂停了");
          audio.pause();
        }
      });
    },
    curSong(){
      console.log('歌曲发生了改变')
    }
  },
  computed: {
    ...mapGetters([
      "playing",
      "playList",
      "fullScreen",
      "playQueue",
      "playMode",
      "curIndex",
      "curSong"
    ]),
    cdBgimg() {
      return { backgroundImage: `url(${this.curSong.image})` };
    },
    iconToggle() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    bgRotate() {
      return this.playing ? "play" : "pause";
    },
    modeIcon() {
      return this.playMode === playMode.random
        ? "icon-random"
        : this.playMode === playMode.loop
        ? "icon-loop"
        : "icon-sequence";
    }
  },
  components: {
    process
  }
};
</script>
<style lang="stylus" scoped>
@import '~stylus/variable';
@import '~stylus/mixin';

@keyframes gundong {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.player {
  .v-enter-active, .v-leave-active {
    transition: all 0.3s;
  }

  .v-enter, .v-leave-to {
    transform: translateY(80%);
    opacity: 0;
  }

  .full {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-background;

    .background {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      filter: blur(15px);
      transform: scale(1.1);
      opacity: 0.6;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;

      img {
        filter: blur(15px);
        transform: scale(1.1);
        opacity: 0.6;
      }
    }

    // background-color: #222;
    .top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      .icon {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 16px;
        font-size: 18px;
        color: $color-theme;
        line-height: 25px;
      }

      .title, .sub-title {
        text-align: center;
        margin-top: 10px;
        line-height: 25px;
        padding: 0 40px;
        box-sizing: border-box;
        no-wrap();
      }

      .title {
        font-size: 20px;
        font-weight: 400;
        color: $color-text;
        width: 100%;
      }

      .sub-title {
        font-size: 16px;
        line-height: 18px;
        color: $color-text-l;
        margin-top: 6px;
      }
    }

    .middle {
      margin-top: 100px;

      .cd {
        margin: 100px auto;
        width: 80%;
        height: 0;
        padding-top: 80%;
        border-radius: 50%;
        background-size: cover;
        border: 5px solid #ccc;
        animation: gundong 20s linear infinite;

        &.play {
          animation-play-state: running;
        }

        &.pause {
          animation-play-state: paused;
        }
      }

      .process-bar {
        width: 80%;
        margin: 20px auto;
      }
    }

    .control {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      color: $color-theme;
      justify-content: space-between;
      width: 80%;

      .ctr-tiem {
        line-height: 50px;
        font-size: 38px;

        &.start-ctr {
          font-size: 46px;
        }
      }
    }
  }

  .mini {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: $color-highlight-background;
    display: flex;

    .bg {
      // display: inline-block;
      width: 50px;
      height: 50px;
      margin-top: 5px;
      margin-left: 12px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      animation: gundong 20s linear infinite;

      &.play {
        animation-play-state: running;
      }

      &.pause {
        animation-play-state: paused;
      }
    }

    .song-info {
      flex: 1;
      // display: inline-block;
      padding: 6px 6px 0 12px;
      line-height: 24px;
      overflow hidden
      .title {
        // width: 100%;
        color: $color-text;
        font-size: 18px;
        no-wrap();
      }

      .sub-title {
        color: $color-text-l;
        font-size: 14px;
        no-wrap();
      }
    }

    .right-cotrol {
      font-size: 32px;
      color: $color-theme;
    }

    .start-ctr {
      padding: 6px;
      line-height: 60px;
    }

    .meau-ctr {
      padding: 6px;
    }
  }
}
</style>