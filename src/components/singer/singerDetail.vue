<template>
  <div class="singer-detail">
      <musice-view :songs="songs" :bgimg='singer.FimgUrl' :title='singer.Fname'></musice-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { createSong } from "js/class";
import musiceView from "cps/base/musicView";
export default {
  data() {
    return {
      songs: []
    };
  },
  created() {
    this._getSingerdata();
  },
  methods: {

    _getSingerdata() {
      if (!this.singer.id) {
        this.$router.push({ path: "/singer" });
        return;
      }
      this.songs=[]
      getSingerDetail(this.$store.getters.singer.id).then(res => {
        if (res.code == 0) {
          this._normalizeSong(res.data.list);
        }
      });
    },
    _normalizeSong(list) {
      list.forEach(i => {
        this.songs.push(createSong(i.musicData));
      });
    }
  },
  components: {
    musiceView
  },
  computed: {
    ...mapGetters(["singer"])
  },
  watch:{
    singer(){
      this._getSingerdata()
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>