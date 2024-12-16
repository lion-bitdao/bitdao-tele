<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title="我的测算"></ReturnBar>
      <div class="dialog_white_body">
        <div style="align: center; justify-content: center; justify-items: center">
          <div class="dialog_white_panel" style="flex-direction: column">
            <div class="fortunehis_item">
              <div class="fortunehis_item_name">
                <div class="fortunehis_item_title">幸运数字</div>
                <div class="fortunehis_item_cond">数字:6位 范围(1-36)</div>
                <div class="fortunehis_item_num_row">
                  <div v-for="item in nums" :key="item">
                    <div class="fortunehis_item_number">{{ item }}</div>
                  </div>
                </div>
                <div class="fortunehis_item_date">2024-7-1</div>
              </div>
            </div>
            <div class="fortunehis_item">
              <div class="fortunehis_item_name">
                <div class="fortunehis_item_title">卜卦问事</div>
                <div class="fortunehis_item_cond">关于: 交易</div>
                <div class="fortunehis_item_desc">预⽰合作终将安稳顺遂,成果丰硕。⽔⽣⽊,⾦⽣⽔,三者相⽣相助。此卦象循环往复,⽣⽣不息,实乃上上之策。只需谨慎起步,善⽤贵⼈之助,终能达到理 想境地。望施主⼼存善念,多积阴德,⾃有福报。若有不解之处,尽管问我。</div>

                <div class="fortunehis_item_date">2024-7-1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.fortunehis_item {
  background: #f9f7f3;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  width: 90%;
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
<script>
import ReturnBar from '../../components/ReturnBar'
import { getFortuneHistory } from '../../api/fortune'
export default {
  name: 'FortuneHistory',
  components: { ReturnBar },
  data() {
    return {
      listLoading: false,
      list: [],
      nums: [1, 2, 3, 4, 5],
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
    init() {
      getFortuneHistory(this.filter.page, this.filter.size)
        .then((result) => {
          this.list = result.list
          this.total = result.total
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
