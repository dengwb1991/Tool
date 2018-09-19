<template>
  <div class="home">
    <p @click="jump('city')">City</p>
    <p @click="jump('tab')">Tab</p>
    <p @click="jump('drawer')">Drawer</p>
  </div>
</template>

<script>
import { showMsg } from 'dwb-console'

export default {
  methods: {
    jump (name) {
      this.$router.push(name)
    }
  },
  created () {
    showMsg && showMsg()
  }
}
</script>

<style lang="less" scoped>
.home {
  padding: 40/75rem 30/75rem;
  p {
    font-size: 32/75rem;
    line-height: 45/75rem;
    display: inline-block;
    position: relative;
    color: #FFF;
    padding: 0 12/75rem;
    display: inline-block;
    margin: 20/75rem;
    background-color: #467FEF;
    &:before {
      content: '';
      position: absolute;
      border: 1px solid #467FEF;
      border-radius: 4px;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 200%;
      height: 200%;
      transform: scale(.5);
      transform-origin: 0 0;

    }
  }
}
</style>