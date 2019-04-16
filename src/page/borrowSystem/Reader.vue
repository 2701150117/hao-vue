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
              <el-button type="primary">查询</el-button>
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
      <hao-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @sizeChange="handleSizeChange" @currenChange="handleCurrentChange"></hao-pagination>
    </div>
    <ReaderDialog :dialog-visible="dialogVisible" :dialog-title="dialogTitle" @handleClose="handleClose"></ReaderDialog>
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
      }
    },
    created() {
    },
    methods: {
      editClick(row) {

      },
      deleteClick(row) {

      },
      addUser() {
        this.dialogTitle = '新增用户';
        this.dialogVisible = true;
      },
      //分页
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTableDate();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadTableDate();
      },

      //关闭
      handleClose() {
        this.dialogVisible = false;
        this.loadTableDate();
      }
    }
  }
</script>

<style scoped>

</style>
