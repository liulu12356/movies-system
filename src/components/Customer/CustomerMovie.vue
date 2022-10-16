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
              @click="toBuyTicket(scope.$index, scope.row)"
              >购票</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="选座" :visible.sync="dialogFormVisible" width="30%">
      <el-checkbox-group v-model="ticketList">
        <el-row>
          <el-col
            :span="3"
            v-for="(ticket, index) in ticketList"
            :key="ticket.tid"
          >
            <el-checkbox
              :disabled="isChecked(ticket.status)"
              :label="ticket.sequenceNo"
            ></el-checkbox>
            <h1 v-show="index === 2 ? true : false">刘璐SB</h1>
          </el-col>
        </el-row>
      </el-checkbox-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="TicketSave()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "customer-movie",
  data() {
    return {
      movie: {},
      scheduleList: [],
      ticketList: [],
      dialogFormVisible: false,
      formLabelWidth: "80px",
    };
  },
  mounted() {
    this.movie = this.$route.query;
    this.findScheduleList();
  },
  // computed: {
  //   initSeat(index) {
  //     return index === 5 ? false : true;
  //   },
  // },
  methods: {
    findScheduleList() {
      axios
        .get(`http://localhost:8080/customer/schedule/${this.movie.id}`)
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

    toBuyTicket($index, row) {
      axios
        .get(`http://localhost:8080/ticket/${row.id}`)
        .then((res) => {
          this.ticketList = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
      this.dialogFormVisible = true;
    },
    ticketSave() {},
    gearFinish() {
      this.$confirm("请确认排期是否完毕, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(
          axios
            .get(`http://localhost:8080/movie/updateStatus/${this.movie.id}`)
            .then((res) => {
              this.$router.push("/scheduleMovieList");
            })
            .catch((e) => {
              console.error(e);
            })
        )
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    isChecked(status) {
      if (!status) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>