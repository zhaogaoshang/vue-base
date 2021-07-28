<template>
    <div class="notfind-page">
        <img class="bg-image" src="@/assets/404.jpg" alt="加载失败">
        <Elbutton class="black" @click="hand_black">返回</Elbutton>
    </div>
</template>
<script>
import {Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  components: {
    Elbutton: Button
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    //  返回按钮，返回上一步
    hand_black () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.notfind-page{
    .bg-image{
        width: 100%;
        height: 100vh;
    }
    .black{
        background: none;
        position: fixed;
        color: #c9d6e7;
        top:55%;
        left:57.5%;
        font-size: 20px;
        font-weight: 500;
        border: none;
    }
}
</style>
