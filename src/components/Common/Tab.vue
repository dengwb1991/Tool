<template>
  <div class="tab" :style="BaseStyle">
    <ul :style="[ulStyle, ulWidth, ulTransform, ulTransition]"
        @touchstart="doTouchStart($event)"
        @touchmove="doTouchMove($event)"
        @touchend="doTouchEnd($event)">
      <li ref="tab"
          v-for="(item, index) in data"
          :key="index"
          :class="index === activeIndex ? 'active' : ''"
          :style="index === activeIndex ? [activeColor, activeStyle] : defaultColor"
          @click="tap({ item, index })">
        {{name ? item[name] : item}}
      </li>
      <div ref="line"
           class="line"
           v-if="lineUse"
           :style="[underlineStyle, underlineLeft]"></div>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      liWidth: 0, // 元素真实宽度
      lineRealWidth: 0, // 线真实宽度
      tabTransX: 0, // tab x轴位置
      tabTransition: null, // tab 动画
      activeIndex: this.active, // 选中元素的下标
      tabsIns: null,
      surplusWidth: 0
    }
  },
  props: {
    data: { // * 数据
      type: Array,
      default: () => {
        return []
      }
    },
    tabWidth: { // tab宽度
      type: String,
      default: '110px'
    },
    tabHeight: { // tab高度
      type: String,
      default: '40px'
    },
    tabColor: { // tab字体颜色
      type: String,
      default: '#999'
    },
    tabStyle: { // tab自定义样式
      type: Object,
      default: () => {
        return {}
      }
    },
    fontSize: { // 字体大小
      type: String,
      default: '14px'
    },
    fontFamily: { // 字体
      type: String,
      default: 'PingFangSC-Regular'
    },
    name: { // 如果元素为对象 展示key
      type: [String, Object],
      default: null
    },
    active: { // 选中位置
      type: [Number, String],
      default: 0
    },
    background: { // 背景颜色
      type: String,
      default: '#FFF'
    },
    highlight: { // 高亮
      type: String,
      default: '#A5884D'
    },
    activeStyle: { // 选中自定义样式
      type: Object,
      default: () => {
        return {}
      }
    },
    lineUse: { // 底线是否使用
      type: Boolean,
      default: true
    },
    lineHeight: { // 底线高度
      type: String,
      default: '2px'
    },
    lineWidth: { // 底线宽度
      type: [String, Object],
      default: null
    },
    lineColor: { // 底线颜色
      type: String,
      default: '#A5884D'
    },
    lineStyle: { // 底线自定义样式
      type: Object,
      default: () => {
        return {}
      }
    },
    initCallback: { // 是否初始化执行callback
      type: Boolean,
      default: false
    }
  },
  computed: {
    ulTransform () { // tab位置
      return {
        '-webkit-transform': `translateX(${this.tabTransX}px)`
      }
    },
    ulTransition () { // tab动画
      return {
        '-webkit-transition': this.tabTransition
      }
    },
    ulWidth () { // tab宽度
      const unitArr = this.tabWidth ? this.getUnitArr(this.tabWidth) : null
      const width = unitArr ? unitArr[1] : 0
      return {
        width: this.data.length > 4 ? `${this.data.length * width}${unitArr[2]}` : '100%'
      }
    },
    BaseStyle () { // 根元素 基本样式
      return {
        background: this.background,
        'font-size': this.fontSize,
        'font-family': this.fontFamily
      }
    },
    ulStyle () { // tab基本样式
      return {
        height: this.tabHeight,
        'line-height': this.tabHeight,
        ...this.tabStyle
      }
    },
    defaultColor () { // 默认字体颜色
      return {
        color: this.tabColor
      }
    },
    activeColor () { // 选中字体颜色
      return {
        color: this.highlight
      }
    },
    underlineStyle () { // 线基本样式
      return {
        width: !this.lineWidth ? `${this.liWidth}px` : this.lineWidth,
        height: this.lineHeight,
        background: this.lineColor,
        ...this.lineStyle
      }
    },
    underlineLeft () { // 线位置
      return {
        left: `${this.activeIndex * this.liWidth + ((this.liWidth - this.lineRealWidth) / 2)}px`
      }
    }
  },
  methods: {
    doTouchStart (event) {
      event.stopPropagation()
      this.tabTransition = null
      this.tabsIns = {
        ...this.tabsIns,
        X: event.touches[0].pageX - parseFloat(this.tabTransX)
      }
    },
    doTouchMove (event) {
      if (this.data.length <= 4) return
      event.preventDefault()
      const surplusWidth = this.surplusWidth

      let transX = event.touches[0].pageX - this.tabsIns.X
      if (surplusWidth + event.touches[0].pageX - this.tabsIns.X < 0) {
        transX = -surplusWidth - (this.tabsIns.X - event.touches[0].pageX - surplusWidth) / 8
      } else if (transX > 0) {
        transX = transX / 8
      }
      this.tabTransX = transX
    },
    doTouchEnd (event) {
      if (this.tabTransX > 0) {
        this.tabTransX = 0
      } else if (this.tabTransX < -this.surplusWidth) {
        this.tabTransX = -this.surplusWidth
      }
      this.duration = '200ms'
    },
    getUnitArr (data) { // 100px ['100px', '100', 'px']
      return /^([0-9|\\.]+)([a-zA-Z]+)$/.exec(data)
    },
    getLiWidth () { // 获得标签宽度
      this.liWidth = this.$refs.tab[0].offsetWidth
    },
    getLineRealWidth () { // 获得线真实宽度
      this.lineRealWidth = this.$refs.line && (this.$refs.line.offsetWidth || this.$refs.tab[0].offsetWidth)
    },
    tabPlace () { // tab位置
      this.tabTransition = '-webkit-transform 0.4s linear 0s'
      const surplusWidth = this.surplusWidth = this.liWidth * this.data.length - document.body.scrollWidth
      const centerMarginLeft = parseInt((document.body.scrollWidth - this.liWidth) / 2)
      const bodyMarginLeft = parseInt(this.$refs.tab[this.activeIndex].offsetLeft + this.tabTransX)
      let shouldTranslateX = parseInt(this.tabTransX) - (bodyMarginLeft - centerMarginLeft)
      if (shouldTranslateX > 0 && shouldTranslateX + parseInt(this.tabTransX) > 0) {
        shouldTranslateX = 0
      } else if (shouldTranslateX > 0 && shouldTranslateX + parseInt(this.tabTransX) < 0) {
        shouldTranslateX = 0
      } else if (shouldTranslateX < -surplusWidth) {
        shouldTranslateX = -surplusWidth
      }
      this.tabTransX = shouldTranslateX
    },
    tap ({ item, index }) { // 点击选中
      if (index === this.activeIndex) return
      this.activeIndex = index

      this.$emit('update:active', index)
      this.$emit('callback', item)

      if (this.data.length <= 4) return

      this.tabPlace()
    },
    getCurrData () { // 获得当前数据
      this.$emit('callback', this.data[this.activeIndex])
    }
  },
  mounted () {
    this.getLiWidth()
    this.getLineRealWidth()
    this.tabPlace()

    this.initCallback && this.getCurrData()
  }
}
</script>

<style scoped>
.line {
  position: absolute;
  bottom: 0px;
  left: 0;
  transition: all 0.4s ease;
}
li {
  width: 100%;
  text-align: center;
}
ul {
  position: relative;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
  transition-duration: 400ms;
}
.tab {
  width: 100%;
  overflow: hidden;
}
</style>