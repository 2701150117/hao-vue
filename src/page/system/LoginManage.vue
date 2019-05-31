<template>
  <div>
    <div class="search-class">
      <el-form ref="form" label-position="right" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="工号" prop="id">
              <el-input v-model="searchForm.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登录名" prop="name">
              <el-input v-model="searchForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button type="primary" @click="loadTableData">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-class">
      <div class="page-button-class">
        <el-button size="medium" plain icon="el-icon-user" @click="addLogin">注册登录账号</el-button>
      </div>
      <hao-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation"></hao-table>
      <hao-pagination :total="total" :page-size="pageSize" :current-page="currentPage"
                      @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></hao-pagination>
    </div>
    <LoginDialog :dialog-visible="dialogVisible" @handleClose="handleClose"/>
  </div>
</template>

<script>
  import LoginDialog from "./LoginDialog";

  export default {
    name: "LoginManage",
    components: {LoginDialog},
    data() {
      return {
        dialogVisible: false,
        searchForm: {
          id: '',
          name: '',
        },
        labelData: [{
          prop: 'id',
          name: '工号',
        }, {
          prop: 'name',
          name: '登录名'
        }, {
          prop: 'createDate',
          name: '注册时间',
          formatter: this.dateFormat
        }],
        tableData: [],
        columnIndex: {
          show: true,
          width: 50,
        },

        columnOperation: {
          show: localStorage.getItem('author') === 'admin',
          width: 150,
          name: '操作',
          operate: [{
            name: '重置密码',
            icon: 'el-icon-key',
            click: this.rePasswordClick,
          }, {
            name: '删除',
            icon: 'el-icon-delete',
            click: this.deleteClick,
          }]
        },

        pageSize: 10,
        currentPage: 0,
        total: 0,
      }
    },
    created() {
      this.loadTableData();
    },
    methods: {
      dateFormat(row, column, executeTime) {
        let date = new Date(executeTime);
        return date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
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
      //加载表格
      loadTableData() {
        let self = this;
        let entity = {
          name: self.searchForm.name,
          pageSize: self.pageSize,
          currentPage: self.currentPage
        };
        self.$http.get('/hao/login/get', {params: entity}).then(response => {
          self.tableData = response.body.page.list;
          self.total = response.body.page.total;
        });
      },
      addLogin() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.loadTableData();
        this.dialogVisible = false;
      },
      rePasswordClick(row) {

        this.$confirm('重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/hao/login/re', {params: row}).then(reason => {
            if (reason.body.code === 1) {
              this.$notify.success('重置密码成功');
            } else {
              this.$notify.error('重置密码失败');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      },
      deleteClick(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/hao/login/delete', {params: row}).then(response => {
            if (response.body.code === 1) {
              this.$message.success('成功');
            } else {
              this.$message.error(response.body.msg);
            }
            this.loadTableData();
          }, response => {
            this.$message({
              title: '失败',
              type: 'error'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
