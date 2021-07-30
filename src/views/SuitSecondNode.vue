<template>
  <div class="editbox">
    <div class="editbox_left">
      <div class="title">{{JSON.parse(this.$route.query.parentData).name}}</div>
      <div class="tree_box">
        <div class="tree_box_left">
          <el-tree
            :data="data"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="true"
            @node-click="handleNodeClick"
            default-expand-all>
            <span :class="['custom-tree-node','text2']" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span>
                <i @click.self="handleSetNode(data)" class="el-icon-edit text2"></i>
              </span>
            </span>
          </el-tree>
        </div>
        <div class="tree_box_right">
          <div v-for="(item) in currentNodePitchList" :key="item">
            {{item.name}}
          </div>
        </div>
      </div>

    </div>
    <!-- 套装组成 -->
    <div class="editbox_right">
      <div class="title component">
        套装组成
        <div class="save">
          <btn class="savebtn" @click="handleSaveComponents">保存</btn>
        </div>
      </div>
      <div class="componenttree">
        <el-tree
          :data="singleList"
          node-key="id"
          :expand-on-click-node="false"
          default-expand-all>
          <span v-if="data.levels===2" :class="['custom-tree-node','text2','flex_start']" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <span class="check_span">
              <check-box :row="data" :options="[1,2]" :checkValue="data.pitchType" @success="handleChangePitchType"></check-box>
            </span>

          </span>
          <span v-else :class="['custom-tree-node','text2','flex_start']" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
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
import CheckBox from '@/components/CheckBox'
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
    CheckBox,
    ElTree: Tree,
    ElButton: Button,
    ElInput: Input
  },
  data () {
    return {
      dialogVisible: false,
      categoryName: '',
      currentNode: null,
      data: [],
      parentData: {

      },
      singleList: [],
      currentNodePitchList: [] // 当前中间栏节点的关联单品列表 数据来自singleList递归查询，不使用currentNode里已保存的单品
    }
  },
  watch: {
    $route: {
      handler () {
        this._getList()
      },
      deep: true
    }
  },
  methods: {
    async _getList () {
      try {
        this.parentData = JSON.parse(this.$route.query.parentData)
        const res = await this.$http.post(this.$apis.api_category_listByParentId, {parentUuid: this.parentData.uuid})
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        this.data = res.result
        this.$store.commit('suit/set_node3List', this.data)
      } catch (error) {
        console.log(error)
        Message.error('error')
      }
    },
    async _getSingleList () {
      try {
        const res = await this.$http.post(this.$apis.api_category_queryByCategoryList, {uuid: this.currentNode.uuid})
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        this.singleList = res.result ? res.result : []
        this.searchPitch(1, this.singleList)
      } catch (error) {
        console.log(error)
        Message.error('获取单品数据失败')
      }
    },
    handleNodeClick (data, node, component) {
      this.currentNode = data
      this._getSingleList()
    },
    handleSetNode (data) {
      console.log(this.currentNode)
      this.currentNode = data
      this.categoryName = data.name
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
    handleChangePitchType (arr) {
      console.log(arr[0].pitchType, arr[1])
      arr[0].pitchType = arr[1]
      if (arr[1] === 1) {
        let selectSingle = {
          uuid: arr[0].uuid,
          name: arr[0].name
        }
        this.currentNodePitchList.push(selectSingle)
      } else {
        this.currentNodePitchList.forEach((item, index) => {
          if (item.uuid === arr[0].uuid) {
            this.currentNodePitchList.splice(index, 1)
          }
        })
      }
    },
    // 查询当前节点的关联单品
    searchPitch (pitchType, data) {
      let arr = []
      function deep (pitchType, list) {
        list.forEach(item => {
          if (item.pitchType === pitchType) {
            arr.push({
              name: item.name,
              uuid: item.uuid
            })
          } else {
            if (item.children) {
              deep(1, item.children)
            }
          }
        })
      }
      deep(pitchType, data)
      this.currentNodePitchList = arr
    },
    async handleSaveComponents () {
      if (!this.currentNode) {
        return Message.warning('请选择中间栏分类')
      }
      try {
        let categoryUuids = []
        if (this.currentNodePitchList.length < 1) {
          categoryUuids = ''
        } else {
          let arr = this.currentNodePitchList.map(item => {
            return item.uuid
          })
          categoryUuids = arr.join(',')
        }

        let params = {
          id: this.currentNode.id,
          categoryUuids
        }
        const res = await this.$http.post(this.$apis.api_category_update, params)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        Message.success('保存成功')
      } catch (error) {
        console.log(error)
        Message.error('error')
      }
    }
  },
  created () {
    this._getList()
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
  font-size: 16px;
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
.flex_start {
  display: flex;
  align-items: center;
  justify-content:flex-start;
}
.check_span {
  margin-left: 24px;
}
</style>
