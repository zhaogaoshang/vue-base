<template>
  <div class="login_container">
    <div class="top_background">
      <!-- <img src="https://3d-fabric.oss-cn-beijing.aliyuncs.com/public-images/toptext%402x.png"
           alt="厚鸟科技面料后台管理系统"> -->
    </div>
    <div class="login">
      <div class="login_form_box">
        <!-- 提示信息 -->
        <div class="msgBox" ref="msgBox"></div>
        <el-form :model="loginForm"
        v-loading="loading"
               :rules="rules"
               ref="loginform"
               label-width="0px"
               class="demo-loginForm">
        <el-form-item
                      prop="phone"
                      class="username"
                      >
                      <img src="~@/assets/yonghuming-01-01@2x.png" alt="">
          <el-input type="text"
                    class="username_input"
                    v-model="loginForm.phone"
                    placeholder="请输入用户名"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
                      class="password"
                      prop="password">
                      <img src="~@/assets/mima@2x.png" alt="">
          <el-input type="password"
                    class="password_input"
                    show-password
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="subbtn" type="primary" style=""
          @click="submitForm">立即登录</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
    <div class="ICP"><a href="http://beian.miit.gov.cn/" target="_blank">京ICP备2021017347号-1</a></div>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Form,
  FormItem,
  Loading,
  Button,
  Input
} from 'element-ui'
export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElButton: Button,
    ElInput: Input
  },
  directives: {
    loading: Loading
  },
  data () {
    var phoneValidate = (rule, value, callback) => {
      let reg = /[1]{1}[3-9]{1}[0-9]{9}/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('不是正确的手机号格式'))
      }
    }
    return {
      loginForm: {
        phone: '',
        password: '',
        clientSideType: 0
      },
      loading: false,
      rules: {
        phone: [
          {required: true, message: '请输入用户名'},
          {validator: phoneValidate, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {max: 16, min: 6, message: '密码为6到16位之间', trigger: 'blur'}
        ]
      },
      timeNo: null
    }
  },
  created () {
    this.getAccount_password()
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    fadeInFn (dom, msg) {
      if (this.timeNo !== null) {
        clearTimeout(this.timeNo)
      }
      dom.style.opacity = 1
      dom.innerHTML = msg
      this.timeNo = window.setTimeout(() => {
        dom.style.opacity = 0
      }, 2000)
    },
    submitForm () {
      this.loading = true
      this.$refs['loginform'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          let msgBox = this.$refs.msgBox
          this.fadeInFn(msgBox, '用户名或密码不规范')
          this.loading = false
          return false
        }
      })
    },
    login () {
      this.$http.post(this.$apis.api_login_login, this.loginForm).then(res => {
        console.log('res', res)
        if (res.code === 'SUCCESS') {
          this.setAccount_password()
          this.$store.commit('user/setUserInfo', res.result)
          this.$store.commit('user/setToken', res.sign)
          this.loading = false
          this.$router.replace('/index')
          // this.$router.replace('/scanCodeToEnter')
        } else {
          let msgBox = this.$refs.msgBox
          this.fadeInFn(msgBox, res.msg)
          this.loading = false
        }
      })
    },
    // 加密保存到本地
    setAccount_password () {
      let loginData = CryptoJS.AES.encrypt(JSON.stringify(this.loginForm), 'account_password')
      window.localStorage.setItem('account_password', loginData)
    },
    // 解码回填
    getAccount_password () {
      let encrypt = window.localStorage.getItem('account_password')
      if (encrypt) {
        let bytes = CryptoJS.AES.decrypt(encrypt.toString(), 'account_password')
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        this.loginForm = decryptedData
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.top_background {
  width: 100%;
  height: 450px;
  text-align: center;
  background: #346a99 no-repeat url("https://3d-fabric.oss-cn-beijing.aliyuncs.com/public-images/login-page-bg.png") center center;
  background-size: cover;
  img {
    width: 370px;
    padding-top: 157px;
  }
}
.login {
  width: 100%;
}
.login {
  padding-top: 100px;
  display: flex;
  justify-content: center;
}
.login .login_form_box {
  width: 500px;
  position: relative;
  .msgBox {
    position: absolute;
    left: 583px;
    top:88px;
    width: 263.6px;
    height: 58px;
    background-color: #7f7f7f;
    border-radius: 29px;
    transition: all 1s;
    opacity: 0;
    text-align: center;
    font: normal 400 17px/58px 'microsoft yahei';
    color:white;
  }
}
.username,.password {
  position: relative;
  margin: 30px 0 0 0;
  img {
    position: absolute;
    top: 19px;
    left:20px;
    height: 21px;
    z-index: 1;
  }
}
.username {
  margin-top: 0;
}
/deep/.el-input .el-input__inner {
  height: 58px;
  font-size: 17px;
  text-indent: 60px;

}
.ICP {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  text-align: center;
  color: #666666;
}
.subbtn {
  background-color:#4972F1;width:100%;margin-top:47px;height:58px;font:normal 400 23px/23px 'microsoft yahei'
}
</style>
