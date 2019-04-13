<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      {{dialogTitle}}
    </span>
    <el-form :model="form" label-position="left" label-width="80px" class="user-form">
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
        console.log(this.form);
      },

      //编辑操作
      editForm(data) {
        this.form.bookId = data.bookId;
        this.form.bookName = data.bookName;
      }
    }
  }
</script>

<style scoped>

</style>
