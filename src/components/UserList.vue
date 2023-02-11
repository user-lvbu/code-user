<template>
    <div>
      <el-button type="primary" @click="dialogVisible=true">点击打开</el-button>
      <!-- 用户的表格 -->
      <el-table :data="userList" stripe border>
        // 索引列固定写法
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="头衔" prop="position"></el-table-column>
        <el-table-column label="出生日期">
          <template #default="scope">
            {{scope.row.addtime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <div>
              <router-link :to="'/users/'+row.id">详情</router-link>&nbsp;
              <a href="#" @click.prevent="onRemove(row.id)">删除</a>
            </div>
          </template>
        </el-table-column>
        
        </el-table>

      <!-- 添加用户表单 -->
      <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="30%" @close="onDialogClosed">
        <el-form :model="form"  label-width="80px" :rules="rules" ref="myaddForm">
          <el-form-item label="用户名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户年龄" prop="age">
            <el-input v-model.number="form.age"></el-input>
          </el-form-item>
          <el-form-item label="用户头衔" prop="position">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
        </el-form>  
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onaddForm">确 定</el-button>
  </span>
</el-dialog>
    </div>
  
</template>

<script>
export default {
  name:'UserList',
  data() {
    // 生命校验年龄的函数
    let checkAge = (rule,value,cb) =>{
        if(!Number.isInteger(value)){
          return cb(new Error('请填写整数'))
        }
        if(value > 100 || value< 1){
          return cb(new Error('年龄必须在1到100之间'))
        }
        cb()
      }
    return {
      


      userList:[],
      dialogVisible:false,
      // 要添加的用户数据
      form:{
        name:'',
        age:'',
        position:''
      },
      rules:{
        name: [
            { required: true, message: '姓名为必填项', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age:[
            { required: true, message: '年龄为必填项', trigger: 'blur' },{validator:checkAge, trigger: 'blur'}
          ],
          position:[
            { required: true, message: '头衔为必填项', trigger: 'blur' },
          ]
      }
    }
  },
  created(){
    // 调用此方法，请求用户列表数据
    this.getUserList()
  },
  methods:{
    async getUserList(done){
      const {data:res} = await this.$http.get('/api/users')
      if(res.status !== 0 ) return console.log('用户列表数据请求失败！')
      this.userList = res.data
    },
    // 监听对话框关闭的事件
    onDialogClosed(){
      this.$refs.myaddForm.resetFields()
    },
    //
    onaddForm(){
      this.$refs.myaddForm.validate(async (valid)=>{
        if(!valid) return
        const {data:res} = await this.$http.post('/api/users', this.form)
        if(res.status !== 0) return this.$message.error
        this.$message.success
        this.dialogVisible = false
        this.getUserList()
      })
    },

    // 判断是否点击了确认删除按钮
    async onRemove(id){
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        if(confirmResult !== 'confirm') return this.$message.info('取消了删除')
        const {data:res} = await this.$http.delete('/api/users/' + id)
        if (res.status !==0 ) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getUserList()

        
    }
    
  }
}
</script>

<style>

</style>