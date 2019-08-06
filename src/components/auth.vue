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
          <el-button type="primary" icon="el-icon-search" @click="getAuthData"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons">
      <el-button type="primary" :disabled="!multipleSelection.length" @click="batchDeleteAuth">批量删除</el-button>
      <el-button type="primary" @click="openAddDialogForm">添加</el-button>
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
        <template slot-scope="scope">
          <el-button size="mini" type="primary">续费</el-button>
          <el-button size="mini" type="success" @click="openEditDialogForm(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteAuth(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="filter.page"
      :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => num * filter.limit)"
      :page-size="filter.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog :title="isAddForm?'添加授权':'编辑授权'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="authInfo">
        <el-form-item label="机器人QQ" :label-width="formLabelWidth">
          <el-input v-model="authInfo.robot_qq" autocomplete="off"></el-input>
        </el-form-item>
        <template v-if="isAddForm">
          <el-form-item label="主人QQ" :label-width="formLabelWidth">
            <el-input v-model="authInfo.master_qq" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="授权时长" :label-width="formLabelWidth">
            <el-select value="1" v-model="authInfo.month" placeholder="请选择授权时长" @change="checkPrice">
              <el-option label="1个月" value="1"></el-option>
              <el-option label="3个月" value="3"></el-option>
              <el-option label="6个月" value="6"></el-option>
              <el-option label="12个月" value="12"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所需费用" :label-width="formLabelWidth">
            <el-input v-model="authInfo.price" disabled autocomplete="off"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditAuth">确 定</el-button>
      </div>
    </el-dialog>
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
        multipleSelection: [],
        dialogFormVisible: false,
        isAddForm: true,
        authInfo: {
          id: '',
          robot_qq: '',
          master_qq: '',
          month: '1',
          price: 4,
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.getAuthData();
    },
    methods: {
      async getAuthData() {
        try {
          let res = await this.$http.get('plugin_auths', this.filter);
          this.tableData = res.data;
          this.total = res.count;
        } catch (e) {

        }
      },
      openAddDialogForm() {
        this.isAddForm = true;
        this.authInfo = {id: '', robot_qq: '', master_qq: '', month: '1', price: 4};
        this.dialogFormVisible = true;
        this.checkPrice();
      },
      openEditDialogForm(row) {
        this.isAddForm = false;
        console.log(row);
        this.authInfo.id = row.id;
        this.authInfo.robot_qq = row.robot_qq;
        this.dialogFormVisible = true;
      },
      async checkPrice() {
        try {
          let res = await this.$http.get('month_price', {month: this.authInfo.month});
          this.authInfo.price = res.data.month_price;
        } catch (e) {
          this.$message('查询价格失败')
        }
      },
      async addOrEditAuth() {
        try {
          if (this.isAddForm) {
            await this.$http.post('plugin_auths', this.authInfo);
          } else {
            await this.$http.post(`plugin_auths/${this.authInfo.id}`, {robot_qq: this.authInfo.robot_qq});
          }
          await this.getAuthData();
          this.dialogFormVisible = false;
        } catch (e) {
          this.$message(this.isAddForm ? '添加失败' : '修改失败');
        }
      },
      async deleteAuth(id) {
        try {
          this.$confirm('确定删除授权吗？', '提示', {type: 'warning'}).then(async () => {
            await this.$http.delete(`plugin_auths/${id}`);
            await this.getAuthData();
          }).catch(() => {
          });
        } catch (e) {
          this.$message('删除失败')
        }
      },
      async batchDeleteAuth() {
        try {
          this.$confirm('确定删除授权吗？', '提示', {type: 'warning'}).then(async () => {
            await this.$http.post('plugin_auths/batch_delete', {ids: this.multipleSelection.map(item => item.id)});
            await this.getAuthData();
          }).catch(() => {
          });
        } catch (e) {
          this.$message('批量删除失败')
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.filter.page = 1;
        this.filter.limit = val;
        this.getAuthData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.filter.page = val;
        this.getAuthData();
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

  .el-select {
    display: block;
  }
</style>
