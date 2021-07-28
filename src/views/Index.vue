<template>
  <div class="container">
    <tab-button :active.sync="activeId" :options="options"></tab-button>
    <div class="row">
      <btn @click="handleclick()">点击</btn>
      <dropdown-btn :menus="menus" :checkedMenu="checkedMenu" @click="handleCheckMenu"></dropdown-btn>
    </div>
    <div class="row">
      <file-upload><btn>上传</btn></file-upload>
    </div>
  </div>
</template>
<script>
import TabButton from '@/components/TabButton'
import Btn from '@/components/Btn'
import DropdownBtn from '@/components/DropdownBtn'
import FileUpload from '@/components/FileUpload'
export default {
  components: {
    TabButton,
    Btn,
    DropdownBtn,
    FileUpload
  },
  name: 'Index',
  data () {
    return {
      options: [
        {name: '门店端', id: '1'},
        {name: '生产端', id: '2'},
        {name: '面料端', id: '3'}
      ],
      menus: [{label: '奥利给1', value: '1'}, {label: '奥利给2', value: '2'}, {label: '奥利给3', value: '3'}],
      checkedMenu: {label: '奥利给3', value: '3'},
      activeId: '1'
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    handleclick () {
      console.log('asd')
    },
    handleCheckMenu (menu) {
      this.checkedMenu = menu
    }
  }
}
</script>
<style lang="scss">
.container{
  height: 100vh;
}
.row {
  padding: 20px;
}
</style>
