<template>
  <div class="example">
    <p class="title">Multiple</p>
    <DwbVueTab :data="data"
         :active.sync="active"
         :initCallback="initCallback"
         :tabWidth="tabWidth"
         :tabHeight="tabHeight"
         :lineWidth="lineWidth"
         @callback="getData"/>
    <Params :data="paramsData"/>
  </div>
</template>

<script>
import Params from './Params'

export default {
  components: {
    Params
  },
  data () {
    return {
      data: ['Google', 'IBM', 'Apple', 'Oracle', 'Facebook', 'Baidu'],
      active: 0,
      tabWidth: '100px',
      tabHeight: '40px',
      lineWidth: '30px',
      initCallback: true,
      result: null,
      paramsData: []
    }
  },
  methods: {
    getData (res) {
      this.result = res
    },
    getParamsData () {
      this.paramsData = Object.entries({
        data: this.data,
        active: this.active,
        tabWidth: this.tabWidth,
        tabHeight: this.tabHeight,
        lineWidth: this.lineWidth,
        initCallback: this.initCallback,
        result: this.result
      })
    }
  },
  watch: {
    active: 'getParamsData',
    result: 'getParamsData'
  },
  created () {
    this.getParamsData()
  }
}
</script>

<style lang="less" scoped>
.title {
  font-family: PingFangSC-Medium;
  font-size: 48/75rem;
  padding: 20/75rem 0 20/75rem 20/75rem;
}
</style>