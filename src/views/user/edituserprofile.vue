<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar :title="修改用户信息"></ReturnBar>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">昵称</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input v-model="nickName" style="text-align: left; width: inherit" type="text" class="input_normal" placeholder="昵称" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">性别</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <DialogSelect :data-source="rowsData" :column="2" :column-space="4" :button-width="150" :selected-items="genderSeleted" @on-select="selectingGender" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">生辰</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <el-date-picker v-model="birthDate" type="date" format="yyyy年MM月dd日" placeholder="生辰年月日" class="input_normal" style="text-align: center; margin-left: 15px; margin-right: 15px; width: inherit"></el-date-picker>
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_white_panel_child">
            <el-time-select v-model="birthTime" class="input_normal" format="HH时mm分" style="text-align: center; margin-left: 15px; margin-right: 15px; width: inherit" placeholder="生辰时分"></el-time-select>
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_white_panel_child">
            <div style="align: left; justify-self: left; margin-left: 10px; margin-right: 35px" class="dialog_text">与本人的关系</div>
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_white_panel_child" style="margin-left: 25px">
            <DialogSelect :data-source="relations" :column="3" :column-space="4" :button-width="98" :selected-items="relationSeleted" @on-select="selectingRelation" />
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_panel_child">
            <input type="button" value="保存" class="btn_brown" style="width: 100%; margin-left: 15px; margin-right: 15px" @click="onSaveClick" />
          </div>
        </div>
      </div>
    </div>
    <ModalToast v-if="modalToastShow" :content="toastContent" @on-time="modalToastShow = false"></ModalToast>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
import ReturnBar from '../../components/ReturnBar'
import ModalToast from '../../components/ModalToast'

import { getRelations, getGenders } from '../../utils/enums'
import { personCreate, personModify, getPersonInfo } from '../../api/member'
import moment from 'moment'
export default {
  name: 'EditUserProfile',
  components: { DialogSelect, ReturnBar, ModalToast },
  data() {
    return {
      listLoading: false,
      rowsData: getGenders(),
      relations: getRelations(),
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      birthDate: '',
      birthTime: '',
      nickName: '',
      token: this.$route.query.t,
      id: this.$route.query.id,
      tid: this.$route.query.tid,
      pageTitle: '修改用户信息',
      genderSeleted: [],
      relationSeleted: [],
      relationItems: [],
      genderItems: [],
      modalToastShow: false,
      toastContent: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    showToast(_content) {
      this.toastContent = _content
      this.modalToastShow = true
    },
    onSaveClick(item) {
      if (this.nickName.trim() === '') {
        this.showToast('昵称不能为空')
        return
      }
      if (this.genderItems.length === 0) {
        this.showToast('必须选择性别')
        return
      }
      if (this.relationItems.length === 0) {
        this.showToast('必须选择与本人的关系')
        return
      }
      if (this.birthDate.trim() === '') {
        this.showToast('生辰年月日不能为空')
        return
      }
      if (this.birthTime.trim() === '') {
        this.showToast('生辰年时分不能为空')
        return
      }
      if (this.id === undefined) {
        personCreate(this.relationItems[0], this.nickName, this.genderItems[0], this.birthDate, this.birthTime)
          .then((ret) => {
            this.goBack()
          })
          .catch((err) => {
            console.log(err)
            this.showToast('保存失败')
          })
      } else {
        personModify(this.id, this.relationItems[0], this.nickName, this.genderItems[0], this.birthDate, this.birthTime)
          .then((ret) => {
            this.goBack()
          })
          .catch((err) => {
            console.log(err)
            this.showToast('保存失败')
          })
      }
    },
    selectingRelation(e) {
      this.relations = e
    },
    selectingGender(e) {
      this.genderItems = e
    },

    init() {
      if (this.id === undefined || this.id === null) {
        this.pageTitle = '创建新用户'
        return
      }
      getPersonInfo(this.id)
        .then((result) => {
          this.genderSeleted = [result.gender]
          this.relationSeleted = [result.type]
          var _birthDay = moment(result.solar_time)
          this.birthDate = _birthDay.format('yyyy-MM-dd')
          this.birthTime = _birthDay.format('HH:mm')
          this.nickName = result.nickName
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
