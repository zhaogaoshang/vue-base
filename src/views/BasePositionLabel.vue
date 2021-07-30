<template>
  <div class="container" >
    <search @search="search" class="search"></search>
    <el-card class="box-card left_card" @click.native.self="handleRemoveCurrentNode">
      <div class="tree_box">
        <el-tree
          :data="data"
          node-key="id"
          ref="tree"
          :expand-on-click-node="false"
          :highlight-current="currentNode!==null"
          @node-click="handleNodeClick"
          default-expand-all>
          <span v-if="node.level===1" :class="['custom-tree-node','text1']" slot-scope="{ node, data }">
            <span :class="[data.status===1?'status1':'']">{{ data.name }}</span>
            <span>

            </span>
          </span>
          <span v-else-if="node.level===2" :class="['custom-tree-node','text2']" slot-scope="{ node, data }">
            <span  :class="[data.status===1?'status1':'']">{{ data.name }}</span>
            <span>

            </span>
          </span>
          <span v-else-if="node.level===3" :class="['custom-tree-node','text3']" slot-scope="{ node, data }">
            <span  :class="[data.status===1?'status1':'']">{{ data.name }}</span>
            <span>

            </span>
          </span>
          <span v-else-if="node.level===4" :class="['custom-tree-node','text4']" slot-scope="{ node, data }">
            <span :class="[data.status===1?'status1':'']">{{ data.name }}</span>
            <span>

            </span>
          </span>
          <span v-else-if="node.level===5" :class="['custom-tree-node','text5']" slot-scope="{ node, data }">
            <span :class="[data.status===1?'status1':'']">{{ data.name }}</span>
            <span>

            </span>
          </span>
          <span v-else :class="['custom-tree-node','text6']" slot-scope="{ node, data }">
            <span :class="[data.status===1?'status1':'']">{{ data.name }}</span>
            <span>

            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
    <el-card class="box-card right_card">
      <div v-if="showViewBox">
        <div class="addbox">
          <btn @click="handleAddEdit('新增部位')">新增</btn>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="name"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <div class="caozuo">
                  <i class="el-icon-edit caozuo_edit" @click="handleAddEdit('编辑部位',scope.row)"></i>
                  <i class="el-icon-delete caozuo_delete" @click="handleShowDelete(scope.row)"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <center-dialog @close="close" :dialogVisible.sync="dialogVisible" :title="title">
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
    <!-- 删除 -->
    <center-dialog @close="close" :dialogVisible.sync="deldialogVisible" title="删除部位">
      <div>
        <div class="form">
          确定删除这个部位吗？
        </div>
        <div slot="footer" class="dialog-footer">
          <btn class="cancel" @click="handleCancelDelete">取消</btn>
          <btn class="confirm" @click="handleConfirmDelete" >确定</btn>
        </div>
      </div>
    </center-dialog>
  </div>
</template>

