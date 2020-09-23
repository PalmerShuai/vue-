<template>
<div class="app-container">
<el-form ref="form" :model="city" label-width="80px">
   <el-form-item label="城市名称">
    <el-input v-model="city.name" @input="firstWord"></el-input>
  </el-form-item>
  <el-form-item label="城市索引">
    <el-input v-model="city.index"></el-input>
  </el-form-item>
   <el-form-item >
     <el-button type="success" @click="subData" plain>确定</el-button>
  <el-button type="info" plain>取消</el-button>
  </el-form-item>
  </el-form>

  </div>
</template>

<script>
import axios from "axios"
import pinyin from 'pinyin'
export default {
  name: 'CreateRoduc',
  components: {  },
  data() {
      return {
        city:{
          name:'',
          index:'A'
        }
}
    },
    methods:{
       subData(){
          axios.post('/city/data',{
            name:this.city.name,
            index:this.city.index
          }).then(res=>{
             this.$message({
             message: res.data.msg,
             type: 'success',
        });
        this. $router.push({
          path:'/reoduc/list'
        })
          })
       },
        firstWord(){
          if(this.city.name){
      const word = this.city.name[0];
      const first = pinyin(word,{
        style:pinyin.STYLE_FIRST_LETTER
      });
      this.city.index=first[0][0].toUpperCase()
    }
    }
    }
}
</script>

