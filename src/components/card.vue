<template>
  <el-card>
    <div slot="header" class="header">
      <el-form :inline="true" :model="filter">
        <el-form-item label="卡密">
          <el-input v-model="filter.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="使用状态">
          <el-select v-model="filter.status" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="未使用" value="0"></el-option>
            <el-option label="已使用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getCards"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons">
      <el-button type="primary" :disabled="!multipleSelection.length" @click="batchDeleteCard">批量删除</el-button>
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
        prop="code"
        label="卡密"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="value_text"
        label="面值"
        width="130">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="提卡时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="used_time"
        label="使用时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="status_text"
        label="状态"
        width="130"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="140"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteCard(scope.row.id)">删除</el-button>
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
    <el-dialog title="提取卡密" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="cardInfo">
        <el-form-item label="卡密面值" :label-width="formLabelWidth">
          <el-select value="1" v-model="cardInfo.month" placeholder="请选择卡密面值" @change="checkPrice">
            <el-option label="1个月" value="1"></el-option>
            <el-option label="3个月" value="3"></el-option>
            <el-option label="6个月" value="6"></el-option>
            <el-option label="12个月" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡密数量" :label-width="formLabelWidth">
          <el-select value="1" v-model="cardInfo.count" placeholder="请选择卡密数量" @change="checkPrice">
            <el-option label="1个" value="1"></el-option>
            <el-option label="5个" value="5"></el-option>
            <el-option label="10个" value="10"></el-option>
            <el-option label="20个" value="20"></el-option>
            <el-option label="50个" value="50"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需费用" :label-width="formLabelWidth">
          <el-input v-model="cardInfo.price" disabled autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCard">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>

<script>
  export default {
    name: "card",
    data() {
      return {
        filter: {
          page: 1,
          limit: 10,
          code: '',
          status: '',
        },
        tableData: [],
        total: 0,
        multipleSelection: [],
        dialogFormVisible: false,
        cardInfo: {
          id: '',
          month: '1',
          count: '1',
          price: 4,
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.getCards();
    },
    methods: {
      async getCards() {
        try {
          let res = await this.$http.get('card_codes', this.filter);
          this.tableData = res.data;
          this.total = res.count;
        } catch (e) {

        }
      },
      openAddDialogForm() {
        this.dialogFormVisible = true;
        this.checkPrice();
      },
      async checkPrice() {
        try {
          let res = await this.$http.get('month_price', {month: this.cardInfo.month, count: this.cardInfo.count});
          this.cardInfo.price = res.data.month_price;
        } catch (e) {
          this.$message('查询价格失败')
        }
      },
      async addCard() {
        try {
          await this.$http.post('card_codes', this.cardInfo);
          await this.getCards();
          this.dialogFormVisible = false;
        } catch (e) {
          this.$message('添加失败');
        }
      },
      async deleteCard(id) {
        try {
          this.$confirm('确定删除卡密吗？', '提示', {type: 'warning'}).then(async () => {
            await this.$http.delete(`card_codes/${id}`);
            await this.getCards();
          }).catch(() => {
          });
        } catch (e) {
          this.$message('删除失败')
        }
      },
      async batchDeleteCard() {
        try {
          this.$confirm('确定删除卡密吗？', '提示', {type: 'warning'}).then(async () => {
            await this.$http.post('card_codes/batch_delete', {ids: this.multipleSelection.map(item => item.id)});
            await this.getCards();
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
        this.getCards()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.filter.page = val;
        this.getCards();
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
