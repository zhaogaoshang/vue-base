<template>
  <div id="app">
    <transition name="fold">
      <keep-alive include="Index, Login">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url("./css/bases.scss");
.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .3s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .3s;
}

@keyframes fold-in {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fold-out {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 0;
  }
}
</style>
