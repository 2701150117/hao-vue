<template>
  <div>
    <div class="search-class">
      <el-form ref="form" label-position="right" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="图书名">
              <el-input v-model="searchForm.bookName" clearable></el-input>
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
          bookId: '',
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
          formatter: this.dateFormat
        }, {
          prop: 'storage',
          name: '库存',
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
            name: '删除',
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
      dateFormat(row, column, executeTime) {
        return new Date(+new Date(new Date(executeTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      },
      handleCloseBorrow() {
        this.borrowVisible = false;
        this.loadTableData();
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
            this.$message.success('成功');
            this.loadTableData();
          }, response => {
            this.$message.error('失败');
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
          bookId: self.searchForm.bookId,
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
        this.currentPage = currentPage;
        this.loadTableData();
      },

      //关闭
      handleClose() {
        this.dialogVisible = false;
        this.loadTableData();
      },
      borrowClick(row) {
        if (row.storage > 0) {
          this.bookId = row.bookId;
          this.$refs.Borrow.loadTableData();
          this.borrowVisible = true;
        }else {
          this.$notify({
            type:'warning',
            message: '库存为零，不可借出'
          });
        }
      }
    }
  }
</script>

<style>

</style>
