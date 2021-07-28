<template>
  <div class="content">
    <span @click="handleActiveThis(item)" v-for="item in options" :key="item.id" :class="['content_btn',active===item.id?'active':'']">{{item.name}}</span>
  </div>
</template>

<script>
// import {Message} from 'element-ui'
export default {
  name: 'TabButton',
  props: {
    options: {
      type: Array,
      default: () => [],
      discription: "示例 [{name:'按钮一',id:'1'},{name:'按钮二',id:'2'},]"
    },
    active: {
      discription: '选中的id'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleActiveThis (item) {
      this.$emit('update:active', item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
}
.content_btn {
  background: rgba(214, 224, 253, 1);
  box-shadow: 0px 3px 6px 0px rgba(0, 129, 204, 0.28);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 10px 26px;
  margin-right: 30px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(73, 114, 241, 1);
  cursor: pointer;
  &:hover {
    background: rgba(73, 130, 255, 1);
    color: #FFFFFF;
  }
}
.active {
  background:rgba(73, 114, 241, 1);
  color: #FFFFFF;
}
</style>
