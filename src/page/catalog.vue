<template>
  <el-table :data="tableData" stripe style="width: 100%" @current-chagne="currentChange">
    <el-table-column prop="name" label="书名" width="180"/>
    <el-table-column prop="author" label="作者" width="180"/>
    <el-table-column prop="classify" label="分类"/>
  </el-table>
</template>

<script>
  export default {
    name: "catalog.vue",
    data() {
      return {
        tableData: [{
          name: 'Android',
          author: '郭霖',
          classify: '理工科'
        }, {
          name: '西游记',
          author: '吴承恩',
          classify: '神话小说'
        }, {
          name: '飞鸟集',
          author: '泰戈尔',
          classify: '文学诗集'
        }, {
          name: '鲁滨孙漂流记',
          author: '笛福',
          classify: '长篇小说'
        }]
      }
    },
    created: function () {

    },

    methods: {
      currentChange() {

      }

    }
  }
</script>

<style scoped>

</style>
