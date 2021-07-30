<template>
  <div class="public-column category">
    <!-- <div class="public-row bottom-info"> -->
      <el-card class="card">
        <div class="box">
          <span class="title">支付方式设置:</span>
          <el-radio @click.native="changeId($event,item)" v-for="item in list" :key="item.id" v-model="defaultPay" :label="item">{{item.name}}</el-radio>
        </div>
      </el-card>
    <!-- </div> -->
  </div>
</template>
<script>
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'
import {Radio, Card} from 'element-ui'

export default {
  components: { ShadowBox, User, ElRadio: Radio, ElCard: Card },
  name: 'PaymentSettings',

  data () {
    return {
      list: [],
      defaultPay: null,
      timer: null
    }
  },
  watch: {

  },

  created () {
    this.dataEcho()
  },

  computed: {

  },

  methods: {
    changeId ($event, item) {
      this.save(item)
    },
    async save (item) {
      try {
        if (this.timer) {
          return false
        }
        this.timer = true
        let params = {
          id: item.id,
          status: 1
        }
        const res = await this.$http.post(this.$apis.api_pay_update, params)
        this.timer = null
        if (res.code !== 'SUCCESS') {
          this.defaultPay = null
          return this.$message.error(res.msg)
        }
        this.$message.success(`已选择${item.name}`)
        this.defaultPay = item
      } catch (error) {
        this.timer = null
        console.log(error)
        this.$message.error('error')
      }
    },
    async dataEcho () {
      try {
        let params = {

        }
        const res = await this.$http.post(this.$apis.api_pay_list, params)
        if (res.code !== 'SUCCESS') {
          return this.$message({
            type: 'error',
            message: res.msg
          })
        }
        this.list = res.result
        this.list.forEach(item => {
          if (item.status === 1) {
            this.defaultPay = item
          }
        })
      } catch (error) {
        this.$message.error('error')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card{
  border-radius: 30px;
  width: 100%;
  min-height: 700px;
}
.box {
  margin: 40px 0 0 24px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}
.title {
  padding-right: 24px;
}
/deep/.el-radio .el-radio__label {
  font-size: 20px;
}
</style>
