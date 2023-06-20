<template>
<div class="animal">
  <van-nav-bar   left-arrow @click-left="$router.go(-1)">
      <template #right>
    <el-button @click="dialogVisibles = true" size="medium" type="primary"
   style="position: fixed;left:90%;top:15%">增加</el-button>
  </template>
  </van-nav-bar>
   <el-dialog title="新增商品" :visible.sync="dialogVisibles" width="30%">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="上传图片" prop="img">
        <el-input v-model="ruleForm.img"></el-input>
        <el-upload ref="upload" action="" :limit =1 :on-change="handleChange"
          :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="text" v-model="ruleForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="绝育" prop="birth">
          <el-input type="text" v-model="ruleForm.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input type="number" v-model="ruleForm.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="typeName">
        <el-select v-model="ruleForm.typeName" placeholder="请选择类型">
              <el-option v-for="type in types" :label="type.typeName" :value="type.id" :key="type.id"></el-option>
        </el-select>
        </el-form-item>
        <!--<el-form-item label="类型" prop="typeName">
          <el-input type="text" v-model="ruleForm.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属商店" prop="shopName">
          <el-input type="text" v-model="ruleForm.shopName" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="介绍" prop="introduction">
          <el-input type="text" v-model="ruleForm.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input type="text" v-model="ruleForm.sex" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="价格" prop="price">
          <el-input type="number" v-model="ruleForm.price" autocomplete="off"></el-input>
        </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>

  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  style="margin-top: 5%;">
    <el-table-column fixed prop="name" label="名字" width="80" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="age" label="年龄" width="80" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="introduction" label="介绍" width="200" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="birth" label="绝育" width="60" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="sex" label="性别" width="60" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="state" label="可售" width="80" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="price" label="价格" width="80" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="shopName" label="所属商店" width="80" align="center" header-align="center"></el-table-column>
    <el-table-column fixed prop="typeName" label="类型" width="80" align="center" header-align="center"></el-table-column>
    <el-table-column prop="img" label="图片" align="center" header-align="center" width="100">
        <template slot-scope="scope">
              <img :src="scope.row.img" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>

     <!--   <el-table-column prop="videoName" label="视频" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="video">
                <el-dialog title="视频" width="30%" append-to-body top="20px" 
                :visible.sync="dialogVisible" @closed="closeDialog">
                  <video width="100%" autoplay="autoplay" :src="playvideo"
                    :poster="playvideo"  controls="controls" id="video" preload></video>
                </el-dialog>
                <video :src="scope.row.videoName" width="80"  preload></video>
                <i class="el-icon-video-play playIcon" @click="handleCheck(scope.row)"></i>
              </div>
            </template>
        </el-table-column>-->

    <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
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
      <el-form-item label="名字" prop="name">
        <el-input type="text" v-model="ruleFormss.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="text" v-model="ruleFormss.age" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input type="text" v-model="ruleFormss.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="绝育" prop="birth">
          <el-input type="text" v-model="ruleFormss.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input type="text" v-model="ruleFormss.sex" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="价格" prop="price">
          <el-input type="number" v-model="ruleFormss.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可售" prop="state">
          <el-input type="text" v-model="ruleFormss.state" autocomplete="off"></el-input>
        </el-form-item>
      <!--  <el-form-item label="所属商店" prop="shopName">
          <el-input type="text" v-model="ruleFormss.shopName" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="所属类别" prop="typeName">
           <el-select v-model="ruleFormss.typeName" placeholder="请选择类型">
              <el-option v-for="type in types" :label="type.typeName" :value="type.id" :key="type.id"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormss(scope.row,'ruleFormss')">提交</el-button>
        </el-form-item>
      </el-form>
           <el-button slot="reference" @click="change(scope.row)" size="medium" type="primary">编辑</el-button>
        </el-popover>
        <el-button @click="dele(scope.row)" size="medium" type="danger" style="margin-left: 10px;">删除</el-button>
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
        formData.append('id',val.id);
        formDatas.append('id',val.videoId);
         this.$ajax.post('http://localhost:8899/demo/animal/delete',formData)
          .then(function(response){})
        this.$ajax.post('http://localhost:8899/demo/video/delete',formDatas)
          .then(function(response){})
         this.$toast.success('删除成功');
         this.reload()
      },
      submitForm() {
         var arrs= {
          name:this.ruleForm.name,
          img:"img/"+this.ruleForm.img,
          age:this.ruleForm.age,
          birth:this.ruleForm.birth,
          state:this.ruleForm.state,
          typeId:this.ruleForm.typeName,
          shopId:this.$route.query.id,
          sex:this.ruleForm.sex,
          price:this.ruleForm.price,
          introduction:this.ruleForm.introduction,
        }
        if(this.ruleForm.sex==0)
        {
          arrs.sex='公'
        }
        else
        arrs.sex='母'
         if(this.ruleForm.birth==0)
        {
          arrs.birth='已绝育'
        }
        else
        arrs.birth='未绝育'
        this.$ajax.post('http://localhost:8899/demo/animal/saves',arrs).then(function(response){})
        this.$toast.success('添加成功');
        this.dialogVisibles=false
        this.reload()
        /*var formData=new FormData();
        formData.append('shopName',this.ruleForm.shopName);
        var formDatass=new FormData();
        formDatass.append('name',this.ruleForm.typeName);
        var arrs= {
          name:this.ruleForm.name,
          img:this.ruleForm.img,
          age:this.ruleForm.age,
          birth:this.ruleForm.birth,
          state:this.ruleForm.state,
          typeId:'',
          shopId:'',
          sex:this.ruleForm.sex,
          price:this.ruleForm.price,
          introduction:this.ruleForm.introduction,
        }
        if(this.ruleForm.sex==0)
        {
          arrs.sex='公'
        }
        else
        arrs.sex='母'
         if(this.ruleForm.birth==0)
        {
          arrs.birth='已绝育'
        }
        else
        arrs.birth='未绝育'
        var that=this
        var len=this
        this.$ajax.post('http://localhost:8899/demo/shop/search',formData)
          .then(function(response){
            if(response.data.data!=null){
              arrs.shopId=response.data.data.id
              that.$ajax.post('http://localhost:8899/demo/type/searchtypename',formDatass)
              .then(function(response){
              if(response.data.data!=null){
                  arrs.typeId=response.data.data.id
                 len.$ajax.post('http://localhost:8899/demo/animal/saves',arrs)
              .then(function(response){})
              }
              })
            }
          })*/
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
     /* handleCheck(row) {
      this.playvideo = row.videoName // 存储用户点击的视频播放链接
      this.playvideoName = row.videoName// 存储用户点击的视频播放链接
      this.dialogVisible = true
    },
    closeDialog(){

    },*/
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
    change(val){
      this.ruleFormss=val
      },
    submitFormss(val){
      var arrs= {
          id:val.id,
          name:this.ruleFormss.name,
          age:this.ruleFormss.age,
          birth:this.ruleFormss.birth,
          state:this.ruleFormss.state,
          typeId:this.ruleFormss.typeName,
          sex:this.ruleFormss.sex,
          price:this.ruleFormss.price,
          introduction:this.ruleFormss.introduction,
          img:"img/"+this.ruleFormss.img,
        }
         if(this.ruleFormss.state=="可售")
          {
            arrs.state=1
          }
          else
            arrs.state=0
            console.log(arrs)
        this.$ajax.post('http://localhost:8899/demo/animal/updatas',arrs).then(function(response){})
        this.$toast.success('添加成功');
        this.reload()
        /*var formData=new FormData();
        formData.append('shopName',this.ruleFormss.shopName);
        var formDatass=new FormData();
        formDatass.append('name',this.ruleFormss.typeName);
        var arrs= {
          name:this.ruleFormss.name,
          age:this.ruleFormss.age,
          birth:this.ruleFormss.birth,
          state:this.ruleFormss.state,
          typeId:'',
          shopId:'',
          sex:this.ruleFormss.sex,
          price:this.ruleFormss.price,
          introduction:this.ruleFormss.introduction,
        }
        if(this.ruleFormss.sex==0)
        {
          arrs.sex='公'
        }
        else
        arrs.sex='母'
         if(this.ruleFormss.birth==0)
        {
          arrs.birth='已绝育'
        }
        else
        arrs.birth='未绝育'
        var that=this
        var len=this
        this.$ajax.post('http://localhost:8899/demo/shop/search',formData)
          .then(function(response){
            if(response.data.data!=null){
              arrs.shopId=response.data.data.id
              that.$ajax.post('http://localhost:8899/demo/type/searchtypename',formDatass)
              .then(function(response){
              if(response.data.data!=null){
                  arrs.typeId=response.data.data.id
                 len.$ajax.post('http://localhost:8899/demo/animal/updatas',arrs)
              .then(function(response){})
              }
              })
            }
          })*/
    }
    
    },

    data() {
      return {
        tableData: [],
        ruleForm: {
          name:'',
          img:'',
          age:'',
          birth:'',
          state:null,
          typeName:'',
         // shopName:'',
          sex:'',
          price:null,
          introduction:'',
          videoName:'',
        },
        ruleFormss: {
          name:'',
          age:'',
          birth:'',
          state:null,
          typeName:'',
          //shopName:'',
          sex:'',
          price:null,
          introduction:'',
          img:'',
        },
         rules: {
            name: [{ required: true, message: "必填" },],
            age: [{ required: true, message: "必填" },],
            birth: [{ required: true, message: "必填" },
            {pattern: /^(0|1)\d*$/, message: '0代表未绝育，1代表已绝育',trigger: 'blur'}],
            state: [{required: true, message: '必填', trigger: 'blur'},
                   {pattern: /^(0|1)\d*$/, message: '请输入0或者1',trigger: 'blur'}],
            price: [{required: true, message: '必填', trigger: 'blur'},
                    {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入正数',trigger: 'blur'}],
            introduction: [{ required: true, message: "必填" },],
            shopName: [{ required: true, message: "必填" },],
            typeName: [{ required: true, message: "必填" },],
            sex: [{ required: true, message: "必填" },
            {pattern: /^(0|1)\d*$/, message: '0代表公，1代表母',trigger: 'blur'}],
        },
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5, // 每页的数据条数
        dialogVisible: false, // 视频播放弹窗
        playvideo: null, // 存储用户点击的视频播放链接
        playvideoName: null, // 存储正在播放视频的名称
        dialogVisibles:false,
        fileList: [],
        fileLists: [],
        types:[],
      }
    },
    created(){
   var that=this;
   axios.get('http://localhost:8899/demo/show/animalbyshopid', {
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
   axios.get('http://localhost:8899/demo/show/type').then(function (resp){
            that.types=resp.data.data;
    })
  }
  }
</script>
<style>
.el-popover{
  height: 500px; 
  overflow: auto;
}
</style>