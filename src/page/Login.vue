<template>
  <div class="login-panel">
    <el-form :model="form" label-position="top">
      <el-form-item label="登录名">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="primary" @click="onsubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          name: '',
          password: '',
        }
      }
    },
    methods: {
      onsubmit() {
        if (this.form.name === '' || this.form.password === '') {
          this.$notify.warning('账号或密码不能为空');
        } else {
          this.$http.post('/hao/login/login', this.form, {emulateJSON: true}).then(reason => {
            if (reason.body.code === 1) {
              this.$router.push('/book');
              localStorage.setItem('author', reason.body.data.name);
              localStorage.setItem('id', reason.body.data.id);
            } else {
              this.$notify.error(reason.body.msg)
            }
          })
        }
      }
    }
  }
</script>

<style>
  .login-panel {
    width: 380px;
    margin: 0 auto;
  }

  .login-panel .el-form-item {
    text-align: left;
  }

  .login-button .el-button {
    width: 100%;
  }
</style>
