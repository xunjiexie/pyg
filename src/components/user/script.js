import axios from 'axios'
export default {
  data () {
    return {
      userList: [],
      oneUserList: [],
      total: 0,
      pagenum: 1,
      keyWord: '',
      // 模态框默认不显示
      dialogAddUser: false,
      dialogChangeUser: false,
      dialogAsign: false,
      // 添加用户表单数据
      userLIstForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      // 添加用户校验规则
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: /^([0-9A-Za-z.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3|4|5|8]\d{9}$/, message: '手机格式不正确', trigger: 'blur' }
        ]
      },
      // 修改用户表单数据
      userChangeForm: {
        username: '',
        email: '',
        mobile: '',
        id: -1
      },
      // 修改用户信息校验规则
      changeUserRules: {
        email: [
          { pattern: /^([0-9A-Za-z.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3|4|5|8]\d{9}$/, message: '手机格式不正确', trigger: 'blur' }
        ]
      },
      // 分配权限用户数据
      asignForm: {
        username: '',
        role_name: '',
        role_id: '',
        id: ''
      },
      role_name_list: []
    }
  },
  methods: {
    // 渲染用户列表
    renderPage (pagenum = 1, query = '') {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum,
            pagesize: '3'
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          // console.log(res)
          this.total = res.data.data.total
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            this.pagenum = res.data.data.pagenum
          }
        })
    },
    changePage (curPage) {
      this.renderPage(curPage, this.keyWord)
    },
    searchWord () {
      this.renderPage(1, this.keyWord)
    },
    // 添加用户
    addUser () {
      // console.log(this.form)
      axios
        .post('http://localhost:8888/api/private/v1/users', this.form,
          {headers: {
            'Authorization': localStorage.getItem('token')
          }})
        .then(res => {
          // console.log(res)
          this.dialogAddUser = false
          this.renderPage()
        })
    },
    // 关闭添加用户窗口
    closeDialogAddUser () {
      // console.log(1)
      this.$refs.addUserForm.resetFields()
    },
    // 删除单个用户
    delUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        axios.delete('http://localhost:8888/api/private/v1/users/' + id, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then(res => {
          // console.log(res)
          this.renderPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改用户信息框展示
    isShowChangerUser (userform) {
      this.dialogChangeUser = true
      // console.log(userform)
      for (let key in this.userChangeForm) {
        this.userChangeForm[key] = userform[key]
      }
    },
    async changeUser () {
      const { email, mobile } = this.userChangeForm
      const res = await this.$http.put(`users/${this.userChangeForm.id}`, {
        email,
        mobile
      })
      // console.log(res)
      this.dialogChangeUser = false
      this.renderPage()
      this.$message({
        message: res.data.meta.msg,
        type: 'success'
      })
    },
    // 分配角色对话框显示
    async asignShow (currentInfo) {
      // console.log(currentInfo)
      this.dialogAsign = true
      this.asignForm.username = currentInfo.username
      this.asignForm.id = currentInfo.id
      const res = await this.$http.get(`/users/${currentInfo.id}`)
      // console.log(res)
      this.asignForm.role_id = res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    // 获取角色列表
    async getRoles () {
      const res = await this.$http.get('/roles')
      this.role_name_list = res.data.data
      // console.log(res, this.role_name_list)
    },
    // 分配角色
    async asignRole () {
      const res = await this.$http.put(`/users/${this.asignForm.id}/role`, {
        rid: this.asignForm.role_id
      })
      // console.log(res)
      this.dialogAsign = false
      this.$message({
        message: '角色修改成功',
        type: 'success'
      })
    }
  },
  created () {
    this.renderPage()
    this.getRoles()
  }
}
