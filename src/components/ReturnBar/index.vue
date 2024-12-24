<template>
  <el-header class="dialog_white_head" style="height: 47px">
    <div class="dialog_white_head_title" @click="goBack">{{ title }}</div>
  </el-header>
</template>
<style scoped>
.dialog_white_head {
  background: #ffffff;
  height: 47px;
  align-content: center;
  border-radius: 20px 20px 0 0;
  width: 100vw;
  align-self: center;
  font-size: 18px;
  color: #2a2a2a;
  letter-spacing: 0;
  text-align: center;
  line-height: 32px;
  padding-left: 15px;
  padding-right: 15px;
}

.dialog_white_head_title {
  display: flex;
  flex: auto;
  justify-content: center;
  height: 42px;
  background-image: url('../../assets/images/back.png');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position-y: 8px;
  align-content: center;
}
</style>
<script>
export default {
  name: 'ReturnBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
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
      if (this.showBack) {
        this.$router.go(-1)
      } else {
        window.Telegram.WebApp.close()
      }
    }
  }
}
</script>
