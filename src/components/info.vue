<template>
  <div>
    <div>
      <el-input v-model="str"></el-input>
      <el-button @click="search()">查询</el-button>
    </div>
    <div>
      {{result}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "info",
    data() {
      return {
        str: '',
        result: ''
      }
    },
    methods: {
      search() {
        this.result = this.str + this.$route.name
      }
    }
  }
</script>

<style scoped>

</style>
