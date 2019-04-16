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
        <el-button size="medium" plain @click="addUser">添加图书</el-button>
      </div>
      <hao-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation"></hao-table>
      <hao-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @sizeChange="handleSizeChange" @currenChange="handleCurrentChange"></hao-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Reader",
    data: function () {
      return {
        searchForm: {
          userName: ''
        },
        tableData: [],
        labelData: [],
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
