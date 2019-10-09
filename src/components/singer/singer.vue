<template>
  <div class="singer-container">
    <singer-list :singerList="singerList" @selectSinger="select"></singer-list>
      <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import singerList from "./singerList";
import ERR_OK from "api/query.config.js";
import { singer } from "js/class";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
const HOT_NAME = "热门";
const HOT_COUNT = 10;
export default {
  components: {
    singerList
  },
  data() {
    return {
      singers: [],
      singerList: []
    };
  },
  created() {
    this._getSingerData();
  },
  methods: {
    ...mapMutations(["set_singer"]),
    ...mapGetters(["singer"]),

    select(singer) {
      this.set_singer(singer);
      this.$router.push({ name: "singerDetail" });     
    },
    _getSingerData() {
      axios.get("api/singerList").then(res => {
        if (res.data.code === ERR_OK) {
          this.singers = res.data.data.list;
          this.singerList = this._normalizeData(this.singers);
        }
      });
    },
    _normalizeData(list) {
      let temp = {
        hot: {
          title: HOT_NAME,
          singers: []
        }
      };
      list.forEach((s, i) => {
        if (i < HOT_COUNT) {
          temp.hot.singers.push(new singer(s.Fsinger_name, s.Fsinger_mid));
        }
        if (!temp[s.Findex]) {
          temp[s.Findex] = {
            title: s.Findex,
            singers: []
          };
        }
        temp[s.Findex].singers.push(new singer(s.Fsinger_name, s.Fsinger_mid));
      });
      let hot = [];
      let gen = [];
      for (let k in temp) {
        if (k === "hot") {
          hot.push(temp[k]);
        } else {
          gen.push(temp[k]);
        }
      }
      gen.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      // gen.forEach(g=>{
      //     hot.push(g)
      // })
      return hot.concat(gen);
    }
  }
};
</script>

<style lang="stylus" scoped>
.singer-container {
  position: fixed;
  top: 70px;
  bottom: 0;
  width: 100%;
}
</style>