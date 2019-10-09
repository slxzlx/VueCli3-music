<template>
  <div class="recommend-container">
    <bt-scroll class="srcoll-wraper" :data="sliderData">
      <div class="srcoll-content">
        <swiper v-if="sliderData.length>0" :options="sliderOption" class="swiper">
          <swiperSlide v-for="item in sliderData" :key="item.id" class="swiper-item">
            <a :href="item.linkUrl">
              <img v-lazy="item.picUrl" />
            </a>
          </swiperSlide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="radio">
          <box-list :dataArr="raidoArr">
            <h1 slot="title" class="title">电台</h1>
          </box-list>
        </div>
        <div class="song">
          <box-list :dataArr="songArr">
            <h1 slot="title" class="title">热门歌单</h1>
            <div slot="listenCount" class="listenCount">
              <i class="icon"></i>
              <span class="count"></span>
            </div>
          </box-list>
        </div>
      </div>
    </bt-scroll>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { getCommendData, getAlbums } from "api/recommend.js";
import boxList from "cps/base/boxList";
import btScroll from "cps/base/scroll";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      sliderData: [],
      raidoData: [],
      songData: [],
      sliderOption: {
        loop: true,
        speed: 300,
        autoplay: {
          disableOnInteraction: false,
          delay: 3000,
          waitForTransition: true
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    boxList,
    btScroll
  },
  created() {
    this._getCommendData();

    // this._getddd();
  },
  methods: {
    _getCommendData() {
      getCommendData().then(res => {
        if (res.code == 0) {
          this.sliderData = res.data.slider;
          this.raidoData = res.data.radioList;
          this.songData = res.data.songList;
        }
      });
    },
    _getddd() {
      getAlbums().then(res => {
        console.log(res);
      });
    }
  },
  computed: {
    raidoArr() {
      var arr = [];
      this.raidoData.forEach(data => {
        arr.push({
          imgUrl: data.picUrl,
          desc: data.Ftitle,
          linkUrl: "javascirpt::void(0)"
        });
      });
      return arr;
    },
    songArr() {
      var arr = [];
      this.songData.forEach(data => {
        arr.push({
          imgUrl: data.picUrl,
          desc: data.songListDesc,
          linkUrl: "javascirpt::void(0)",
          author: data.songListAuthor
        });
      });
      return arr;
    }
  }
};
</script>

<style lang="stylus" scoped>
.recommend-container {
  position: absolute;
  width: 100%;
  top: 70px;
  bottom: 0;

  .srcoll-wraper {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .srcoll-content {
      .swiper {
        overflow hidden
        >>>.swiper-pagination-bullet-active {
          width: 12px;
          background-color: #fff;
        }

        a {
          display: block;
        }

        img {
          width: 100%;
        }
      }

      .radio, .song {
        padding: 0 8px;

        .title {
          line-height: 36px;
        }
      }

      .song > .listenCount {
        position: absolute;
        bottom: 5px;
        left: 5px;
      }
    }
  }
}
</style>