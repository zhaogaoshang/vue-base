<template>
  <div class="updata">
    <input class="updata-input" type="file" ref="upInput" @change="getFile($event)">
    <div class="slot-box public-shou" @click="handleClick">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    url: {
      type: String,
      default: ''
    },
    upData: {
      type: Object,
      default: function (e) {
        return e
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      default: null,
      discription: '在上传期间不允许做其他操作的一个功能'
    }
  },
  data () {
    return {
    }
  },

  created () {
  },

  mounted: function () {
  },

  computed: {
  },

  methods: {
    getFile (event) {
      if (this.loading !== null) {
        this.$emit('update:loading', true)
      }
      let file = event.target.files[0]
      // event.preventDefault()
      let formData = new FormData()
      formData.append('imgUpload', file)
      formData.append('merchantCode', this.$store.state.user.userInfo.merchantCode)
      formData.append('superMerchantCode', this.$store.state.user.userInfo.merchantCode)
      Object.keys(this.upData).forEach((key) => {
        formData.append(key, this.upData[key])
      })

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.$http.post(this.url, formData, config).then((res) => {
        if (res.code !== 'SUCCESS') {
          return this.$message(res.msg)
        }

        this.$emit('on-success', res)
        if (this.loading !== null) {
          this.$emit('update:loading', false)
        }
      }).catch(fail => {
        if (this.loading !== null) {
          this.$emit('update:loading', false)
        }
        alert('上传失败：' + fail)
      })
    },

    // 点击显示
    handleClick () {
      if (this.disabled) return false
      this.$refs.upInput.click()
    }
  }
}
</script>
<style lang="scss" scoped>
.updata{
  position: relative;
  display: flex;
  .updata-input{
    height: 0;
    width: 0;
    opacity: 0;
    .slot-box{
      display: inline-block;
      position: relative;
      z-index: 1;
    }
  }
}
</style>
