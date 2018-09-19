<template>
  <div>
    <Tab @callback="get"/>
  </div>
</template>

<script>
export default {
  methods: {
    get (item) {
      console.log(item)
    }
  }
}
</script>