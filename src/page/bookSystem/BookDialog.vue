<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      {{dialogTitle}}
    </span>
    <el-form :model="form" label-position="left" label-width="100px" class="user-form">
      <el-form-item label="图书识别码">
        <el-input v-model="form.bookId" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="图书名">
        <el-input v-model="form.bookName" auto-complete="off"></el-input>
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
    name: "BookDialog",
    props: ['dialogVisible', 'dialogTitle'],
    data: function () {
      return {
        form: {
          bookId: '',
          bookName: '',
        }
      }
    },
    created() {
    },
    methods: {
      //关闭弹出框
      closeDialog(done) {
        this.$emit('handleClose', done);
      },

      //保存操作
      submit() {
        let self = this;
        self.$http.post('/hao/book/saveOrUpdateBook', self.form, {emulateJSON: true}).then(response => {
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
    }
  }
</script>

<style scoped>

</style>
