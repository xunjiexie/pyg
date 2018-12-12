import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    // 注册为局部组件：
    quillEditor
  },
  data () {
    return {
      // 当前激活步骤
      active: 1,
      // tab当前页
      tabActive: 'info',
      goodsAddForm: {
        name: '',
        price: '',
        weight: '',
        number: '',
        catData: [],
        // 单选框
        radio: false,
        // 上传图片临时路径
        pics: [],
        // 商品详情
        goods_introduce: ''
      },
      // 分类数据id值
      cat_id_arr: [],
      // 设置请求头
      uploadHeaders: {
        Authorization: localStorage.getItem('token')
      },
      // 富文本编辑器
      content: '<h2>I am Example</h2>',
      editorOption: {
        // something config
      }
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    // 切换tab栏，步骤条同时切换
    infoClick (info) {
      // console.log(info)
      this.active = (info.index - 0) + 1
    },
    // 获取分类数据
    async getCategories () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      console.log(res)
      this.goodsAddForm.catData = res.data.data
    },
    // 文件上传成功
    uploadSuccess (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      this.goodsAddForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    // 添加商品
    async addGoods () {
      const res = await this.$http.post('/goods', {
        goods_name: this.goodsAddForm.name,
        goods_cat: this.cat_id_arr.join(','),
        goods_price: this.goodsAddForm.price,
        goods_number: this.goodsAddForm.number,
        goods_weight: this.goodsAddForm.weight,
        goods_introduce: this.goodsAddForm.goods_introduce,
        pics: this.goodsAddForm.pics
      })
      // console.log(res)
      this.$router.push('/goods')
      this.$message({
        message: res.data.meta.msg,
        type: 'success'
      })
    }
  }
}
