// 导入第三方组件：表格展开
import ElTreeGrid from 'element-tree-grid'
// console.log(ElTreeGrid.name)
export default {
  components: {
    // 'el-table-tree-column': ElTreeGrid

    // 属性名表达式
    // 计算表达式 ElTreeGrid.name 的值，再作为对象的键，作用与上面的语法相同
    [ElTreeGrid.name]: ElTreeGrid
  },
  data () {
    return {
      // 商品分类列表数据
      categorieseData: [],
      // 商品总条数
      cateTotal: 0,
      // loading开关
      loading: false,
      // 添加分类对话框显示状态
      dialogAddCat: false,
      // 添加分类表单数据
      AddCatForm: {
        cat_name: '',
        cat_id_arr: []
      },
      // 两层分类列表数据
      cateFormTwo: []
    }
  },
  created () {
    this.getCategories()
    this.getCategoriesTwo()
  },
  methods: {
    // 分类列表展示
    async getCategories (pagenum = 1) {
      this.loading = true
      const res = await this.$http.get('/categories', {
        params: {
          type: 3,
          pagenum,
          pagesize: 5
        }
      })
      // console.log(res)
      this.categorieseData = res.data.data.result
      this.cateTotal = res.data.data.total
      this.loading = false
    },
    // 当前页改变
    currentPage (cur) {
      // console.log(cur)
      this.getCategories(cur)
    },
    // 获取两层分类列表
    async getCategoriesTwo () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.cateFormTwo = res.data.data
    },
    // 添加分类
    /* eslint-disable camelcase */
    async addCategories () {
      let {cat_name, cat_id_arr} = this.AddCatForm
      // console.log(cat_id_arr)
      const cat_level = cat_id_arr.length
      const res = await this.$http.post('/categories', {
        cat_pid: cat_id_arr[cat_id_arr.length - 1],
        cat_name,
        cat_level
      })
      console.log(res)
      this.dialogAddCat = false
      this.$message({
        message: res.data.meta.msg,
        type: 'success'
      })
      this.getCategories()
    }
  }
}
