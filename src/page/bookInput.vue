<template>
  <div align="center">
    <el-card class="box-card">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="书名">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.classify"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success">录入</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "bookInput",
    data: function () {
      return {
        abelPosition: 'left',
        form: {
          bookName: '',
          author: '',
          classify: ''
        }
      }
    }
  }
</script>

<style>
  .text {
    font-size: 20px;
  }

  .item {
    padding: 30px 0;
  }

  .box-card {
    width: 700px;
  }
</style>
