<template>
  <div :class="['box', typeStyle]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    typeStyle: {
      type: String,
      default: 'max'
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
.box{
  display: inline-block;
  text-align: center;
  box-shadow: 2px 3px 8px 1px rgba(0, 129, 204, 0.18);
}

.max,
.middle{
  background: linear-gradient(90deg, #00BBCC, #0087cc);
  color: #FFFFFF;
}

.max{
  min-width: 360px;
  height: 66px;
  line-height: 66px;
  border-radius: 33px;
  font-size: 28px;
  font-weight: 800;
}

.su,
.middle{
  border-radius: 8px;
  font-size: 22px;
  font-weight: bold;
  line-height: 52px;
  min-width: 150px;
  height: 52px;
}

.mini{
  width: 90px;
  height: 33px;
  background: linear-gradient(90deg, #00BBCC, #0081CC);
  box-shadow: 0px 4px 7px 0px rgba(0, 129, 204, 0.07);
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 33px;
}
</style>
