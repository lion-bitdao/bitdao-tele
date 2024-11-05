<template>
  <div lass="app-container">
    <div>test</div>
  </div>
</template>
<script>
export default {
  name: 'LuckyNumber',
  components: {},
  data() {
    return {
      listLoading: false,
      list: null,
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
