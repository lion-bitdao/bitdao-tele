<template>
  <div class="app-container">
    <div class="dialog">
      <div class="dialog_head">Good Day</div>
      <div class="dialog_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div style="align: left; justify-self: left; margin-left: 15px" class="dialog_text">Good Day</div>
          <div class="dialog_panel">
            <div class="dialog_panel_child" style="margin-left: 5px; margin-right: 15px">
              <DialogSelect :data-source="rowsData" :selected-items="selectedItems" :column="3" :column-space="4" :button-width="100" :multi-select="true" @on-select="handleOnChoice" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child" style="margin-left: 15px; margin-right: 15px">
              <div style="flex: 1; text-align: justify" class="dialog_text">Min</div>
              <div style="margin-left: 15px; flex: 1; text-align: justify" class="dialog_text">Max</div>
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child" style="margin-left: 15px; margin-right: 15px">
              <input style="text-align: justify; width: inherit" type="number" class="input_normal" />
              <input style="margin-left: 15px; text-align: justify; width: inherit" type="number" class="input_normal" />
            </div>
          </div>
          <div class="dialog_panel">
            <div class="dialog_panel_child" style="margin-left: 15px; margin-right: 15px">
              <input type="button" value="Start Calculation" class="btn_brown" style="width: 100%" />
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
        { id: 1, text: 'Marry' },
        { id: 2, text: 'House warming' },
        { id: 3, text: 'Business' },
        { id: 4, text: '动土' },
        { id: 5, text: 'Trade' },
        { id: 6, text: 'Travel' },
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
      }
    }
  },
  created() {},
  methods: {
    handleOnSelect(items) {
      console.log(items)
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
