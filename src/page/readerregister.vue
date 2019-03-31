<template>
  <div align="center">
  <el-form :label-position="labelPosition" style="width:600px" label-width="80px" :model="formLabelAlign">
    <el-form-item label="学号">
      <el-input v-model="formLabelAlign.number"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password"></el-input>
    </el-form-item>
    <el-button type="success">注册</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
  export default {
    name: "readerregister",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        number: '',
        name: '',
        password: ''
      }
    };
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
