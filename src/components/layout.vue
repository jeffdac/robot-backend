<template>
  <el-container style="height: 100%;">
    <el-aside width="auto" style="background-color: #545c64">
      <el-menu class="el-menu-aside"
               :class="{'hidden-sm-and-down':hiddenSmDown}"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               :router="true"
               :default-active="$route.path"
               :collapse="isCollapse">
        <el-menu-item class="project-name" style="text-align: center">
          <i v-if="isCollapse" class="el-icon-s-flag"></i>
          <span>小超能授权管理系统</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="el-icon-house"></i>
          <span>主页</span>
        </el-menu-item>
        <el-menu-item index="/auth">
          <i class="el-icon-user"></i>
          <span>授权管理</span>
        </el-menu-item>
        <el-menu-item index="/card">
          <i class="el-icon-lock"></i>
          <span>卡密管理</span>
        </el-menu-item>
        <el-menu-item v-if="user.role === 'super_admin'" index="/admin">
          <i class="el-icon-s-custom"></i>
          <span>后台管理员</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between" align="middle" class="header-tool-bar">
          <div>
            <i :class="[foldIcon?'el-icon-s-unfold':'el-icon-s-fold']" @click="toggleSideMenu"></i>
            <!--<i class="el-icon-refresh-right"></i>-->
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/set/user/info">
                <el-dropdown-item command="userInfo">基本资料</el-dropdown-item>
              </router-link>
              <router-link to="/set/user/password">
                <el-dropdown-item command="password">修改密码</el-dropdown-item>
              </router-link>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
        <div class="navigation-tip">
          <router-link to="/" class="router-link-home">首页</router-link>
          {{navigationTip}}
        </div>
      </el-header>
      <el-main style="background-color: #f7f7f7">
        <router-view></router-view>
      </el-main>
      <el-footer>
        <div class="footer-text-wrapper">
          <span>Copyright © 2019 PRIVATE. All Rights Reserved. </span>
          <span>Powered by PRIVATE TEAM </span>
        </div>
      </el-footer>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: "layout",
    data() {
      return {
        isCollapse: false,
        hiddenSmDown: true,
        clientWidth: document.body.clientWidth,
        homeText: '首页',
      }
    },
    created() {
      this.getUser();
    },
    mounted() {
      window.onresize = (event) => {
        if (event.target.innerWidth < this.clientWidth) {
          this.clientWidth = event.target.innerWidth;
          this.hiddenSmDown = true;
          if (this.isCollapse) return;
        }
        this.clientWidth = event.target.innerWidth;

        if (event.target.innerWidth >= 991) {
          this.isCollapse = false;
        }
      };
    },
    computed: {
      navigationTip() {
        // console.log(this.$route);
        return this.$route.meta.text ? ` / ${this.$route.meta.text}` : '';
      },
      foldIcon() {
        return this.clientWidth < 991 ? this.hiddenSmDown : this.isCollapse
      },
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      toggleSideMenu() {
        if (document.body.clientWidth < 991) {
          this.isCollapse = false;
          this.hiddenSmDown = !this.hiddenSmDown;
        } else {
          this.hiddenSmDown = false;
          this.isCollapse = !this.isCollapse;
        }
      },
      handleCommand(command) {
        if (command === 'logout') {
          this.logout();
        }
      },
      async getUser() {
        try {
          let res = await this.$http.get('me');
          this.$store.commit('setUser', res.data);
        } catch (e) {
          this.$message({type: 'error', message: e.msg});
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped lang="scss">
  .logo {
    color: #fff;
    font-size: 15px;
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid #505860;
  }

  .el-menu-aside {
    border-right: 0;

    &:not(.el-menu--collapse) {
      width: 220px;
    }

    .project-name:hover {
      background-color: #545c64 !important;
    }
  }

  .el-header {
    padding: 0;
    height: auto !important;
  }

  .header-tool-bar {
    border-bottom: 1px solid #ccc;
    padding: 0 15px;
    .el-dropdown-link {
      color: #000;
    }
    .el-icon-s-unfold, .el-icon-s-fold, .el-icon-refresh-right {
      padding: 15px;
      font-size: 18px;
    }
  }

  .navigation-tip {
    padding: 8px 0 8px 10px;
    color: #666;

    .router-link-home {
      color: #666;

      &:hover {
        color: #409EFF;
      }
    }
  }

  .footer-text-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: #555;
  }
</style>
