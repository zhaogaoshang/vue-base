<template>
  <div class="aside">
    <el-menu
      :default-active="$store.state.aside.activeItemPath"
      text-color="#FFFFFF"
      active-text-color="#4972F1"
      background-color="#4972F1"
      class="el-menu-vertical-demo"
      router
      @select="handlePickMenu"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu :index="index" v-for="(item, index) in list" :key="index">
        <template slot="title">
          <img class="left-icon" :src="'./../../static/' + item.icon" alt="">
          <span class="title-text">{{item.name}}</span>
        </template>
        <el-menu-item :index="only.path" v-for="(only, idx) in item.sub" :key="idx" @click="handlePickitem(only)">{{only.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import {Menu, MenuItem, Submenu} from 'element-ui'
export default {
  name: 'Aside',
  components: {
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem
  },
  data () {
    return {
      list: [
        {
          name: '个性化设置',
          icon: 'caidan-shezhi.png',
          sub: [
            {
              name: '门店个性化设置',
              path: '/personality/store'
            },
            {
              name: '面料个性化设置',
              path: '/personality/cloth'
            }
          ]
        },
        {
          name: '企业管理',
          icon: 'caidan-qiye.png',
          sub: [
            {
              name: '企业账号管理'
            },
            {
              name: '企业类别管理'
            }
          ]
        },
        {
          name: '面料管理',
          icon: 'caidan-mianliao.png',
          sub: [
            {
              name: '面料资源管理'
            },
            {
              name: '品牌信息维护'
            }
          ]
        },
        {
          name: '基础资料',
          icon: 'caidan-jichu.png',
          sub: [
            {
              name: '单品品类管理',
              path: '/base/single'
            },
            {
              name: '套装品类管理',
              path: '/base/suit'
            },
            {
              name: '图片管理',
              path: '/base/photo'
            },
            {
              name: '资源模型管理',
              path: '/base/model'
            },
            {
              name: '组件联动管理',
              path: '/base/model/link'
            },
            {
              name: '部位标签管理',
              path: '/base/position/label'
            },
            {
              name: '量体部位管理',
              path: '/base/measure'
            },
            {
              name: '特体部位管理',
              path: '/base/position/special'
            },
            {
              name: '面料品牌管理',
              path: '/base/cloth/brand'
            },
            {
              name: '报损原因管理',
              path: '/base/loss'
            },
            {
              name: '放量原因管理',
              path: '/base/largesse'
            }
          ]
        },
        {
          name: '系统设置',
          icon: 'caidan-xitong.png',
          sub: [
            {
              name: '版本管理'
            }
          ]
        }
      ]
    }
  },

  created () {
  },

  mounted: function () {
  },

  computed: {
  },

  methods: {
    //
    handlePickitem () {},

    // 点击激活菜单-标识
    handlePickMenu (e, data) {
      console.log(e, data)
    },

    //
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },

    //
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.aside{
  width: 80%;
  .el-menu-vertical-demo.el-menu{
    border: 0;
  }
  .title-text{
    font-size: 22px;
    font-weight: 500;
    color: #FFFFFF;
  }
  .left-icon{
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  /deep/ .el-menu-item{
    font-size: 18px;
    font-weight: 400;
    color: #4972F1;
  }
  /deep/ .el-submenu__title{
    padding-left: 0px !important;
  }
  /deep/ .is-active{
    color: $theme-lan !important;
    background-color: white !important;
    border-radius: 30px 0 0 30px;
  }
  /deep/ .el-icon-arrow-down:before {
    color: white;
  }
}
</style>
