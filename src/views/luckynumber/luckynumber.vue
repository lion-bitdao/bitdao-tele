<template>
  <div class="app-container">
    <div class="dialog">
      <div class="dialog_head">幸运数字</div>
      <div class="dialog_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div style="align: left; justify-self: left; margin-left: 15px" class="dialog_text">数字个数</div>
          <div class="dialog_panel">
            <div class="dialog_panel_child" style="margin-left: 5px; margin-right: 15px">
              <DialogSelect :data-source="rowsData" :column="5" :column-space="4" :button-width="55" @on-select="selectingNum" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <div style="flex: 1; text-align: justify" class="dialog_text">最小数字</div>
              <div style="margin-left: 15px; flex: 1; text-align: justify" class="dialog_text">最大数字</div>
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <input v-model="min" style="text-align: right; width: inherit" type="number" class="input_normal" placeholder="请输入" />
              <input v-model="max" style="margin-left: 15px; text-align: right; width: inherit" type="number" class="input_normal" placeholder="请输入" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <input type="button" value="测算" class="btn_brown" style="width: 100%" @click="onClickGetDate" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
import { getLuckyNumber } from '../../api/fortune'
export default {
  name: 'LuckyNumber',
  components: { DialogSelect },
  data() {
    return {
      listLoading: false,
      rowsData: [],
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      token: this.$route.query.t,
      seletedNums: [],
      min: 0,
      max: 999
    }
  },
  created() {
    this.initNums()
  },
  methods: {
    selectingNum(e) {
      this.seletedNums = e
    },
    initNums() {
      this.rowsData = []
      for (var i = 1; i <= 9; i++) {
        this.rowsData.push({ id: i, text: `${i}` })
      }
    },
    onClickGetDate(e) {
      getLuckyNumber(parseInt(this.seletedNums[0]), this.min, this.max)
        .then((result) => {})
        .catch((err) => {
          console.log(err)
        })
    },
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
