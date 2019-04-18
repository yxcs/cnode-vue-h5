<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
  }
}
</script>

<style>
  body,div,ul,li,p { padding: 0; margin: 0;}
  a {text-decoration: none;}
  #app {
    max-width: 750px;
    margin: 0 auto;
  }
</style>
