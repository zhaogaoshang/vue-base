<template>
  <div class="container public-row">
  <!-- <aside-box></aside-box> -->
  <!-- 右边 -->
  <div class="public-right__box">
    <!-- 上面 -->
    <div class="public-row public-handel-user__box">
      <!-- <user>
        <template v-slot:search>
          <search></search>
        </template>
        <template v-slot:right>
          <span class="margin-30 el-icon-switch-button"></span>
        </template>
      </user> -->
    </div>

    <!-- 底部入口 -->
    <div class="public-row__center">
      <!-- <btn-preservation v-for="(item, index) in categoryList" :key="index" :info="item.name"  @click.native="handleGomanAndWoman(item.router, item.params)"></btn-preservation> -->
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.container{
}
</style>
