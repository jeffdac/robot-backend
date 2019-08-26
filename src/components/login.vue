<template>

  <el-row type="flex" justify="center" class="row-wrapper">
    <el-col :xs="10" :sm="10" :md="8" :lg="6" :xl="6" class="col-wrapper">
      <div>
        <div class="title">
          <h2>小超能</h2>
          <p>一款引流与群管结合的插件</p>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form">
          <el-form-item :label-width="'0'" prop="username">
            <el-input type="text" v-model="ruleForm.username" prefix-icon="el-icon-user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label-width="'0'" prop="password">
            <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label-width="'0'" prop="vercode">
            <div class="captcha-row">
              <el-input type="text" v-model="ruleForm.vercode" prefix-icon="el-icon-unlock"></el-input>
              <div @click="changeCaptcha()">
                <el-image style="width: 130px; height: 38px" :src="url"></el-image>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label-width="'0'">
            <el-button style="width: 100%;" type="primary" @click="login('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <footer>
        © copyright 2019 jeff.51godream.com
      </footer>
    </el-col>

  </el-row>
</template>

<script>
  export default {
    name: "login",
    data() {
      var validateUser = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
      var validateCaptcha = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'));
        } else {
          callback()
        }
      };
      return {
        url: 'data:image/jpeg;base64,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',
        ruleForm: {
          username: '',
          password: '',
          vercode: '',
          captcha_key: '',
        },
        rules: {
          username: [
            {validator: validateUser, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          vercode: [
            {validator: validateCaptcha, trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.changeCaptcha();
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            try {
              let res = await this.$http.post('login', this.ruleForm);
              // 由于后台在验证码错误时，返回的仍为成功状态码为200，所以这里要手动抛出错误，使catch语句能捕获到错误
              if (res.code === 1004) throw res;
              let token = res.data.token;
              localStorage.setItem('token', `${token.token_type} ${token.access_token}`);
              localStorage.setItem('expires_in', new Date().getTime() + token.expires_in * 1000);
              this.$router.push('/');
              // this.$router.push({name: 'home', params: res.user});
            } catch (e) {
              this.$message({type: 'error', message: e.msg});
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      async changeCaptcha() {
        try {
          let res = await this.$http.get('common/captchas');
          this.url = res.data.captcha_image_content;
          this.ruleForm.captcha_key = res.data.captcha_key;
        } catch (e) {

        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .row-wrapper {
    height: 100%;
    background-color: #eff2f8;

    .col-wrapper {
      text-align: center;
      padding: 90px 0 30px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        h2 {
          font-weight: normal;
        }

        p {
          color: #999;
        }
      }

      .form {
        margin-top: 50px;

        .captcha-row {
          display: flex;
          height: 40px;
          .el-input {
            flex: 1;
            margin-right: 10px;
          }
        }
      }

    }
  }
</style>
