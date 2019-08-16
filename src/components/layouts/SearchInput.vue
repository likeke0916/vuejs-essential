<template>
  <div class="navbar-form navbar-left hidden-sm">
    <div class="form-group">
      <!--

        在监听键盘事件时，我们经常需要检查常见的键值，.enter 就是一个 按键修饰符，常用的按键修饰符有：
        .enter：回车键；
        .tab：制表键；
        .delete：删除和退格键；
        .esc：中止键；
        .space：空格键；
        .up：向上方向键；
        .down：向下方向键；
        .left：向左方向键；
        .right：向右方向键；
       -->
      <input
        v-model.trim="searchValue"
        type="text"
        class="form-control search-input mac-style"
        placeholder="搜索"
        @keyup.enter="search"
        @input="updateSearchValue"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      value: '' // 搜索值
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.searchValue
      },
      set(newValue) {
        this.value = newValue
      }
    }
  },
  methods: {
    search() {
      const value = this.value

      if (value !== '') {
        // 跳转到搜索结果页，附带查询参数 q 作为搜索值
        this.$router.push({ name: 'Search', query: { q: value } })
      }
    },
     //更新searchValue
    updateSearchValue() {
      this.$store.commit('UPDATE_SEARCH_VALUE', this.value)
    }
  },

}
</script>

<style scoped>
</style>
