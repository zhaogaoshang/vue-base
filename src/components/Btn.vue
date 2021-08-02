<template>
  <span class="btn" :class="type" @click="handleClick">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    type: {
      type: String,
      default: 'one'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  border-radius: 8px;
  padding: 10px 34px;
  font-size: 16px;
  font-weight: normal;
}
.one{
  color: #FFFFFF;
  background: $theme-lan;
}
.two{
  background: #E2E9FF;
  color: $theme-lan;
}
</style>
