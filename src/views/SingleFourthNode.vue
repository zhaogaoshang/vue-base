<template>
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
      <!-- <el-table-column
        prop="name"
        label="基数"
        width="180">
      </el-table-column> -->
      <el-table-column
        prop="modelType"
        align="center"
        label="是否为模型">
        <template slot-scope="scope" class="center">
          <check-box :options="[1,2]" :checkValue="scope.row.modelType" :row="scope.row" @success="handleIsModel"></check-box>
        </template>
      </el-table-column>
      <el-table-column
        prop="remarkType"
        align="center"
        label="是否提供备注">
        <template slot-scope="scope" class="center">
          <check-box :options="[1,2]" :checkValue="scope.row.remarkType" :row="scope.row" @success="handleIsRemark"></check-box>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox'
import {
  Table,
  TableColumn,
  Message
} from 'element-ui'
export default {
  name: 'singleFourthNode',
  components: {
    CheckBox,
    ElTable: Table,
    ElTableColumn: TableColumn
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async handleIsModel (arr) {
      console.log(arr[0], arr[1])
      let row = arr[0]
      let value = arr[1]
      // row.modelType = value
      let params = {
        id: row.id,
        modelType: value
      }
      try {
        const res = await this.$http.post(this.$apis.api_category_update, params)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        Message.success('修改成功')
        row.modelType = value
      } catch (error) {
        console.log(error)
      }
    },
    async handleIsRemark (arr) {
      let row = arr[0]
      let value = arr[1]
      let params = {
        id: row.id,
        remarkType: value
      }
      try {
        const res = await this.$http.post(this.$apis.api_category_update, params)
        if (res.code !== 'SUCCESS') {
          return Message.error(res.msg)
        }
        Message.success('修改成功')
        row.remarkType = value
      } catch (error) {
        console.log(error)
      }
    },
    echoData () {
      let currentNode = JSON.parse(this.$route.query.currentNode)
      this.tableData = currentNode.children ? currentNode.children : []
    }
  },
  created () {
    this.echoData()
  }
}
</script>

<style scoped lang="scss">
/deep/.el-table th .cell {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 28px;
}
/deep/.el-table td .cell {
  display: flex;
  justify-content: center;
}
</style>
