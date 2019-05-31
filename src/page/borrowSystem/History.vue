<template>
  <div>
    <div class="search-class">
      <el-form ref="form" label-position="right" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="searchForm.userName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="书名" prop="bookName">
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
      <hao-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation"></hao-table>
      <hao-pagination :total="total" :page-size="pageSize" :current-page="currentPage"
                      @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></hao-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "History",
    data() {
      return {
        searchForm: {
          userName: '',
          bookName: ''
        },
        labelData: [{
          prop: 'userName',
          name: '用户名'
        }, {
          prop: 'bookName',
          name: '图书名',
        }, {
          prop: 'borrowStart',
          name: '借出时间',
          formatter: this.dateFormat
        }, {
          prop: 'borrowEnd',
          name: '距离归还',
          formatter: this.endTimeFormat
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
            name: '归还',
            icon: 'el-icon-delete',
            click: this.backClick,
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
        return new Date(+new Date(new Date(executeTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      },
      endTimeFormat(row, column, borrowEnd) {
        return '剩余 ' + borrowEnd + ' 天';
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
          userName: self.searchForm.userName,
          bookName: self.searchForm.bookName,
          pageSize: self.pageSize,
          currentPage: self.currentPage
        };
        self.$http.get('/hao/borrow/getBorrow', {params: entity}).then(response => {
          self.tableData = response.body.page.list;
          self.total = response.body.page.total;
        });
      },
      backClick(row) {
        this.$confirm('确认归还？借出用户: ' + row.userName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('hao/borrow/delete', {params: {bookId: row.bookId, userId: row.userId}}).then(reason => {
            this.$message({
              title: '成功',
              type: 'success',
              message: '归还成功，返回库存'
            });
            this.loadTableData();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消借出'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
