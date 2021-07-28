<template>
  <el-dropdown type="primary" :size="size" trigger="click">
    <el-button type="primary" class="whb" >
      {{checkedMenu.label}}
      <i class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="menu in menus" :key="menu.value" @click.native="selectedThis(menu)">{{menu.label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import {
  Dropdown,
  DropdownMenu,
  DropdownItem } from 'element-ui'
export default {
  name: 'DropdownBtn',
  components: {
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem
  },
  props: {
    menus: {
      required: true,
      type: Array
    },
    checkedMenu: {
      required: true,
      type: Object
    }
  },
  methods: {
    selectedThis (menu) {
      // this.$emit('update:checkedMenu', menu)
      this.$emit('click', menu)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.whb {
  background:#4972F1;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #FFFFFF;
  font-size:16px;
  border-radius:8px;
  padding: 10px 15px;
}
</style>
