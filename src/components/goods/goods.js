export default {
  data () {
    return {
      goodsData: [],
      goodsTotal: 0,
      goodsPagenum: 1
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    // 获取商品列表信息
    async getGoods (pagenum = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          query: '',
          pagenum,
          pagesize: 5
        }
      })
      console.log(res)
      this.goodsTotal = res.data.data.total
      this.goodsData = res.data.data.goods
    },
    // 当前页改变时
    currentChange (cur) {
      this.getGoods(cur)
    }
  }
}
