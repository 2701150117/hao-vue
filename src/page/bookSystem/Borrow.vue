<template>
  <el-dialog :visible.sync="dialogVisible" width="40%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      借书单
    </span>
    <el-form :model="searchForm" ref="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.userName" prefix-icon="el-icon-search" v-on:input="loadTableData"></el-input>
      </el-form-item>
    </el-form>
    <hao-table ref="userTable" :data="tableData" :label="labelData" :column-index="columnIndex"
               :column-operation="columnOperation" @rowClick="rowClick"></hao-table>
    <hao-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                    @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></hao-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "borrow",
    props: ['dialogVisible', 'bookId'],
    data() {
      return {
        searchForm: {
          userName: '',
        },
        tableData: [],
        labelData: [{
          prop: 'userName',
          name: '姓名',
        }, {
          prop: 'userNumber',
          name: '身份证号码',
        }, {
          prop: 'userPhone',
          name: '手机号'
        }],
        columnIndex: {
          show: true,
          width: 50,
        },
        columnOperation: {
          show: false,
          width: 150,
          name: '操作',
          operate: []
        },
        pageSize: 5,
        currentPage: 1,
        total: 0,
        currentUser: null,
      }
    },
    methods: {
      closeDialog(done) {
        this.searchForm.userName = '';
        this.currentUser = null;
        this.$emit('handleClose', done);
      },
      loadTableData() {
        let entity = {
          userName: this.searchForm.userName,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        };
        this.$http.get('/hao/user/search', {params: entity}, {emulateJSON: true}).then(reason => {
          this.tableData = reason.body.page.list;
          this.total = reason.body.page.total;
        })
      },
      //分页
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTableData();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadTableData();
      },
      submit() {
        if (this.currentUser == null) {
          this.$message({
            type: 'warning',
            message: '请选择用户'
          });
        } else {
          this.$confirm('确认借出？借出用户: ' + this.currentUser.userName + ' , 借出期限为三个月?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let entity = {
              bookId: this.bookId,
              userId: this.currentUser.userId
            };
            this.$http.post('/hao/borrow/borrowBookByUserId', entity, {emulateJSON: true}).then(response => {
              if (response.body.code === 1) {
                this.$message({
                  title: '成功',
                  type: 'success',
                  message: '借还时间: ' + response.body.data
                });
                this.closeDialog();
              } else {
                this.$message({
                  title: '失败',
                  type: 'error',
                  message: response.body.msg
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消借出'
            });
          });
        }
      },

      rowClick(row) {
        this.currentUser = row;
      },
    }
  }
</script>

<style scoped>

</style>
