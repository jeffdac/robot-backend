<template>
  <el-card>
    <div slot="header" class="header">
      <el-form :inline="true" :model="filter">
        <el-form-item label="ID">
          <el-input v-model="filter.id" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机器人QQ">
          <el-input v-model="filter.robot_qq" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="主人QQ">
          <el-input v-model="filter.master_qq" placeholder="请输入"></el-input>
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
      size="medium"
      :header-cell-style="{backgroundColor:'#F5F7FA'}"
      :border="true"
      @selection-change="handleSelectionChange"
      :default-sort="{prop: 'id', order: 'descending'}">
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        prop="id"
        sortable
        label="ID"
        width="70">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="robot_qq"
        label="机器人QQ">
      </el-table-column>
      <el-table-column
        prop="master_qq"
        label="主人QQ"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="user_qq"
        label="授权人QQ"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="到期时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="auth_status_text"
        label="状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="215"
        show-overflow-tooltip>
        <template>
          <el-button size="mini" type="primary">续费</el-button>
          <el-button size="mini" type="success">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Math.ceil(total/filter.limit)"
      :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
      :page-size="filter.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    name: "auth",
    data() {
      return {
        filter: {
          page: 1,
          limit: 10,
          id: '',
          robot_qq: '',
          master_qq: '',
        },
        tableData: [],
        total: 0,
        multipleSelection: []
      }
    },
    mounted() {
      this.getAuthData();
    },
    methods: {
      async getAuthData() {
        try {
          let res = await this.$http.get('plugin_auths');
          this.tableData = res.data;
          this.total = res.count;
          console.log(this.tableData, '==========');
        } catch (e) {

        }
      },
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
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
