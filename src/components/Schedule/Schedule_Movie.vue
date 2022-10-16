<template>
  <div>
    <el-card class="box-card-max">
      <div slot="header" class="clearfix">
        <span>电影详情</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          icon="el-icon-back"
          @click="back()"
          ><b>返回上一页</b></el-button
        >
      </div>
      <el-row>
        <el-col :span="13">
          <el-form :model="movie">
            <el-form-item label="电影编号" :v-show="false">
              <el-col :span="8">
                <el-input v-model="movie.id" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="电影标题">
              <el-col :span="8">
                <el-input v-model="movie.title" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="电影简介">
              <el-col :span="8">
                <el-input v-model="movie.detail" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="电影描述">
              <el-col :span="8">
                <el-input
                  v-model="movie.detail"
                  autocomplete="off"
                  type="textarea"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-col :span="8">
                <el-input
                  v-model="movie.createdTime"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-col :span="8">
                <el-input
                  v-model="movie.modifiedTime"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <img :src="movie.path" class="img-thumbnail" id="showPic" />
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card-max mt-4">
      <div slot="header" class="clearfix">
        <el-button style="float: left" type="success" @click="toSaveSchedule()"
          >新增档期</el-button
        >
        <el-button
          style="float: right"
          type="danger"
          size="mini"
          @click="gearFinish()"
          >排挡完毕</el-button
        >
      </div>
      <el-table :data="scheduleList" style="width: 100%">
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="start" label="开始时间"> </el-table-column>
        <el-table-column prop="end" label="结束时间"> </el-table-column>
        <el-table-column label="操作">
          <!-- slot ： 插槽 -->
          <template slot-scope="scope" style="text-align: left">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="新增档期" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="schedule">
        <el-form-item label="电影编号" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-input v-model="movie.id" disabled autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电影名称" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-input
              v-model="movie.title"
              disabled
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="schedule.start"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="schedule.end"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="scheduleSave()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "schedule-movie",
  data() {
    return {
      movie: {},
      scheduleList: [],
      schedule: {},
      dialogFormVisible: false,
      formLabelWidth: "80px",
    };
  },
  mounted() {
    this.movie = this.$route.query;
    this.schedule.movieId = this.movie.id;
    this.findScheduleList();
  },
  methods: {
    findScheduleList() {
      axios
        .get(`http://localhost:8080/schedule/${this.movie.id}`)
        .then((res) => {
          this.scheduleList = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    back() {
      this.$router.go(-1);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该档期, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete(`http://localhost:8080/schedule/${row.id}`).then(() => {
            this.findScheduleList(),
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
    toSaveSchedule() {
      // this.schedule.start="";
      // this.schedule.end="";
      this.dialogFormVisible = true;
      
    },

    scheduleSave() {
      this.schedule.start = this.dayjs(this.schedule.start).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.schedule.end = this.dayjs(this.schedule.end).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(this.schedule);
      axios
        .post("http://localhost:8080/schedule", this.schedule)
        .then((res) => {
          if (res.data === "SaveOK") {
            this.dialogFormVisible = false;
            this.findScheduleList();
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 1500,
            });
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    gearFinish() {
      this.$confirm("请确认排期是否完毕, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .get(`http://localhost:8080/movie/updateStatus/${this.movie.id}`)
            .then((res) => {
                this.$router.push("/scheduleMovieList");
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
   
    
    
  },
};
</script>

<style>
</style>