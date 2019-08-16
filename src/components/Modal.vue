<template>
  <div>
    <transition
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
    <!--
      .self 是一个 事件修饰符，常用的事件修饰符有：

      .self：当 event.target 是当前元素自身时触发处理函数；
      .stop：阻止事件继续传播；
      .prevent：阻止事件默认行为；
      .capture：使用事件捕获模式；
      .once：事件只会触发一次；
     -->
      <div v-show="show" class="modal" style="display:block" @click.self="close">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button @click="close" class="close">×</button>
              <h4 class="modal-title">
              <!--
                slot 用于分发内容，它可以有一个 name 属性。在父组件内如果有与其名称对应的元素（使用 slot 特性的元素），比如 <div slot="title">，那么 <div slot="title"> 这块内容就会插入 <slot name="title"></slot> 所在的位置并将其替换
               -->
                <slot name="title"></slot>
              </h4>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-show="show" class="modal-backdrop fade in" @click="close"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 触发事件以关闭弹窗
      this.$emit('update:show', false)
    }
  },
  watch: {
    show(value) {
      // 监听 show 值以切换 body 上 modal-open 类
      const bodyClassList = document.body.classList

      if (value) {
        bodyClassList.add('modal-open')
      } else {
        bodyClassList.remove('modal-open')
      }
    }
  }
}
</script>

<style scoped>
.animated { animation-duration: .4s;}
.fade-enter, .fade-leave-to { opacity: 0;}
</style>
