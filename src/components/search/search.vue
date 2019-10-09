<template>
  <div class="search-container">
    <search-box ref="seachBox" @showkeys="showhotkey" @search="search"></search-box>
    <div class="hotkey" v-show="isHotkeyShow">
      <h1 class="title">热门搜索</h1>
      <ul class="hotkey-list">
        <li class="hotkey-item" @click="selectKey(k.k)" v-for="k in hotKey" :key="k.n">{{k.k}}</li>
      </ul>
    </div>
    <scroll
      class="scroll-wraper"
      :data="searchResult"
      v-show="!isHotkeyShow "
      @onScrollend="searchMore"
      :pullup="true"
    >
      <div>
        <div class="search-result" v-show="searchResult.length>0">
          <ul>
            <li class="search-item" v-for="(s,i) in searchResult" :key="i" @click="resultclick(s)">
              <div class="left">
                <img :src="s.FimgUrl" v-if="s.type" />
                <span class="icon-music" v-if="!s.type"></span>
              </div>
              <div class="right">
                <p class="song">{{getTitle(s)}}</p>
                <p class="singer">{{getsubTitle(s)}}</p>
              </div>
            </li>
            <loading class="loading" title v-show="isMoreLoadingShow"></loading>
          </ul>
        </div>
        <div class="history-wraper" v-show="isHistoryShow">
          <save-list @choose="chooseHis"></save-list>
          <p @click='clearAll'>清空搜索记录</p>
        </div>
      </div>
      <loading class="searchloading" title="正在搜索..." v-show="isSearchLoadingShow"></loading>
      <div class="noreult" v-show="isNoResultShow && searchResult.length==0">抱歉，没有任何结果</div>
    </scroll>
  </div>
</template>

<script>
import scroll from "cps/base/scroll";
import searchBox from "cps/base/searchBox";
import loading from "cps/base/loading";
import { getHotKey, getResult } from "api/search";
import { createSong } from "common/js/class";
import saveList from "cps/base/saveList";
import { saveItem, getList, delectItem, clearHis } from "common/js/cache";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      hotKey: [],
      query: "",
      zhida: true,
      pageIndex: 1,
      hasEnd: false,
      searchResult: [],

      isHotkeyShow: true,
      isSearchLoadingShow: false,
      isMoreLoadingShow: false,
      isNoResultShow: false
    };
  },
  created() {
    this._gethotkey();
    // console.log(undefined.length)
    console.log(this.history)
    if(this.history)
      console.log('true')
    console.log(this.isHistoryShow)
    // let list=clearHis()
    // console.log(list)
  },
  methods: {
    _gethotkey() {
      getHotKey().then(res => {
        if (res.code === 0) this.hotKey = res.data.hotkey.slice(0, 18);
      });
    },
    selectKey(key) {
      this.$refs.seachBox.changeKey(key);
      this.query = key;
    },
    showhotkey(c) {
      this.isHotkeyShow = !c;
    },
    //第一次进行关键词搜索时
    search(key) {
      if (key === "") {
        this.searchResult = [];
        this.query = "";
        this.isNoResultShow = false;
        this.isSearchLoadingShow = false;
        return;
      }
      
      this.searchResult = [];
      this.pageIndex = 1;
      this.query = key;
      this.isSearchLoadingShow = true;
      this.hasEnd = false;
      this.isNoResultShow = false;
      getResult(key, this.pageIndex, this.zhida).then(res => {
        if (res.code === 0) {
          this.isSearchLoadingShow = false;
          this.searchResult = this._getdata(res.data);
          this._hasEnd(res.data);
          this.isNoResultShow = true;
           this.setHistory(key);
        }
      });
    },
    //上拉加载
    searchMore() {
      if (this.hasEnd || !this.searchResult) return;
      this.pageIndex++;
      this.isMoreLoadingShow = true;
      getResult(this.query, this.pageIndex, this.zhida).then(res => {
        this.isMoreLoadingShow = false;
        this.searchResult = this.searchResult.concat(this._getdata(res.data));
        this._hasEnd(res.data);
      });
    },
    _hasEnd(data) {
      if (data.song.curpage * data.song.curnum >= data.song.totalnum)
        this.hasEnd = true;
    },
    _getdata(data) {
      let ret = [];
      if (data.zhida.singermid && this.pageIndex == 1) {
        ret.push({
          type: "singer",
          albumnCount: data.zhida.albumnum,
          songCount: data.zhida.songnum,
          id: data.zhida.singermid,
          Fname: data.zhida.singername,
          FimgUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.zhida.singermid}.jpg`
        });
      }
      if (data.song.list.length > 0) {
        data.song.list.forEach(music => {
          ret.push(createSong(music));
        });
      }
      return ret;
    },
    getTitle(s) {
      if (s.type) return s.Fname;
      else {
        return s.name;
      }
    },
    getsubTitle(s) {
      if (s.type) return `单曲：${s.songCount} -- 专辑：${s.albumnCount}`;
      else {
        return s.singer;
      }
    },
    resultclick(s) {
      if (s.type == "singer") {
        console.log(s.id);
        this.set_singer(s);
        this.$router.push({ name: "singerDetail", params: { id: s.id } });
      }else{
        this.addSong(s)
      }

    },
    chooseHis(h) {
      this.selectKey(h);
    },
    clearAll(){
      this.clearHistory()
    },
    ...mapMutations(["set_singer"]),
    ...mapActions(["setHistory",'clearHistory','addSong'])
  },
  components: {
    searchBox,
    scroll,
    loading,
    saveList
  },
  computed: {
    isHistoryShow() {
      return  this.history.length >0&& !this.isSearchLoadingShow && !this.isHotkeyShow &&this.searchResult.length==0&&!this.query;
    },
    ...mapGetters(["history"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
@import '~stylus/mixin';

.search-container {
  position fixed
  width 100%
  top 70px
  bottom 60px
  .hotkey {
    padding: 10px;

    .title {
      line-height: 20px;
      font-size: 18px;
      color: $color-text-d;
    }

    .hotkey-item {
      display: inline-block;
      border: 1px solid #cccccc;
      padding: 6px;
      line-height: 18px;
      font-size: 16px;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 16px;
      color: $color-text-ll;
    }
  }

  .scroll-wraper {
    position: absolute;
    top: 50px;
    bottom: 0;
    overflow: hidden;
    width: 100%;

    .searchloading {
      position: absolute;
      top: 50px;
    }

    .noreult {
      position: absolute;
      top: 50px;
      width: 100%;
      text-align: center;
      color: $color-text-l;
    }

    .search-result {
      .search-item {
        position: relative;
        height: 40px;
        border-bottom: 2px solid $color-highlight-background;
        padding: 5px 0;

        .left {
          position: absolute;
          left: 0;
          top: 5px;
          width: 40px;
          height: 40px;
          text-align: center;

          img {
            width: 80%;
            border-radius: 50%;
            margin-top: 4px;
          }

          span {
            line-height: 40px;
          }
        }

        .right {
          width: 100%;
          box-sizing: border-box;
          padding-left: 40px;
          line-height: 20px;

          .song {
            font-size: 15px;
            color: $color-text-ll;
            no-wrap();
          }

          .singer {
            font-size: 12px;
            color: $color-text-l;
            no-wrap();
          }
        }
      }
    }
    .history-wraper{
      p{
        line-height 40px
        text-align center
        color $color-theme
      }
    }
  }
}
</style>