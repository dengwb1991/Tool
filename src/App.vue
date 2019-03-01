<template>
  <div id="app">
    <owl-button :text="'按钮'"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/app.less';
</style>
