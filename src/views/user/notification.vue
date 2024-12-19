<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="通知开关"></ReturnBar>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel" style="flex-direction: column">
            <div class="menu_panel">
              <div class="menu_bar">
                <div class="menu_bar_pointer"><el-switch v-model="changeValue0" active-color="#bda06f" inactive-color="#b0b0b0" @change="onClickOption('option_today_fortune')"></el-switch></div>
                <div class="menu_bar_text">今日运势</div>
              </div>
              <div class="menu_bar">
                <div class="menu_bar_pointer"><el-switch v-model="changeValue1" active-color="#bda06f" inactive-color="#b0b0b0" @change="onClickOption('option_tomorrow_fortune')"></el-switch></div>
                <div class="menu_bar_text">明日运势</div>
              </div>
              <div class="menu_bar">
                <div class="menu_bar_pointer"><el-switch v-model="changeValue2" active-color="#bda06f" inactive-color="#b0b0b0" @change="onClickOption('option_notify_push')"></el-switch></div>
                <div class="menu_bar_text">事件推送</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReturnBar from '../../components/ReturnBar'
import { getOptionState, optionChange } from '../../api/options'
export default {
  name: 'Notification',
  components: { ReturnBar },
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
      changeValue0: false,
      changeValue1: false,
      changeValue2: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getOptionState()
        .then((result) => {
          var _value = result.result
          this.changeValue0 = _value.today_fortune !== undefined && _value.today_fortune === true
          this.changeValue1 = _value.tomorrow_fortune !== undefined && _value.tomorrow_fortune === true
          this.changeValue2 = _value.notify_push !== undefined && _value.notify_push === true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onClickOption(e) {
      console.log(e)
      optionChange(e)
        .then((result) => {})
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
