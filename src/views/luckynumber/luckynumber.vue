<template>
  <div class="app-container">
    <div class="dialog">
      <div class="dialog_head">Lucky Numbers</div>
      <div class="dialog_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div style="align: left; justify-self: left; margin-left: 15px" class="dialog_text">Number of digits</div>
          <div class="dialog_row" style="margin-top: 15px">
            <div v-for="item in row1" :key="item.id">
              <div :class="item.id === selectedNum ? 'input_active' : 'input_normal'" style="width: 55px; margin: 4px" @click="onNumClick(item)">{{ item.id }}</div>
            </div>
          </div>
          <div class="dialog_row">
            <div v-for="item in row2" :key="item.id" style="align: left; justify-content: center">
              <div :class="item.id === selectedNum ? 'input_active' : 'input_normal'" style="width: 55px; margin: 4px" @click="onNumClick(item)">{{ item.id }}</div>
            </div>
            <div style="width: 55px; margin: 4px" />
          </div>
          <div class="subtitle">
            <div class="subtitlechild" style="margin-left: 15px; margin-right: 15px">
              <div style="flex: 1; text-align: justify" class="dialog_text">Min</div>
              <div style="margin-left: 15px; flex: 1; text-align: justify" class="dialog_text">Max</div>
            </div>
          </div>
          <div class="subtitle">
            <div class="subtitlechild" style="margin-left: 15px; margin-right: 15px">
              <input style="text-align: justify; width: inherit" type="number" class="input_normal" />
              <input style="margin-left: 15px; text-align: justify; width: inherit" type="number" class="input_normal" />
            </div>
          </div>
          <div class="subtitle">
            <div class="subtitlechild" style="margin-left: 15px; margin-right: 15px">
              <input type="button" value="Start Calculation" class="btn_brown" style="width: 100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.subtitlechild {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  justify-self: flex-start;
  flex-basis: 100%;
  width: 100%;
}
.subtitle {
  display: flex;
  width: 100%;
  margin-top: 20px;
}
</style>
<script>
export default {
  name: 'LuckyNumber',
  components: {},
  data() {
    return {
      listLoading: false,
      row1: [],
      row2: [],
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      maxNum: 9,
      selectedNum: 0
    }
  },
  created() {
    this.initNums()
  },
  methods: {
    initNums() {
      this.row1 = []
      this.row2 = []

      for (var i = 1; i <= this.maxNum; i++) {
        if (i <= 5) {
          this.row1.push({ id: i })
        } else {
          this.row2.push({ id: i })
        }
      }
    },
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
