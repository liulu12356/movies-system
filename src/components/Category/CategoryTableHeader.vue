<template>
  <el-row>
    <el-col :span="2">
      <el-button type="success" @click="handleSave()">新增</el-button>
    </el-col>
    <el-col :span="8">
      <el-input
        placeholder="根据类别名称搜索"
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
  name: "category-table-header",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleSave() {
      this.$router.push("/categoryForm");
    },
    searchByKeyword() {
      this.$bus.$emit("searchByKeyword", this.search);
    },
  },
};
</script>

<style>
</style>