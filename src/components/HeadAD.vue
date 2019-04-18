<template>
  <div class="head__ad--wrap" v-on:click="goToDownload">
    <div class="head__ad--money">50元</div>
    <div class="head__ad--desc">
      <p class="time">{{time}}<span>后过期</span></p>
      <p class="download">下载app领取新用户限量专属特权</p>
    </div>
  </div>
</template>

<script>
import './style.css'
export default {
  name: 'headAD',
  data () {
    return {
      time: '01:48:35.8'
    }
  },
  methods: {
    goToDownload() {
      console.log('download')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>