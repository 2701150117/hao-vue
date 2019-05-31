<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      新增登录账号
    </span>
    <el-form :model="form" ref="form" label-position="left" label-width="100px" class="user-form">
      <el-form-item label="工号">
        <el-input v-model="form.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="form.name" auto-complete="off"></el-input>
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
    name: "LoginDialog",
    props: ['dialogVisible'],
    data() {
      return {
        form: {
          id: '',
          name: '',
        }
      }
    },
    methods: {
      closeDialog(done) {
        this.$emit('handleClose', done);
        this.clear();
      },

      clear() {
        this.$refs.form.resetFields();
        this.form = {
          id: '',
          name: '',
        };
      },

      submit() {
        this.$http.post('/hao/login/add', this.form, {emulateJSON: true}).then(reason => {
          if (reason.body.code === 1) {
            this.$notify({
              title: '成功',
              type: 'success'
            });
            this.closeDialog();
          } else {
            this.$notify({
              title: reason.body.msg,
              type: 'error'
            })
          }
        }, reason => {
          this.$notify({
            title: reason.body.msg,
            type: 'error'
          })
        });
      }
    }
  }
</script>

<style scoped>

</style>
