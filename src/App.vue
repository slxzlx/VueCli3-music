<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import MHeader from "./components/header/header";
import player from 'cps/base/player'
import tab from 'cps/tab/tab'
export default {
  components: {
    MHeader,tab,player
  }
};
</script>
<style lang="stylus">
//
</style>
