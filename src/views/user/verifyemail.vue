d
<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="邮箱验证"></ReturnBar>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">邮箱</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input style="text-align: left; width: inherit" type="text" class="input_normal" placeholder="请输入邮箱" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="btn_link">发送验证码到邮箱</div>
            </div>
          </div>
          <div class="dialog_white_panel" style="margin-top: 40px">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">邮件内的验证码</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input style="text-align: left; width: inherit" type="text" class="input_normal" placeholder="请输入验证码" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_panel_child">
              <input type="button" value="保存" class="btn_brown" style="width: 100%" />
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
  name: 'EditUserProfile',
  components: { ReturnBar },
  data() {
    return {
      listLoading: false,
      rowsData: [
        { id: 1, text: '男' },
        { id: 2, text: '女' }
      ],
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      value1: '',
      value2: ''
    }
  },
  created() {},
  methods: {
    onNumClick(item) {
      this.selectedNum = item.id
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
