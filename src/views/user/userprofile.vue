d
<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="用户信息"></ReturnBar>
      <div class="dialog_white_body">
        <div style="align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel_ver">
            <div class="userprofile_item">
              <div class="userprofile_item_icon"></div>
              <div class="userprofile_item_name">
                <div>用户a</div>
                <div class="userprofile_item_text">
                  <div>性别:男</div>
                  <div>生日:已末年 五⽉初七 ⽺ 甲寅時</div>
                  <div>1979年6⽉1⽇</div>
                  <div>关系:本人</div>
                </div>
                <div class="userprofile_hrefs">
                  <div class="userprofile_item_href" @click="onClickEdit">修改</div>
                </div>
              </div>
            </div>
            <div class="userprofile_item">
              <div class="userprofile_item_icon"></div>
              <div class="userprofile_item_name">
                <div>用户b</div>
                <div class="userprofile_item_text">
                  <div>性别:女</div>
                  <div>生日:已末年 五⽉初七 ⽺ 甲寅時</div>
                  <div>1979年6⽉1⽇</div>
                  <div>关系:配偶</div>
                </div>
                <div class="userprofile_hrefs">
                  <div class="userprofile_item_href" @click="onClickEdit">修改</div>
                  <div class="userprofile_item_href" style="margin-left: 10px">|</div>
                  <div class="userprofile_item_href" style="margin-left: 10px" @click="onClickDelete">删除</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDialog v-if="modalDlgShow" :content="modalDlgText" :submitenabled="true" @on-canceled="onModalDlgCanceled" @on-submitted="onModalDlgSubmitted"></ModalDialog>
      <ModalToast v-if="modalToastShow" content="删除成功" @on-time="onModalToastTime"></ModalToast>
    </div>
  </div>
</template>
<style>
.userprofile_hrefs {
  display: flex;
  flex-direction: row;
}

.userprofile_item {
  background: #f9f7f3;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: 5%;
  margin-bottom: 15px;
}

.userprofile_item_name {
  font-size: 18px;
  color: #2a2a2a;
  display: flex;
  flex-direction: column;
  margin: 20px;
  flex: auto;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: 400;
}

.userprofile_item_text {
  font-size: 13px;
  color: #666666;
  line-height: 20px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.userprofile_item_num {
  font-size: 18px;
  color: #2a2a2a;
  text-align: right;
  margin-right: 20px;
  flex: auto;
  justify-content: right;
  align-items: center;
  display: flex;
}

.userprofile_item_icon {
  margin-top: 12px;
  width: 48px;
  height: 48px;
}

.userprofile_item_href {
  margin-top: 12px;
  font-size: 13px;
  color: #bda06f;
  cursor: pointer;
}
</style>
<script>
import ModalDialog from '../../components/ModalDialog'
import ModalToast from '../../components/ModalToast'
import ReturnBar from '../../components/ReturnBar'
export default {
  name: 'UserProfile',
  components: { ModalDialog, ModalToast, ReturnBar },
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
      modalDlgShow: false,
      modalDlgText: '',
      modalToastShow: false
    }
  },
  created() {},
  methods: {
    onClickEdit(e) {
      this.jumpTo('/edituserprofile', undefined)
    },
    onClickDelete(e) {
      this.modalDlgText = '确认要删除xxx吗?'
      this.modalDlgShow = true
    },
    onModalToastTime(e) {
      this.modalToastShow = false
    },
    onModalDlgSubmitted(e) {
      this.modalDlgShow = false
      this.modalToastShow = true
    },
    onModalDlgCanceled(e) {
      this.modalDlgShow = false
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
