<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="选项"></ReturnBar>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel" style="flex-direction: column">
            <div class="menu_panel">
              <div class="menu_bar">
                <div class="menu_bar_pointer"><i class="el-icon-arrow-right"></i></div>
                <div class="menu_bar_text" @click="jumpTo('/fortunehistory', undefined)">我的测算</div>
              </div>
              <div class="menu_bar">
                <div class="menu_bar_pointer"><i class="el-icon-arrow-right"></i></div>
                <div class="menu_bar_text" @click="jumpTo('/notification', undefined)">通知开关</div>
              </div>
              <div class="menu_bar_bottom">
                <div class="menu_bar_pointer"><i class="el-icon-arrow-right"></i></div>
                <div class="menu_bar_text" @click="jumpTo('/verifyemail', undefined)">邮箱验证</div>
              </div>
            </div>
            <div class="menu_panel">
              <div class="menu_bar">
                <div class="menu_bar_pointer"><i class="el-icon-arrow-right"></i></div>
                <div class="menu_bar_text">帮助</div>
              </div>
              <div class="menu_bar_bottom">
                <div class="more_item_pointer"><i class="el-icon-arrow-right"></i></div>
                <div class="menu_bar_text">关于BitDao</div>
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
  name: 'More',
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
      }
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
