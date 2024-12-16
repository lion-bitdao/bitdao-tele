<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="修改用户信息"></ReturnBar>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">邮箱</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <input style="text-align: left; width: inherit" type="text" class="input_normal" placeholder="请输入邮箱" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">性别</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <DialogSelect :data-source="rowsData" :column="2" :column-space="4" :button-width="150" />
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child">
              <div style="align: left; justify-self: left" class="dialog_text">生辰</div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <el-date-picker v-model="value1" type="date" format="yyyy年MM月dd日" placeholder="生辰年月日" class="input_normal" style="text-align: center; margin-left: 15px; margin-right: 15px; width: inherit"></el-date-picker>
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_white_panel_child">
            <el-time-select v-model="value2" class="input_normal" format="HH时mm分" style="text-align: center; margin-left: 15px; margin-right: 15px; width: inherit" placeholder="生辰时/分"></el-time-select>
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_white_panel_child">
            <div style="align: left; justify-self: left; margin-left: 10px; margin-right: 35px" class="dialog_text">与本人的关系</div>
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_white_panel_child" style="margin-left: 25px">
            <DialogSelect :data-source="relations" :column="3" :column-space="4" :button-width="98" />
          </div>
        </div>
        <div class="dialog_white_panel">
          <div class="dialog_panel_child">
            <input type="button" value="保存" class="btn_brown" style="width: 100%; margin-left: 15px; margin-right: 15px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
import ReturnBar from '../../components/ReturnBar'
import { getRelations, getGenders } from '../../utils/enums'
export default {
  name: 'EditUserProfile',
  components: { DialogSelect, ReturnBar },
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
      value1: '',
      value2: '',
      token: this.$route.query.t
    }
  },
  created() {},
  methods: {
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
