<template>
  <div class="params">
    <div class="content-wrapper">
      <ul>
        <li v-for="(item, index) in data"
            :key="index">
          <div>{{item[0]}}<span>:</span>
            <p>{{JSON.stringify(item[1])}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style lang="less" scoped>
.params {
  width: 100%;
  padding: 20/75rem 20/75rem 60/75rem 20/75rem;
  .content-wrapper {
    background: #333;
    border-radius: 10/75rem;
    padding: 20/75rem;
  }
  li {
    position: relative;
    padding: 10/75rem 0;
    overflow: hidden;
    div {
      font-family: PingFangSC-Medium;
      font-size: 32/75rem;
      display: inline-block;
      color: #2ecc71;
      span {
        padding-left: 10/75rem;
        color: #FFF;
        font-size: 32/75rem;
      }
      p {
        float: right;
        max-width: 500/75rem;
        width: 450/75rem;
        display: inline-block;
        font-family: PingFangSC-Regular;
        padding-left: 20/75rem;
        font-size: 32/75rem;
        color: #ffd400;
        word-break: normal;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
}
</style>