<template>
  <div class="container" >
    <search @search="search" class="search"></search>
    <el-card class="box-card left_card" @click.native.self="handleRemoveCurrentNode">
      <div class="add">
        <span class="el-icon-circle-plus-outline" @click="handleSetNode('添加分类')"></span>
      </div>
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
      <div v-if="currentNode">
        <div class="cateName">
          <span class="cateName_edit">分类名称： <span>{{currentNode.name}}</span></span>
          <span class="el-icon-edit" @click="handleSetNode('编辑分类名称')"></span>
          <el-select v-model="currentNode.status" placeholder="请选择">
            <el-option
              @click.native="handleStatus(0)"
              label="启用"
              :value="0">
            </el-option>
            <el-option
              @click.native="handleStatus(1)"
              label="禁用"
              :value="1">
            </el-option>
          </el-select>
        </div>
        <div>
          <router-view></router-view>
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
  Message
} from 'element-ui'
export default {
  name: 'Single',
  components: {
    Search,
    CenterDialog,
    Btn,
    ElCard: Card,
    ElTree: Tree,
    ElButton: Button,
    ElSelect: Select,
    ElOption: Option,
    ElInput: Input
  },
  data () {
    return {
      data: [],
      currentNode: null,
      dialogVisible: false,
      title: '添加',
      categoryName: '' // 当前选中节点的分类名称
    }
  },
  methods: {

    search () {

    },
    handleRemoveCurrentNode ($event) {
      console.log('清空')
      this.currentNode = null
      this.categoryName = ''
      this.$router.replace({
        path: '/base/single',
        query: {

        }
      })
    },
    handleNodeClick (data, node, component) {
      console.log(data, node, component)
      this.currentNode = data
      // 选中前三级 进入同一个路由
      if (node.level <= 3 || node.level === 6) {
        this.$router.replace({
          path: '/base/single',
          query: {

          }
        })
      } else if (node.level === 4) {
        this.$router.replace({
          path: '/base/singleFourthNode',
          query: {
            currentNode: JSON.stringify(this.currentNode)
          }
        })
      } else if (node.level === 5) {
        this.$router.replace({
          path: '/base/singleFifthNode',
          query: {
            currentNode: JSON.stringify(this.currentNode)
          }
        })
      }
    },
    handleSetNode (title) {
      console.log(this.currentNode)
      this.title = title
      if (title === '编辑分类名称') {
        this.categoryName = this.currentNode !== null ? this.currentNode.name : ''
      } else {
        if (this.currentNode && this.currentNode.levels >= 5) {
          return Message.warning('不允许添加')
        }
      }
      this.dialogVisible = true
    },
    handleCancel () {
      this.dialogVisible = false
    },
    handleConfirm () {
      if (this.title === '编辑分类名称') {
        this.update()
      } else {
        this.save()
      }
    },
    async save () {
      try {
        console.log('save', this.currentNode)
        let params = {
          packageType: 1,
          name: this.categoryName,
          parentUuid: this.currentNode === null ? 0 : this.currentNode.uuid
        }
        const res = await this.$http.post(this.$apis.api_category_save, params)
        console.log(res)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        this.handleAppend(res.result)
        Message.success('添加成功')
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    async update () {
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
    close () {
      this.categoryName = ''
    },
    async _getList () {
      try {
        const res = await this.$http.post(this.$apis.api_category_list, {parentId: 0})
        console.log(res)
        this.data = res.result
      } catch (error) {
        console.log(error)
      }
    },
    // 添加节点
    handleAppend (data) {
      if (this.currentNode === null) {
        this.data.push(data)
      } else {
        if (!this.currentNode.children) {
          this.$set(this.currentNode, 'children', [])
        }
        this.currentNode.children.push(data)
      }
    },
    async handleStatus (status) {
      try {
        let params = {
          id: this.currentNode.id,
          status
        }
        const res = await this.$http.post(this.$apis.api_category_update, params)
        console.log(res)
        if (res.code !== 'SUCCESS') {
          this.currentNode.status = status === 1 ? 0 : 1
          return Message.error(res.msg)
        }
        Message.success('修改成功')
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
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
}
.right_card {
  flex: 1;
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
  font-size: 22px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4972F1;
}
.text2 {
  font-size: 20px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #333333;
}
.text3 {
  font-size: 20px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4D4D4D;
}
.text4 {
  font-size: 18px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4D4D4D;
}
.text5 {
  font-size: 16px;
  font-family: Noto Sans S Chinese;
  font-weight: 500;
  color: #4D4D4D;
}
.text6 {
  font-size: 15px;
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
</style>
