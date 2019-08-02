<template>
  <el-card>
    <div slot="header" class="header">
      <el-form :inline="true" :model="searchInfo">
        <el-form-item label="ID">
          <el-input v-model="searchInfo.id" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机器人QQ">
          <el-input v-model="searchInfo.robot_qq" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="主人QQ">
          <el-input v-model="searchInfo.master_qq" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons">
      <el-button type="primary">删除</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{backgroundColor:'#F5F7FA'}"
      border="true"
      @selection-change="handleSelectionChange"
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="date"
        sortable
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: "auth",
    data() {
      return {
        searchInfo: {
          id: '',
          robot_qq: '',
          master_qq: '',
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>
  .header {
    margin-bottom: -22px;
  }

  .buttons {
    margin-bottom: 15px;
  }
</style>
