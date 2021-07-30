<template>
  <div :class="['public-row__align', 'search-box', bg]">
    <i class="el-icon-search" @click="handleSearch"></i>
    <input class="input" v-model="input" :placeholder="placeholder"/>
  </div>
</template>
<script>
export default {
  props: {
    bg: {
      type: String,
      default: 'fen'
    },
    value: {
      type: String,
      value: ''
    },
    placeholder: {

    }
  },
  data () {
    return {
      input: ''
    }
  },
  watch: {
    'value' (val) {
      if (val === this.input) { return false }
      this.input = val
    },
    'input' (val) { this.$emit('input', val) }
  },
  created () {
  },
  computed: {
  },
  methods: {
    handleSearch () {
      this.$emit('search', this.input)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-box{
  width: 440px;
  height: 50px;
  padding: 0 30px;
  background: #E5E5E5;
  border-radius: 25px;
  border: 1px solid rgba($color: #000000, $alpha: .1);
  box-sizing: border-box;
  .input{
    flex: 1;
    background-color: rgba($color: #000000, $alpha: 0);
    padding: 0 10px;
  }
  .search-icon{
    width: 46px;
    height: 46px;
    margin-top: -1px;
    margin-right: -1px;
  }
  .el-icon-search{
    font-size: 20px;
    margin-top:15px;
  }
}

.fen{
  background: #F7F7F7;
}
.bai{
  background: #ffffff;
}
</style>
