<template>
  <div class="rank-container">
    <bt-scroll class="scroll-wraper">
      <div class="ranklist">
        <ul>
          <li class="item" v-for="top in topList" :key="top.id" @click='moveRankDetail(top.id)'>
            <div class="left">
              <img :src="top.picUrl" />
              <div class="listen">
                <i class="myicon myicon-erji"></i>
                <span class="text">{{top.listenCount|countFliter}}</span>
              </div>
            </div>
            <div class="right">
              <i class="icon myicon myicon-right"></i>
              <div class="content">
                <p class="title">{{top.topTitle}}</p>
                <p class="song-list">
                  <span class="songname">1&nbsp;{{top.songList[0].songname}}</span>
                  <span class="singername">-&nbsp;{{top.songList[0].singername}}</span>
                </p>
                <p class="song-list">
                  <span class="songname">2&nbsp;{{top.songList[1].songname}}</span>
                  <span class="singername">-&nbsp;{{top.songList[1].singername}}</span>
                </p>
                <p class="song-list">
                  <span class="songname">3&nbsp;{{top.songList[2].songname}}</span>
                  <span class="singername">-&nbsp;{{top.songList[2].singername}}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </bt-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRanklist } from "api/rank";
import btScroll from "cps/base/scroll";
export default {
  data() {
    return {
      topList: []
    };
  },
  filters:{
     countFliter(val){
       if(val.toString().length>4){
         return val.toString().slice(0,-4)+'.'+ val.toString().slice(-4,-3)+'万'
       }
     }
  },
  created() {
    getRanklist()
      .then(res => {
        if (res.code === 0) {
          this.topList = res.data.topList;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    moveRankDetail(id){
       console.log(id)
        this.$router.push('/rank/rankDetail/'+id)
    }
  },
  components: {
    btScroll
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
@import '~stylus/mixin';

.rank-container {
  position: absolute;
  top: 70px;
  bottom: 0;
  width: 100%;

  .scroll-wraper {
    overflow: hidden;
    height: 100%;

    .ranklist {
      padding: 10px;

      .item {
        margin-bottom: 10px;
        display: flex;
        background-color: $color-dialog-background;
        height: 100px;

        .left {
          // flex: 0 0 100px;
          position: relative;
          width: 100px;

          .listen {
            position: absolute;
            left: 2px;
            bottom: 2px;
            font-size: 14px;
            color: $color-text-d;

            .text {
              margin-left: 3px;
            }
          }

          img {
            width: 100%;
          }
        }

        .right {
          flex: 1;
          overflow: hidden;
          position: relative;

          .icon {
            position: absolute;
            font-size: 16px;
            color: #fff;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
          }

          .content {
            padding: 5px;
            width: 100%;
            box-sizing: border-box;

            .title {
              font-size: 18px;
              line-height: 20px;
              box-sizing: border-box;
              margin-bottom: 10px;
              no-wrap();
            }

            .song-list {
              font-size: 16px;
              line-height: 20px;
              no-wrap();

              .songname {
              }

              .singername {
                margin-left: 10px;
                font-size: 13px;
                color: $color-text-d;
              }
            }
          }
        }
        &:last-child{
            margin-bottom: 0;
        }
      }

    }
  }
}
</style>