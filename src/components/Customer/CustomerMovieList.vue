<template>
  <el-row>
    <el-col :span="4" v-for="movie in movieList" :key="movie.id" class="m-4">
      <el-card
        :body-style="{ padding: '0px' }"
        style="width: 100%"
        class="el-card"
      >
        <div class="box">
          <img :src="movie.path" class="image" />
          <div style="padding: 10px">
            <h4>{{ movie.title }}</h4>
            <p>描述：{{ movie.description }}</p>
            <el-input
              type="textarea"
              v-model="movie.detail"
              :readonly="true"
            ></el-input>
            <div class="bottom clearfix">
              <el-button
                type="success"
                class="m-2"
                style="float: right"
                @click="toBuyTicket(movie.id)"
                >购票</el-button
              >
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  name: "customer-movie-list",
  data() {
    return {
      movieList: [],
      movie:{},
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/customerMovie")
      .then((res) => {
        this.movieList = res.data;
      })
      .catch((e) => {
        console.error(e);
      });
  },
  methods:{
    toBuyTicket(movieId){
        console.log(movieId);
        axios.get(`http://localhost:8080/movie/${movieId}`).then(res=>{
            this.movie=res.data;
            this.$router.push({path:"/customerMovie",query:this.movie});
        }).catch(e=>{
            console.error(e);
        })
        
    }
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 150px;
  display: block;
}

.el-card {
  height: 400px;
}
</style>