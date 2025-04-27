<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="邮箱验证"></ReturnBar>
      <el-main class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">邮箱</div>
            </div>
          </div>
          <div v-if="emailSetted && loaded" class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div>已绑定邮箱:{{ currentEmail }}</div>
            </div>
          </div>
          <div v-if="!emailSetted && loaded" class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input v-model="email" style="text-align: left; width: inherit" type="text" class="input_normal" placeholder="请输入邮箱" />
            </div>
          </div>
          <div v-if="!emailSetted && loaded" class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="btn_link" @click="onBindEmail1Click">发送验证码到邮箱</div>
            </div>
          </div>
          <div v-if="emailSended && loaded" class="dialog_white_panel" style="margin-top: 40px">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">邮件内的验证码</div>
            </div>
          </div>
          <div v-if="emailSended && loaded" class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input v-model="code" style="text-align: left; width: inherit" type="text" class="input_normal" placeholder="请输入验证码" />
            </div>
          </div>
          <div v-if="emailSended && loaded" class="dialog_white_panel">
            <div class="dialog_panel_child">
              <input type="button" value="保存" class="btn_brown" style="width: 100%" @click="onBindEmail2Click" />
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
import ReturnBar from '../../components/ReturnBar'
import { bindEmail1, bindEmail2, getMemberInfo } from '../../api/member'
import { validateEmail } from '../../utils/validate'
import ModalToast from '../../components/ModalToast'
export default {
  name: 'EditUserProfile',
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
      email: '',
      code: '',
      emailSended: false,
      modalToastShow: false,
      toastContent: '',
      currentEmail: '',
      emailSetted: false,
      loaded: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.emailSetted = false
      getMemberInfo()
        .then((result) => {
          if (result.result.email !== '') {
            this.currentEmail = result.result.email
            this.emailSetted = this.currentEmail !== ''
          }
          this.loaded = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showToast(_content) {
      this.toastContent = _content
      this.modalToastShow = true
    },
    onBindEmail2Click(item) {
      bindEmail2(this.code, this.email)
        .then((ret) => {
          this.showToast('邮箱设置成功')
          this.emailSended = true
        })
        .catch((e) => {
          this.showToast('邮箱设置失败')
        })
    },
    onBindEmail1Click(item) {
      if (!validateEmail(this.email)) {
        this.showToast('未输入邮箱或者邮箱格式错误')
        return
      }
      bindEmail1(this.email)
        .then((ret) => {
          this.showToast('验证码发送成功')
          this.emailSended = true
        })
        .catch((e) => {
          this.showToast('验证码发送失败')
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
