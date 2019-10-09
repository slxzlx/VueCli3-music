<template>
  <div class='rank-detail'>
      <music-view></music-view>
  </div>
</template>

<script>
import musicView from 'cps/base/musicView'
export default {
created(){
},
components:{
    musicView
}
};
</script>

<style lang="stylus" scoped>
.rank-detail{
  position fixed
  width 100%
  background-color #ccc
  top 0
  bottom 0

}
</style>