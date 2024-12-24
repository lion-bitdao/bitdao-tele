<template>
  <div class="modaltoast" @click="onClickMask">
    <div class="modaltoast_panel" :style="`width:${dlgwidth}px`">
      <div class="modaltoast_content">
        {{ content }}
      </div>
    </div>
  </div>
</template>
<style>
.modaltoast {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 99vh;
  top: 0;
  left: 0;
}
.modaltoast_panel {
  background-color: #f1e8d7;
  border-radius: 15px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: -30vh;
}
.modaltoast_content {
  font-size: 18px;
  color: #2a2a2a;
  letter-spacing: 0;
  text-align: center;
  line-height: 32px;
  min-height: 50px;
  margin-top: 25px;
}
</style>
<script>
export default {
  name: 'ModalToast',
  props: {
    dlgwidth: {
      type: Number,
      default: 375
    },
    content: {
      type: String,
      default: 'Content'
    },
    timeout: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      timerId: null
    }
  },
  watch: {},
  created() {
    this.removeThis()
  },
  mounted() {},
  methods: {
    onClickMask(e) {
      event.stopPropagation()
    },
    removeThis() {
      var _this = this
      _this.timerId = setTimeout(() => {
        _this.$emit('on-time')
        clearTimeout(_this.timerId)
      }, _this.timeout * 1000)
    }
  }
}
</script>
