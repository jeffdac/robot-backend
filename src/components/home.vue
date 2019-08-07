<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <el-card :body-style="{'padding-bottom':'10px','padding-top':'10px'}">
        <div>
          <el-row class="user-info">
            <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="4">
              <el-image class="avatar" :src="user.avatar"></el-image>
            </el-col>
            <el-col :xs="19" :sm="18" :md="18" :lg="20" :xl="20">
              <div>{{user.nickname}}</div>
              <div>ID：{{user.id}}</div>
              <div>角色：{{user.role_text}}</div>
            </el-col>
          </el-row>
          <el-row class="balance">
            <el-col :span="20" class="balance-text">
              账户余额
            </el-col>
            <el-col :span="4">
              <el-button size="mini" icon="el-icon-coin" style="float: right;" class="balance-btn">{{user.balance}}
              </el-button>
              <el-button @click="recharge" size="mini" type="primary" style="float: right;">充值</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <el-card :body-style="{'padding-bottom':0,'padding-top':'10px'}">
        <div class="notice">
          平台公告<span class="items-number">3</span>
        </div>
        <ul>
          <li class="notice-item">
            <el-row>
              <el-col :span="16">
                <i class="el-icon-message-solid"></i>公告标题
              </el-col>
              <el-col :span="8">2019-04-10 15:30:34</el-col>
            </el-row>
          </li>
          <li class="notice-item">
            <el-row>
              <el-col :span="16">
                <i class="el-icon-message-solid"></i>公告标题
              </el-col>
              <el-col :span="8">2019-04-10 15:30:34</el-col>
            </el-row>
          </li>
          <li class="notice-item">
            <el-row>
              <el-col :span="16">
                <i class="el-icon-message-solid"></i>公告标题
              </el-col>
              <el-col :span="8">2019-04-10 15:30:34</el-col>
            </el-row>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      recharge() {
        this.$router.push('recharge');
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-info {
    border-bottom: 1px solid #ccc;

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .balance-text {
    margin-top: 15px;
  }

  .balance-btn {
    margin: 10px 0 10px;
  }

  .balance-btn:hover, .balance-btn:focus {
    background-color: #fff;
    border-color: #DCDFE6;
    color: #606266;
    cursor: default
  }

  .notice {
    position: relative;
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-bottom: 10px;

    &:after {
      display: inline-block;
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
    }
    .items-number {
      background-color: #333;
      color: #fff;
      padding: 0 6px;
      font-size: 14px;
    }
  }

  .notice-item {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;

    &:last-child {
      border: none;
    }
  }
</style>
