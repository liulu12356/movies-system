<template>
  <div>
    <el-table :data="movieList" style="width: 100%">
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column label="档期">
        <template slot-scope="scope"
          ><el-button
            v-for="schedule in scope.row.scheduleList"
            :key="schedule.id"
            :type="changeType(schedule.status)"
            :disabled="isdisable(schedule.status)"
            @click="toTicket(schedule)"
          >
            档期{{ schedule.id }}</el-button
          ></template
        ></el-table-column
      >
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

    <!-- 弹窗 -->
    <el-dialog title="新增档期" :visible.sync="dialogFormVisible" width="20%">
      <el-form :model="schedule">
        <el-form-item label="档期编号" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-input
              v-model="schedule.id"
              disabled
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="schedule.start"
            type="datetime"
            disabled
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="schedule.end"
            type="datetime"
            disabled
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ticketSave()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ticket-schedule-list",
  data() {
    return {
      movieList: [],
      current: 1,
      size: 10,
      total: 0,
      schedule: {},
      dialogFormVisible: false,
      formLabelWidth: "80px",
    };
  },
  mounted() {
    this.findMovieGear();
  },
  methods: {
    findMovieGear() {
      axios
        .get("http://localhost:8080/ticket/page", {
          params: {
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          console.log(res);
          this.movieList = res.data.records;
          this.total = res.data.total;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.findMovieGear();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.findMovieGear();
    },
    changeType(status) {
      if (status) {
        return "info";
      } else {
        return "success";
      }
    },
    isdisable(status) {
      if (status) {
        return true;
      } else {
        return false;
      }
    },
    toTicket(schedule) {
      this.schedule = schedule;
      this.dialogFormVisible = true;
    },
    ticketSave() {
      axios
        .put("http://localhost:8080/ticket", this.schedule)
        .then((res) => {
          this.dialogFormVisible = false;
          this.findMovieGear();
          this.$notify({
            title: "成功",
            message: "放票成功",
            type: "success",
            duration: 1500,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style>
</style>