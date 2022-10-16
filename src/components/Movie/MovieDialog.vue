<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogFormVisible"
    width="30%"
    center
    :before-close="dialogCancle"
    @open="showCategory()"
  >
    <el-form :model="movie">
      <el-form-item label="电影标题" :label-width="formLabelWidth">
        <el-input v-model="movie.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电影简介" :label-width="formLabelWidth">
        <el-input v-model="movie.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电影描述" :label-width="formLabelWidth">
        <el-input
          v-model="movie.detail"
          autocomplete="off"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="类别" :label-width="formLabelWidth"
        ><el-select v-model="categoryIdList" multiple placeholder="请选择类别">
          <el-option
            v-for="category in categoryList"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          >
          </el-option> </el-select
      ></el-form-item>

      <el-form-item
        label="电影图片"
        :label-width="formLabelWidth"
        v-show="isUpload"
      >
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:8080/movie/uploadPic"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :limit="1"
          :on-change="handChange"
          :file-list="fileList"
          list-type="picture"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCancle()">取 消</el-button>
      <el-button type="primary" @click="handleUpdate()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "movie-dialog",
  props: ["dialogFormVisible", "movie", "categoryList", "isUpload"],
  data() {
    return {
      formLabelWidth: "80px",
      dialogTitle: "更新",
      categoryIdList: [],
      file: {},
      fileList: [],
    };
  },
  mounted() {},
  methods: {
    dialogCancle() {
      this.$bus.$emit("dialogCancle");
      this.categoryIdList = [];
    },
    handleUpdate() {
      let formData = new FormData();
      formData.append("uploadPic", this.file.raw);
      formData.append("title", this.movie.title);
      formData.append("description", this.movie.description);
      formData.append("detail", this.movie.detail);
      formData.append("state", 1);
      formData.append("categoryIdList", this.categoryIdList);
      this.$bus.$emit(
        "handleUpdate",
        this.movie,
        this.categoryIdList,
        formData
      );
      this.categoryIdList = [];
    },

    showCategory() {
      if (this.movie.id) {
        this.dialogTitle = "更新";
        for (const category of this.movie.categoryList) {
          this.categoryIdList.push(category.id);
        }
      } else {
        this.dialogTitle = "新增";
      }
    },

    handChange(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.file = file;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    movieInfo() {
      return {};
    },
  },
};
</script>

<style>
</style>