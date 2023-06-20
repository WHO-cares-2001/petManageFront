<template>
<div class="people">
  <el-button @click="dialogVisible = true" size="medium" type="primary"
  style="position:absolute;left:23%;top:10%">增加</el-button>
  <el-dialog title="初始化用户" :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="上传头像" prop="img">
        <el-input v-model="ruleForm.img"></el-input>
        <el-upload ref="upload" action="" :limit =1 :on-change="handleChange"
          :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    
  </el-dialog>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  style="margin-top: 5%;">
    <el-table-column fixed prop="username" label="账号" width="150" align="center" header-align="center"></el-table-column>
    <el-table-column prop="password" label="密码" width="120" align="center" header-align="center"></el-table-column>
    <el-table-column prop="sex" label="性别" width="120" align="center" header-align="center"></el-table-column>
    <el-table-column prop="nikename" label="昵称" width="120" align="center" header-align="center"></el-table-column>
    <el-table-column prop="tel" label="电话" width="120" align="center" header-align="center"></el-table-column>
     <el-table-column prop="img" label="图片" align="center" header-align="center">
        <template slot-scope="scope">
              <img :src="scope.row.img" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
    <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
      <template slot-scope="scope">
        <el-button @click="ifusefull(scope.row)" size="medium" type="danger" v-if="scope.row.usefull == 0">{{scope.row.usefull === 0 ? '解除禁用' : '禁用'}}</el-button>
        <el-button @click="ifusefull(scope.row)" size="medium" type="danger" v-if="scope.row.usefull == 1">{{scope.row.usefull === 0 ? '解除禁用' : '禁用'}}</el-button>
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
      ifusefull(val) {
        let arr={
          "id":val.id,
          "usefull":0,
        }
        if(val.usefull==0)
          arr.usefull=1;
        this.$ajax.post('http://localhost:8899/demo/user/updatas',arr)
        .then(function(response){})
        if(val.usefull==1)
          this.$toast.success('禁用成功');
        else if(val.usefull==0)
        {
          this.$toast.success('解除禁用成功');
        }
        this.reload()
      },
      submitForm() {
          this.$ajax.post('http://localhost:8899/demo/user/saves',this.ruleForm)
          .then(function(response){
         })
        this.$toast.success('添加成功');
        this.dialogVisible=false
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
      handleChange(file, fileList) {
          this.fileList = fileList
          this.ruleForm.img=this.fileList[0].name
    },
      onSubmit() {
        this.$refs.upload.submit()
    }
    },

    data() {
      return {
        dialogVisible:false,
        tableData: [],
        ruleForm: {
          username:'',
          password:'',
        },
        rules: {
            username: [{ required: true, message: "必填" },],
            password: [{ required: true, message: "必填" },],
        },
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5,// 每页的数据条数
        fileList: [],
      }
    },
    created(){
   var that=this;
   axios.get('http://localhost:8899/demo/show/user').then(function (resp){
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
