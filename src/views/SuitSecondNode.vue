<template>
  <div class="editbox">
    <div class="editbox_left">
      <div class="title">西服套装</div>
      <div class="tree_box">
        <div class="tree_box_left">
          <el-tree
            :data="data"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="currentNode!==null"
            @node-click="handleNodeClick"
            default-expand-all>
            <span :class="['custom-tree-node','text2']" slot-scope="{ node, data }">
              <span  :class="[data.status===1?'status1':'']">{{ data.label }}</span>
              <span>
                <i @click.self="handleSetNode(data)" class="el-icon-edit text2"></i>
              </span>
            </span>
          </el-tree>
        </div>
        <div class="tree_box_right">
          <div>
            男士西服
          </div>
          <div>
            男士西裤
          </div>
        </div>
      </div>

    </div>
    <!-- 套装组成 -->
    <div class="editbox_right">
      <div class="title component">
        套装组成
        <div class="save">
          <btn class="savebtn">保存</btn>
        </div>
      </div>
      <div class="componenttree">
        <el-tree
          :data="data"
          node-key="id"
          show-checkbox
          @check-change="handleCheckChange"
          :expand-on-click-node="false"
          :highlight-current="currentNode!==null"
          @node-click="handleNodeClick"
          default-expand-all>
          <span :class="['custom-tree-node','text2']" slot-scope="{ node, data }">
            <span  :class="[data.status===1?'status1':'']">{{ data.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <center-dialog @close="close" :dialogVisible.sync="dialogVisible" title="编辑分类名称">
      <div>
        <div class="form">
          <span>分类名称：</span>
          <el-input class="categoryName_input" v-model="categoryName"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <btn class="cancel" @click="handleCancel">取消</btn>
          <btn class="confirm" @click="handleConfirm" >确定</btn>
        </div>
      </div>
    </center-dialog>
  </div>
</template>

<script>
import CenterDialog from '@/components/CenterDialog'
import Btn from '@/components/Btn'
import {
  Tree,
  Button,
  Input,
  Message
} from 'element-ui'
export default {
  name: 'SuitSecondNode',
  components: {
    CenterDialog,
    Btn,
    ElTree: Tree,
    ElButton: Button,
    ElInput: Input
  },
  data () {
    return {
      dialogVisible: false,
      categoryName: '',
      currentNode: {},
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    }
  },
  methods: {
    handleSetNode (title) {
      console.log(this.currentNode)
      this.dialogVisible = true
    },
    close () {

    },
    handleCancel () {
      this.dialogVisible = false
    },
    handleConfirm () {
      this.updateCateName()
    },
    async updateCateName () {
      try {
        let params = {
          id: this.currentNode.id,
          name: this.categoryName
        }
        const res = await this.$http.post(this.$apis.api_category_update, params)
        console.log(res)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        this.currentNode.name = res.result.name
        Message.success('修改成功')
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    }
  }
}
</script>

<style lang="scss" scoped>
.editbox {
  height: 100%;
  display: flex;
  align-items: stretch;
}
.editbox_left {
  flex: 1;
  height: 100%;
  box-shadow: -2px 0px 0px rgba(211, 211, 211, 0.32) inset;
}
.editbox_right {
  flex: 1;
  height: 100%;
}
.title {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 96px;
  text-align: center;
}
.tree_box /deep/.el-tree-node__content {
  margin: 5px 0;
}
.custom-tree-node {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text2 {
  font-size: 20px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #333333;
}
/deep/.cancel {
  margin-right: 30px;
  padding-top: 9px!important;
  padding-bottom: 9px!important;
  background-color: #fff!important;
  color: $theme-lan!important;
  border: 1px solid $theme-lan;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  align-items: center;
  margin: 30px 0 80px 90px;
}
.categoryName_input {
  width: 220px;
}
.categoryName_input /deep/.el-input__inner {
  width: 220px;
}
.status1 {
  color: rgba(204, 0, 38, 1);
  text-decoration: line-through;
}
.tree_box {
  display: flex;
}
.tree_box_left {
  flex: 1;
  padding: 0 30px;
  box-shadow: -2px 0px 0px rgba(211, 211, 211, 0.32) inset;
}
.tree_box_right {
  padding: 0 30px;
  flex: 1;
}
.component {
  position: relative;
}
.save {
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
}
.savebtn {
  line-height: 16px;
}
.componenttree {
  margin-left: 74px;
}
</style>
