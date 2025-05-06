<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="卜卦问事" :show-back="from !== undefined && from !== ''"></ReturnBar>
      <el-main class="dialog_white_body">
        <div style="margin: 15px; text-align: center; justify-content: center; justify-items: center">
          <div style="text-align: left; justify-self: center; margin-left: 15px;text-indent: 2em;line-height: 1.8;" class="dialog_text">小六壬是中国传统占卜术中极具特色的一种预测方法，相传源于三国时期诸葛亮的"马前课"，常用于日常决策的快速占断。</div>
          <div style="text-align: left; justify-self: center; margin-top: 10px;margin-left: 15px;text-indent: 2em;line-height: 1.8;" class="dialog_text">请输入想问的事情，请使用‘确定’或者‘否定’的语句，而不是问‘是不是’、‘能不能’、‘会不会’、‘行不行’，这样选择性的话题。</div>

          <div style="text-align: left; justify-self: left; margin-top: 10px;margin-left: 15px;line-height: 1.8;" class="dialog_text">✅ 我明天出门需要带伞吗？</div>
          <div style="text-align: left; justify-self: left; margin-left: 15px;line-height: 1.8;" class="dialog_text">❌ 我明天出门要不要带伞？</div>

          <div class="dialog_white_panel" style="margin-top: 5px;">
            <div class="dialog_white_panel_child">
              <input v-model="selectedValue" style="text-align: justify; height: 50px; line-height: 32px; padding: 0 8px; width: inherit" type="text" class="input_normal" placeholder="请输入您想问的事情" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input type="button" value=" 起卦 " class="btn_brown" style="width: 100%" @click="onClickXiao6Ren" />
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
import { postXiao6Ren } from '../../api/fortune'
import { setToken } from '../../utils/auth'
import { getPersonList } from '../../api/member'
import ReturnBar from '../../components/ReturnBar'
import ModalToast from '../../components/ModalToast'

export default {
  name: 'Xiao6Ren',
  components: { ReturnBar, ModalToast },
  data() {
    return {
      listLoading: false,
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
    onClickXiao6Ren(e) {
      postXiao6Ren(this.selectedValue)
        .then((result) => {
          window.Telegram.WebApp.close()
        })
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
