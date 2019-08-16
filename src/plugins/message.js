import MessageComponent from '../components/Message'

export default {
  // 插件的公开方法 install
  install: (Vue) => {
    //Vue.extend 用来创建一个新『子类』，其参数是一个包含组件选项的对象，对应我们这里的 Message 组件
    const Message = Vue.extend(MessageComponent)
    //使用 new 关键字可以创建一个新的 Message 实例，因为没有指定 el 挂载目标，当前实例处于『未挂载』状态
    const vm = new Message()
    //使用 vm.$mount() 手动地挂载一个未挂载的实例，并返回当前实例，此时我们能从实例获取 $el
    const $el = vm.$mount().$el

    Vue.nextTick(() => {
      // 在下一次 DOM 更新后，将实例目标添加到 #main-container 元素内部的最前面
      document.querySelector('#main-container').prepend($el)
    })

    //添加一个事件监听：监听 show 值的改变
    /*
      $on 用来监听当前实例上的自定义事件，其第一个参数是事件名称或包含事件名称的数组，
      其第二个参数是回调函数，该函数会接收触发函数的所有参数。我们用 $on 来监听 Message 组件的关闭按钮触发的事件
    */
    vm.$on('update:show', (value) => {
       // 更改当前的 show 值
      vm.show = value
    })

    /// 添加 show 和 hide 方法来显示和关闭提示框
    const message = {
      // 更改消息并显示提示框，其逻辑跟我们之前写的 showMsg 一模一样
      show(msg = '', type = 'success') {
        vm.msg = msg
        vm.type = type
        vm.show = false

        Vue.nextTick(() => {
          vm.show = true
        })
      },
      // 关闭提示框
      hide() {
        Vue.nextTick(() => {
          vm.show = false
        })
      }
    }
    // 添加实例方法
    Vue.prototype.$message = message
  }
}
