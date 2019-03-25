<template>
  <el-container class="main-height">
    <el-container class="main-height">
      <el-header class="bg-blue text-float">
        安徽科技图书库
      </el-header>
      <el-container class="main-height">
        <el-aside width="200px" class="main-height">
          <el-menu :default-active="$route.path" text-color="#fff" active-text-color="#ffd04b"
                   class="el-menu-vertical-demo main-height" unique-opened router background-color="#545c64"
                   @select="selectOne" style="border: 0;">
            <el-menu-item index="home">
              <i class="el-icon-news"></i>
              <span slot="title">新书盘点</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>书刊管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="catalog">书刊编目</el-menu-item>
                <el-menu-item index="2-2">书刊录入</el-menu-item>
                <el-menu-item index="2-3">书刊查询</el-menu-item>
                <el-menu-item index="2-4">书刊下架</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span>借阅管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">书刊借阅</el-menu-item>
                <el-menu-item index="3-2">书刊归还</el-menu-item>
                <el-menu-item index="3-3">书刊挂失</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>读者管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">读者注册</el-menu-item>
                <el-menu-item index="4-2">读者信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
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
