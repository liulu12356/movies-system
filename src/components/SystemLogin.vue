<template>
  <el-card class="box-card" style="margin: auto">
    <el-form
      label-position="right"
      label-width="80px"
      :model="user"
      ref="ruleForm"
    >
      <el-form-item label="用户名">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "system-login",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.user.name === "admin") {
        this.$router.push("/index");
      }else if(this.user.name==="user"){
        this.$router.push("/indexCustomer");
      }
    },
    resetForm() {
      this.user.name = "";
      this.user.password = "";
    },
  },
};
</script>

<style>
body,
html {
  height: 100%;
}
.box-card {
  width: 480px;
  margin: 0%;
}
</style>