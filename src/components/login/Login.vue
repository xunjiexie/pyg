<template>
  <div class="login-container">
      <el-form   label-position=top :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="loginBox">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')" >重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // console.log(this.$refs)
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (!valid) {
          return false
        };
        // console.log('登陆成功')
        // console.log(this.ruleForm)
        axios.post('http://localhost:8888/api/private/v1/login', this.ruleForm)
          .then(response => {
            // console.log(response)
            if (response.data.meta.status === 200) {
              localStorage.setItem('token', response.data.data.token)
              this.$router.push('home')
              this.$message({
                type: 'success',
                message: response.data.meta.msg,
                duration: 1000
              })
            } else {
              this.$message({
                type: 'error',
                message: response.data.meta.msg,
                duration: 1000
              })
            }
          })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
  .login-container {
    height:100%;
    background-color: #2d434c;
    overflow:hidden;
  }
  .loginBox {
    width:400px;
    margin:200px auto;
    background-color: #fff;
    padding:15px 25px;
    border-radius:10px;
  }
</style>
