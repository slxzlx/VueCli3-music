<template>
  <div class="song-list">
    <ul class="list-wraper">
      <li
        class="song-item"
        @click="selectSong(song,index)"
        v-for="(song,index) in songs"
        :key="song.id"
      >
       <div class="top">{{index+1}}</div>
        <div class="song-content">
          <h2 class="song-name">{{song.name}}</h2>
          <p class="song-desc">{{song.singer + "-" + song.albumn}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: null
    },
    showTop: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectSong(song, index) {
      this.$emit("playSong", song, index);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
@import '~stylus/mixin';

.song-list {
  width: 100%;

  .song-item {
    display: flex;
    padding: 5px;
    .top{
     width 50px
     text-align center
     line-height 50px
    }
    .song-content {
      flex: 1;
      line-height: 20px;
      font-size: 14px;
      // width: 100%;
      overflow hidden
      .song-name {
        color: #ffffff;
        no-wrap();
      }

      .song-desc {
        no-wrap();
        color: $color-text-d;
      }
    }
  }
}
</style>