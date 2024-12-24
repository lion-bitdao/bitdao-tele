<template>
  <div class="app-container">
    <el-container class="dialog_white" style="height: 89vh">
      <ReturnBar title="灵力记录"></ReturnBar>
      <el-main class="dialog_white_body">
        <el style="align: center; justify-content: center; justify-items: center; margin-left: 15px; margin-right: 15px">
          <div class="aurahis_head">
            <div class="aurahis_head_title">{{ aura | round }}</div>
            <div class="aurahis_head_subtitle">当前灵力</div>
            <div class="aurahis_head_subtitle" style="margin-bottom: 10px"><div class="btn_link" style="color: #ffffff">关于灵力</div></div>
          </div>
          <div class="dialog_white_panel" style="flex-direction: column">
            <div v-for="item in list" :key="item.id" class="aurahis_item">
              <div class="aurahis_item_name">
                <div>{{ item.type }}</div>
                <div class="aurahis_item_date">{{ item.date | formatdate }}</div>
              </div>
              <div class="aurahis_item_num">{{ item.point | round }}</div>
            </div>
          </div>
        </el>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ReturnBar from '../../components/ReturnBar'
import { getAuraHistory } from '../../api/aura'
export default {
  name: 'AuraHistory',
  components: { ReturnBar },
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
      aura: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getAuraHistory(this.filter.page, this.filter.size)
        .then((result) => {
          var _value = result.result
          this.list = _value.list
          this.total = _value.total
          this.aura = _value.point
        })
        .catch((err) => {
          console.log(err)
        })
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
<style>
.aurahis_head {
  background: #bda06f;
  font-size: 30px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.aurahis_head_title {
  margin-top: 10px;
  font-size: 30px;
  color: #ffffff;
  text-align: center;
}

.aurahis_head_subtitle {
  margin-top: 10px;
  font-size: 15px;
  color: #ffffff;
  text-align: center;
}

.aurahis_item {
  background: #f9f7f3;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
}

.aurahis_item_name {
  font-size: 18px;
  color: #2a2a2a;
  display: flex;
  flex-direction: column;
  margin: 20px;
  flex: auto;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: 400;
}

.aurahis_item_date {
  font-size: 13px;
  color: #666666;
}

.aurahis_item_num {
  font-size: 18px;
  color: #2a2a2a;
  text-align: right;

  margin-right: 20px;
  flex: auto;
  justify-content: right;
  align-items: center;
  display: flex;
}

.type_button {
  background: #f9f7f3;
  border-radius: 12px;
  width: 95%;
  height: 100px;
  display: flex;
  flex-direction: column;
}
</style>
