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
        label="图片">
        <template slot-scope="scope" class="center">
          <el-image
            class="image"
            :src="scope.row.photoPath"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="remarkType"
        align="center"
        label="是否默认">
        <template slot-scope="scope" class="center">
          <el-radio @click.native="handleClickRadio(scope.row)" v-model="scope.row.partType" :label="1">默认</el-radio>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  Table,
  TableColumn,
  Image,
  Radio,
  Message
} from 'element-ui'
export default {
  name: 'SingleFifthNode',
  data () {
    return {
      tableData: [],
      timer: false
    }
  },
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElImage: Image,
    ElRadio: Radio
  },
  methods: {
    echoData () {
      let currentNode = JSON.parse(this.$route.query.currentNode)
      this.tableData = currentNode.children ? currentNode.children : []
    },
    async handleClickRadio (row) {
      if (this.timer) {
        return false
      }
      this.timer = true
      try {
        let params = {
          id: row.id,
          partType: 1
        }
        const res = await this.$http.post(this.$apis.api_category_update, params)
        if (res.code !== 'SUCCESS') {
          this.timer = false
          return Message.error(res.msg)
        }
        Message.success('修改成功')
        this.updateTableData(row.id)
        this.timer = false
      } catch (error) {
        this.timer = false
        console.log(error)
        Message.error('error')
      }
    },
    updateTableData (id) {
      this.tableData.forEach(item => {
        if (item.id !== id) {
          item.partType = 2
        }
      })
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
/deep/.image {
  width: 70px;
  height: 70px;
}
</style>
