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
          name: '图书序列码',
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
          operate: [{
            name: '编辑',
            icon: 'el-icon-delete',
            click: this.deleteClick,
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
      this.loadTableDate();
    },
    methods: {
      deleteClick(row) {
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
          this.loadTableDate();
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
          self.total = response.body.page.total;
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

<style>

</style>
