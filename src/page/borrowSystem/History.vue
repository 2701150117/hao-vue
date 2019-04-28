<template>
  <div>
    <div class="search-class">
      <el-form ref="form" label-position="right" :model="searchForm" label-width="60px">
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
        },{
          prop: 'bookName',
          name: '图书名',
        }, {
          prop: 'borrowStart',
          name: '借出时间'
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
          show: false,
          width: 150,
          name: '操作',
          operate: []
        },

        pageSize: 10,
        currentPage: 0,
        total: 0,
      }
    },
    created(){
      this.loadTableData();
    },
    methods: {
      endTimeFormat(row, column, borrowEnd){
        return '剩余 ' + borrowEnd + ' 天';
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
    }
  }
</script>

<style scoped>

</style>
