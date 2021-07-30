<template>
  <div :class="['public-column', 'Shadow-box', width, height]">
    <slot class="inner"></slot>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: 'min-height'
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.Shadow-box{
  background: #FFFFFF;
  box-shadow: 0px 10px 8px 2px rgba(211, 211, 211, 0.32);
  border-radius: 30px;
  padding: 30px;
}

.width-1030{
  width: 970px;
}

.width-500{
  width: 440px;
}

.height-380{
  height: 380px;
}

.min-height{
  // min-height: 400px;
  // height: auto;
  min-height: 0px;
}
</style>
