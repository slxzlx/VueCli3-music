<template>
  <div class="header">
    <i class="icon"></i>
    <span class="title-text">暗黑云音乐</span>
  </div>
</template>

<script>
import ff from "cps/search/search";
export default {};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
@import '~stylus/mixin';

.header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;

  .icon {
    display: inline-block;
    vertical-align: top;
    // margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    bg-image('logo');
    background-size: 30px 32px;
  }

  .title-text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
}
</style>
