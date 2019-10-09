<template>
  <div class="singerList-container">
    <bt-scroll
      :data="singerList"
      @sliVal="sliderY"
      :listenScroll="true"
      class="scroll-wraper"
      ref="btscroll"
    >
      <div class="scroll-content">
        <ul>
          <li ref="clsItem" class="cls-item" v-for="clsItem in singerList" :key="clsItem.title">
            <h3 class="title">{{clsItem.title}}</h3>
            <div
              class="singer"
              @click="$emit('selectSinger',singer)"
              v-for="singer in clsItem.singers"
              :key="singer.Fid"
            >
              <img class="img" :src="singer.FimgUrl" />
              <span class="name">{{singer.Fname}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="navi">
        <ul>
          <li
            ref="navi"
            :class="{active:currentIndex==i}"
            @touchstart.stop.prevent="startGoto"
            @touchmove.stop.prevent="touchmove"
            :data-index="i"
            class="navi-item"
            v-for="(n,i) in naveList"
            :key="i"
          >{{n}}</li>
        </ul>
      </div>
      <h3 class="fix-title" v-show="fixTitle" :style="fixSlide">{{fixTitle}}</h3>
    </bt-scroll>
  </div>
</template>

<script>
import btScroll from "cps/base/scroll";

export default {
  components: {
    btScroll
  },
  data() {
    return {
      singerHeightArr: [],
      currentIndex: 0,
      scrollY: 0,
      fixSlide: {}
    };
  },
  props: {
    singerList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    //添加手指触摸的坐标
    this.touch = {};
    this.startIndex = 0;
  },
  methods: {
    startGoto(e) {
      let index = e.target.getAttribute("data-index");
      this.touch.pageY1 = e.touches[0].pageY;

      this.startIndex = parseInt(index);

      this.scrollTo(index);
    },
    touchmove(e) {
      this.touch.pageY2 = e.touches[0].pageY;
      let offsetY = this.touch.pageY2 - this.touch.pageY1;
      let naviIndex = Math.floor(offsetY / 18) + this.startIndex;
      this.scrollTo(naviIndex);
    },
    scrollTo(index) {
      if (index < 0) index = 0;
      else if (index > this.singerList.length - 1)
        index = this.singerList.length - 1;
      let el = this.$refs.clsItem[index];
      this.$refs.btscroll.scrollTo(el, 300);

      // this.addActive(index)
      this.currentIndex = index;
    },
    //这个方法没用
    addActive(index) {
      let els = this.$refs.navi;

      for (let i = 0; i < els.length; i++) {
        if (index == i) {
          els[i].classList.add("active");
          continue;
        }
        els[i].classList.remove("active");
      }
    },
    _calHeight() {
      this.singerHeightArr = [];
      let height = 0;
      var els = this.$refs["clsItem"];
      for (let i = 0; i < els.length; i++) {
        height += els[i].offsetHeight;
        this.singerHeightArr.push({ needHeigth: height });
      }
    },
    sliderY(valY) {
      this.scrollY = valY.y;
    }
  },
  watch: {
    singerList() {
      setTimeout(() => {
        this._calHeight();
      }, 20);
    },
    scrollY(newY) {
      var arr = this.singerHeightArr;

      for (var i = 0; i < arr.length; i++) {
        if (-newY < arr[i].needHeigth) {
          if (-newY > arr[i].needHeigth - 24) {
            this.fixSlide = {
              transform: `translateY(-${24 - (arr[i].needHeigth + newY)}px)`
            };
          } else {
            this.fixSlide = {};
          }
          this.currentIndex = i;
          return;
        }
      }

      this.currentIndex = 0;
    }
  },
  computed: {
    naveList() {
      return this.singerList.map(singer => {
        return singer.title.substring(0, 1);
      });
    },
    fixTitle() {
      if (this.scrollY > 0) return "";
      return this.singerList[this.currentIndex]
        ? this.singerList[this.currentIndex].title
        : "";
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';

.singerList-container {
  height: 100%;

  .scroll-wraper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;
    overflow hidden
    .navi {
      position: absolute;
      z-index: 11;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      background-color: $color-background-d;
      padding: 4px;
      border-radius: 8px;

      .navi-item {
        font-size: 12px;
        line-height: 14px;
        color: $color-text-l;
        padding: 2px 0;
        text-align: center;

        &.active {
          color: $color-theme;
        }
      }
    }

    .fix-title {
      font-size: 16px;
      line-height: 24px;
      height: 24px;
      background-color: $color-dialog-background;
      color: $color-background-d;
      padding-left: 10px;
      font-weight: 600;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    .scroll-content {
      .cls-item {
        .title {
          font-size: 16px;
          line-height: 24px;
          background-color: $color-dialog-background;
          color: $color-background-d;
          padding-left: 10px;
          font-weight: 600;
          height: 24px;
        }

        .singer {
          margin-top: 10px;
          padding-left: 10px;

          &:last-child {
            padding-bottom: 10px;
          }

          .img {
            width: 40px;
            height: 40px;
            display: inline-block;
            border-radius: 20px;
          }

          .name {
            font-size: 14px;
            line-height: 40px;
            margin-left: 16px;
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>