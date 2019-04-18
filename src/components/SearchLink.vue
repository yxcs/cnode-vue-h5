<template>
  <div class="head__search--wrap" v-on:click="goToSearch">
    <div class="head__search--holder">请输入您想要的商品</div>
  </div>
</template>

<script>
import './style.css'
export default {
  name: 'searchLink',
  data () {
    return {
      time: '01:48:35.8'
    }
  },
  methods: {
    goToSearch() {
      console.log('search')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>