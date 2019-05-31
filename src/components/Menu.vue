<template>
  <el-container class="main-height">
    <el-container class="main-height">
      <el-header class="bg-blue text-float">
        <el-col :span="12" style="text-align: left">
          <el-image src="/static/img/logo.png" style="height: 60px; width: 320px"></el-image>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-dropdown trigger="click">
            <el-button type="text" icon="el-icon-user">{{currentUser}}</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="out"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
              <el-dropdown-item @click.native="edit"><i class="el-icon-key"></i>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>
      <el-container class="main-height">
        <el-aside width="200px" class="main-height">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router
                   menu-trigger="hover">
            <el-menu-item index="/book">
              <i class="el-icon-news"></i>
              <span slot="title">图书系统</span>
            </el-menu-item>
            <el-submenu index="/borrowSystem">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span slot="title">借阅系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/reader">读者管理</el-menu-item>
                <el-menu-item index="/history">借阅记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/system">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/loginManage">登录管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main style="background: #E9EEF3;">
            <router-view/>
          </el-main>
          <el-footer class="foot">
            <span class="text-foot">如有疑问，请follow作者--豪：<a href="http://github.com/2701150114">http://github.com/2701150114</a></span>
            <i class="el-icon-"></i>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        currentUser: '',
        value3: null,
      }
    },
    created() {
      this.currentUser = localStorage.getItem("author");
    },
    methods: {
      selectOne(key, keyPath) {
        console.log(key, keyPath);
      },
      out() {
        localStorage.clear();
        this.$router.push('/login');
      },
      edit() {
        let self = this;
        self.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          self.$http.post('/hao/login/update', {
            id: localStorage.getItem('id'),
            password: value,
          }, {emulateJSON: true}).then(reason => {
            if (reason.body.code === 1) {
              self.$message({
                type: 'success',
                message: '你的密码是: ' + value
              });
            } else {
              self.$message.error(reason.body.msg);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .bg-blue {
    background: #034692;
  }

  .text-float {
    line-height: 60px;
    font-size: 24px;
    color: #fff;
  }

  body {
    height: 100%;
  }

  .main-height {
    height: 100%;
  }

  .foot {
    background-color: #F2F6FC;
  }

  .text-foot {
    line-height: 60px;
    font-size: 12px;
    color: #F56C6C;
    float: right;
    margin-right: 5rem;
  }

  .text-foot a {
    color: #F56C6C;
  }

  .bg-blue .el-button {
    color: white;
    font-size: 22px;
  }
</style>
