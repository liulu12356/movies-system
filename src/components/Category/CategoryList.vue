<template>
  <div>
    <category-table-header class="m-2"></category-table-header>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="name" label="类别"> </el-table-column>
      <el-table-column prop="comment" label="简介"> </el-table-column>
      <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
      <el-table-column prop="modifiedTime" label="修改时间"> </el-table-column>
      <el-table-column label="操作">
        <!-- slot ： 插槽 -->
        <template slot-scope="scope" style="text-align: center">
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
        :current-page="current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryTableHeader from "./CategoryTableHeader.vue";

export default {
  name: "CategoryList",
  data() {
    return {
      categoryList: [],
      category: {},
      current: 1,
      size: 10,
      total: 0,
    };
  },
  components: { CategoryTableHeader },
  mounted() {
    this.$bus.$on("handleUpdate", this.handleUpdate);
    this.$bus.$on("searchByKeyword", this.findByKeyword);
  },
  activated() {
    this.findByPage();
  },
  beforeDestroy() {
    this.$bus.$off("handleUpdate");
    this.$bus.$off("findByKeyword");
  },
  methods: {
    findByPage() {
      axios
        .get("http://localhost:8080/category/page", {
          params: {
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          console.log(res);
          this.categoryList = res.data.records;
          this.total = res.data.total;
        });
    },
    findByKeyword(keyword) {
      if (keyword === "") {
        this.current = 1;
        this.findByPage();
      } else {
        axios
          .get(`http://localhost:8080/category/findByKeyword/page/${keyword}`, {
            params: {
              current: 1,
              size: this.size,
            },
          })
          .then((res) => {
            this.categoryList = res.data.records;
            this.total = res.data.total;
          });
      }
    },
    handleEdit(index, row) {
      axios
        .get(`http://localhost:8080/category/${row.id}`)
        .then((res) => {
          this.category = res.data;
          this.$router.push({ path: "categoryForm", query: this.category });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    handleUpdate(data) {
      if (!data.id) {
        axios.post("http://localhost:8080/category", data).then((res) => {
          this.$router.push("/category");
          if (res.data === "SaveOK") {
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 1500,
            });
          }
        });
      } else {
        axios.put("http://localhost:8080/category", data).then((res) => {
          this.$router.push("/category");
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
    handleDelete(index, row) {
      this.$confirm("此操作将删除该类别, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete(`http://localhost:8080/category/${row.id}`).then(() => {
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.findByPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.findByPage();
    },
  },
};
</script>

<style>
</style>