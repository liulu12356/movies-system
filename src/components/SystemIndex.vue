<template>
  <el-container>
    <AsideMenu style="width: 10%" />
    <el-container>
      <el-header
        ><nav class="navbar">
          <div class="container-fluid">
            <a class="navbar-brand" style="color: rgb(33, 21, 207)"
              ><b>艾昆国际影院</b></a
            >
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </el-header>
      <el-main
        ><keep-alive
          :include="['category - form', 'CategoryList', ]"
          ><router-view></router-view></keep-alive
      ></el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from "./AsideMenu.vue";

export default {
  name: "system-index",
  components: {
    AsideMenu,
  },
};
</script>

<style>
body,
html {
  height: 100%;
}
body > .el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #f8f9fa;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #f8f9fa;
  color: rgb(33, 21, 207);
  text-align: center;
}

.el-main {
  background-color: #dee2e6;
  color: #333;
}
</style>
