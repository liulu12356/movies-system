<template>
  <div>
    <movie-table-header
      :categoryList="categoryList"
      :findByPage="this.findByPage"
    />
    <el-table :data="movieList" style="width: 100%">
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="description" label="简介"> </el-table-column>
      <el-table-column prop="detail" label="描述"> </el-table-column>
      <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
      <el-table-column prop="modifiedTime" label="修改时间"> </el-table-column>
      <el-table-column label="操作">
        <!-- slot ： 插槽 -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block m-2" id="page" style="text-align: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <movie-dialog
      :dialogFormVisible="dialogFormVisible"
      :movie="movie"
      :categoryList="this.categoryList"
      :isUpload="isUpload"
    />
  </div>
</template>

<script>
import axios from "axios";
import MovieDialog from "./MovieDialog.vue";
import MovieTableHeader from "./MovieTableHeader.vue";

export default {
  components: { MovieDialog },
  name: "movieList",
  data() {
    return {
      movieList: [],
      current: 1,
      size: 10,
      total: 0,
      dialogFormVisible: false,
      movie: {},
      categoryList: [],
      isUpload:false
    };
  },
  components: { MovieTableHeader, MovieDialog },
  mounted() {
    this.findByPage();
    this.findCategoryList();
    this.$bus.$on("dialogCancle", this.dialogCancle);
    this.$bus.$on("toSave", this.toSave);
    this.$bus.$on("searchByKeyword", this.findByKeyword);
    this.$bus.$on("findByCategory", this.findByCategory);
    this.$bus.$on("handleUpdate", this.handleUpdate);
  },
  beforeDestroy() {
    this.$bus.$off("dialogCancle");
    this.$bus.$off("toSave");
    this.$bus.$off("searchByKeyword");
    this.$bus.$off("findByCategory");
    this.$bus.$off("handleUpdate");
  },
  methods: {
    findByPage() {
      axios
        .get("http://localhost:8080/movie/page", {
          params: {
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          this.movieList = res.data.records;
          this.total = res.data.total;
        });
    },
    findCategoryList() {
      axios
        .get("http://localhost:8080/category")
        .then((res) => {
          this.categoryList = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.findByPage();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.findByPage();
    },
    handleEdit(index, row) {
      axios
        .get(`http://localhost:8080/movie/${row.id}`)
        .then((res) => {
          this.movie = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
      // 延迟打开弹窗，使组件open()函数能接收到movie值
      setTimeout(() => {
        this.showDialog();
      }, 100);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该电影, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete(`http://localhost:8080/movie/${row.id}`).then(() => {
            this.findByPage(),
              this.$message({
                type: "success",
                message: "删除成功!",
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    findByKeyword(keyword) {
      if (keyword === "") {
        this.current = 1;
        this.findByPage();
      } else {
        axios
          .get(`http://localhost:8080/movie/findByKeyword/page/${keyword}`, {
            params: {
              current: 1,
              size: this.size,
            },
          })
          .then((res) => {
            this.movieList = res.data.records;
            this.total = res.data.total;
          });
      }
    },
    findByCategory(data, total) {
      this.movieList = data;
      this.total = total;
      // this.findByPage();
    },
    handleUpdate(data, categoryIdList, formData) {
      this.dialogFormVisible = false;
      data.categoryIdList = categoryIdList;
      console.log(data);
      if (!data.id) {
        console.log("update");
        axios.post("http://localhost:8080/movie", formData).then((res) => {
          if (res.data === "SaveOK") {
            this.findByPage();
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 1500,
            });
          }
        });
      } else {
        axios.put("http://localhost:8080/movie", data).then((res) => {
          if (res.data === "UpdateOK") {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 1500,
            });
          }
        });
      }
    },
    dialogCancle() {
      this.dialogFormVisible = false;
      this.isUpload=false;
      this.movie = {};
    },
    showDialog() {
      this.dialogFormVisible = true;
      
    },
    toSave() {
      this.isUpload=true;
      this.showDialog();
      
    },
  },
};
</script>

<style>
</style>