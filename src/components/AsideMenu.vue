<template>
  <el-aside width="200px"
    ><el-row class="tac">
      <div style="text-align=center">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <h3>刘某</h3>
      </div>
      <el-col :span="24">
        <el-menu
          :router="true"
          default-active="/category"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/category">
            <i class="el-icon-menu"></i>
            <span slot="title">类别基本信息管理</span>
          </el-menu-item>
          <el-menu-item index="/movie">
            <i class="el-icon-document"></i>
            <span slot="title">电影基本信息管理</span>
          </el-menu-item>
          <el-menu-item index="/scheduleMovieList">
            <i class="el-icon-setting"></i>
            <span slot="title">档期基本信息管理</span>
          </el-menu-item>
          <el-menu-item index="/ticketScheduleList">
            <i class="el-icon-s-ticket"></i>
            <span slot="title">排挡电脑放票管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  name: "AsideMenu",
};
</script>

<style>
</style>