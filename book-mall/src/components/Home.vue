<template>
  <div class="hello">
    <BaseHeader/>
    <router-view/>
  </div>
</template>

<script>
import BaseHeader from './index/BaseHeader'
export default {
  name: 'HelloWorld',
  components: {
    BaseHeader
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
