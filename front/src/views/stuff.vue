<template>
<div class="stuff">
  <van-nav-bar   left-arrow @click-left="$router.go(-1)">
      <template #right>
   <el-button @click="dialogVisibles = true" size="medium" type="primary" 
   style="position: fixed;left:84%;top:15%">增加</el-button>
  </template>
  </van-nav-bar>
   
   <el-dialog title="新增周边" :visible.sync="dialogVisibles" width="30%" @close="closeDialog('ruleForm')">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="上传图片" prop="imgs">
        <el-input v-model="ruleForm.imgs"></el-input>
        <el-upload ref="upload" action="" :limit =1 :on-change="handleChange"
          :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
        <el-form-item label="名称" prop="stuffName">
          <el-input type="text" v-model="ruleForm.stuffName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input type="number" v-model="ruleForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input type="number" v-model="ruleForm.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input type="number" v-model="ruleForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input type="text" v-model="ruleForm.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="所属商店" prop="shopName">
          <el-input type="text" v-model="ruleForm.shopName" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  
  style="margin-top: 5%;">
    <el-table-column fixed prop="stuffName" label="名字" width="150" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="number" label="数量" width="100" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="introduction" label="介绍" width="200" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="price" label="价格" width="100" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="shopName" label="所属商店" width="100" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="state" label="状态" width="100" align="center" header-align="center"></el-table-column>
    <el-table-column prop="imgs" label="图片" align="center" header-align="center" width="150">
        <template slot-scope="scope">
              <img :src="scope.row.imgs" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
    <el-table-column  label="操作" width="200" align="center" header-align="center">
      <template slot-scope="scope">
        <el-popover placement="right" width="400" >
        <el-form :model="{ruleFormss}" status-icon ref="ruleFormss" class="demo-ruleFormss">
           <el-form-item label="修改图片" prop="imgs">
                <el-input v-model="ruleFormss.imgs"></el-input>
                <el-upload ref="upload" action="" :limit =1 :on-change="handleChanges"
                    :file-list="fileLists" :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
            </el-form-item>
      <el-form-item label="名字" prop="stuffName">
        <el-input type="text" v-model="ruleFormss.stuffName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input type="number" v-model="ruleFormss.number" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input type="text" v-model="ruleFormss.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input type="number" v-model="ruleFormss.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input type="text" v-model="ruleFormss.state" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="所属商店" prop="shopName">
          <el-input type="text" v-model="ruleFormss.shopName" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitFormss(scope.row,'ruleFormss')">提交</el-button>
        </el-form-item>
      </el-form>
  <el-button slot="reference" @click="change(scope.row)" size="medium" type="primary">编辑</el-button>
        </el-popover>
        <el-button @click="dele(scope.row)" size="medium" type="danger" style="margin-left: 20px;">删除</el-button>
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
        formData.append('id',val.id);
        this.$ajax.post('http://localhost:8899/demo/stuff/delete',formData)
        .then(function(response){})
        this.$toast.success('删除成功');
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
      this.ruleForm.imgs=this.fileList[0].name
    },
     handleChanges(file, fileLists) {
      this.fileLists = fileLists
      this.ruleFormss.imgs=this.fileLists[0].name
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
       this.ruleFormss=val
       /*var formData=new FormData();
       formData.append('id',val.id);
       var formDatas=new FormData();
       var that=this;
       var len=this
        this.$ajax.post('http://localhost:8899/demo/stuff/searchbyid',formData)
          .then(function(response){
              that.ruleFormss=response.data.data;
             / formDatas.append('id',that.ruleFormss.shopId);
             that.$ajax.post('http://localhost:8899/demo/shop/searchs',formDatas)
              .then(function(response){
                len.ruleFormss.shopName=response.data.data.shopName;
              })
          })*/
    },
    submitFormss(val) {
          //var formData=new FormData();
          //formData.append('shopName',this.ruleFormss.shopName);
          //var that=this
          var arr={
            "id":val.id,
            "stuffName":this.ruleFormss.stuffName,
            "number":this.ruleFormss.number,
            "state":this.ruleFormss.state,
            "price":this.ruleFormss.price,
            "introduction":this.ruleFormss.introduction,
            "shopId":this.$route.query.id,
            "imgs":this.ruleFormss.imgs,
          }
          if(this.ruleFormss.state=="可售")
          {
            arr.state=1
          }
          else
            arr.state=0
            this.$ajax.post('http://localhost:8899/demo/stuff/updatas',arr).then(function(response){})
            this.$toast.success('修改成功');
            this.reload()
          /*this.$ajax.post('http://localhost:8899/demo/shop/search',formData)
          .then(function(response){
          if(response.data.data!=null){
            arr.shopId=response.data.data.id
            console.log(arr)
            that.$ajax.post('http://localhost:8899/demo/stuff/updatas',arr).then(function(response){})
            that.$toast.success('修改成功');
          }
         else
          {
              that.$toast.fail('添加失败,商店不存在');
          }
            })*/
        },  
    submitForm() {
         var formData=new FormData();
         formData.append('shopName',this.ruleForm.shopName);
          var that=this
          var arr={
            "imgs":this.ruleForm.imgs,
            "stuffName":this.ruleForm.stuffName,
            "number":this.ruleForm.number,
            "state":this.ruleForm.state,
            "price":this.ruleForm.price,
            "introduction":this.ruleForm.introduction,
            "shopId":this.$route.query.id,
          }
           this.$ajax.post('http://localhost:8899/demo/stuff/saves',arr).then(function(response){})  
           this.$toast.success('添加成功');
           this.dialogVisibles=false
           this.reload()
          /*var an=0
          this.$ajax.post('http://localhost:8899/demo/shop/search',formData)
          .then(function(response){
          if(response.data.data!=null){
            arr.shopId=response.data.data.id
            an=1
            that.$ajax.post('http://localhost:8899/demo/stuff/saves',arr).then(function(response){})  
          }
          console.log(an)
          if(an==1)
          {
              that.$toast.success('添加成功');
              that.dialogVisibles=false
          }
         else
          {
              that.$toast.fail('添加失败,商店不存在');
          }
          
            })*/
        },
    },

    data() {
      return {
        dialogVisibles:false,
        tableData: [],
        ruleForm: {
          stuffName:'',
          number:null,
          introduction:'',
          state:null,
          price:null,
        // shopName:'',
          imgs:'',
        },
        rules: {
            stuffName: [{ required: true, message: "必填" },],
            state: [{required: true, message: '必填', trigger: 'blur'},
                   {pattern: /^(0|1)\d*$/, message: '请输入0或者1',trigger: 'blur'}],
            number: [{required: true, message: '必填', trigger: 'blur'},
                    {pattern: /^[1-9]\d*$/, message: '请输入正整数',trigger: 'blur'}],
            price: [{required: true, message: '必填', trigger: 'blur'},
                    {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入正数',trigger: 'blur'}],
            introduction: [{ required: true, message: "必填" },],
            shopName: [{ required: true, message: "必填" },],
        },
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5,// 每页的数据条数
        fileList: [],
        fileLists: [],
        ruleFormss: {
          stuffName:null,
          number:'',
          introduction:'',
          price:'',
         // shopName:'',
          state:'',
          imgs:'',
        },
      }
    },
    created(){
   var that=this;
   axios.get('http://localhost:8899/demo/show/stuffbyshopid', {
          params: {
             id:this.$route.query.id,
          }
          }).then(function (resp){
      that.tableData=resp.data.data;
      for (let i = 0; i < resp.data.data.length; i++) {
         if(resp.data.data[i].state==0)
         {
           that.tableData[i].state="不可售";
         }
         else
         that.tableData[i].state="可售";
       }
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
