<template>
  <div class="img-verify">
    <canvas ref="verify" :width="width" :height="height" @click="handleDraw"></canvas>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue"

export default defineComponent({
  setup() {
    const verify = ref(null)
    const state = reactive({
      pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',//字符串
      width: 120,
      height: 40,
      imgCode: ''
    })

    onMounted(() => {
      // 初始化绘制图片验证码
      state.imgCode = draw()
    })

    // 点击图片重新绘制
    const handleDraw = () => {
      state.imgCode = draw()
    }

    // 随机数
    const randomNum = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min)
    }

    // 随机颜色
    const randomColor = (min, max) => {
      const r = randomNum(min, max)
      const g = randomNum(min, max)
      const b = randomNum(min, max)

      return `rgb(${r},${g},${b})`
    }

    // 绘制图片
    const draw = () => {
      const ctx = verify.value.getContext('2d')

      // 绘制矩形
      // 填充颜色
      ctx.fillStyle = randomColor(180, 230)
      // 填充的位置
      ctx.fillRect(0, 0, state.width, state.height)

      // 验证字符串
      let imgCode = ''
      for (let i = 0; i < 4; i++) {
        /*
         * 绘制文字并让四个文字在不同的位置显示的思路 :
         * 1、定义字体
         * 2、定义对齐方式
         * 3、填充不同的颜色
         * 4、保存当前的状态（以防止以上的状态受影响）
         * 5、平移translate()
         * 6、旋转 rotate()
         * 7、填充文字
         * 8、restore出栈
         * */

        // 随机四个数
        const text = state.pool[randomNum(0, state.pool.length)]
        imgCode += text

        // 随机字体大小
        const fontSize = randomNum(2, 3)

        // 字体旋转角度
        const deg = randomNum(-30, 30)

        ctx.fontSize = fontSize + 'rem'
        ctx.textBaseline = 'top'
        ctx.fillStyle = randomColor(80, 150)

        /*
         * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
         * 这就允许您临时地改变图像状态，
         * 然后，通过调用 restore() 来恢复以前的值。
         * save是入栈，restore是出栈。
         * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
         *
         * */
        ctx.save()
        ctx.translate(30 * i + 15, 25)
        ctx.rotate((deg * Math.PI) / 180)

        // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
        // 请使用 font 属性来定义字体和字号，并使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
        ctx.fillText(text, -15 + 5, -15)
        ctx.restore()
      }

      // 随机产生线条干扰线
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height))
        ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height))
        ctx.strokeStyle = randomColor(150, 200)
        ctx.closePath()
        ctx.stroke()
      }

      // 随机产生干扰小点
      for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(randomNum(0, state.width), randomNum(0, state.height), 1, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = randomColor(150, 200)
        ctx.fill()
      }

      return imgCode
    }


    return {
      verify,
      ...toRefs(state),
      handleDraw
    }
  }
})
</script>

<style lang="less" scoped>
.img-verify canvas {
  cursor: pointer;
}
</style>
