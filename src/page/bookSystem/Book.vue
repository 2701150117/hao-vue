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
                 :column-operation="columnOperation"></hao-table>
      <hao-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></hao-pagination>
    </div>
    <BookDialog ref="bookDialog" :dialog-title="dialogTitle" :dialog-visible="dialogVisible"
                @handleClose="handleClose"></BookDialog>
    <Borrow ref="Borrow" :dialog-visible="borrowVisible" :book-id="bookId" @handleClose="handleCloseBorrow"></Borrow>
  </div>
</template>

<script>
  import BookDialog from "./BookDialog";
  import Borrow from "./Borrow";

  export default {
    name: "Book",
    components: {Borrow, BookDialog},
    data: function () {
      return {
        bookId: '',
        borrowVisible: false,
        searchForm: {
          bookName: '',
        },
        labelData: [{
          prop: 'bookId',
          name: '图书序列码',
        }, {
          prop: 'bookName',
          name: '图书名',
        }, {
          prop: 'createDate',
          name: '图书入库时间',
        }, {
          prop: 'status',
          name: '状态',
          formatter: this.statusFormat
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
          operate: [{
            name: '编辑',
            icon: 'el-icon-delete',
            click: this.deleteClick,
          }, {
            name: '借出',
            icon: 'el-icon-view',
            click: this.borrowClick,
          }]
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
      this.loadTableData();
    },
    methods: {
      handleCloseBorrow() {
        this.borrowVisible = false;
        this.loadTableData();
      },
      statusFormat(row, column, status) {
        return status === 1 ? '在库' : '已借出';
      },
      deleteClick(row) {
        let entity = {
          bookId: row.bookId,
          bookName: row.bookName
        };
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/hao/book/deleteBook', {params: entity}).then(response => {
            this.$message({
              title: '成功',
              type: 'success'
            });
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
      },

      //加载表格
      loadTableData() {
        let self = this;
        let entity = {
          bookName: self.searchForm.bookName,
          pageSize: self.pageSize,
          currentPage: self.currentPage
        };
        self.$http.get('/hao/book/getBook', {params: entity}).then(response => {
          self.tableData = response.body.page.list;
          self.total = response.body.page.total;
        });
      },

      //添加书籍
      addBook() {
        this.dialogTitle = '添加图书';
        this.dialogVisible = true;
      },

      //分页
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTableData();
      },
      handleCurrentChange(currentPage) {
        debugger;
        this.currentPage = currentPage;
        this.loadTableData();
      },

      //关闭
      handleClose() {
        this.dialogVisible = false;
        this.loadTableData();
      },
      borrowClick(row) {
        this.bookId = row.bookId;
        this.$refs.Borrow.loadTableData();
        this.borrowVisible = true;
      }
    }
  }
</script>

<style>

</style>
