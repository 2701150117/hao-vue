<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :span="5">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.userName" clearable></el-input>
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
        <el-button size="medium" plain @click="addUser">新增读者</el-button>
      </div>
      <hao-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation"></hao-table>
      <hao-pagination :total="total" :page-size="pageSize" :current-page="currentPage"
                      @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></hao-pagination>
    </div>
    <ReaderDialog ref="ReaderDialog" :dialog-visible="dialogVisible" :dialog-title="dialogTitle"
                  @handleClose="handleClose"></ReaderDialog>
  </div>
</template>

<script>
  import ReaderDialog from "./ReaderDialog";

  export default {
    name: "Reader",
    components: {ReaderDialog},
    data: function () {
      return {
        dialogVisible: false,
        dialogTitle: '',
        searchForm: {
          userName: ''
        },
        tableData: [],
        labelData: [{
          prop: 'userName',
          name: '姓名',
        }, {
          prop: 'userNumber',
          name: '身份证号码',
        }, {
          prop: 'userAddress',
          name: '地址'
        }, {
          prop: 'userPhone',
          name: '手机号'
        }],
        columnIndex: {
          show: true,
          width: 50,
        },
        columnOperation: {
          show: true,
          width: 150,
          name: '操作',
          operate: [{
            name: '编辑',
            icon: 'el-icon-edit-outline',
            click: this.editClick,
          }, {
            name: '删除',
            icon: 'el-icon-delete',
            click: this.deleteClick,
          }]
        },
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }
    },
    created() {
      this.loadTableData();
    },
    methods: {
      editClick(row) {
        this.$refs.ReaderDialog.editForm(row);
        this.dialogVisible = true;
      },
      loadTableData() {
        let entity = {
          userName: this.searchForm.userName,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        };
        this.$http.get('/hao/user/search', {params: entity}).then(reason => {
          this.tableData = reason.body.page.list;
          this.total = reason.body.page.total;
        })
      },
      deleteClick(row) {
        this.$http.delete('hao/user/delete', {params: row}).then(reason => {
          this.$notify({
            title: '成功',
            type: 'success'
          });
          this.loadTableData();
        }, response => {
          this.$notify({
            title: '失败',
            type: 'error'
          });
        })
      },
      addUser() {
        this.dialogTitle = '新增用户';
        this.dialogVisible = true;
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

      //关闭
      handleClose() {
        this.dialogVisible = false;
        this.loadTableData();
      }
    }
  }
</script>

<style scoped>

</style>
