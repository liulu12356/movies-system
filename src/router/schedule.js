import ScheduleMovieList from '../components/Schedule/Schedule_MovieList.vue'
import ScheduleMovie from '../components/Schedule/Schedule_Movie.vue'

const schedules=[
    { name: "schedule-movieList", path: "/scheduleMovieList", component: ScheduleMovieList },
    { name: "schedule-movie", path: "/scheduleMovie", component: ScheduleMovie },
]

export default schedules;