<!-- 省市区插件 -->
<template>
  <div class="city">
    <button @click="open">打开</button>
    <br>
    <input v-model="valA"/>
    <button @click="openA">展示</button>

    <input v-model="valB"/>
    <button @click="openB">展示</button>

    <p>结果：</p>
    <div>{{result}}</div>

    <dwb-city v-model="show"
          :city="city"
          ref="city"
          @change="getData"/>
  </div>
</template>

<script>
// import { dwbCity } from 'dwb-city'
import cityData from '@/assets/json/city.json'

export default {
  // components: {
  //   dwbCity
  // },
  data () {
    return {
      cityData,
      // city: ['黑龙江省', '佳木斯市', '向阳区'],
      // city: [110000, 110100, 110112],
      city: null,
      show: false,
      result: null,
      valA: '黑龙江省,佳木斯市,向阳区',
      valB: '110000,110100,110112'
    }
  },
  methods: {
    open () {
      this.show = true
    },
    getData (data) {
      this.result = data
    },
    openA () {
      this.$refs.city.setCurr(this.valA ? this.valA.split(',') : '')
      this.open()
    },
    openB () {
      this.$refs.city.setCurr(this.valB ? this.valB.split(',') : '')
      this.open()
    }
  }
}
</script>

<style lang="less" scoped>
.city {
  padding: 30/75rem;
}
input {
  height: 88/75rem;
  line-height: 88/75rem;
  font-size: 32/75rem;
  width: 500/75rem;
  margin-bottom: 40/75rem;
}
button {
  height: 88/75rem;
  line-height: 88/75rem;
  margin-left: 20/75rem;
  width: 100/75rem;
  background: orange;
  border: none;
  border-radius: 4/75rem;
  font-family: PingFangSC-Medium;
  font-size: 32/75rem;
  color: #FFFFFF;
  user-select: none;
  outline: none;
}
</style>