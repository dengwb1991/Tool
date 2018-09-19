<template>
  <div class="tab">
    <ul :style="[ulStyle, ulWidth]">
      <li ref="tab"
          v-for="(item, index) in config.data.items"
          :key="index"
          :class="index === activeIndex ? 'active' : ''"
          :style="index === activeIndex ? activeColor : defaultColor"
          @click="tap({ item, index })">
        {{config.data.name ? item[config.data.name] : item}}
      </li>
      <div class="line"
           v-if="config.line.use"
           :style="[lineStyle, lineWidth, lineLeft]"></div>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      liWidth: 0,
      activeIndex: this.config.data.active
    }
  },
  props: {
    config: { // 配置
      type: Object,
      default: () => {
        return {
          data: { // 数据
            items: [{ name: 'AA' }, { name: 'BB' }, { name: 'CC' }, { name: 'DD' }, { name: 'EE' }, { name: 'AA' }, { name: 'BB' }, { name: 'CC' }], // 数据
            // items: [{ name: 'AA' }, { name: 'BB' }, { name: 'CC' }, { name: 'DD' }], // 数据
            width: '3rem',
            name: 'name', // 如果为对象 展示key
            active: 1, // * 选中位置
            color: '#999', // 字体颜色
            highlight: '#A5884D' // * 高亮
          },
          line: { // 线
            use: true,
            height: '3px',
            width: null,
            color: '#A5884D'
          }
        }
      }
    }
  },
  computed: {
    ulWidth () { // tab宽度
      const data = this.config.data
      const unitArr = data.width ? this.getUnitArr(data.width) : null
      const width = unitArr ? unitArr[1] : 0
      return {
        width: data.items.length > 4 ? `${data.items.length * width}${unitArr[2]}` : '100%'
      }
    },
    ulStyle () {
      return {}
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
        left: `${this.activeIndex * this.liWidth}px`
      }
    }
  },
  methods: {
    getUnitArr (data) { // 100px ['100px', '100', 'px']
      return /^([0-9|\\.]+)([a-zA-Z]+)$/.exec(data)
    },
    getLiWidth () { // 获得标签宽度
      this.liWidth = this.$refs.tab[0].offsetWidth
    },
    tap ({ item, index }) { // 点击选中
      if (index === this.activeIndex) return
      this.activeIndex = index

      this.$emit('callback', item)
    }
  },
  mounted () {
    this.getLiWidth()
  }
}
</script>
<style lang="less" scoped>
.line {
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.2s ease;
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
  background: #FFF;
}
.tab {
  width: 100%;
  overflow: hidden;
}
</style>