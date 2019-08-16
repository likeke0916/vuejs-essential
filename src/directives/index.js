import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'
// 引入 title.js 的默认值
import title from './title'

const directives = {
  validator,
  dropdown,
  // 添加 title 以便在循环中进行注册
  title
}

//Object.entries 返回给定对象的键值对数组，以 Object.entries(directives) 的返回为例：
//[['validator', {...}], ['dropdown', {...}]]
for (const [key, value] of Object.entries(directives)) {
  /*
  注册全局指令需要使用 Vue.directive，第一个参数 'validator' 是指令名称，
  第二个参数 validator 是指令对象或者指令函数，我们这里是指令对象。全局注册的好处是，
  可以在实例内部的所有组件中使用，而不用在每个组件内部单独引用和注册
  */
  Vue.directive(key, value)
}
