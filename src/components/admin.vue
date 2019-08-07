<template>
  <el-card>
    <div slot="header" class="header">
      <el-form :inline="true" :model="filter">
        <el-form-item label="用户名">
          <el-input v-model="filter.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="filter.nickname" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="filter.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="filter.qq" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getAdmin"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons">
      <el-button type="primary" :disabled="!multipleSelection.length" @click="batchDeleteAdmin">批量删除</el-button>
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
        prop="username"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="qq"
        label="QQ"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="role_text"
        label="角色"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="created_at"
        sortable
        label="创建时间">
        <template slot-scope="scope">{{ scope.row.created_at }}</template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="215"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="openEditDialogForm(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteAdmin(scope.row.id)">删除</el-button>
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
    <el-dialog :title="isAddForm?'添加管理员':'编辑管理员'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="adminInfo">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="adminInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="adminInfo.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-input v-model="adminInfo.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="adminInfo.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="isAddForm" label="密码" :label-width="formLabelWidth">
          <el-input v-model="adminInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="余额" :label-width="formLabelWidth">
          <el-input v-model="adminInfo.balance" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select value="super_admin" v-model="adminInfo.role" placeholder="请选择角色">
            <el-option label="超级管理员" value="super_admin"></el-option>
            <el-option label="授权商" value="auth_admin"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>

<script>
  export default {
    name: "admin",
    data() {
      return {
        filter: {
          page: 1,
          limit: 10,
          username: '',
          nickname: '',
          email: '',
          qq: '',
        },
        tableData: [],
        total: 0,
        multipleSelection: [],
        dialogFormVisible: false,
        isAddForm: true,
        adminInfo: {
          type: '',
          id: '',
          username: '',
          nickname: '',
          qq: '',
          email: '',
          password: '',
          balance: '',
          role: 'super_admin',
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.getAdmin();
    },
    methods: {
      async getAdmin() {
        try {
          let res = await this.$http.get('admin', this.filter);
          this.tableData = res.data;
          this.total = res.count;
        } catch (e) {
          this.$message({type: 'error', message: e.msg});
        }
      },
      openAddDialogForm() {
        this.isAddForm = true;
        this.adminInfo = {
          type: 'add',
          id: '',
          username: '',
          nickname: '',
          qq: '',
          email: '',
          password: '',
          balance: '',
          role: 'super_admin',
        };
        this.dialogFormVisible = true;
      },
      openEditDialogForm(row) {
        this.isAddForm = false;
        console.log(row);
        this.adminInfo = {
          type: 'edit',
          id: row.id,
          username: row.username,
          nickname: row.nickname,
          qq: row.qq,
          email: row.email,
          password: row.password,
          balance: row.balance,
          role: row.role,
        };
        this.dialogFormVisible = true;
      },
      async addOrEditAdmin() {
        try {
          await this.$http.post('admin', this.adminInfo);
          await this.getAdmin();
          this.dialogFormVisible = false;
        } catch (e) {
          this.$message({type: 'error', message: e.msg});
        }
      },
      async deleteAdmin(id) {
        try {
          this.$confirm('确定删除管理员吗？', '提示', {type: 'warning'}).then(async () => {
            await this.$http.delete(`admin/${id}`);
            await this.getAdmin();
          }).catch(() => {
          });
        } catch (e) {
          this.$message({type: 'error', message: e.msg});
        }
      },
      async batchDeleteAdmin() {
        try {
          this.$confirm('确定删除管理员吗？', '提示', {type: 'warning'}).then(async () => {
            await this.$http.post('admin/batch_delete', {ids: this.multipleSelection.map(item => item.id)});
            await this.getAdmin();
          }).catch(() => {
          });
        } catch (e) {
          this.$message({type: 'error', message: e.msg});
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.filter.page = 1;
        this.filter.limit = val;
        this.getAdmin()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.filter.page = val;
        this.getAdmin();
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
