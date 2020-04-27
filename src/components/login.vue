<template>
  <div class="login-contanier">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="图标" />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginFromRef"
        :model="loginFrom"
        label-width="80px"
        class="login-from"
        :rules="loginFromRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input prefix-icon="el-icon-search" v-model="loginFrom.username"></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="el-icon-search" v-model="loginFrom.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="registerLoginForm">登录</el-button>
          <el-button type="info" @click="resetLoginForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFromRef.resetFields()
    },
      registerLoginForm(){
        this.$refs.loginFromRef.validate(async Valid => {
            if (!Valid)return;
            let postData = this.$qs.stringify({account:this.loginFrom.username,password:this.loginFrom.password})
            console.log(postData)
           const result=await this.$http.post('/ssoLogin/login',postData)
           console.log(result);
           if(result.data.status!==200)return this.$message(result.data.msg);
        //    this.$message('登陆成功');
           window.sessionStorage.setItem('token',result.data.msg);
           this.$router.push("/home");
        })
    }
}
}
</script>
<style lang="less">

.login-contanier {
  height: 100%;
  background-color: #2b4b6b;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar-box {
    width: 130px;
    height: 130px;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0px 0px 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -36%);
    background-color: #2b4b6b;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login-from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>