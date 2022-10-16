<template>
  <div>
    <schedule-movie-table-header class="m-2" />
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
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="success"
            >加档</el-button
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
  </div>
</template>

<script>
import axios from "axios";
import ScheduleMovieTableHeader from "./ScheduleMovieTableHeader.vue";
export default {
  name: "schedule-movielist",
  data() {
    return {
      movieList: [],
      current: 1,
      size: 10,
      total: 0,
      dialogFormVisible: false,
      movie: {},
    };
  },
  components: { ScheduleMovieTableHeader },
  mounted() {
    this.findByPage();
    this.$bus.$on("searchByKeyword", this.searchByKeyword);
  },
  beforeDestroy() {
    this.$bus.$off("searchByKeyword");
  },

  methods: {
    findByPage() {
      axios
        .get("http://localhost:8080/movie/noGear/page", {
          params: {
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          console.log(res);
          this.movieList = res.data.records;
          this.total = res.data.total;
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
          this.$router.push({ path: "/scheduleMovie", query: this.movie });
        })
        .catch((e) => {
          console.error(e);
        });
    },

    searchByKeyword(keyword) {
      if (keyword === "") {
        this.current = 1;
        this.findByPage();
      } else {
        axios
          .get(`http://localhost:8080/movie/findByTitle/noGear/${keyword}`, {
            params: { current: this.current, size: this.size },
          })
          .then((res) => {
            console.log("res", res);
            this.movieList = res.data.records;
            this.total = res.data.total;
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },
  },
};
</script>

<style>
</style>