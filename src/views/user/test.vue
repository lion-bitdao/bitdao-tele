<template>
  <div style="width: 800px; height: 800px">
    <MapSelect access-token="pk.eyJ1IjoibGlvbnpob3UiLCJhIjoiY21icnA5NDJ5MGJrbDJsc2RodDA3a3p0NyJ9.8Udqh2C-SDdfhz-ChhlYQw"></MapSelect>
  </div>
</template>
<script>
import MapSelect from '../../components/MapSelect'
export default {
  name: 'UserProfile',
  components: { MapSelect },
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
      deleteId: 0
    }
  },
  created() {},
  methods: {
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
