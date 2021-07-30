<template>
  <div class="public-column category">
      <search @search="handleSearch()" v-model="params.name"></search>
    <div class="public-row bottom-info">
      <el-card class="card">
        <div class="public-heng">
          <div class="public-row__align public-left">
            <div class="title">品牌列表</div>
          </div>
          <div class="public-center"></div>
          <div class="publicright">
            <!-- <search @search="handleSearch()" v-model="params.name"></search> -->
          </div>
        </div>
        <div>
          <el-table
            v-loading="loading"
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
              prop="name"
              label="面料品牌">
            </el-table-column>
            <el-table-column
              prop="logoPath"
              label="面料LOGO">
              <template slot-scope="scope">
                <img v-if="scope.row.logoPath" class="logo-image" :src="scope.row.logoPath" alt="">
                <span v-else>暂未设置</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="品牌介绍">
            </el-table-column>
            <!-- <el-table-column
              prop=""
              label="面料产地">
            </el-table-column> -->
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="handleGoedit(scope.row)"></i>
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
      </el-card>
    </div>
    <el-dialog
      title="添加部位"
      :visible="isShowAdd !== 'none'"
      width="30%"
      center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="部位名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属性别：" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = 'none'">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import Search from '../components/Search.vue'
import User from '../components/User.vue'
import { Card, Dialog, Form, Table, TableColumn } from 'element-ui'

export default {
  components: {
    User,
    Btn,
    Search,
    DiscolorBtn,
    ElCard: Card,
    ElDialog: Dialog,
    ElForm: Form,
    ElTable: Table,
    ElTableColumn: TableColumn},
  name: 'FabricBrandList',

  data () {
    return {
      loading: false,
      isShowAdd: 'none', // none add edit
      ruleForm: {
        name: '',
        status: 0,
        sex: 0,
        bodyValue: 0
      },

      params: {
        name: '',
        type: '1',
        currentPage: 1,
        pageSize: 10
      },

      tableData: {},

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },

  /*
  在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，el property 目前尚不可用。
  */
  created () {
  },

  activated () {
    this._getList()
  },

  computed: {
  },

  methods: {
    // 连续序号
    indexMethod (index) {
      return this.params.pageSize * (this.params.currentPage - 1) + index + 1
    },
    // 去修改页面
    handleGoedit (data) {
      this.$store.commit('fabric/agent', data)
      this.$router.push({
        path: '/fabric/brand/edit',
        query: {
          data: JSON.stringify(data)
        }
      })
    },

    //
    _initParams (data) {
      this.params = {
        name: '',
        type: '1',
        currentPage: 1,
        pageSize: 10,
        ...data
      }
    },

    // 添加
    handelAdd () {
      this.isShowAdd = 'add'
      this.ruleForm.name = ''
    },

    // 搜索
    handleSearch () {
      this._initParams({
        name: this.params.name
      })
      this._getList()
    },

    // 验证表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isShowAdd === 'edit') {
            this._edit()
          } else {
            this._setData()
          }
        } else {
          return false
        }
      })
    },

    // 量体部位添加
    _setData () {
      this.$http.post(this.$apis.api_volumeBodily_save, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAdd = 'none'
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 获取列表
    _getList () {
      this.loading = true
      this.$http.post(this.$apis.api_materialConfig_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
        this.loading = false
      })
    },

    // 修改
    handleEdite (e) {
      this.ruleForm = e
      this.isShowAdd = 'edit'
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

    // 修改
    _edit () {
      delete this.ruleForm.createTime
      this.$http.post(this.$apis.api_volumeBodily_update, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAdd = 'none'
        this._getList()
      })
    },

    // 删除
    _delete (e) {
      this.$http.post(this.$apis.api_volumeBodily_update, {
        id: e.id,
        status: 2
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this._getList()
      })
    },

    // 页容量
    handleSizeChange (e) {
      // this._initParams({
      //   pageSize: e
      // })
      this.params.pageSize = e
      this.params.currentPage = 1
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      // this._initParams({
      //   currentPage: e
      // })
      this.params.currentPage = e
      this._getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.category{
  flex: 1;
  .Shadow-box,
  .bottom-info{
    flex: 1;
  }
.card{
  border-radius: 30px;
  width: 100%;
  min-height: 700px;
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
  }
  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }
  .logo-image{
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
}
</style>
