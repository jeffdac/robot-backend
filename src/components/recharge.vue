<template>
  <el-card>
    <el-form :model="rechargeData" label-width="100px">
      <el-form-item label="充值金额">
        <el-input type="number" v-model="rechargeData.price" placeholder="请输入充值金额"></el-input>
      </el-form-item>
      <el-form-item label="充值方式">
        <el-radio-group v-model="rechargeData.pay_type">
          <el-radio label="1">支付宝</el-radio>
          <el-radio label="2">QQ钱包</el-radio>
          <el-radio label="3">微信</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="+rechargeData.price <= 0" @click="recharge">充值</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "recharge",
    data() {
      return {
        rechargeData: {
          price: '',
          pay_type: '1',
        },
      }
    },
    methods: {
      async recharge() {
        try {
          let res = await this.$http.post('recharge_order', this.rechargeData);
          window.open(res.data.pay_url);
        } catch (e) {
          this.$message({type: 'error', message: e.msg});
        }
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }
</style>
