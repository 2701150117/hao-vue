<template>
  <el-container class="main-height">
    <el-container class="main-height">
      <el-header class="bg-blue text-float">
        安徽科技图书库
      </el-header>
      <el-container class="main-height">
        <el-aside width="200px" class="main-height">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router :unique-opened="true"
                   menu-trigger="hover">
            <el-menu-item index="/book">
              <i class="el-icon-news"></i>
              <span slot="title">图书系统</span>
            </el-menu-item>
            <el-submenu index="borrowSystem">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span slot="title">借阅系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/reader">读者管理</el-menu-item>
                <el-menu-item index="libraryinformation">借阅记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="readerlogin">员工登录管理</el-menu-item>
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
        value3: null,
      }
    },
    methods: {
      selectOne(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .bg-blue {
    background: #409EFF;
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
</style>
