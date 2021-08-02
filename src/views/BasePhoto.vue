<template>
  <div class="base-photo">
    <el-card class="box-card">
      <div slot="header">
        <div class="public-heng">
          <div class="">
            <btn @click="params.id = 1" :type="params.id === 1 ? 'one': 'two'">全部</btn>
            &nbsp;
            &nbsp;
            <btn @click="params.id = 2"  :type="params.id === 2 ? 'one': 'two'">单品</btn>
            &nbsp;
            &nbsp;
            <btn @click="params.id = 3"  :type="params.id === 3 ? 'one': 'two'">套装</btn>
          </div>
          <div class="public-center"></div>
          <i class="el-icon-edit" @click.stop="isEdit = true" v-show="!isEdit"></i>
        </div>
      </div>
      <div class="photo-box">
        <div class="item-image" :class="isEdit? 'active-an' : ''" v-for="(item, index) in 50" :key="index" @click.stop="handleGoNextOrNavigater(index)" :style="'background-image: url(' + 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' + ');'">
          <!-- 没有编辑状态下的 -->
          <div class="public-row__center item-show__ornull item-shadow" v-show="!isEdit">
            <span class="item-text">男装1</span>
          </div>
          <!-- 编辑状态下的 -->
          <div class="public-row__center item-show__ornull" :class="index === editItem ? 'item-shadow__active' : '' " v-show="isEdit">
            <span class="item-text">男装</span>
          </div>
        </div>
      </div>
      <div class="bottom-handle__box" v-show="isEdit">
        <btn @click.native.stop="isEdit = false" type="one">取消</btn>
        &nbsp;
        &nbsp;
        <btn type="two">保存</btn>
      </div>
    </el-card>
  </div>
</template>
<script>
import {Card} from 'element-ui'
import Btn from '../components/Btn.vue'
export default {
  name: 'BasePhoto',
  components: {
    ElCard: Card,
    Btn
  },

  data () {
    return {
      isEdit: false, // 是否处于编辑状态
      editItem: {}, // 编辑项
      params: {
        id: 1
      }
    }
  },

  created () {
  },

  mounted: function () {
  },

  computed: {
  },

  methods: {
    // 调换或编辑
    handleGoNextOrNavigater (data) {
      if (this.isEdit) {
        this.editItem = data
      } else {
        this.handleGoNext()
      }
    },

    // 跳转到下一页
    handleGoNext () {
      alert(123)
      this.$router.push('/base/photo/sub')
    }
  }
}
</script>
<style lang="scss" scoped>
.base-photo{
  height: 96%;
}
.el-icon-edit{
  color: $theme-lan;
  font-size: 20px;
}
/deep/ .el-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-card__body{
    flex: 1;
    overflow-y: scroll;
  }
}
.bottom-handle__box{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.photo-box{
  display: grid;
  grid-template-columns: repeat(8,172px);
  grid-gap: 19px;
  .item-image{
    width: 172px;
    height: 230px;
    border-radius: 10px;
    background: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    cursor: pointer;
    .item-shadow{
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: .2);
    }
    .item-shadow__active{
      background-color: rgba($color: $theme-lan, $alpha: .7);
    }
    .item-show__ornull{
      width: 100%;
      height: 100%;
    }
    .item-text{
      font-size: 16px;
      font-weight: 400;
      color: #FFFFFF;
      transform: translateY(-20px);
    }
  }
}
.active-an{
  animation: activeAnimation .2s infinite;
}
@keyframes activeAnimation {
  0%{
    transform: skewX(0deg);
  }
  50%{
    transform: skewX(-1deg);
  }
  100%{
    transform: skewX(0deg);
  }
}
</style>
