<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="用户信息"></ReturnBar>
      <div class="dialog_white_body">
        <div style="align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel_ver">
            <div v-for="item in list" :key="item" class="userprofile_item">
              <div class="userprofile_item_icon"></div>
              <div class="userprofile_item_name">
                <div>{{ item.nickname }}</div>
                <div class="userprofile_item_text">
                  <div>性别:{{ getGender(item.gender) }}</div>
                  <div>生日:{{ item.bazi_y }}年 {{ item.bazi_m }} {{ item.bazi_d }} {{ item.bazi_h }}</div>
                  <div>{{ item.lunar_time }}</div>
                  <div>关系:{{ getRelation(item.type) }}</div>
                </div>
                <div class="userprofile_hrefs">
                  <div class="userprofile_item_href" @click="onClickEdit(item.id)">修改</div>
                  <div v-if="item.type !== 'self'" class="userprofile_item_href" style="margin-left: 10px">|</div>
                  <div v-if="item.type !== 'self'" class="userprofile_item_href" style="margin-left: 10px" @click="onClickDelete(item.id)">删除</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog_white_panel">
        <div class="dialog_panel_child">
          <input type="button" value="新增用户" class="btn_brown" style="width: 100%" @click="jumpTo('/edituserprofile', undefined)" />
        </div>
      </div>
      <ModalDialog v-if="modalDlgShow" :content="modalDlgText" :submitenabled="true" @on-canceled="onModalDlgCanceled" @on-submitted="onModalDlgSubmitted"></ModalDialog>
      <ModalToast v-if="modalToastShow" :content="toastContent" @on-time="modalToastShow = false"></ModalToast>
    </div>
  </div>
</template>
<script>
import ModalDialog from '../../components/ModalDialog'
import ModalToast from '../../components/ModalToast'
import ReturnBar from '../../components/ReturnBar'
import { getRelation, getGender } from '../../utils/enums'
import { getPersonList, personRemove } from '../../api/member'
export default {
  name: 'UserProfile',
  components: { ModalDialog, ModalToast, ReturnBar },
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      modalDlgShow: false,
      modalDlgText: '',
      modalToastShow: false,
      deleteId: 0,
      toastContent: '删除成功',
      token: this.$route.query.t,
      tid: this.$route.query.tid
    }
  },
  created() {
    this.init()
  },
  methods: {
    getGender,
    getRelation,
    init() {
      getPersonList()
        .then((result) => {
          this.list = result.result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onClickEdit(e) {
      this.jumpTo('/edituserprofile', { id: e })
    },
    onClickDelete(e) {
      var _info = this.list.find((t) => t.id === e)
      if (_info === undefined || _info === null) {
        return
      }
      this.deleteId = e
      this.modalDlgText = `确认要移除${_info.nickname}吗?`
      this.modalDlgShow = true
    },
    onModalDlgSubmitted(e) {
      personRemove(this.deleteId)
        .then((result) => {
          this.modalDlgShow = false
          this.init()
          this.toastContent = '移除成功'
          this.modalToastShow = true
        })
        .catch((err) => {
          console.log(err)
          this.toastContent = '移除失败!'
        })
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