<script>
import Search from '@/components/Search'
import CenterDialog from '@/components/CenterDialog'
import Btn from '@/components/Btn'
import {
  Card,
  Tree,
  Button,
  Select,
  Option,
  Input,
  Message,
  Table,
  TableColumn
} from 'element-ui'
export default {
  name: 'BasePositionLabel',
  components: {
    Search,
    CenterDialog,
    Btn,
    ElCard: Card,
    ElTree: Tree,
    ElButton: Button,
    ElSelect: Select,
    ElOption: Option,
    ElInput: Input,
    ElTable: Table,
    ElTableColumn: TableColumn
  },
  data () {
    return {
      data: [],
      currentNode: null,
      dialogVisible: false,
      title: '添加',
      categoryName: '', // 当前选中节点的分类名称
      tableData: [],
      tableItem: null,
      deldialogVisible: false
    }
  },
  methods: {
    // 显示编辑添加弹层
    handleAddEdit (title, item = null) {
      this.title = title
      this.tableItem = item
      this.dialogVisible = true
    },
    // 显示删除弹层
    handleShowDelete (item) {
      this.tableItem = item
      this.deldialogVisible = true
    },
    // 取消删除
    handleCancelDelete () {
      this.deldialogVisible = false
    },
    // 确定删除
    async handleConfirmDelete () {
      try {
        let params = {
          id: this.tableItem.id,
          status: 2
        }
        const res = await this.$http.post(this.$apis.api_categoryPart_update, params)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        this._getTableData()
        Message.success('已删除')
        this.deldialogVisible = false
      } catch (error) {
        Message.error('error')
        console.log(error)
      }
    },
    search () {

    },
    // 点击空白处清空选中节点
    handleRemoveCurrentNode ($event) {
      console.log('清空')
      this.currentNode = null
      this.categoryName = ''
      this.showViewBox = false
    },
    // 点击节点回调
    handleNodeClick (data, node, component) {
      console.log(data, node, component)
      this.currentNode = data
      // 选中前三级 进入同一个路由
      if (node.level === 2) {
        this.showViewBox = true
        this._getTableData()
      } else {
        this.showViewBox = false
      }
    },
    // 添加编辑弹层取消
    handleCancel () {
      this.dialogVisible = false
    },
    // 添加编辑弹层确认
    handleConfirm () {
      if (this.tableItem) {
        this.update()
      } else {
        this.save()
      }
    },
    // 选中第二节点后点击的添加
    async save () {
      try {
        let params = {
          name: this.categoryName,
          uuid: this.currentNode === null ? 0 : this.currentNode.uuid
        }
        const res = await this.$http.post(this.$apis.api_categoryPart_save, params)
        console.log(res)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        this._getTableData()
        // this.handleAppend(res.result)
        Message.success('添加成功')
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    async update () {
      try {
        let params = {
          id: this.tableItem.id,
          name: this.categoryName
        }
        const res = await this.$http.post(this.$apis.api_categoryPart_update, params)
        console.log(res)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        this._getTableData()
        Message.success('修改成功')
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    close () {
      this.categoryName = ''
      this.tableItem = null
    },
    async _getList () {
      try {
        const res = await this.$http.post(this.$apis.api_category_list, {parentId: 0, packageType: 1})
        console.log(res)
        this.searchOnlyTwo(1, res.result)
        this.data = res.result
      } catch (error) {
        console.log(error)
      }
    },
    async _getTableData () {
      try {
        let params = {
          uuid: this.currentNode.uuid
        }
        const res = await this.$http.post(this.$apis.api_categoryPart_list, params)
        console.log(res)
        this.tableData = res.result ? res.result : []
      } catch (error) {
        console.log(error)
      }
    },
    searchOnlyTwo (levels, data) {
      function deep (levels, list) {
        list.forEach(item => {
          if (item.levels === levels) {
            delete item.children
          } else {
            if (item.children) {
              deep(levels, item.children)
            }
          }
        })
      }
      deep(levels, data)
    }

  },
  created () {
    this._getList()
  }
}
</script>

<style lang="scss" scoped>
@import url('./../css/bases.scss');
@import url('./../css/public.scss');
$color1:rgba(77, 77, 77, 1);
.container {
  display: flex;
  justify-content: space-between;
}
// /deep/.search {
//   position: absolute;
//   top: 30px;
//   left: 330px;
// }
.box-card {
  border-radius: 30px;

}
.left_card {
  box-sizing: border-box;
  margin-right: 30px;
  width: 300px;
  overflow-y: scroll;
}
.right_card {
  flex: 1;
  overflow-y: scroll;
}
.add {
  text-align: right;
  font-size: 24px;
  color:$color1;
}
.el-icon-circle-plus-outline {
  cursor: pointer;
}
.tree_box /deep/.el-tree-node__content {
  margin: 5px 0;
}
.text1 {
  font-size: 20px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4972F1;
}
.text2 {
  font-size: 18px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #333333;
}
.text3 {
  font-size: 16px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4D4D4D;
}
.text4 {
  font-size: 15px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4D4D4D;
}
.text5 {
  font-size: 14px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4D4D4D;
}
.text6 {
  font-size: 13px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4D4D4D;
}
.tree_box /deep/.el-tree-node__expand-icon {
  font-size: 18px;
}
.cateName {
  font-size: 18px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #333333;
  .cateName_edit {
    margin-right: 58px;
  }
  .el-icon-edit {
    margin-right:29px;
    color: $theme-lan;
    cursor: pointer;
  }
}
// 蓝色下拉框
.cateName /deep/.el-select {
  width: 80px;
  height: 26px;
  font-size: 14px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: $theme-lan;
}
.cateName /deep/.el-input {
  width: 80px;
  height: 26px;
  font-size: 14px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: $theme-lan;
}
.cateName /deep/.el-select .el-input__inner {
  width: 80px;
  height: 26px;
  font-size: 14px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: $theme-lan;
  border: 1px solid $theme-lan;
  border-radius: 3px;
}
.cateName /deep/.el-input__suffix {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cateName /deep/.el-select .el-input__icon {
  font-size: 14px;
  color: $theme-lan;
  display:flex;
  align-items:center;
  justify-content: center;
}
/deep/.el-select-dropdown__item {
  display: flex;
  justify-content: center;
}
/deep/.el-select-dropdown__item.selected {
  color: $theme-lan;
}
// dialog
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

.addbox {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.caozuo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.caozuo_edit {
  margin-right: 30px;
  font-size: 17px;
  color: rgba(73, 114, 241, 1);
}
.caozuo_delete {
  font-size: 17px;
  color: rgba(73, 114, 241, 1);
}
</style>
