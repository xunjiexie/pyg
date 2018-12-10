export default {
  data () {
    return {
      // 角色数据
      rolesData: [],
      // 分配权限模态框默认隐层
      dialogAuthorization: false,
      // 权限数据
      authorization: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中权限id
      // dataId: [],
      // 选中外层id值
      outId: 0
    }
  },
  methods: {
    // 角色列表页面渲染
    async render () {
      const res = await this.$http.get('/roles')
      // console.log(res)
      this.rolesData = res.data.data
    },
    // 列表索引
    indexMethod (index) {
      return index
    },
    // 分配权限模态框显示
    async isDialogAuthorizationShow (oneRoleData) {
      this.outId = oneRoleData.id
      console.log(oneRoleData)
      console.log(this.outId)
      this.dialogAuthorization = true
      this.$http.get('/rights/tree')
        .then(res => {
          // console.log(res)
          this.authorization = res.data.data
          // console.log(this.authorization)
        })
      this.$nextTick(() => {
        let idArr = []
        oneRoleData.children.forEach(v1 => {
          v1.children.forEach(v2 => {
            v2.children.forEach(v3 => {
              idArr.push(v3.id)
            })
          // console.log(idArr)
          })
        })
        console.log(idArr)
        this.$refs.tree.setCheckedKeys(idArr)
      })
    },
    async assignRights () {
      // console.log('1', this.$refs.tree.getCheckedKeys())
      // console.log('2', this.$refs.tree.getHalfCheckedKeys())
      const CheckedKeys = this.$refs.tree.getCheckedKeys()
      const HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      const keys = [...CheckedKeys, ...HalfCheckedKeys]
      // console.log(keys)
      const res = await this.$http.post(`roles/${this.outId}/rights`,
        {rids: keys.join(',')
        })
      console.log(res)
      this.dialogAuthorization = false
      this.render()
      this.$message({
        message: '权限修改成功',
        type: 'success'
      })
    }
  },
  created () {
    this.render()
  }
}
