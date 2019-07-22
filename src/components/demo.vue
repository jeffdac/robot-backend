<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <el-container>
          <el-input placeholder="请输入基站编码" v-model="filter.basestation">
            <template slot="prepend">基站编码</template>
          </el-input>
          <el-button @click="getList(filter)" style="margin-left: 10px" type="primary">
            search
          </el-button>
        </el-container>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="rows"
      :header-cell-style="{background:'#EAECEF'}"
      style="width: 100%;margin-top: 10px">
      <el-table-column v-for="(item,index) of theadItems"
                       :key="index"
                       :prop="item.prop"
                       :label="item.label">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <span class="pagination-info">总共：<span class="color">{{total}}</span>条记录，共<span class="color">{{totalPage}}</span>页</span>
      <div class="pagination-bar">
        <el-pagination
          background
          small
          @current-change="changePage"
          @prev-click="changePage"
          @next-click="changePage"
          :page-size=+filter.pageSize
          layout="prev, pager, next"
          :total=total>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'demo',
    data() {
      return {
        theadItems: [
          {prop: 'id', label: '#'},
          {prop: 'basestation', label: '基站编码'},
          {prop: 'trafficCurrent', label: '当前小时流量'},
          {prop: 'traffic1h', label: '预测第1小时'},
          {prop: 'traffic2h', label: '预测第2小时'},
          {prop: 'traffic3h', label: '预测第3小时'},
          {prop: 'traffic4h', label: '预测第4小时'},
          {prop: 'traffic5h', label: '预测第5小时'},
        ],
        loading: true,
        rows: [],
        filter: {
          pageNumber: 1,
          pageSize: 6,
          basestation: '',
        },
        total: 0
      }
    },
    mounted() {
      this.getList(this.filter);
    },
    computed: {
      totalPage() {
        return Math.ceil(this.total / this.filter.pageSize);
      }
    },
    methods: {
      async getList(filter) {
        try {
          this.loading = true;
          let res = await this.$http.get('bt-server/tp/selectByFy', filter);
          console.log(res,'------');
          this.rows = res.rows;
          this.total = res.total;
        } catch (e) {
          console.log(e);
          this.$message({type: 'error', message: '获取列表失败'})
        } finally {
          this.loading = false;
        }

      },
      changePage(pageNumber) {
        this.filter.pageNumber = pageNumber;
        this.getList(this.filter);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 860px;
    margin: 50px auto;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .pagination-info {
    font-size: 13px;
  }

  .color {
    color: #409EFF
  }

  .pagination-bar {
    position: relative;
    margin-right: 100px;
  }
</style>
