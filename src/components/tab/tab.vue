<template>
  <div class="tab">
    <router-link tag='div' class="tab-item recommend" to='/recommend'><span>推荐</span> </router-link>
    <router-link tag='div' class="tab-item singer" to='/singer'> <span>歌手</span> </router-link>
    <router-link tag='div' class="tab-item rank" to='/rank'><span>排行</span></router-link>
    <router-link tag='div' class="tab-item search" to='/search'><span>搜索</span></router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';

.tab {
  display: flex;

  .tab-item {
    flex: 1;
    text-align: center;
    span{
        color: $color-dialog-background;
        font-weight 700
        font-size: $font-size-medium-x;
        line-height: 20px;
        padding-bottom 5px
        display inline-block
    }

    &.active span {
      color:$color-theme;
      border-bottom 1px solid  $color-theme
    }
  }
}
</style>