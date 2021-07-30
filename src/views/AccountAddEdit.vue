<template>
  <div class="store-page">
      <div class="backbox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>企业管理</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.query.type=='add'">添加企业</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="$route.query.type=='edit'">修改企业</el-breadcrumb-item>
        </el-breadcrumb>
        <btn class="back" @click.native="$router.back()">返回上一级</btn>
      </div>
    <shadow-box>
      <div class="title" v-if="$route.query.type=='add'">添加企业</div>
      <div class="title" v-else-if="$route.query.type=='edit'">修改企业</div>
      <div class="middle-box">
        <el-form class="public-column" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <div class="middle-box">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="ruleForm.phone" ></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="password">
              <el-input v-model="ruleForm.password" @keydown.native="fakepw('password')" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="passwordConfirm">
              <el-input @keydown.native="fakepw('passwordConfirm')" v-model="ruleForm.passwordConfirm" type="password"></el-input>
            </el-form-item>
            <el-form-item label="企业名称：" prop="name">
              <el-input v-model="ruleForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contacts">
              <el-input v-model="ruleForm.contacts" ></el-input>
            </el-form-item>
            <div v-if="ruleForm.phone">
              <br/>
              <el-form-item label="营业执照：" prop="businessPhotos">
                <FUpload
                :upData="{
                  name: '1245',
                  age: '12',
                  phone: '13716171560'
                }"
                :url="$apis.api_upload_userByBusinessPhotos"
                @on-success="handleDiscriptionImage">
                <btn typeStyle="su">上传</btn>
                </FUpload>
              </el-form-item>
              <div class="public-row__align image-list">
                <div class="image-box" v-for="(item, index) in ruleForm.businessPhotos" :key="index">
                  <img class="store-avatar" v-if="ruleForm.businessPhotos" :src="item">
                  <div class="delete-box">
                    <i class="el-icon-delete" @click="ruleForm.businessPhotos.splice(index, 1)"></i>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <br/>
          </div>
            <el-form-item label="地址：" required>
              <div class="public-row address-box">
                <el-form-item prop="province">
                  <el-select v-model="ruleForm.province" placeholder="请选择省份" @change="handleRegin">
                    <el-option :label="item.name" :value="item.name" v-for="(item, index) in address" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                &nbsp;
                &nbsp;
                &nbsp;
                <el-form-item prop="city">
                  <el-select v-model="ruleForm.city" placeholder="请选择市" @change="handleCity">
                    <el-option :label="item.name" :value="item.name" v-for="(item, index) in city" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                &nbsp;
                &nbsp;
                &nbsp;
                <el-form-item prop="area">
                  <el-select v-model="ruleForm.area" placeholder="请选择区">
                    <el-option :label="item" :value="item" v-for="(item, index) in area" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="ruleForm.address" ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" class="bei-zhu" v-model="ruleForm.remark" ></el-input>
            </el-form-item>
        </el-form>
      </div>
      <div class="public-row__center">
        <discolor-btn typeStyle="middle" @click.native="submitForm('ruleForm')">保存</discolor-btn>
      </div>
    </shadow-box>

  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import User from '../components/User.vue'
