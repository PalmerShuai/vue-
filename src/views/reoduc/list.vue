<template>
  <div class="app-container">
  <el-table
    ref="singleTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>

    <el-table-column
      property="name"
      label="城市姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="index"
      label="城市索引">
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="updata(scope.row._id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delData(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="pagesize"
  :current-page="currentpage"
  @current-change="changpage"
  :total="total">
</el-pagination>
  </div>
</template>

<script>
// Secondary package based on el-pagination
import axios from 'axios'
export default {
  name: 'RoducList',
  components: {  },
  filters: {

  },
  data() {
    return {
      pagesize: 3,
      currentpage: 1,
      total: 0,
 tableData: [{
          name: '',
          index: ''
        }],

      }
   },
   created(){
     this.gitCityList()
   },
    methods: {
      //  gitCityList(){
      //    axios.get('/city/list').then(res=>{

      //        this.tableData = res.data.list
      //    })
      //  },
      gitCityList(){
         axios.get(`/city/list?page=${this.currentpage}&pagesize=${this.pagesize}`).then(res=>{

             this.tableData = res.data.list
             this.total = res.data.total
         })
       },
       updata(){},
       delData(id){
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           axios.delete('/city/'+id).then(res=>{
              this.gitCityList()
           this.$message({
            type: 'success',
            message:res.data.msg
          });
         })
}).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

       },
changpage(page){
    // console.log(page)
    this.currentpage = page
    this.gitCityList()
  }
    },


}
</script>

<style scoped>

</style>
