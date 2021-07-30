<template>
  <div :class="['box',checkValue===this.options[0]?'active':'']" @click="handleCheck">
    <i v-show="checkValue===this.options[0]" class="el-icon-check"></i>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    row: {
      discription: '表格当前行数据'
    },
    checkValue: {

    },
    options: {
      type: Array,
      discription: '[选中的值,未选中的值]'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleCheck () {
      if (this.checkValue === this.options[1]) {
        this.$emit('success', [this.row, this.options[0]])
      } else {
        this.$emit('success', [this.row, this.options[1]])
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: 1px solid rgba(73, 114, 241, 1);

}
.active {
  background-color: rgba(73, 114, 241, 1);
}
.el-icon-check {
  font-size: 13px;
  color: white;
}
</style>
