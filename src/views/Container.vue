<template>
  <div class="public-row index-info__box">
    <aside-box stylePick="2">
      <aside-tree></aside-tree>
    </aside-box>
    <div class="public-column right-box">
      <div class="user-box__aubot">
        <user></user>
      </div>
      <div class="switch-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import AsideBox from '../components/AsideBox.vue'
import AsideTree from '../components/AsideTree.vue'
import User from '../components/User.vue'
export default {
  components: { AsideBox, AsideTree, User },
  name: 'Index',
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
<style lang="scss" scoped>
.index-info__box{
  .right-box{
    flex: 1;
    height: 100vh;
    overflow-y: scroll;
    background-color: white;
    .user-box__aubot{
      padding: 30px;
    }
    .switch-box{
      flex: 1;
      overflow-y: scroll;
    }
  }
}
</style>
