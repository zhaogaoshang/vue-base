<template>
  <el-dialog
    :show-close="showClose"
    append-to-body
    :visible.sync="dialogVisible"
    :width="width"
    @close="close"
    :destroy-on-close="true"
    :close-on-click-modal="modalClose"
    center>
    <div slot="title" class="dia_title">
        <span>{{title}}</span>
        <slot class="absolute_btn" name="btn"></slot>
    </div>
    <slot v-if="dialogVisible"></slot>
 </el-dialog>
</template>

<script>
import {
  Dialog
} from 'element-ui'
export default {
  name: 'CenterDialog',
  components: {
    ElDialog: Dialog
  },
  data () {
    return {
    }
  },
  props: {
    width: {
      type: String,
      default: '36.5%',
      discription: '百分数  比如50%'
    },
    title: {
      type: String,
      default: '提示'
    },
    dialogVisible: {
      type: Boolean,
      discription: '弹窗开关'
    },
    showClose: {
      type: Boolean,
      default: false
    },
    modalClose: {
      default: true,
      type: Boolean,
      discription: '是否能通过点击遮罩层关闭弹窗'
    }

  },

  methods: {
    close () {
      this.$emit('close')
      this.$emit('update:dialogVisible', false)
    }

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .el-dialog__header {
    padding:0;
  }
  .dia_title {
    position: relative;
    height: 81px;
    line-height: 81px;
    font-size: 20px;
    font-weight: bold;
    border-bottom:1px solid #ECECEC;
  }
  // /deep/.el-dialog__body {
  //   padding-bottom:60px!important;
  // }
  /deep/.dialog-footer .el-button.el-button--primary {
    border-radius: 3px!important;
  }
  /deep/.dia_title .el-button  {
    position: absolute;
    right: 35px;
    top: 23.5px;
    font-size: 14px;
    height: 34px;
    width: 83px;
  }
</style>
