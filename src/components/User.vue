<template>
  <div class="public-row user-box">
    <div>
    <slot></slot>
    </div>
    <div class="public-row__center">
      <img class="user-avatar" src="https://3d-fabric.oss-cn-beijing.aliyuncs.com/public-images/logo.png" alt="用户头像">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native ="btn">退出系统</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>
<script>
import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
export default {
  components: {
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    btn () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.user-box{
  justify-content: space-between;
  .user-avatar{
    width: 50px;
    height: 50px;
    background-color: $theme-lan;
    border-radius: $yj-10;
    margin-right: 20px;
  }
  .el-dropdown-link{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    cursor: pointer;
  }
  .margin-30{
    margin-left: 30px;
  }
}
</style>
