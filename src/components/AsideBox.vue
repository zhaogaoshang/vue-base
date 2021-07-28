<template>
  <div class="public-column__center left-box">
    <div class="public-row__center logo-box">
      <img class="public-shou logo-image" :src="path + 'logo.png'" alt="logo" @click="$router.replace('/')">
    </div>
    <div class="public-column info-box" v-if="stylePick == 2">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    stylePick: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      path: process.env.IMAGE_PATH
    }
  },
  created () {
    console.log(process.env.IMAGE_PATH)
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.left-box{
  width: 300px;
  height: 100vh;
  background: $theme-lan;
  overflow: hidden;
  .info-box{
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    align-items: stretch;
    align-items: flex-end;
  }
  .logo-box{
    padding: 50px 90px;
    .logo-image{
      width: 130px;
      height: 153px;
    }
  }
}
</style>
