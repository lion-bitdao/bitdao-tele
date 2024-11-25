<template>
  <div class="modaldialog" @click="onClickMask">
    <div class="modaldialog_panel" :style="`width:${dlgwidth}px`">
      <div class="modaldialog_content">
        {{ content }}
      </div>
      <input v-if="cancelenabled" type="button" :value="cancelText" class="btn_red" style="margin-left: 20px; margin-right: 20px" @click="onClickCancel" />
      <input v-if="submitenabled" type="button" :value="submitText" class="btn_brown" style="margin-left: 20px; margin-right: 20px; margin-top: 20px; margin-bottom: 50px" @click="onClickSubmit" />
    </div>
  </div>
</template>
<style>
.modaldialog {
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
.modaldialog_panel {
  background-color: #ffffff;
  border-radius: 15px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: -30vh;
}
.modaldialog_content {
  font-size: 18px;
  color: #2a2a2a;
  letter-spacing: 0;
  text-align: center;
  line-height: 32px;
  min-height: 50px;
  margin-top: 50px;
}
</style>
<script>
export default {
  name: 'ModalDialog',
  props: {
    dlgwidth: {
      type: Number,
      default: 375
    },
    content: {
      type: String,
      default: 'Content'
    },
    submitenabled: {
      type: Boolean,
      default: true
    },
    cancelenabled: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {}
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickMask(e) {
      event.stopPropagation()
    },
    onClickSubmit(item) {
      this.$nextTick(() => this.$emit('on-submitted'))
    },
    onClickCancel(item) {
      this.$nextTick(() => this.$emit('on-canceled'))
    }
  }
}
</script>
