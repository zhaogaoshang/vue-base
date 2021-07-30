<template>
  <div class="public-column category">
    <search @search="handleSearch" v-model="params.userInfo"></search>
    <discolor-btn class="discolorbtn" typeStyle="middle" @click.native="handleGoAddEdit('add')">添加企业</discolor-btn>
    <div class="public-row bottom-info">
      <shadow-box>
        <!-- <div>
          <btn typeStyle="su">全部</btn>
          &nbsp;
          &nbsp;
          <btn>门店端</btn>
          &nbsp;
          &nbsp;
          <btn>生产端</btn>
          &nbsp;
          &nbsp;
          <btn>面料端</btn>
        </div> -->
        <div>
          <el-table
            :data="tableData.items"
            stripe
            style="width: 100%">
            <el-table-column
              :index="indexMethod"
              type="index"
              label="序号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              width="200"
              label="企业名称">
            </el-table-column>
            <el-table-column
              width="500"
              label="地址">
              <template slot-scope="item">
                <div>
                  {{item.row.province}} - {{item.row.city}} - {{item.row.area}} - {{item.row.address}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="添加时间">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="handleGoAddEdit('edit', scope.row)"></i>
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
import {Table, TableColumn, Pagination} from 'element-ui'

export default {
  components: {
    ShadowBox,
    User,
    Btn,
    Search,
    DiscolorBtn,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElPagination: Pagination},
  name: 'AccountList',

  data () {
    return {
      params: {
        type: 0, // 0后台生成核心用户
        currentPage: 1,
        pageSize: 10,
        userInfo: '' // 关键字 名称或手机号
      },

      tableData: {}
    }
  },

  created () {
    this._getList()
  },

  activated () {
    this._initParams()
    this._getList()
  },

  computed: {
  },

  methods: {
    _initParams (e) {
      this.params = {
        type: 0, // 0后台生成核心用户
        currentPage: 1,
        pageSize: 10,
        userInfo: '', // 关键字 名称或手机号
        ...e
      }
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_user_select, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
      })
    },

    // 搜索
    handleSearch () {
      this._initParams({
        userInfo: this.params.userInfo
      })
      this._getList()
    },

    // 页容量
    handleSizeChange (e) {
      this._initParams({
        pageSize: e
      })
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      this._initParams({
        currentPage: e
      })
      this._getList()
    },

    // 连续序号
    indexMethod (index) {
      return this.params.pageSize * (this.params.currentPage - 1) + index + 1
    },

    handleGoAddEdit (type, data) {
      this.$store.commit('account/agent', data)
      this.$router.push({
        path: '/account/add/edit',
        query: {
          type
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
}
</style>
