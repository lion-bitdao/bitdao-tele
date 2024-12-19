<template>
  <div class="app-container">
    <div class="dialog">
      <div class="dialog_head">⼘卦问事</div>
      <div class="dialog_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div style="text-align: center; justify-self: center; margin-left: 15px" class="dialog_text">请输入事项或选择快捷选项</div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <div style="flex: 1; text-align: justify" class="dialog_text">输入事项</div>
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <input v-model="selectedValue" style="text-align: justify; width: inherit" type="text" class="input_normal" placeholder="请输入事项" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <DialogSelect :data-source="rowsData" :selected-items="selectedItems" :column="3" :column-space="4" :button-width="96" :multi-select="false" @on-select="onClickSelect" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <input type="button" value="起卦" class="btn_brown" style="width: 100%" @click="onClickGetDivination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
import { getDivination } from '../../api/fortune'
import { setToken } from '../../utils/auth'
export default {
  name: 'Divination',
  components: { DialogSelect },
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
      token: this.$route.query.t
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query !== undefined && this.$route.query.t !== undefined) {
        setToken(this.$route.query.t)
      }
    },
    onClickGetDivination(e) {
      getDivination(this.selectedValue)
        .then((result) => {})
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
