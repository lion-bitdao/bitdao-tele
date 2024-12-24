<template>
  <div class="lunar_body">
    <div class="lunar_date_row">
      <div class="lunar_date_year">
        <div class="lunar_date_year_text">{{ cnyear }}</div>
        <div class="lunar_date_year_text">{{ cnmonth }}</div>
        <div class="lunar_date_year_text">{{ cnday }}</div>
      </div>
      <div class="lunar_date_parent" style="flex: auto">
        <div class="lunar_date">
          <div class="lunar_date_day">{{ day }}</div>
          <div class="lunar_date_date">公历{{ date }}</div>
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
        <div v-for="item in times" :key="item.text" class="lunar_time">
          <div class="lunar_time_text">{{ item.text }}</div>
          <div class="lunar_time_icon_panel">
            <div v-if="item.good" class="lunar_time_icon"><img src="../../assets/images/calendar_ji@1x.png" /></div>
            <div v-if="!item.good" class="lunar_time_icon"><img src="../../assets/images/calendar_xiong@1x.png" /></div>
          </div>
          <div class="lunar_time_icon_panel">
            <div v-if="item.selected" class="lunar_time_dot"><img src="../../assets/images/calendar_now@1x.png" /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="lunar_date_row"></div>
  </div>
</template>
<style>
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
}
.lunar_date_day {
  font-size: 36px;
  color: #d74867;
  letter-spacing: 0;
  line-height: 36px;
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
<script>
export default {
  props: {
    good: {
      type: String,
      default: ''
    },
    bad: {
      type: String,
      default: ''
    },
    times: {
      type: Array,
      default: null
    },
    day: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    cnyear: {
      type: String,
      default: ''
    },
    cnday: {
      type: String,
      default: ''
    },
    cnmonth: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
