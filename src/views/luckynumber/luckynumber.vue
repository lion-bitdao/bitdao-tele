<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="幸运数字" :show-back="from !== undefined && from !== ''"></ReturnBar>
      <el-main class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div style="align: left; justify-self: left; margin-left: 15px" class="dialog_text">数字个数</div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <DialogSelect :data-source="rowsData" :column="5" :column-space="4" :button-width="0" :multi-select="false" @on-select="selectingNum" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="flex: 1; text-align: justify" class="dialog_text">最小数字</div>
              <div style="margin-left: 15px; flex: 1; text-align: justify" class="dialog_text">最大数字</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input v-model="min" style="text-align: right; width: inherit" type="number" class="input_normal" placeholder="请输入" />
              <input v-model="max" style="margin-left: 15px; text-align: right; width: inherit" type="number" class="input_normal" placeholder="请输入" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input type="button" value="测算" class="btn_brown" style="width: 100%" @click="onClickGetDate" />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <ModalToast v-if="modalToastShow" :content="toastContent" @on-time="onToastTime"></ModalToast>
    <ModalToast v-if="modalToastShow2" :content="toastContent2" @on-time="onToastTime2"></ModalToast>
    <ModalToast v-if="modalToastShow3" :content="toastContent3" @on-time="modalToastShow3 = false"></ModalToast>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
import ModalToast from '../../components/ModalToast'
import ReturnBar from '../../components/ReturnBar'
import { getLuckyNumber } from '../../api/fortune'
import { getPersonList } from '../../api/member'
import { setToken } from '../../utils/auth'

export default {
  name: 'LuckyNumber',
  components: { DialogSelect, ReturnBar, ModalToast },
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
      from: this.$route.query.f,
      seletedNums: [],
      min: 0,
      max: 999,
      toastContent: '',
      modalToastShow: false,
      toastContent2: '',
      modalToastShow2: false,
      toastContent3: '',
      modalToastShow3: false
    }
  },
  created() {
    this.initNums()
  },
  methods: {
    selectingNum(e) {
      this.seletedNums = e
    },
    onToastTime(e) {
      this.modalToastShow = false
      this.jumpTo('/userprofile', undefined)
    },
    onToastTime2(e) {
      if (this.from !== undefined && this.from !== '') {
        this.goBack()
      } else {
        window.Telegram.WebApp.close()
      }
    },
    initNums() {
      if (this.$route.query !== undefined && this.$route.query.t !== undefined) {
        setToken(this.$route.query.t)
        this.rowsData = []
        for (var i = 1; i <= 9; i++) {
          this.rowsData.push({ id: i, text: `${i}` })
        }

        getPersonList()
          .then((result) => {
            const _list = result.result
            if (_list.find((t) => t.type === 'self') === undefined) {
              this.toastContent = '请先设置个人信息再进行测算'
              this.modalToastShow = true
            }
          })
          .catch((e) => {
            this.toastContent2 = '读取数据发生错误'
            this.modalToastShow2 = true
          })
      }
    },
    onClickGetDate(e) {
      if (this.seletedNums.length === 0) {
        this.toastContent3 = '请选择数字个数'
        this.modalToastShow3 = true
        return
      }
      if (isNaN(this.min) || isNaN(this.max)) {
        this.toastContent3 = '最小数字和最大数字都必须是数字'
        this.modalToastShow3 = true
        return
      }
      if (parseInt(this.min) >= parseInt(this.max)) {
        this.toastContent3 = '最小数字不能大于或等于最大数字'
        this.modalToastShow3 = true
        return
      }
      getLuckyNumber(parseInt(this.seletedNums[0]), this.min, this.max)
        .then((result) => {
          window.Telegram.WebApp.close()
        })
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
