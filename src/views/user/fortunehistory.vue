<template>
  <div class="app-container">
    <el-container class="dialog_white">
      <ReturnBar title="我的测算"></ReturnBar>
      <el-main class="dialog_white_body">
        <div style="align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel" style="flex-direction: column; margin-top: 0px">
            <div v-for="item in list" :key="item.id" class="fortunehis_item">
              <div class="fortunehis_item_name">
                <div class="fortunehis_item_title">{{ getPredictType(item.type) }}</div>
                <div class="fortunehis_item_cond">{{ item.type === 'luckynumber' ? item.input : '关于：' + item.input }}</div>
                <div class="fortunehis_item_desc" v-html="replaceEnter(item.output)"></div>
                <div class="fortunehis_item_date">{{ item.created_at | formatdate }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import ReturnBar from '../../components/ReturnBar'
import { getFortuneHistory } from '../../api/fortune'
import { getPredictType } from '../../utils/enums'
export default {
  name: 'FortuneHistory',
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
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    getPredictType,
    replaceEnter(_data) {
      return _data.replace(/\n/g, '<br/>')
    },
    init() {
      getFortuneHistory(this.filter.page, this.filter.size)
        .then((result) => {
          this.list = result.result.list
          this.total = result.result.total
        })
        .catch((err) => {
          console.log(err)
        })
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

<style>
.fortunehis_item {
  background: #f9f7f3;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  width: 93%;
  margin-left: 5%;
  margin-top: 10px;
}

.fortunehis_item_name {
  color: #2a2a2a;
  display: flex;
  flex-direction: column;
  margin: 20px;
  flex: auto;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: 600;
}

.fortunehis_item_cond {
  font-size: 15px;
  color: #bda06f;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 5px;
}

.fortunehis_item_title {
  font-size: 18px;
  color: #2a2a2a;
  font-weight: 400;
}

.fortunehis_item_date {
  font-size: 13px;
  color: #666666;
  line-height: 20px;
  font-weight: 100;
  margin-top: 10px;
}

.fortunehis_item_num_row {
  display: flex;
  flex-direction: row;
  margin: 5px;
}
.fortunehis_item_desc {
  font-size: 15px;
  color: #2a2a2a;
  line-height: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
}
.fortunehis_item_number {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-color: #ff0000;
  border-radius: 50%;
  font-size: 16px;
  color: white;
  text-align: center;
  line-height: 32px;
  position: relative;
  margin-right: 6px;
}

.fortunehis_item_number:before {
  content: attr(data-number);
}
</style>
