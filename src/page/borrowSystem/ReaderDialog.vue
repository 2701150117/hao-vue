<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      {{dialogTitle}}
    </span>
    <el-form :model="form" ref="form" label-position="left" label-width="100px" class="user-form">
      <el-form-item label="姓名">
        <el-input v-model="form.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.userNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.userAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.userPhone" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "ReaderDialog",
    props: ['dialogVisible', 'dialogTitle'],
    data: function () {
      return {
        form: {
          id: '',
          userName: '',
          userNumber: '',
          userAddress: '',
          userPhone: ''
        }
      }
    },
    methods: {
      closeDialog(done) {
        this.clearForm();
        this.$emit('handleClose', done);
      },
      submit() {
        this.$http.post('/hao/user/saveOrUpdate', this.form, {emulateJSON: true}).then(reason => {
          this.$notify({
            title: '成功',
            type: 'success'
          });
          this.closeDialog();
        }, response => {
          this.$notify({
            title: '失败',
            type: 'error'
          });
        })
      },
      clearForm() {
        this.$refs.form.resetFields();
        this.form = {
          userName: '',
          userNumber: '',
          userAddress: '',
          userPhone: ''
        }
      },
      editForm(data) {
        this.form.userId = data.userId;
        this.form.userName = data.userName;
        this.form.userAddress = data.userAddress;
        this.form.userNumber = data.userNumber;
        this.form.userPhone = data.userPhone;
      }
    }
  }
</script>

<style scoped>
  .user-form {
    padding: 20px;
    text-align: left;
  }
</style>
