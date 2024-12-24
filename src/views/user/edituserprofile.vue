<template>
  <div class="app-container" style="height: 89vh">
    <el-container class="dialog_white" style="height: 89vh">
      <ReturnBar :title="pageTitle"></ReturnBar>
      <el-main class="dialog_white_body">
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
              <DialogSelect :key="reloadData" :data-source="rowsData" :column="2" :column-space="4" :button-width="150" :selected-items="genderSeleted" @on-select="selectingGender" />
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
            <el-time-select
              v-model="birthTime"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              class="input_normal"
              format="HH时mm分"
              style="text-align: center; margin-left: 15px; margin-right: 15px; width: inherit"
              placeholder="生辰时分"
            ></el-time-select>
          </div>
        </div>
        <div v-if="id === undefined || id === null" class="dialog_white_panel">
          <div class="dialog_white_panel_child">
            <div style="align: left; justify-self: left; margin-left: 10px; margin-right: 35px" class="dialog_text">与本人的关系</div>
          </div>
        </div>
        <div v-if="id === undefined || id === null" class="dialog_white_panel">
          <div class="dialog_white_panel_child" style="margin-left: 25px">
            <DialogSelect :key="reloadData" :data-source="relations" :column="3" :column-space="4" :button-width="98" :selected-items="relationSeleted" @on-select="selectingRelation" />
          </div>
        </div>
      </el-main>
      <el-footer class="dialog_white_panel" style="height: fit-content">
        <div class="dialog_panel_child">
          <input type="button" value="保存" class="btn_brown" style="width: 100%" @click="onSaveClick" />
        </div>
      </el-footer>
    </el-container>
    <ModalToast v-if="modalToastShow" :content="toastContent" @on-time="modalToastShow = false"></ModalToast>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
import ReturnBar from '../../components/ReturnBar'
import ModalToast from '../../components/ModalToast'

import { getRelations, getGenders } from '../../utils/enums'
import { personCreate, personModify, getPersonInfo, getPersonList } from '../../api/member'
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
      list: [],
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
      toastContent: '',
      reloadData: moment(new Date()).format('yyyyMMddHHmmss') + '0'
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
      var _birthDate = moment(this.birthDate).format('YYYY-MM-DD')
      if (_birthDate.trim() === '') {
        this.showToast('生辰年月日不能为空')
        return
      }
      if (this.birthTime.trim() === '') {
        this.showToast('生辰年时分不能为空')
        return
      }
      if (this.id === undefined) {
        personCreate(this.relationItems[0], this.nickName, this.genderItems[0], _birthDate, this.birthTime)
          .then((ret) => {
            this.goBack()
          })
          .catch((err) => {
            console.log(err)
            this.showToast('保存失败')
          })
      } else {
        personModify(this.id, this.nickName, this.genderItems[0], _birthDate, this.birthTime)
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
      this.relationItems = e
    },
    selectingGender(e) {
      this.genderItems = e
    },

    init() {
      var _count = moment(new Date()).format('yyyyMMddHHmmss')
      getPersonList()
        .then((result) => {
          this.list = result.result
          var _finded = this.list.find((t) => t.type === 'self')
          var _filterSelf = _finded !== undefined && _finded !== null
          var _relations = getRelations()
          if (_filterSelf) {
            _relations.splice(0, 1)
          }
          this.relations = _relations
          this.reloadData = _count
        })
        .catch((err) => {
          console.log(err)
        })
      if (this.$route.query.id === undefined || this.$route.query.id === null) {
        this.pageTitle = '创建新用户'
        return
      }
      getPersonInfo(this.id)
        .then((result) => {
          const _value = result.result
          this.genderSeleted = [_value.gender]
          this.genderItems = this.genderSeleted
          this.relationSeleted = [_value.type]
          this.relationItems = this.relationSeleted
          var _birthDay = moment(_value.solar_time)
          this.birthDate = _birthDay
          this.birthTime = _birthDay.format('HH:mm')
          this.nickName = _value.nickname
          if (_value.type === 'self') {
            this.relations = getRelations()
          }
          this.$nextTick(() => {
            this.reloadData = _count + '1'
          })
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
