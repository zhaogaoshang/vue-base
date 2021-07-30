<template>
  <div class="public-column category">
    <search @search="search" placeholder="请输入文件名称搜索" v-model="params.fileName"></search>
    <discolor-btn class="discolorbtn" typeStyle="middle" @click.native="handleAddEdit(null)">新增版本</discolor-btn>
    <div class="public-row bottom-info">
      <shadow-box>
        <div class="title">
          <el-select clearable v-model="params.type" placeholder="选择客户端类型">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-table
            :data="tableData.items"
            stripe
            style="width: 100%">
            <el-table-column
              :index="indexMethod"
              type="index"
              width="100"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="type"
              label="客户端类型">
            </el-table-column>
            <el-table-column
              prop="version"
              label="版本号">
            </el-table-column>
            <el-table-column
              prop="fileName"
              label="文件名称">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="新增时间">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="修改时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="handleAddEdit(scope.row)"></i>
                &nbsp;
                &nbsp;
                &nbsp;
                <i class="el-icon-delete" @click="handleDeitTip(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="public-row__center total-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="params.pageSize"
            layout="prev, pager, next, sizes, total"
            :total="tableData.totalCount">
          </el-pagination>
        </div>
      </shadow-box>
    </div>

  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import Search from '../components/Search.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'
import {Button, Input, Table, Form, Pagination, TableColumn, FormItem, Dialog, Select, Option} from 'element-ui'
export default {
  components: {
    ShadowBox,
    User,
    Btn,
    Search,
    DiscolorBtn,
    ElButton: Button,
    ElInput: Input,
    ElTable: Table,
    ElForm: Form,
    ElPagination: Pagination,
    ElTableColumn: TableColumn,
    ElFormItem: FormItem,
    ElDialog: Dialog,
    ElSelect: Select,
    ElOption: Option},
  name: 'VersionManagement',

  data () {
    return {

      params: {
        fileName: '',
        type: '',
        currentPage: 1,
        pageSize: 10
      },

      tableData: {},
      options: [
        {id: 1, name: 'PDA'},
        {id: 2, name: '门店前端'},
        {id: 3, name: '工厂端'},
        {id: 4, name: '打印服务'},
        {id: 5, name: '面料监控大屏'},
        {id: 6, name: '面料裁剪大屏'},
        {id: 7, name: '面料发货大屏'},
        {id: 8, name: '面料采购大屏'},
        {id: 9, name: '面料入库大屏'}
      ]
    }
  },

  created () {
    this.search()
  },
  watch: {
    'params.type': {
      handler (newVal) {
        // if (newVal !== '') {
        this.handleCheckType()
        // }
      }

    }
  },
  computed: {
  },

  methods: {
    handleSizeChange (size) {
      this.params.pageSize = size
      this.params.currentPage = 1
      this.getList()
    },
    handleCurrentChange (page) {
      this.params.currentPage = page
      this.getList()
    },
    // 连续序号
    indexMethod (index) {
      return this.params.pageSize * (this.params.currentPage - 1) + index + 1
    },
    async getList () {
      try {
        const res = await this.$http.post(this.$apis.api_appVersion_pageList, this.params)
        if (res.code !== 'SUCCESS') {
          return this.$message({
            type: 'error',
            message: res.msg
          })
        }
        this.tableData = res.result
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    search () {
      this.params.currentPage = 1
      this.getList()
    },
    handleCheckType () {
      this.params.currentPage = 1
      this.getList()
    },

    // 删除 提示
    handleDeitTip (e) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this._delete(e)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除
    _delete (e) {
      this.$http.post(this.$apis.api_appVersion_delete, {
        id: e.id
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.params.type = ''
        this.params.fileName = ''
        this.search()
      })
    },
    handleAddEdit (row) {
      console.log('row', row)
      let data = row ? JSON.stringify(row) : ''
      this.$router.push({
        path: '/base/versionEdit',
        query: {
          data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.discolorbtn {
  position: absolute;
  top: 30px;
  right: 300px;
}
.category{
  flex: 1;
  .Shadow-box,
  .bottom-info{
    flex: 1;
  }

  .top-user{
    justify-content: space-between;
  }
  .total-box{
    flex: 1;
    align-items: flex-end;
  }
  .title{
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 20px;
  }
}
</style>
