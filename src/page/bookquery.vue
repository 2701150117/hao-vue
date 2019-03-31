<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="书名">
      <el-input v-model="formInline.bookName" placeholder="书名"></el-input>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="formInline.classify" placeholder="分类">
        <el-option label="理工" value="science"></el-option>
        <el-option label="散文" value="prose"></el-option>
        <el-option label="小说" value="novel"></el-option>
        <el-option label="其它" value="others"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "bookquery" ,
      data() {
        return {
          formInline: {
            bookName: '',
            classify: ''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
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
</style>
