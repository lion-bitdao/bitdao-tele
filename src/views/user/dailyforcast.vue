<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="每日运势"></ReturnBar>
      <el-main class="dialog_white_body" style="margin-top: 5px; overflow-x: scroll">
        <div style="font-size: 32px; color: #2a2a2a; letter-spacing: 0; line-height: 32px; text-align: left; margin-left: 20px">每日运势</div>
        <div class="cnlunar">
          <CnLunar :times="lunarTimes" :day="lunarDay" :date="date" :cnyear="cnyear" :cnmonth="cnmonth" :cnday="cnday" :good="good" :bad="bad"></CnLunar>
        </div>
        <div v-if="false" style="font-size: 24px; color: #bda06f; text-align: left; margin-top: 30px; margin-left: 20px">我的运势</div>
        <div v-if="false" style="font-size: 15px; line-height: 30px; text-align: left; margin-left: 20px">在线排盘，采用最精确的排盘程序，包括八字排盘、六爻排盘、梅花易数排盘、紫微斗数排盘等。对於普通易经爱好者而言，最不容易理解的什么是「真太阳时」</div>
      </el-main>
    </el-container>
  </div>
</template>
<style>
.cnlunar {
  display: flex;
  margin-top: 25px;
  align-content: center;
  justify-content: center;
  justify-items: center;
  width: 100%;
}
</style>
<script>
import ReturnBar from '../../components/ReturnBar'
import CnLunar from '../../components/CnLunar'
import { getDailyForcast } from '../../api/fortune'
import { getChineseTime } from '../../utils/chineselunar'
export default {
  name: 'DailyForcast',
  components: { ReturnBar, CnLunar },
  data() {
    return {
      listLoading: false,
      rowsData: [
        { id: 1, text: '男' },
        { id: 2, text: '女' }
      ],
      relations: [
        { id: 1, text: '父母' },
        { id: 2, text: '子女' },
        { id: 3, text: '配偶' },
        { id: 4, text: '朋友' },
        { id: 5, text: '搭档' },
        { id: 6, text: '对手' }
      ],
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      value1: '',
      value2: '',
      lunarDay: '',
      date: '',
      cnyear: '',
      cnmonth: '',
      cnday: '',
      good: '',
      bad: '',
      lunarTimes: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      var _date = new Date()
      getDailyForcast()
        .then((result) => {
          var _result = result.result
          var _currentHour = getChineseTime(_date.getHours(), _date.getMinutes())
          this.lunarDay = _result.luanr
          this.date = _result.solar
          this.cnyear = _result.ganzhi[0] + '年'
          this.cnmonth = _result.ganzhi[1] + '月'
          this.cnday = _result.ganzhi[2] + '日'
          this.good = _result.yi.join(' ')
          this.bad = _result.ji.join(' ')
          var times = []
          for (var i = 0; i < _result.hour.length; i++) {
            times.push({ text: _result.hour[i][0] + '时', good: _result.hour[i][2] === '吉', selected: i === _currentHour })
          }
          this.lunarTimes = times
        })
        .catch((err) => {
          console.log(err)
        })
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
