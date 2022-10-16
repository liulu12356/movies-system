<template>
  <el-form ref="form" :model="category" label-width="80px">
    <el-form-item label="类别名称">
      <el-col :span="12">
        <el-input v-model="category.name"></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="类别简介">
      <el-col :span="12">
        <el-input v-model="category.comment"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="backup()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "category-from",
  data() {
    return {
      category: { state: 1 },
    };
  },
  mounted() {
  
    this.category = this.$route.query;
    this.category.state = 1;
    
  },
  methods: {
    onSubmit() {
      this.$bus.$emit("handleUpdate", this.category);
    },
    backup() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>