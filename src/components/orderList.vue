<template>
  <div>
    {{list}}
  </div>
</template>

<script>

import axios from "axios"

export default {
  data() {
      return {
          list: [],
      }
  },

  async mounted() {
      let feach = await axios.get("https://panjs.com/ywc18.json")
      console.log(feach.data)
      feach.data.categories.forEach(element => {
          this.list = element
      });
  },
}
</script>

<style lang="stylus">

</style>