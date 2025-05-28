<style>
.cnlunar {
  display: flex;
  margin-top: 25px;
  align-content: center;
  justify-content: center;
  justify-items: center;
  width: 100%;
}
.lunar_body {
  border-style: solid;
  border-width: thin;
  border-color: black;
  display: flex;
  flex-direction: column;
  width: 330px;
  height: auto;
}

.lunar_date_parent {
  justify-self: flex-start;
  justify-content: flex-start;
  justify-items: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  align-self: flex-start;
  text-align: left;
}
.lunar_date_row {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  justify-items: flex-end;
  justify-self: flex-end;
  width: 315px;
  margin: 10px;
}
.lunar_date {
  display: flex;
  flex-direction: column;
  flex: auto;
  width: fit-content;
}
.lunar_date_day {
  font-size: 24px;
  letter-spacing: 0;
  line-height: 24px;
}
.lunar_date_date {
  font-size: 18px;
  color: #2a2a2a;
  letter-spacing: 0;
}
.lunar_date_year {
  display: flex;
  flex-direction: row;
  width: fit-content;
}
.lunar_date_year_text {
  border-left-color: #d8d8d8;
  border-left-style: solid;
  border-left-width: thin;
  writing-mode: vertical-rl;
  width: 20px;
}
.lunar_time_text {
  border-left-color: #d8d8d8;
  border-left-style: solid;
  border-left-width: thin;
  writing-mode: vertical-rl;
  font-size: 16px;
  color: #2a2a2a;
  letter-spacing: 0;
  line-height: 20px;
  margin: 2px;
  padding-left: 1px;
}

.lunar_time {
  display: flex;
  flex-direction: column;
}
.lunar_time_icon_panel {
  width: inherit;
  display: flex;
  justify-content: center;
  justify-items: center;
}
.lunar_time_icon {
  width: 20px;
  height: 20px;
}
.lunar_time_dot {
  width: 20px;
  height: 20px;
}
</style>

<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="万年历" :show-back="from !== undefined && from !== ''"></ReturnBar>
      <el-main class="dialog_white_body" style="margin-top: 10px; overflow-x: scroll">
        <div style="font-size: 24px; color: #2a2a2a; letter-spacing: 0; line-height: 32px; text-align: left; margin-left: 20px">{{ solar }} <span style="font-size: 16px; color: #666666;">公历</span></div>
        <div class="cnlunar">
          <div class="lunar_body">
            <div class="lunar_date_row">
              <div class="lunar_date_year" style>
                <div class="lunar_date_year_text">{{ ganzhiYear }}</div>
                <div class="lunar_date_year_text">{{ ganzhiMonth }}</div>
                <div class="lunar_date_year_text">{{ ganzhiDay }}</div>
              </div>
              <div class="lunar_date_parent" style="flex: auto">
                <div class="lunar_date">
                  <div class="lunar_date_day">{{ lunarYear }} <span style="font-size: 16px; color: #666666;">农历</span></div>
                  <div class="lunar_date_date">{{ lunarMonth }} {{ lunarDay }}</div>
                  <div class="lunar_date_date">{{ jieqi }} {{ jieqidays }}</div>
                </div>
              </div>
            </div>
            <div class="lunar_date_row">
              <div class="lunar_date_parent" style="font-size: 15px">{{ good }}</div>
              <div style="font-size: 30px; margin-right: 10px" class="lunar_date_parent">宜</div>
            </div>
            <div class="lunar_date_row">
              <div class="lunar_date_parent" style="font-size: 15px">{{ bad }}</div>
              <div style="font-size: 30px; margin-right: 10px" class="lunar_date_parent">忌</div>
            </div>
            <div class="lunar_date_row">
              <div class="lunar_date_year">
                <div v-for="item in lunarTimes" :key="item.text" class="lunar_time">
                  <div class="lunar_time_text">{{ item.text }}</div>
                  <div class="lunar_time_icon_panel">
                    <div v-if="item.good" class="lunar_time_icon"><img src="../../assets/images/calendar_ji@2x.png" class="lunar_time_icon" /></div>
                    <div v-if="!item.good" class="lunar_time_icon"><img src="../../assets/images/calendar_xiong@2x.png" class="lunar_time_icon" /></div>
                  </div>
                  <div class="lunar_time_icon_panel">
                    <div v-if="item.selected" class="lunar_time_dot"><img src="../../assets/images/calendar_now@2x.png" class="lunar_time_icon" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lunar_date_row"></div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ReturnBar from '../../components/ReturnBar'
import { getCalender1 } from '../../api/fortune'
import { getChineseTime } from '../../utils/chineselunar'
import { setToken } from '../../utils/auth'
export default {
  name: 'Lunar',
  components: { ReturnBar },
  date: '',
  created() { this.init() },
  data() {
    return {
      listLoading: false,
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      date: '',
      solar: '',
      lunarYear: '',
      lunarMonth: '',
      lunarDay: '',
      ganzhiYear: '',
      ganzhiMonth: '',
      ganzhiDay: '',
      jieqi: '',
      jieqidays: '',
      lunarTimes: [],
      token: this.$route.query.t,
      from: this.$route.query.f
    }
  },
  methods: {
    init() {
      var _date = new Date()
      const year = _date.getFullYear()
      const month = String(_date.getMonth() + 1).padStart(2, '0')
      const day = String(_date.getDate()).padStart(2, '0')
      this.date = `${year}-${month}-${day}`
      
      if (this.$route.query !== undefined && this.$route.query.t !== undefined) {
        setToken(this.$route.query.t)
        getCalender1(this.date)
          .then((result) => {
            var _result = result.result
            this.solar = _result.solar[0] + '年' + _result.solar[1] + '月' + _result.solar[2] + '日'
            this.lunarYear = _result.lunar[0] + '年'
            this.lunarMonth = _result.lunar[1] + '月'
            this.lunarDay = _result.lunar[2] + ''
            this.jieqi = _result.jieqi[0]
            this.jieqidays = '第' + _result.jieqi[1] + '天'
            this.ganzhiYear = _result.ganzhi[0] + '年'
            this.ganzhiMonth = _result.ganzhi[1] + '月'
            this.ganzhiDay = _result.ganzhi[2] + '日'
            this.good = _result.yi.join(' ')
            this.bad = _result.ji.join(' ')
            var _currentHour = getChineseTime(_date.getHours(), _date.getMinutes())
            var times = []
            for (var i = 0; i < _result.hour.length; i++) {
              times.push({ text: _result.hour[i][0] + '时', good: _result.hour[i][2] === '吉', selected: i === _currentHour })
            }
            this.lunarTimes = times
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    jumpTo(_page, _query) {
      var _jumpArg = { path: _page }
      if (_query !== undefined) {
        _jumpArg.query = _query
      }
      this.$router.push(_jumpArg)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
