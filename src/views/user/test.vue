<template>
  <div class="app-container" style="height: fit-content">
    <ModalToast v-if="modalToastShow" :content="toastContent"></ModalToast>
  </div>
</template>
<script>
import ModalToast from '../../components/ModalToast'
export default {
  name: 'UserProfile',
  components: { ModalToast },
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
