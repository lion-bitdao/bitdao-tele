<template>
  <div class="dialog_white_head">
    <div class="dialog_white_head_return">
      <i class="el-icon-arrow-left" style="width: 32px" @click="goBack"></i>
      <div class="dialog_white_head_title">{{ title }}</div>
    </div>
  </div>
</template>
<style scoped>
.dialog_white_head_return {
  align-content: center;
  width: 325px;
  display: flex;
  flex-direction: row;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 15px;
}
.dialog_white_head_title {
  flex: auto;
  justify-content: center;
  margin-right: 32px;
}
</style>
<script>
export default {
  name: 'ReturnBar',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
