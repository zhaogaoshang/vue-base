<template>
  <div class="public-column category">
      <div class="backbox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>版本管理</el-breadcrumb-item>
          <el-breadcrumb-item v-if="isEdit">编辑版本</el-breadcrumb-item>
          <el-breadcrumb-item v-else>添加版本</el-breadcrumb-item>
        </el-breadcrumb>
        <btn class="back" @click.native="$router.back()">返回上一级</btn>
      </div>
    <div class="public-row bottom-info">
      <shadow-box>
        <div class="title">
          {{isEdit?`编辑版本`:'添加版本'}}
        </div>
        <div class="content">
          <el-form class="form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
            <el-form-item label="客户端类型：" prop="type">
              <el-select clearable class="select" v-model="ruleForm.type" placeholder="选择客户端类型">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文 件 上 传：" class="upload_content">
              <el-upload
                class="upload-demo"
                name="file"
                :disabled="loading"
                :data="upData"
                :action="$apis.photoHost+$apis.api_upload_appUpload"
                :before-upload="beforeUp"
                :on-success="uploadSuccess"
                :on-error="ErrorFn"
                :show-file-list="false"
              >
                <btn v-show="!loading">上传</btn>
                <btn v-show="loading" class="disabled"><span><span class="el-icon-loading"></span></span></btn>
              </el-upload>
              <div class="el-upload__tip">上传客户端源文件</div>
            </el-form-item>
            <el-form-item v-show="ruleForm.filePath" label="文 件 地 址：" prop="filePath">
              <span class="path">{{ruleForm.filePath}}</span>
            </el-form-item>
            <el-form-item label="版本更新内容：" prop="remark">
              <el-input
                type="textarea"
                placeholder="请输入"
                v-model="ruleForm.remark"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div class="savebox">
            <btn class="save disabled" v-show="loading">保存</btn>
            <btn class="save" v-show="!loading" @click.native="submitForm">保存</btn>
          </div>

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
import {Form, TableColumn, FormItem, Upload, Select, Option, Input, Breadcrumb, BreadcrumbItem, OptionGroup} from 'element-ui'

export default {
  components: {
    ShadowBox,
    User,
    Btn,
    Search,
    DiscolorBtn,
    ElOption: Option,
    ElForm: Form,
    ElTableColumn: TableColumn,
    ElFormItem: FormItem,
    ElUpload: Upload,
    ElSelect: Select,
    ElInput: Input,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem,
    ElOptionGroup: OptionGroup},
  name: 'VersionEdit',

  data () {
    return {
      isEdit: false,
      ruleForm: {
        filePath: '',
        type: '',
        remark: ''

      },
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
      ],
      rules: {
        type: [
          { required: true, message: '请选择客户端类型', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请填写版本更新内容', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },

  created () {
    this.dataEcho()
  },

  computed: {
    upData () {
      return {
        superMerchantCode: this.$store.state.user.userInfo.superMerchantCode,
        merchantCode: this.$store.state.user.userInfo.merchantCode
      }
    }
  },

  methods: {

    // 验证表单
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (!this.ruleForm.filePath) {
            return this.$message({
              type: 'warning',
              message: '请上传文件'
            })
          }
          if (this.isEdit) {
            this.handleUpdate()
          } else {
            this.handleSave()
          }
        } else {
          return false
        }
      })
    },
    async handleUpdate () {
      try {
        const res = await this.$http.post(this.$apis.appVersion_update, this.ruleForm)
        if (res.code !== 'SUCCESS') {
          return this.$message({
            type: 'error',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push('/versionManagement')
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    async handleSave () {
      try {
        const res = await this.$http.post(this.$apis.api_appVersion_save, this.ruleForm)
        if (res.code !== 'SUCCESS') {
          return this.$message({
            type: 'error',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push('/versionManagement')
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    beforeUp (file) {
      this.loading = true
    },
    ErrorFn (response, file, fileList) {
      this.loading = false
    },
    uploadSuccess (response, file, fileList) {
      console.log(response)
      this.ruleForm.filePath = response.result
      this.loading = false
    },
    removeFile () {
      this.ruleForm.filePath = ''
    },
    dataEcho () {
      if (this.$route.query.data) {
        let data = JSON.parse(this.$route.query.data)
        let form = {
          id: data.id,
          filePath: data.filePath,
          type: data.type,
          remark: data.remark
        }
        this.isEdit = true
        this.ruleForm = {
          ...this.ruleForm,
          ...form
        }
      } else {
        this.isEdit = false
      }
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
.backbox {
  position: fixed;
  top:30px;
  left:330px;
  display: flex;
  align-items: center;
}
.back {
  margin-left:24px;
}
.content {
  width:100%;
}
/deep/.form {
  width: 100%;
}
/deep/.select {
  width: 172px;
}
.savebox {
  width: 100%;
  margin: 450px 0 50px 0;
  text-align: center;
}
.save {
  width: 150px!important;
  height: 51px!important;
  font-size:22px!important;
  line-height: 51px!important;
  text-align: center!important;
}
.el-upload__tip {
  margin-left: 24px;
  color: rgba(0, 129, 204, 1);
}
.upload_content /deep/.el-form-item__content {
  display: flex;
  align-items: center;
}
/deep/.el-textarea {
  width: 500px;
}
.path {
  color: #007fcc;

}
/deep/.disabled {
  background: rgba(0, 127, 204,0.5)!important;
}
</style>
