<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="吉日推算" :show-back="from !== undefined && from !== ''"></ReturnBar>
      <el-main class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div style="align: left; justify-self: left; margin-left: 15px" class="dialog_text">事项</div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <DialogSelect :data-source="rowsData" :selected-items="selectedItems" :column="3" :column-space="4" :button-width="96" :multi-select="false" @on-select="onChoice" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="flex: 1; text-align: justify" class="dialog_text">开始日期</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <el-date-picker v-model="seletedDate" type="date" format="yyyy年MM月dd日" placeholder="选择开始日期" class="input_normal" style="text-align: center; width: inherit"></el-date-picker>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">会给出开始⽇期3个⽉内的吉⽇</div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input type="button" value="推算" class="btn_brown" style="width: 100%" @click="onClickPredict" />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
import ReturnBar from '../../components/ReturnBar'
export default {
  name: 'GoodDay',
  components: { DialogSelect, ReturnBar },
  data() {
    return {
      listLoading: false,
      rowsData: [
        { id: 1, text: '结婚' },
        { id: 2, text: '搬家' },
        { id: 3, text: '开业' },
        { id: 4, text: '动土' },
        { id: 5, text: '交易' },
        { id: 6, text: '旅行' },
        { id: 7, text: '祭祀' },
        { id: 8, text: '安葬' }
      ],
      selectedItems: [],
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
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
