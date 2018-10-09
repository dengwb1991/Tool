<template>
  <div class="tab" :style="ulStyle">
    <ul :style="[ulStyle, ulWidth, ulTransform, ulTransition]"
        @touchstart="doTouchStart($event)"
        @touchmove="doTouchMove($event)"
        @touchend="doTouchEnd($event)">
      <li ref="tab"
          v-for="(item, index) in config.data.items"
          :key="index"
          :class="index === activeIndex ? 'active' : ''"
          :style="index === activeIndex ? activeColor : defaultColor"
          @click="tap({ item, index })">
        {{config.data.name ? item[config.data.name] : item}}
      </li>
      <div ref="line"
           class="line"
           v-if="config.line && config.line.use"
           :style="[lineStyle, lineWidth, lineLeft]"></div>
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
      activeIndex: this.config.data.active, // 选中元素的下标
      tabsIns: null,
      surplusWidth: 0
    }
  },
  props: {
    config: { // 配置
      type: Object,
      default: () => {
        return {
          data: { // 数据
            items: [{ name: '手机通讯' }, { name: '折扣轻奢' }, { name: '家用电器' }, { name: '精品数吗' }, { name: '潮鞋箱包' }, { name: '食品保健' }, { name: '品质母婴' }, { name: '电脑办公' }], // 数据
            width: '2.5rem',
            name: 'name', // 如果为对象 展示key
            active: 0, // 选中位置
            color: '#999', // 字体颜色
            background: '#FFF', // 背景颜色
            highlight: '#A5884D' // * 高亮
          },
          line: { // 线
            use: true,
            height: '0.08rem',
            width: '0.5rem',
            color: '#A5884D'
          }
        }
      }
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
      const data = this.config.data
      const unitArr = data.width ? this.getUnitArr(data.width) : null
      const width = unitArr ? unitArr[1] : 0
      return {
        width: data.items.length > 4 ? `${data.items.length * width}${unitArr[2]}` : '100%'
      }
    },
    ulStyle () { // tab基本样式
      return {
        background: this.config.data.background
      }
    },
    defaultColor () { // 默认字体颜色
      return {
        color: this.config.data.color
      }
    },
    activeColor () { // 选中字体颜色
      return {
        color: this.config.data.highlight
      }
    },
    lineStyle () { // 线基本样式
      return {
        height: this.config.line.height,
        background: this.config.line.color
      }
    },
    lineWidth () { // 线宽度
      return {
        width: !this.config.line.width ? `${this.liWidth}px` : this.config.line.width
      }
    },
    lineLeft () { // 线位置
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
      const surplusWidth = this.surplusWidth = this.liWidth * this.config.data.items.length - document.body.scrollWidth
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

      this.$emit('callback', item)
      if (this.config.data.items.length <= 4) return

      this.tabPlace()
    }
  },
  mounted () {
    this.getLiWidth()
    this.getLineRealWidth()
    this.tabPlace()
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
  height: 1rem;
  line-height: 1rem;
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