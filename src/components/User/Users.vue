<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
  <div style="margin-top: 15px;">
  <el-row :gutter="20">
      <el-col :span="7">  
          <el-input placeholder="请输入内容" v-model="querInfo.userName" clearable @clear="getUserList">
    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input>
  </el-col>
      <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible =true,selectAllOrganization(),selectRoles()">添加用户</el-button>
          </el-col>
  </el-row>
</div>
<el-table :data="userList" border stripe >
      <el-table-column type="index" align="center" ></el-table-column>
      <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="190px" align="center" ></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="role" label="角色" align="center"></el-table-column>
     <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <!-- <el-table-column  label="状态" align="center" >
          <template slot-scope='scope'>
               {{scope.row.mg_state}}
        <el-switch v-model="scope.row.mg_state" align="center">
               </el-switch> 
          </template>
      </el-table-column> -->
      <el-table-column  label="操作" align="center" >
           <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delectEditDialog(scope.row.userId)"></el-button>
            <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-setting" size="mini"></el-button>
       </el-tooltip>
           </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="querInfo.pageNum"  :page-sizes="[1,2,5,10]" :page-size="querInfo.pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="total" >
    </el-pagination>

<!-- 添加用户对话框 -->
<el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%" @close="addDialogClose">
 
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px" >
     <el-form-item label="用户名" prop="userName">
    <el-input v-model="addForm.userName"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email" >
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
   <el-form-item label="手机号" prop="phone">
    <el-input v-model="addForm.phone"></el-input>
  </el-form-item>
      </el-form>
    <div class="selects">
      <div class="selectOran">
      <span>组织模块</span>
       <el-select placeholder="请选择" v-model="value" @change="selectGet($event)">
    <el-option
     v-for="item in options"
      :key="item.organizationId"
      :label="item.organizationName"
      :value="item.organizationId">
    </el-option>
    </el-select>
      </div>
       <div class="selectRole">
      <span>角色模块</span>
       <el-select placeholder="请选择" v-model="RoleOptions.roleId" @change="selectGetRole($event)">
    <el-option
     v-for="item in RoleOptions"
      :key="item.roleId"
      :label="item.roleName"
      :value="item.roleId">
    </el-option>
    </el-select>
      </div>
     </div>
     <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
</el-dialog>
<!-- 编辑对话框 -->
<el-dialog
  title="提示"
  :visible.sync="editDialogVisible"
  width="50%"  @close="editDialogClose">
  <el-form  :model="editForm" label-width="70px" ref="editFormRef" :rules="editFormRules">
  <el-form-item label="姓名" prop="userName">
      <el-input v-model="editForm.userName">
  </el-input>
  </el-form-item>
  <el-form-item label="性别" prop="sex">
      <el-input v-model="editForm.sex">
  </el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email"> 
      <el-input v-model="editForm.email">
  </el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
      <el-input v-model="editForm.phone">
  </el-input>
   </el-form-item>
     </el-form>
   <div class="selects">
      <div class="selectOran">
      <span>组织模块</span>
       <el-select placeholder="请选择" v-model="editForm.organizationName" @change="selectGet($event)">
    <el-option
     v-for="item in options"
      :key="item.organizationId"
      :label="item.organizationName"
      :value="item.organizationId">
    </el-option>
    </el-select>
      </div>
       <div class="selectRole">
      <span>角色模块</span>
       <el-select placeholder="请选择" v-model="editForm.roleName" @change="selectGetRole($event)">
    <el-option
     v-for="item in RoleOptions"
      :key="item.roleId"
      :label="item.roleName"
      :value="item.roleId">
    </el-option>
    </el-select>
      </div>
     </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>
