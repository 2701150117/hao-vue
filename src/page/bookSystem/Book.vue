<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :span="5">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.bookName" clearable></el-input>
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
        <el-button size="medium" plain @click="addBook">添加图书</el-button>
      </div>
      <hao-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation" @handleEdit="handleEdit" @handleDelete="handleDelete"></hao-table>
      <hao-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @sizeChange="handleSizeChange" @currenChange="handleCurrentChange"></hao-pagination>
    </div>
    <BookDialog ref="bookDialog" :dialog-title="dialogTitle" :dialog-visible="dialogVisible"
                @handleClose="handleClose"></BookDialog>
  </div>
</template>

<script>
  import BookDialog from "./BookDialog";

  export default {
    name: "Book",
    components: {BookDialog},
    data: function () {
      return {
        searchForm: {
          bookName: '',
        },
        labelData: [{
          prop: 'bookId',
          name: 'Number',
        }, {
          prop: 'bookName',
          name: '图书名',
        }, {
          prop: 'createDate',
          name: '图书入库时间',
        }],
        tableData: [],
        columnIndex: {
          show: true,
          width: 50,
        },

        columnOperation: {
          show: true,
          width: 150,
          name: '操作',
        },

        pageSize: 10,
        currentPage: 0,
        total: 0,

        //弹出框的数据
        dialogTitle: '',
        dialogVisible: false,
      }
    },
    created() {
      this.loadTableDate();
    },
    methods: {
      //处理编辑
      handleEdit(row) {
        this.$refs.bookDialog.editForm(row);
        this.dialogTitle = '编辑图书';
        this.dialogVisible = true;
        let entity = {
          bookId: row.bookId,
          bookName: row.bookName
        };
        this.$http.post('/hao/book/saveOrUpdateBook', {params: entity}).then(response => {
          this.$message({
            showClose: true,
            message: '编辑成功',
            type: 'success'
          });
        })

      },

      //处理删除
      handleDelete(row) {
        let entity = {
          bookId: row.bookId,
          bookName: row.bookName
        };
        this.$http.delete('/hao/book/deleteBook', {params: entity}).then(response => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
        })
      },

      //加载表格
      loadTableDate() {
        let self = this;
        let entity = {
          bookName: self.searchForm.bookName,
          pageSize: self.pageSize,
          currentPage: self.currentPage
        };
        self.$http.get('/hao/book/getBook', {params: entity}).then(response => {
          self.tableData = response.body.page.list;
        }, response => {
          console.log(response);
        })
      },

      //添加书籍
      addBook() {
        this.dialogTitle = '添加图书';
        this.dialogVisible = true;
      },

      //分页
      handleSizeChange() {

      },
      handleCurrentChange() {

      },

      //关闭
      handleClose() {
        this.dialogVisible = false;
      }
    }
  }
</script>

<style>

</style>
