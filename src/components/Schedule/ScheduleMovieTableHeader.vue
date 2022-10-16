<template>
  <el-row>
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
export default {
  name: "schedule-movie-table-header",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchByKeyword() {
      this.$bus.$emit("searchByKeyword", this.search);
    },
  },
};
</script>

<style>
</style>