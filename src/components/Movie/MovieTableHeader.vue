<template>
  <el-row class="m-2">
    <el-col :span="2">
      <el-button type="success" @click="handleSave()">新增</el-button>
    </el-col>
    <el-col :span="6">
      <el-select
        v-model="categoryIdList"
        multiple
        placeholder="请选择类别"
        @change="findMovieByCategory()"
      >
        <el-option
          v-for="category in categoryList"
          :key="category.id"
          :label="category.name"
          :value="category.id"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-input
        placeholder="根据电影名称搜索"
        v-model="search"
        @change="searchByKeyword()"
      />
    </el-col>
    <el-col :span="2"
      ><el-button type="success" @click="searchByKeyword()" class="mx-4"
        >搜索</el-button
      ></el-col
    >
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  name: "movie-table-header",
  props: ["categoryList", "findByPage"],
  data() {
    return {
      search: "",
      categoryIdList: [],
      current: 1,
      size: 10,
    };
  },
  methods: {
    handleSave() {
      this.$bus.$emit("toSave");
      
    },
    searchByKeyword() {
      this.$bus.$emit("searchByKeyword", this.search);
    },
    findMovieByCategory() {
      if (this.categoryIdList.length === 0) {
        this.findByPage();
      } else {
        axios
          .get(
            `http://localhost:8080/movie/findByCategory/page/${this.categoryIdList}`,
            {
              params: {
                current: this.current,
                size: this.size,
              },
            }
          )
          .then((res) => {
            this.$bus.$emit("findByCategory", res.data.records, res.data.total);
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