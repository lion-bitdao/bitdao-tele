<template>
  <div class="app-container" style="height: 100vh">
    <ModalToast v-if="showDlg" timout="3" @on-time="onNumClick"></ModalToast>
  </div>
</template>
<script>
import ModalToast from '../../components/ModalToast'
export default {
  name: 'LuckyNumber',
  components: { ModalToast },
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
      showDlg: true
    }
  },
  created() {},
  methods: {
    onNumClick(e) {
      this.showDlg = false
      console.log(e)
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
