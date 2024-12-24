<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="升级vip" :show-back="from !== undefined && from !== ''"></ReturnBar>
      <el-main v-if="loaded" class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: center; justify-self: center; align-content: center; width: 100%" class="dialog_text">{{ content }}</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_panel_child">
              <input v-if="showButton" type="button" value="升级成为VIP" class="btn_brown" style="width: 100%" @click="onActiveVIP" />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <ModalToast v-if="modalToastShow" :content="toastContent" @on-time="modalToastShow = false"></ModalToast>
  </div>
</template>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
<script>
import moment from 'moment'
import ReturnBar from '../../components/ReturnBar'
import ModalToast from '../../components/ModalToast'
import { ActiveTrailVIP, getMemberInfo } from '../../api/member'
import { setToken } from '../../utils/auth'
export default {
  name: 'VIP',
  components: { ReturnBar, ModalToast },
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
      token: this.$route.query.t,
      from: this.$route.query.f,
      content: '测试期间免费获得1周VIP',
      showButton: true,
      modalToastShow: false,
      toastContent: '',
      currentEmail: '',
      loaded: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query !== undefined && this.$route.query.t !== undefined) {
        setToken(this.$route.query.t)
        this.loaded = false
        getMemberInfo()
          .then((result) => {
            if (result.result.vip.toString() !== '0') {
              this.content = '您已是VIP,无需领取'
              this.showButton = false
              this.loaded = true
              return
            }
            var _vipTime = moment(result.result.vip_expire_at.toString()).format('yyyy')
            if (_vipTime !== '1900') {
              this.content = '已领取过试用vip,无法领取'
              this.showButton = false
              this.loaded = true
              return
            }
            this.loaded = true
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    showToast(_content) {
      this.toastContent = _content
      this.modalToastShow = true
    },
    onActiveVIP(item) {
      ActiveTrailVIP()
        .then((ret) => {
          this.showToast('测试VIP领取成功')
          this.content = '您已是VIP,无需领取'
          this.showButton = false
        })
        .catch((e) => {
          this.showToast('领取失败,可能已领取过测试VIP或者已经是VIP')
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
