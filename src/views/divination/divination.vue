<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="卜卦问事" :show-back="from !== undefined && from !== ''"></ReturnBar>
      <el-main class="dialog_white_body">
        <div style="margin: 15px; text-align: center; justify-content: center; justify-items: center">
          <div style="text-align: center; justify-self: center; margin-left: 15px" class="dialog_text">请输入事项或选择快捷选项</div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="flex: 1; text-align: justify" class="dialog_text">输入事项</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input v-model="selectedValue" style="text-align: justify; width: inherit" type="text" class="input_normal" placeholder="请输入事项" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <DialogSelect :data-source="rowsData" :selected-items="selectedItems" :column="3" :column-space="4" :button-width="0" :multi-select="false" @on-select="onClickSelect" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input type="button" value="起卦" class="btn_brown" style="width: 100%" @click="onClickGetDivination" />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <ModalToast v-if="modalToastShow" :content="toastContent" @on-time="onToastTime"></ModalToast>
    <ModalToast v-if="modalToastShow2" :content="toastContent2" @on-time="onToastTime2"></ModalToast>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import DialogSelect from '../../components/DialogSelect'
import { getDivination } from '../../api/fortune'
import { setToken } from '../../utils/auth'
import ReturnBar from '../../components/ReturnBar'
import { getPersonList } from '../../api/member'
import ModalToast from '../../components/ModalToast'

export default {
  name: 'Divination',
  components: { DialogSelect, ReturnBar, ModalToast },
  data() {
    return {
      listLoading: false,
      rowsData: [
        { id: '寻物', text: '寻物' },
        { id: '姻缘', text: '姻缘' },
        { id: '合作', text: '合作' }
      ],
      selectedItems: [],
      selectedValue: '',
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      token: this.$route.query.t,
      from: this.$route.query.f,
      toastContent: '',
      modalToastShow: false,
      toastContent2: '',
      modalToastShow2: false
    }
  },
  created() {
    this.init()
  },
  methods: {
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
    init() {
      if (this.$route.query !== undefined && this.$route.query.t !== undefined) {
        setToken(this.$route.query.t)
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
    onClickGetDivination(e) {
      getDivination(this.selectedValue)
        .then((result) => {
          window.Telegram.WebApp.close()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onClickSelect(items) {
      this.selectedItems = items
      this.selectedValue = items[0]
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
