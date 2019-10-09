<template>
  <div class="music-view">
    <div class="header" ref="header">
      <i class="back icon-back" @click="back"></i>
      <h2 class="name">{{title}}</h2>
    </div>
    <div ref="bgimg" class="img" :style="bgStyle">
      <div ref="btn" class="playBtn">
        <i class="icon-play"></i>
        <span @click='autoAll'>随机播放所有歌曲</span>
      </div>
      <div class="bgmask"></div>
    </div>
    <bt-scroll
      ref="scroll-wraper"
      :data="songs"
      class="list"
      :probeType="3"
      :listenScroll="true"
      @sliVal="sliderY"
    >
      <div class="listWraper">
        <song-list  @playSong='playSong' :songs="songs"></song-list>
      </div>
    </bt-scroll>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import  * as  mutationType from '../../store/mutation-type'
import songList from "./songList";
import btScroll from "./scroll";
export default {
  props: {
    songs: {
      type: Array,
      default: null
    },
    bgimg:{
      type:String,
      default:''
    },
    title:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },

  mounted() {
    this._initScrollheight();
    // this.bgHeight=0
  },
  methods: {
    ...mapGetters(["singer"]),
    ...mapActions(['selectPlay','autoPlay']),
    _initScrollheight() {
      this.bgHeight = this.$refs.bgimg.offsetHeight;
      this.headerHeight = this.$refs.header.offsetHeight;
      this.$refs["scroll-wraper"].$el.style.top = this.bgHeight + "px";
    },
    sliderY(pos) {
      this.scrollY = pos.y;
    },
    back(){
      this.$router.back()
    },
    playSong(song,index){
      this.selectPlay({
        list:this.songs,
        index
      })
    },
    autoAll(){
      this.autoPlay({
        list:this.songs
      })
    }
  },
  computed: {
    bgStyle() {
      return {
        background: `url(${this.bgimg},)`,
        backgroundSize: "cover"
      };
    }
  },
  watch: {
    scrollY(newy) {
      let persent = Math.abs(newy / this.bgHeight);

      let zindex = 0;
      if (newy < 0) {
        let minOffset = Math.max(-this.bgHeight + this.headerHeight, newy);
        if (newy < minOffset) {
          zindex = 2;
          this.$refs.bgimg.style.height = this.headerHeight + "px";
          this.$refs.bgimg.style.paddingTop = 0;
          this.$refs.btn.style.display = "none";
        } else {
          this.$refs.bgimg.style.height = 0;
          this.$refs.bgimg.style.paddingTop = "80%";
          this.$refs.btn.style.display = "";
        }
        this.$refs.mask.style.transform = `translateY(${minOffset}px)`;
        this.$refs.bgimg.style.zIndex = zindex;
      } else {
        this.$refs.bgimg.style.zIndex = 2;
        this.$refs.bgimg.style["transform"] = `scale(${1 + persent},${1 +
          persent})`;
      }
    }
  },
  components: {
    songList,
    btScroll
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';

.music-view {
  background-color: #222;
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 20px;
    color: #ffffff;
    font-weight: 600;
    padding : 0 8px;
    text-align: center;
    box-sizing border-box
    .back {
      position absolute
      line-height 40px
      padding-left 10px
      padding-right 10px
      top 0
      left 0
      color: $color-theme;
    }
    .name{
      // text-align: left;
    }
  }

  .img {
    transform-origin: top;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
    background-size cover
    .bgmask{
      position absolute
      top 0
      left 0
      z-index 0
      height 100%
      width 100%
      background-color rgba(7,17,27,.3)
    }
    .playBtn {
      z-index 4
      padding: 4px 15px;
      line-height: 26px;
      font-size: 14px;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid $color-theme;
      color: $color-theme;
      border-radius: 15px;

      span {
        margin-left: 10px;
      }
    }
  }

  .mask {
    height: 100%;
    background-color: #222;
  }

  .list {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1;

    // .listWraper {
    //   padding: 10px 20px;
    // }
  }
}
</style>