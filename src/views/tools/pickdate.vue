<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="吉日推算" :show-back="from !== undefined && from !== ''"></ReturnBar>
      <el-main class="dialog_white_body">
        <div style="margin: 15px; text-align: center; justify-content: center; justify-items: center">
          <div style="text-align: left; justify-self: center; margin-left: 15px;text-indent: 2em;line-height: 1.8;" class="dialog_text">择吉是通过分析时间、五行、神煞及个人八字，选择适宜行事的日子。核心是避凶趋吉：避开生肖相冲、凶煞当值之日，优先五行相生、吉神护佑的时辰（如结婚选五行合日）。</div>
          <div style="text-align: left; justify-self: center; margin-top: 10px;margin-left: 15px;text-indent: 2em;line-height: 1.8;" class="dialog_text">请告诉我您想选择日期的具体事情，我会根据您的需求，给您寻找3个月内最合适的日子。</div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="flex: 1; text-align: justify" class="dialog_text">您准备要去做的事情：</div>
            </div>
          </div>
          <div class="dialog_white_panel" style="margin-top: 5px;">
            <div class="dialog_white_panel_child">
              <input v-model="selectedValue" style="text-align: justify; height: 46px; line-height: 46px; padding: 0 8px; width: inherit" type="text" class="input_normal" placeholder="请输入您想办的事情" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="flex: 1; text-align: justify; " class="dialog_text">开始从哪个日期开始推算：</div>
            </div>
          </div>
          <div class="dialog_white_panel" style="margin-top: 5px;">
            <div class="dialog_white_panel_child">
              <el-date-picker v-model="seletedDate" type="date" format="yyyy年MM月dd日" placeholder="选择开始日期" class="input_normal" style="text-align: center; width: inherit;"></el-date-picker>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input type="button" value="开始推算" class="btn_brown" style="width: 100%" @click="onClickPredict" />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import ReturnBar from '../../components/ReturnBar'
export default {
  name: 'PickDate',
  components: { ReturnBar },
  data() {
    return {
      token: this.$route.query.t,
      from: this.$route.query.f,
      seletedDate: ''
    }
  },
  created() {},
  methods: {
    onChoice(e) {},
    onClickPredict(e) {
      window.Telegram.WebApp.close()
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
