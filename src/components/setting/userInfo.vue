<template>
  <el-card>
    <div slot="header">
      设置我的资料
    </div>
    <el-form :model="user" label-width="100px">
      <el-form-item label="我的角色">
        <el-input v-model="user.role_text" disabled placeholder="请输入"></el-input>
        <span class="text-tip">当前角色不可更改为其它角色</span>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.username" disabled placeholder="请输入"></el-input>
        <span class="text-tip">不可修改。一般用于后台登入名</span>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickname" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyUserInfo">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "userInfo",
    data() {
      return {
        user: {},
      }
    },
    created() {
      this.getUser();
    },
    methods: {
      async getUser() {
        try {
          let res = await this.$http.get('me');
          this.user = res.data;
        } catch (e) {
          this.$message({type: 'error', message: e.msg});
        }
      },
      async modifyUserInfo() {
        try {
          let res = await this.$http.post('me', this.user);
          this.$message({type: 'success', message: '修改成功'});
          this.$store.commit('setUser', res.data);
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

  .text-tip {
    color: #ccc;
    font-size: 14px;
  }
</style>
