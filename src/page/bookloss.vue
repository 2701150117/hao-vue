<template>
  <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
    <el-form-item label="丢失书名">
      <el-input v-model="sizeForm.name"></el-input>
    </el-form-item>
    <el-form-item label="书刊分类">
      <el-select v-model="sizeForm.classify" style="width:370px" placeholder="请输入书刊类别">
        <el-option label="理工" value="science"></el-option>
        <el-option label="散文" value="prose"></el-option>
        <el-option label="小说" value="novel"></el-option>
        <el-option label="其它" value="others"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="丢失地点">
      <el-input v-model="sizeForm.address"></el-input>
    </el-form-item>
    <el-form-item label="丢失时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width:50%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width:50%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "bookloss",
      data() {
        return {
          sizeForm: {
            name: '',
            address:'',
            classify:'',
            date1: '',
            date2: '',
            delivery: false,
            desc: ''
          }
        };
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    };
</script>

<style>
  .text {
    font-size: 20px;
  }

  .item {
    padding: 30px 0;
  }
</style>
