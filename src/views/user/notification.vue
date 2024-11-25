<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="通知开关"></ReturnBar>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel" style="flex-direction: column">
            <div class="menu_panel">
              <div class="menu_bar">
                <div class="menu_bar_pointer"><el-switch v-model="changeValue1" active-color="#bda06f" inactive-color="#b0b0b0"></el-switch></div>
                <div class="menu_bar_text">今日运势</div>
              </div>
              <div class="menu_bar">
                <div class="menu_bar_pointer"><el-switch v-model="changeValue2" active-color="#bda06f" inactive-color="#b0b0b0"></el-switch></div>
                <div class="menu_bar_text">明日运势</div>
              </div>
              <div class="menu_bar">
                <div class="menu_bar_pointer"><el-switch v-model="changeValue3" active-color="#bda06f" inactive-color="#b0b0b0"></el-switch></div>
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
      changeValue1: false,
      changeValue2: false,
      changeValue3: false,
      changeValue4: false
    }
  },
  created() {},
  methods: {
    onNumClick(item) {},
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
