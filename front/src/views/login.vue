<template>
  <div class="login" :style="'background-image:url('+ Background +');'">   
 
  <van-form @submit="loginFun" class="login-form">
  <h3 class="title">
        宠物商城 后台管理系统
  </h3>
  <van-field v-model="loginForm.username" name="用户名" label="用户名"/>
  <van-field v-model="loginForm.password" type="password" name="密码" label="密码"/>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
  </van-form>
  </div>
</template>
 
<script>
import Background from '@/slider/background.webp'
import { mapMutations } from 'vuex';
export default {
    name:"login",
  data () {
    return {
       Background: Background,
     loginForm: {
            username: '',
            password: '',
        },
    };
  },
 
  methods: {
        ...mapMutations(['setToken','DELALL']),
        loginFun(){
		if (this.loginForm.username === '' || this.loginForm.password === '') {
          alert("账号或密码不能为空！");
        }
        else {
          this.$ajax.post("http://localhost:8899/demo/user/login",this.loginForm
          ).then(
            res => {
              if(res.data.statusCode==='200'&&res.data.data.user.privilege===2) {
                 this.setToken({token: res.data.data.token});
                 this.$store.state.iflogin=true
                 this.$store.state.me="欢迎你"+this.loginForm.username
                 this.$store.state.he="退出登录"
                 this.$router.push('/admin');
              }
              else
              {
               this.$toast.fail('没有该用户');
              }
            }).catch(error => {
            this.$toast.fail('没有该用户');
          });
        }
        }
  }
};
</script>

<style>
  .login {
    width:100%;		
    height:100%;		
    position:fixed;
    background-size:100% 100%;
  } 
  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;  
    margin-left: 35%;
    margin-top: 8%;
  }
  .title{
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }
</style>

