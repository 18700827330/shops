<template>
        <!-- 头部导航栏 -->
        <el-container class="home-container">
  <el-header>
      <div>
          <img src="../assets/logo.png" alt="">
          <span>后台电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="isCollapse ? '64px':'200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
  <el-menu :default-active="activePath" background-color="#333744"  text-color="#fff" active-text-color="yellow" unique-opened :collapse="isCollapse" class="el-menu-vertical-demo" :collapse-transition="false" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
       <el-menu-item index='/user' @click="saveNavState('/user')">
           <template slot="title">
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </template>
       </el-menu-item>
      </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
       <el-menu-item index="/rights" @click="saveNavState('/rights')">
           <template slot="title">
          <i class="el-icon-menu"></i>
          <span>权限列表</span>
        </template>
       </el-menu-item>
      </el-submenu>
      
    </el-menu>
    </el-aside>
    <el-container>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
export default {
  data() {
      return {
         isCollapse:false,
         activePath:''
      }
  },
  created(){
    var res=this.activePath = window.sessionStorage.getItem('activePath')
    console.log(res)
    console.log(1)
    this.activePath = res
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
    // 点击按钮控制菜单的折叠展开
    toggleCollapse(){
          this.isCollapse =!this.isCollapse
    },
    // 报存链接的激活状态
    saveNavState(activePath){
    window.sessionStorage.setItem('activePath',activePath)
    this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center;
    color: #fff;
    font-size: 20px;
  div{
      display: flex;
      align-items: center;
      span{
          margin-left: 20px;
      }
  }
    img{
        width: 30px;
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color: #EAEDF1;
}
.toggle-button{
    background-color:#4A5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
