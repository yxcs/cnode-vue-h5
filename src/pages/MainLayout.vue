<template>
  <div>
    <!-- <HeadAD></HeadAD>
    <SearchLink></SearchLink> -->
    <router-view/>
  </div>
</template>

<script>
import HeadAD from '@/components/HeadAD'
import SearchLink from '@/components/SearchLink'
export default {
  name: 'mainLayout',
  components: {
    HeadAD,
    SearchLink
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>