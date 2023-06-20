<template>
  <div class="video">
      <el-button @click="dialogVisibles = true" size="medium" type="primary"
          style="position:absolute;left:23%;top:10%">增加</el-button>
      <el-dialog title="新增视频" :visible.sync="dialogVisibles" width="30%" @close="closeDialog('ruleForm')">
          <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
              <el-form-item label="上传视频" prop="videoName">
                  <el-input v-model="ruleForm.videoName"></el-input>
                  <el-upload ref="upload" action="" :limit =1 :on-change="handleChange"
                      :file-list="fileList" :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
              </el-form-item>
              <!--<el-form-item label="所属商品" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>     
              </el-form-item>-->
              <el-select v-model="ruleForm.name" placeholder="请选择宠物">
                    <el-option v-for="animal in animals" :label="animal.name" :value="animal.id" :key="animal.id"></el-option>
                </el-select>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>

    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  style="margin-top: 5%;">
      <el-table-column fixed prop="name" label="所属商品" width="100" align="center" header-align="center"></el-table-column>   
      <el-table-column prop="videoName" label="视频" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="video">
              <el-dialog title="视频" width="72%" append-to-body top="20px" 
                :visible.sync="dialogVisible" @closed="closeDialog">
                <video width="100%" autoplay="autoplay" :src="playvideo"
                    :poster="playvideo"  controls="controls" id="video" preload></video>
              </el-dialog>
              <video :src="scope.row.videoName" width="100"  preload></video>
              <i class="el-icon-video-play playIcon" @click="handleCheck(scope.row)"></i>
            </div>
          </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center" header-align="center">
          <template slot-scope="scope">
            <el-popover placement="right" width="400" >
                <el-form :model="{ruleFormss}" status-icon ref="ruleFormss" class="demo-ruleFormss">
                 <el-select v-model="ruleFormss.name" placeholder="请选择宠物">
                    <el-option v-for="animal in animalss" :label="animal.name" :value="animal.id" :key="animal.id"></el-option>
                </el-select>
                <el-form-item>
                  <el-button type="primary" @click="submitFormss(scope.row,'ruleFormss')">提交</el-button>
                </el-form-item>
                </el-form>
                <el-button slot="reference" @click="change(scope.row)" size="medium" type="primary">编辑</el-button>
            </el-popover>
            <el-button @click="dele(scope.row)" size="medium" 
            type="danger" style="margin-left: 20px;">删除</el-button>
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
          var len=this
          let arr={
            "id":val.animalId,
            "videoId":null,
          }
          this.$ajax.post('http://localhost:8899/demo/animal/updatas',arr).then(function(res){})
          this.$ajax.post('http://localhost:8899/demo/video/delete',formData)
          .then(function(res){})
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
        handleCheck(row) {
          this.playvideo = row.videoName // 存储用户点击的视频播放链接
          this.playvideoName = row.videoName// 存储用户点击的视频播放链接
          this.dialogVisible = true
        },
        change(){},
        /*change(val){
            var formData=new FormData();
            var formDatas=new FormData();
           formData.append('videoId',val.id);
           formDatas.append('id',val.id);
            var that=this;
            this.$ajax.post('http://localhost:8899/demo/animal/searchs',formData)
            .then(function(response){
            that.ruleFormss=response.data.data[0];
          })
           this.$ajax.post('http://localhost:8899/demo/video/searchs',formDatas)
            .then(function(response){
            that.ruleFormss.videoName=response.data.data.videoName;
          })
        },*/
        submitFormss(val) {
          var formData=new FormData();
          var formDatas=new FormData();
           formData.append('id',this.ruleFormss.name);
          let arr={
            "id":val.id,
            "animalId":this.ruleFormss.name,
          }
          let arrs={
            "id":this.ruleFormss.name,
            "videoId":val.id,
          }
           let arrss={
            "id":val.animalId,
            "videoId":null,
          }
          var that=this
          this.$ajax.post('http://localhost:8899/demo/animal/searchbyid',formData)
          .then(function(response){
              that.$ajax.post('http://localhost:8899/demo/animal/updatas',arrs).then(function(res){})
              that.$ajax.post('http://localhost:8899/demo/video/updatas',arr).then(function(response){})
              that.$ajax.post('http://localhost:8899/demo/animal/updatas',arrss).then(function(response){})
            if(response.data.data!=null)
            {
              formDatas.append('id',response.data.data.videoId);
              that.$ajax.post('http://localhost:8899/demo/video/delete',formDatas).then(function(res){})
            }
          })
           this.$toast.success('修改成功');
           this.reload()
           /*var formData=new FormData();
           var formDatas=new FormData();
           formData.append('name',this.ruleFormss.name);
           var len=this
           var that=this
           let arr={
            "id":'',
            "animalId":'',
          }
          let arrs={
            "id":'',
            "videoId":''
          }
          let arrss={
            "id":val.id,
            "videoId":null,
          }
            this.$ajax.post('http://localhost:8899/demo/animal/searchname',formData)
          .then(function(response){
            if(response.data.data!=null){
                arr.id=len.ruleFormss.id
                arrs.id=response.data.data.id
                arrs.videoId=len.ruleFormss.id
                arr.videoName=len.ruleFormss.videoName
                formDatas.append('id',response.data.data.videoId);
                that.$ajax.post('http://localhost:8899/demo/animal/updatas',arrss).then(function(res){})
                that.$ajax.post('http://localhost:8899/demo/video/updatas',arr)
                .then(function(response){})
                 that.$ajax.post('http://localhost:8899/demo/animal/updatas',arrs)
                .then(function(response){})
                that.$ajax.post('http://localhost:8899/demo/video/delete',formDatas)
                .then(function(res){})
                that.$toast.success('修改成功');
             }
             else
             that.$toast.file('修改失败，没有该商品');
          })*/
        },  
        closeDialog(){},
        handleChange(file, fileList) {
          this.fileList = fileList
          this.ruleForm.videoName=this.fileList[0].name
        },
        onSubmit() {
            this.$refs.upload.submit()
        },
        submitForm() {
           /*var formData=new FormData();
           var formDatas=new FormData();
           var formDatass=new FormData();
           formData.append('name',this.ruleForm.name);
           var that=this
           let arr={
            "videoName":'',
            "animalId":'',
          }
           let arrs={
            "id":'',
            "videoId":'',
          }
          var len=this
          var le=this
            this.$ajax.post('http://localhost:8899/demo/animal/searchname',formData)
            .then(function(response){
            if(response.data.data!=null){
              arr.videoName=that.ruleForm.videoName
              if(response.data.data.videoId!=null)
              {
                formDatass.append('id',response.data.data.videoId);
                that.$ajax.post('http://localhost:8899/demo/video/delete',formDatass)
                .then(function(res){})
              }
              arr.animalId=response.data.data.id
              arrs.id=response.data.data.id
              formDatas.append('name',"video/"+that.ruleForm.videoName); 
              that.$ajax.post('http://localhost:8899/demo/video/saves',arr).then(function(response){
                  le.$ajax.post('http://localhost:8899/demo/video/searchname',formDatas).then(function(res){
                     arrs.videoId=res.data.data.id
                        len.$ajax.post('http://localhost:8899/demo/animal/updatas',arrs).then(function(res){})
                  })
              })
              that.$toast.success('添加成功');
            }
            else
            {
              that.$toast.fail('添加失败');
            }
            })*/
            let arr={
            "videoName":this.ruleForm.videoName,
            "animalId":this.ruleForm.name,
          }
          let arrs={
            "id":this.ruleForm.name,
            "videoId":'',
          }
           var formData=new FormData();
           var that=this
           formData.append('name',"video/"+this.ruleForm.videoName);
            this.$ajax.post('http://localhost:8899/demo/video/saves',arr)
            .then(function(response){
                  that.$ajax.post('http://localhost:8899/demo/video/searchname',formData)
                  .then(function(response){
                    arrs.videoId=response.data.data.id
                    that.$ajax.post('http://localhost:8899/demo/animal/updatas',arrs).then(function(response){})
                    })
            })
            
            this.$toast.success('添加成功');
            this.dialogVisibles=false
            this.reload()
        },
    },
    data() {
      return {
        animalss:[],
        animals:[],
        fileList: [],
        dialogVisibles:false,
        tableData: [],
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5, // 每页的数据条数
        dialogVisible: false, // 视频播放弹窗
        playvideo: null, // 存储用户点击的视频播放链接
        playvideoName: null, // 存储正在播放视频的名称
        ruleForm: {
          videoName:'',
          name:'',
        },
        rules: {
            name: [{ required: true, message: "必填" },],
        },
         ruleFormss: {
         name:'',
       },
        }
    },
    created(){
        var that=this;
        axios.get('http://localhost:8899/demo/show/video').then(function (resp){
          that.tableData=resp.data.data;
          }),
          axios.get('http://localhost:8899/demo/show/animals').then(function (resp){
            that.animals=resp.data.data;
    })
    axios.get('http://localhost:8899/demo/show/animal').then(function (resp){
            that.animalss=resp.data.data;
    })
        }
  }
</script>
