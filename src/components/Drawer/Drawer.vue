<template>
  <div class="drawer">
    <div class="open" @click="show('bottom')">BOTTOM</div>
    <div class="open" @click="show('left')">LEFT</div>
    <div class="open" @click="show('top')">TOP</div>
    <div class="open" @click="show('right')">RIGHT</div>
    <Drawer :visible.sync="visible"
            :position="position"
            :lockScroll="lockScroll"
            :maskClosable="maskClosable"
            :zIndex="zIndex"
            :maskStyle="maskStyle"
            :containerStyle="containerStyle"
            @open="open"
            @close="close">
      <ul>
        <li>111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
        <li>555</li>
        <li>666</li>
      </ul>
    </Drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      position: 'bottom',
      lockScroll: true,
      maskClosable: true,
      zIndex: 200,
      maskStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      },
      containerStyle: {
        background: '#F5F5F5'
      }
    }
  },
  methods: {
    show (position) {
      // Change position, Because position for computed, Need to use setTimeout
      this.position = position
      setTimeout(() => {
        this.visible = true
      }, 400)
    },
    open () {
      console.log('open callback')
    },
    close () {
      console.log('close callback')
    }
  }
}
</script>

<style lang="less" scoped>
.drawer {
  padding: 30/75rem 30/75rem;
  ul {
    padding: 20/75rem 30/75rem;
  }
  .open {
    font-size: 32/75rem;
    line-height: 66/75rem;
  }
}
</style>