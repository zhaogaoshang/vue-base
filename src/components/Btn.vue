<template>
  <span class="btn" @click="handleClick">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Btn',
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
  background: #4972F1;
  border-radius: 8px;
  padding: 10px 34px;
  font-size: 16px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #FFFFFF;
  &:active {
    background: rgba(73, 130, 255, 1);
    color: #FFFFFF;
  }
}
</style>
