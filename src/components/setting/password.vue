<template>
  <el-card>
    <div slot="header">
      修改密码
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        <span class="text-tip">6~16个字符</span>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" v-model="ruleForm.repassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyPassword('ruleForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "password",
    data() {
      let checkOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        }
        callback();
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.repassword !== '') {
            this.$refs.ruleForm.validateField('repassword');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldPassword: '',
          password: '',
          repassword: '',
        },
        rules: {
          oldPassword: [
            {validator: checkOldPass, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          repassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      modifyPassword(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            try {
              await this.$http.post('reset_password', this.ruleForm);
              this.$message({type: 'success', message: '修改成功'});
            } catch (e) {
              this.$message({type: 'error', message: e.msg});
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
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
