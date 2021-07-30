<template>
  <div class="public-column category">
    <search @search="handleSearch()" v-model="params.lossCause"></search>
    <discolor-btn class="discolorbtn" typeStyle="middle" @click.native="handleShow()">添加报损原因</discolor-btn>
    <div class="public-row bottom-info">
      <shadow-box>
        <div class="title">报损原因管理</div>
        <div>
          <el-table
            :data="tableData.items"
            stripe
            style="width: 100%">
            <el-table-column
              :index="indexMethod"
              type="index"
              width="100"
              align="center"
              label="序号">
            </el-table-column>
            <el-table-column
              width="400"
              align="center"
              prop="lossCause"
              label="报损原因">
            </el-table-column>
            <el-table-column
              align="center"
              width="400"
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-edit mr50" style="color:rgba(0, 127, 204, 1);" @click="handleShow(scope.row)"></i>
                <i class="el-icon-delete" style="color:rgba(0, 127, 204, 1);" @click="handleDel(scope.row)"></i>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="xxxxx"
              label="">
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
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      @close="close"
      width="30%"
      center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="报损原因：" prop="lossCause">
            <el-input v-model="ruleForm.lossCause"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible1"
      @close="close"
      width="30%"
      center>
      <div style="text-align:center;">是否删除?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import Search from '../components/Search.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'
import {Button, Dialog, Input, Table, Form, Pagination, TableColumn, FormItem} from 'element-ui'
export default {
  name: 'LossReportingReasons',
  components: {
    ShadowBox,
    User,
    Btn,
    Search,
    DiscolorBtn,
    ElButton: Button,
    ElDialog: Dialog,
    ElInput: Input,
    ElTable: Table,
    ElForm: Form,
    ElPagination: Pagination,
    ElTableColumn: TableColumn,
    ElFormItem: FormItem},
  data () {
    return {
      params: {
        lossCause: '',
        pageSize: 10,
        currentPage: 1,
        type: 1
      },
      tableData: {
        totalCount: 0,
        items: []
      },
      tableAllData: [],
      dialogVisible: false,
      dialogVisible1: false,
      title: '',
      ruleForm: {
        lossCause: '',
        status: 1
      },
      rules: {
        lossCause: [{required: true, trigger: 'blur', message: '报损原因不能为空'}]
      }
    }
  },
  methods: {
    async getAllList () {
      try {
        let params = {
          type: 1
        }
        const res = await this.$http.post(this.$apis.api_materialLossCause_list, params)
        if (res.code !== 'SUCCESS') {
          return false
        }
        this.tableAllData = res.result.items
      } catch (error) {
        console.log(error)
      }
    },
    // 连续序号
    indexMethod (index) {
      return this.params.pageSize * (this.params.currentPage - 1) + index + 1
    },
    handleSizeChange (size) {
      this.params.pageSize = size
      this.params.currentPage = 1
      this.getList()
    },
    handleCurrentChange (page) {
      this.params.currentPage = page
      this.getList()
    },
    handleSearch () {
      this.params.currentPage = 1
      this.getList()
    },
    async getList () {
      try {
        const res = await this.$http.post(this.$apis.api_materialLossCause_list, this.params)
        if (res.code !== 'SUCCESS') {
          return this.$message({
            type: 'error',
            message: res.msg
          })
        }
        this.tableData = res.result
        console.log('tableData', this.tableData)
      } catch (error) {
        console.log(error)
      }
    },
    close () {
      this.title = ''
      this.ruleForm = {
        lossCause: '',
        status: 1
      }
      this.params.currentPage = 1
      this.params.lossCause = ''
      this.getList()
      this.getAllList()
    },
    // 弹框
    handleShow (row = null, status = null) {
      if (row) {
        this.ruleForm = {
          id: row.id,
          lossCause: row.lossCause
        }
        this.title = '修改报损原因'
      } else {
        this.title = '添加报损原因'
      }
      this.dialogVisible = true
    },
    handleDel (row) {
      this.ruleForm = {
        id: row.id,
        status: 2
      }
      this.dialogVisible1 = true
    },
    async submitDel () {
      try {
        const res = await this.$http.post(this.$apis.api_materialLossCause_update, this.ruleForm)
        if (res.code !== 'SUCCESS') {
          return this.$message({
            type: 'error',
            message: res.msg
          })
        }
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.dialogVisible1 = false
      } catch (error) {
        console.log(error)
      }
    },
    // 验证表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let isRepeat = this.checkRepeat()
          if (isRepeat) {
            return this.$message({
              type: 'warning',
              message: '报损原因不能重复'
            })
          }
          if (this.ruleForm.id) {
            this.$http.post(this.$apis.api_materialLossCause_update, this.ruleForm).then(res => {
              if (res.code !== 'SUCCESS') {
                return this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.dialogVisible = false
            })
          } else {
            let form = {
              ...this.ruleForm,
              type: 1
            }
            this.$http.post(this.$apis.api_materialLossCause_save, form).then(res => {
              if (res.code !== 'SUCCESS') {
                return this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.dialogVisible = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 检查是否名称重复
    checkRepeat () {
      return this.tableAllData.some(item => {
        if (this.ruleForm.lossCause === item.lossCause) {
          if (this.ruleForm.id !== item.id) {
            return true
          }
        }
      })
    }

  },
  created () {
    this.getList()
    this.getAllList()
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
  .mr50 {
    margin-right: 50px;
  }
}
</style>
