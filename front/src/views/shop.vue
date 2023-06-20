<template>
<div class="shop">
    <el-button @click="dialogVisibles = true" size="medium" type="primary" style="position:absolute;left:23%;top:10%">增加</el-button>
    <el-dialog title="新增商店" :visible.sync="dialogVisibles" width="30%" @close="closeDialog('ruleForm')">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="上传图片" prop="img">
                <el-input v-model="ruleForm.img"></el-input>
                <el-upload ref="upload" action="" :limit =1 :on-change="handleChange"
                    :file-list="fileList" :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="名称" prop="shopName">
                <el-input type="text" v-model="ruleForm.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input type="text" v-model="ruleForm.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="introduction">
                <el-input type="text" v-model="ruleForm.introduction" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
      </el-form>
  </el-dialog>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  
  style="margin-top: 5%;">
    <el-table-column fixed prop="shopName" label="名字" width="150" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="address" label="地址" width="100" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="introduction" label="介绍" width="500" align="center" header-align="center"></el-table-column>
    <el-table-column prop="img" label="图片" align="center" header-align="center" width="150">
        <template slot-scope="scope">
              <img :src="scope.row.img" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
    <el-table-column  label="操作" width="400" align="center" header-align="center">
      <template slot-scope="scope">
       <el-popover placement="right" width="400" >
        <el-form :model="{ruleFormss}" status-icon ref="ruleFormss" class="demo-ruleFormss">
          <el-form-item label="修改图片" prop="img">
                <el-input v-model="ruleFormss.img"></el-input>
                <el-upload ref="upload" action="" :limit =1 :on-change="handleChanges"
                    :file-list="fileLists" :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
            </el-form-item>
      <el-form-item label="名字" prop="shopName">
        <el-input type="text" v-model="ruleFormss.shopName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="text" v-model="ruleFormss.address" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input type="text" v-model="ruleFormss.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormss(scope.row,'ruleFormss')">提交</el-button>
        </el-form-item>
      </el-form>
  <el-button slot="reference" @click="change(scope.row)" size="medium" type="primary">编辑</el-button>
        </el-popover>
        <el-button @click="dele(scope.row)" size="medium" type="danger" style="margin-left: 10px;">删除</el-button>
        <el-button @click="jump(scope.row)" size="medium" type="primary"style="margin-left: 10px;">编辑周边</el-button>
        <el-button @click="jumps(scope.row)" size="medium" type="primary"style="margin-left: 10px;">编辑宠物</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
   :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" 
   layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
</el-pagination>
  </div>
</template>

<script>

  export default {
    inject:['reload'],
    methods: {  
      dele(val) {
        var formData=new FormData();
        var formDatas=new FormData();
        var formDatass=new FormData();
        var formDatasss=new FormData();
        var ids;
        var idss;
          formData.append('id',val.id);
          formDatas.append('shopId',val.id);
          var len=this
          this.$ajax.post('http://localhost:8899/demo/animal/searches',formDatas)
          .then(function(respon){
            for (let i = 0; i < respon.data.data.length; i++) {
              if(i==0)
                ids=respon.data.data[i].id+",";
              else
                ids+=respon.data.data[i].id+",";
            }
            formDatass.append('ids',ids);
             len.$ajax.post('http://localhost:8899/demo/animal/deleteShopByIds',formDatass)
          .then(function(response){})
          })
          this.$ajax.post('http://localhost:8899/demo/stuff/searches',formDatas)
          .then(function(respon){
            for (let i = 0; i < respon.data.data.length; i++) {
              if(i==0)
                idss=respon.data.data[i].id+",";
              else
                idss+=respon.data.data[i].id+",";
            }
            formDatasss.append('ids',idss);
            len.$ajax.post('http://localhost:8899/demo/stuff/deleteShopByIds',formDatasss)
          .then(function(response){})
          })
          this.$ajax.post('http://localhost:8899/demo/shop/delete',formData)
          .then(function(response){})
          this.$toast.success('删除成功');
          this.reload()
      },
      submitForm() {
        console.log(this.ruleForm)
          this.$ajax.post('http://localhost:8899/demo/shop/saves',this.ruleForm)
          .then(function(response){
         })
         this.$toast.success('添加成功');    
         this.dialogVisibles=false
         this.reload()
        },
         handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.currentPage = val;
     },
     handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     handleChange(file, fileList) {
      this.fileList = fileList
      this.ruleForm.img=this.fileList[0].name
    },
     handleChanges(file, fileLists) {
      this.fileLists = fileLists
      this.ruleFormss.img=this.fileLists[0].name
    },
    onSubmit() {
      this.$refs.upload.submit()
    },
    closeDialog(type)
    {
      if(type){
        this.$refs.ruleForm.resetFields();
      }
    },
    change(val){
       var formData=new FormData();
       formData.append('id',val.id);
       var that=this;
        this.$ajax.post('http://localhost:8899/demo/shop/searchs',formData)
          .then(function(response){
              that.ruleFormss=response.data.data;
              that.ruleFormss.img=response.data.data.img.substring(4,response.data.data.img.length)
          })
    },
    submitFormss(val) {
      this.$ajax.post('http://localhost:8899/demo/shop/updatas',this.ruleFormss)
          .then(function(response){})
          this.$toast.success('修改成功');
          this.reload()
        },  
        jump(val)
        {
          this.$router.push({name:'stuff',query:{id:val.id}});
        },
         jumps(val)
        {
          this.$router.push({name:'animal',query:{id:val.id}});
        }
        
    },

    data() {
      return {
        dialogVisibles:false,
        tableData: [],
        ruleForm: {
          shopName:'',
          address:'',
          introduction:'',
        },
        rules: {
            shopName: [{ required: true, message: "必填" },],
            address: [{ required: true, message: "必填" },],
            introduction: [{ required: true, message: "必填" },],
        },
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5,// 每页的数据条数
        fileList: [],
        fileLists: [],
        ruleFormss: {
          img:'',
          shopName:'',
          address:'',
          introduction:'',
          id:'',
        },
        dialogVisibless:false
      }
    },
    created(){
   var that=this;
   axios.get('http://localhost:8899/demo/show/shop').then(function (resp){
      that.tableData=resp.data.data;
   })
  }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
