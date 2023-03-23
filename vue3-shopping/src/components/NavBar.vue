<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100vw;
  height: 5vh;
  border-bottom:1px solid #eee;

  .left,
  .center,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
  }

  .left {
    width: 15vw;

    text-align: center;
  }

  .center {
    flex: 1;
  }

  .right {
    width: 15vw;
    text-align: center;
  }
}
</style>