import ShadowBox from '../components/ShadowBox.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import FUpload from '../components/FUpload.vue'
import {Input, Form, FormItem, Select, Option, Breadcrumb, BreadcrumbItem} from 'element-ui'
export default {
  components: {
    User,
    ShadowBox,
    DiscolorBtn,
    Btn,
    FUpload,
    ElInput: Input,
    ElForm: Form,
    ElFormItem: FormItem,
    ElSelect: Select,
    ElOption: Option,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem},
  data () {
    return {
      ruleForm: {
        name: '', // 账号名称：
        businessPhotos: [], // 营业执照  多个用逗号隔开
        phone: '', // 手机
        password: '', // 密码
        passwordConfirm: '', // 确认密码
        type: 0, // 0后台生成核心用户
        contacts: '', // 联系人
        province: '', // 省份
        city: '', // 城市
        area: '', // 区域
        address: '', // 地址
        remark: '' // 备注
      },
      rules: {
        // 手机
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        // 密码
        passwordConfirm: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        // 联系人
        contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        // 账号名称：
        name: [
          { required: true, message: '请输入账号名称', trigger: 'blur' }
        ],
        // 营业执照
        businessPhotos: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ],
        // 省
        province: [
          { required: true, message: '请输入省', trigger: 'change' }
        ],
        // 市
        city: [
          { required: true, message: '请输入市', trigger: 'change' }
        ],
        // 区
        area: [
          { required: true, message: '请输入区', trigger: 'change' }
        ],
        // 详细地址
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      address: [], // 全部地址
      city: [], // 市
      area: [], // 区
      file: ''
    }
  },
  created () {
    this._getAddress() // 获取地址
  },
  computed: {
  },
  methods: {
    // input框删除事件
    fakepw (key) {
      if (this.ruleForm[key] === '没有返回密码') {
        this.ruleForm[key] = ''
      }
    },
    // 自定义上传事件
    changeheader (param) {
      let fileObject = param.file
      let pic = new FormData()
      pic.append('imgUpload', fileObject)
      pic.append('merchantCode', this.$store.state.user.userInfo.merchantCode)
      pic.append('superMerchantCode', this.$store.state.user.userInfo.merchantCode)
      pic.append('phone', this.ruleForm.phone)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': this.$store.state.user.token
        }
      }

      this.$http.post(this.$apis.api_upload_userByBusinessPhotos, param, config).then(res => {
      })
    },
    // 省发生变化
    handleRegin (e, isClear = true) {
      if (isClear) {
        this.ruleForm.city = ''
        this.ruleForm.area = ''
      }
      this.address.forEach(item => {
        if (item.name === e) {
          this.city = item.city
        }
      })
      return Promise.resolve()
    },

    // 市发生变化
    handleCity (e, isClear = true) {
      if (isClear) {
        this.ruleForm.area = ''
      }
      this.city.forEach(item => {
        if (item.name === e) {
          this.area = item.area
        }
      })
      return Promise.resolve()
    },

    // 获取地址
    _getAddress () {
      this.$http.post(this.$apis.api_address_all).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.address = JSON.parse(res.result)
        this.type = this.$route.query.type
        if (this.type === 'edit') {
          let newObj = JSON.parse(JSON.stringify(this.$store.state.account.agent))
          newObj.businessPhotos = newObj.businessPhotos.split(',')
          // 如果是编辑模式 回填密码
          newObj.password = '没有返回密码'
          newObj.passwordConfirm = newObj.password
          this.ruleForm = newObj
          this.handleRegin(this.ruleForm.province, false).then(_ => {
            this.handleCity(this.ruleForm.city, false)
          })
        }
      }).catch(res => {
        alert('post')
      })
    },

    // 营业执照
    handleDiscriptionImage (e) {
      this.ruleForm.businessPhotos.push(e.result)
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
          if (ruleForm.passwordConfirm !== ruleForm.password) {
            this.$message({
              type: 'warning',
              message: '两次密码输入不一致'
            })
            return false
          }
          ruleForm.passwordConfirm = null

          // 检查有没有自行输入密码
          if (ruleForm.password === '没有返回密码') {
            ruleForm.password = null
            ruleForm.passwordConfirm = null
          } else if (!/[A-Za-z0-9]{6,16}/g.test(ruleForm.password)) {
          // 禁止输入特殊符号 中文
            this.$message({
              type: 'warning',
              message: '密码中只能使用英文字母或数字'
            })
            return false
          }

          if (this.type === 'add') {
            this._handleSubmit(ruleForm)
          } else {
            this._updata(ruleForm)
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 提交表单
    _handleSubmit (ruleForm) {
      this.$http.post(this.$apis.api_user_save, {
        ...ruleForm,
        businessPhotos: this.ruleForm.businessPhotos.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.$router.go(-1)
      }).catch(res => {
        alert('post')
      })
    },

    _updata (ruleForm) {
      delete this.ruleForm.createTime
      this.$http.post(this.$apis.api_user_update, {
        ...ruleForm,
        businessPhotos: this.ruleForm.businessPhotos.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.$router.go(-1)
      }).catch(res => {
        alert('post')
      })
    }
  },
  beforeDestroy () {
    this.$store.commit('account/agent', null)
  }

}
</script>
<style lang="scss" scoped>
.middle-box{
  flex: 1;
}
.title{
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 20px;
}
.el-input /deep/ .el-input--inner{
  width:400px;
}
.store-avatar{
  position: relative;
  height: 100px;
  width: 100px;
  margin-right: 20px;
}
.bei-zhu{
  width: 400px;
}
.address-box{
  .el-input{
    width: 150px;
  }
}
.el-input /deep/ .el-input__inner{
  width:400px;
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
.imh{
  height: 100px;
  width: 100px;
}

.image-list{
  margin-left: 100px;
  .image-box{
    position: relative;
  }
  .image-box:hover .delete-box{
    display: block;
  }
  .delete-box{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    background-color: rgba($color: #000000, $alpha: .2);
    font-size: 30px;
    text-align: center;
    line-height: 100px;
    color: white;
  }
}
</style>
