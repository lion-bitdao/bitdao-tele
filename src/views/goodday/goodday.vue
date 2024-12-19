<template>
  <div class="app-container">
    <div class="dialog">
      <div class="dialog_head">吉⽇推算</div>
      <div class="dialog_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div style="align: left; justify-self: left; margin-left: 15px" class="dialog_text">事项</div>
          <div class="dialog_panel">
            <div class="dialog_panel_child" style="margin-left: 5px; margin-right: 15px">
              <DialogSelect :data-source="rowsData" :selected-items="selectedItems" :column="3" :column-space="4" :button-width="100" :multi-select="true" @on-select="handleOnChoice" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <div style="flex: 1; text-align: justify" class="dialog_text">开始日期</div>
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <input style="text-align: center; width: inherit" type="number" class="input_normal" placeholder="选择开始日期" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">会给出开始⽇期3个⽉内的吉⽇</div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child">
              <input type="button" value="推算" class="btn_brown" style="width: 100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DialogSelect from '../../components/DialogSelect'
export default {
  name: 'GoodDay',
  components: { DialogSelect },
  data() {
    return {
      listLoading: false,
      rowsData: [
        { id: 1, text: '结婚' },
        { id: 2, text: '搬家' },
        { id: 3, text: '开业' },
        { id: 4, text: '动土' },
        { id: 5, text: '交易' },
        { id: 6, text: '旅行' },
        { id: 7, text: '祭祀' },
        { id: 8, text: '安葬' }
      ],
      selectedItems: [],
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
  created() {},
  methods: {
    handleOnSelect(items) {
      this.selectedItems = items
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