</el-card>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
     data() {
           var checkEmail = (rule, value, cb) => {
             const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            //  console.log(value)
             if(regEmail.test(value)){
                 return cb();
             }
             cb(new Error('请输入合法的邮箱'));
           }
            var checkPhone = (rule, value, callback) => {
               const regPhone = /^1[3|5|7|8][0-9]\d{8}$/
               if(regPhone.test(value)){
                 return callback();
             }
             callback(new Error('请输入正确的手机号'));
            }
            var checkSex =(rule, value, cb)=>{
                const regSex =/^男$|^女&/
                if(regSex.test(value)){
                    return 
                }
                cb(new Error('只可输入男/女'))
            }
        return {
            querInfo:{
                 userName:'',
                // pageNum  显示第几页  pagesize  每页显示多少条的
                 pageNum:1,
                 pageSize:10,
                 token:window.sessionStorage.getItem("token")
            },
            userList:[],
            total:0,
            addDialogVisible:false,
            addForm:{
                userName:'',
                password:'',
                email:'',
                phone:'',
                sex:'女',
                organizationId:'',
                roleId:""
            },
             options: '',
             value:'',
             RoleOptions:'',

          addFormRules: {
             userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
               ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
              ],
            email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
              ],
             phone: [
              { required: true, message: '请输入电话', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }
             ],
      },
        
        editDialogVisible:false,
        editForm:'',
        editFormRules:{
              userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
               ],
             email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
              ],
             phone: [
              { required: true, message: '请输入电话', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }
             ],
              sex: [
              { required: true, message: '请输入性别', trigger: 'blur' }, { validator: checkSex, trigger: 'blur' }
             ],
        }

        }
     },
     created(){
           this.getUserList()
        //    this.selectAllOrganization()
        // this.selectRoles()
     },
     methods:{
        //  获取用户列表
         async getUserList(){
          const {data:res} =await this.$http.get('/user/findUserByCondition',{params:this.querInfo})
          if(res.status !==200) return this.$message.error('获取用户列表失败');
               this.userList=res.data.list
               this.total=res.data.total
          console.log( this.userList);
         }, 
        //  获取组织类型
          async selectAllOrganization(){
           const {data:res}=await this.$http.get("/organization/listAll",{params:{pageNum:this.querInfo.pageNum,pageSize:this.querInfo.pageSize,token:this.querInfo.token}})
           console.log(res)
           if(res.status!==200)return
           this.options=res.data

         },
        //  选择角色模块
          async selectRoles(){
              const {data:res} =await this.$http.get("/role/selectAll")
              console.log(res)
            if(res.status!==200)return;
               this.RoleOptions=res.data

          },
        //  监听pagesize的变化改变
         handleSizeChange(newSize){
            //  console.log(newSize)
             this.querInfo.pageSize = newSize;
             this.getUserList()
         },
         handleCurrentChange(newPage){
        //  console.log(newPage)
         this.querInfo.pageNum = newPage;
          this.getUserList()
         },
         addDialogClose(){
             this.$refs.addFormRef.resetFields()
         },
        //  选择模块*******
         selectGet(event){
         this.addForm.organizationId = event
         console.log(this.addForm.organizationId)
         },
         selectGetRole(event){
               this.addForm.roleId = event
               console.log(this.addForm.roleId)
         },
        //  新增用户
         addUser(){
             this.$refs.addFormRef.validate(async valid => {
            // console.log(valid)
            if(!valid)return
            // 可以发起用户网咯请求
            console.log(this.addForm);
             let postData = this.$qs.stringify(this.addForm)
            //  console.log(postData)
            const res=await this.$http.post('/user/insertUser', postData)
            console.log(res)
              if(res.status!==200)return this.$message.error(res.msg);
                 this.$message.success(res.msg)
                 this.addDialogVisible = false;
                 this.getUserList()
             })
         },
        //  编辑用户对话框
      async showEditDialog(value){
             this.editDialogVisible = true;
             console.log(value)
             this.editForm = value;
             this.selectAllOrganization()
             this.selectRoles()
       
       },
    //    取消然后重置
       editDialogClose(){
            this.$refs.editFormRef.resetFields()
       },
    //    提交修改后用户
     editUserInfo(){
         this.$refs.editFormRef.validate(async valid=>{
             if(!valid)return;
        let postData=this.$qs.stringify(this.editForm)
         const res = await this.$http.post("/user/updateUser",postData)
         console.log(res);
         if(res.data.status!==200)return;
         this.$message.success(res.data.msg)
         this.editDialogVisible = false;
         this.getUserList()
         })
    },
    // 删除用户
   async delectEditDialog(id){
        const res =await MessageBox.confirm('此操作将永久删除这一列, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
         }).catch(err => {
           return err
         })
    //    确认情况下返回的是 confirm
    //    取消的情况下 返回的错误
         console.log(res)
         if(res !== "confirm"){
             return this.$message.info('已取消删除')
         }
         let postData=this.$qs.stringify({userIds:id})
         const result =await this.$http.post("/user/deleteUser",postData)
          console.log(result)
          if(result.data.status!==200)return;
          this.$message.success(result.data.msg);
          this.getUserList();
    }
       
     }
}
</script>
<style lang="less" scope>
.selects{
     display: flex;
    justify-content:space-around;
}
span{
    margin-right: 5px;
}
// .selectOran{
//     display: flex;
//     justify-content:space-around;
// }
// .selectRole{
//     display: flex;
//     justify-content:space-around;
//     margin-top: 20px;
// }
  </style>