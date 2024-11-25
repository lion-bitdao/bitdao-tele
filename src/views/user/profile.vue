d
<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <div class="dialog_white_head"></div>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="avatar_panel">
            <div class="avatar"></div>
            <div class="avatar_name">姓名</div>
            <div class="avatar_attrib_panel">
              <div class="avatar_attrib_item" @click="jumpTo('/aurahistory', undefined)">
                <div class="avatar_attrib_item_icon"></div>
                <div class="avatar_attrib_item_text">灵力:100</div>
              </div>
              <div class="avatar_attrib_item" @click="jumpTo('/userprofile', undefined)">
                <div class="avatar_attrib_item_icon"></div>
                <div class="avatar_attrib_item_text">用户信息</div>
              </div>
              <div class="avatar_attrib_item" @click="jumpTo('/more', undefined)">
                <div class="avatar_attrib_item_icon"></div>
                <div class="avatar_attrib_item_text">选项</div>
              </div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child" style="margin-left: 15px; margin-right: 15px">
              <input type="button" value="每日运势" class="avatar_attrib_panel_button" style="width: 100%" />
            </div>
          </div>
          <div class="avatar_attrib_panel">
            <div class="type_button" @click="jumpTo('/luckynumber', undefined)">
              <div class="type_button_icon"></div>
              <div class="avatar_attrib_item_text">幸运数字</div>
            </div>
            <div class="type_button" style="margin-left: 15px" @click="jumpTo('/divination', undefined)">
              <div class="type_button_icon"></div>
              <div class="avatar_attrib_item_text">卜卦问事</div>
            </div>
            <div class="type_button" style="margin-left: 15px" @click="jumpTo('/goodday', undefined)">
              <div class="type_button_icon"></div>
              <div class="avatar_attrib_item_text">吉日推算</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.avatar {
  background: #d8d8d8;
  border: 2px solid #979797;
  border-radius: 90px;
  width: 70px;
  height: 70px;
  display: flex;
  margin-top: 15px;
}

.avatar_name {
  align-content: center;
  text-align: center;
  width: fit-content;
}

.avatar_attrib_panel {
  background: #ffffff;
  border-radius: 15px;
  width: 95%;
  height: 65px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-basis: 0;
}

.avatar_attrib_item {
  background: #ffffff;
  border-radius: 15px;
  width: 95%;
  height: 45px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}

.avatar_attrib_item_icon {
  width: 20px;
  height: 20px;
}

.avatar_attrib_panel_button {
  background-image: linear-gradient(90deg, #fae3aa 0%, #f3c371 100%);
  border-radius: 8px;
  width: 95%;
  height: 70px;
  font-size: 15px;
  color: #2a2a2a;
  text-align: center;
}

.avatar_attrib_item_text {
  font-size: 13px;
}

.avatar_panel {
  background: #f9f7f3;
  border-radius: 8px;
  width: 95%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.type_button {
  background: #f9f7f3;
  border-radius: 12px;
  width: 95%;
  height: 100px;

  display: flex;
  flex-direction: column;
}

.type_button_icon {
  margin-top: 12px;
  width: 48px;
  height: 48px;
}
</style>
<script>
export default {
  name: 'Profile',
  data() {
    return {
      listLoading: false,
      rowsData: [],
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
    this.initNums()
  },
  methods: {
    initNums() {
      this.rowsData = []
      for (var i = 1; i <= 9; i++) {
        this.rowsData.push({ id: i, text: `${i}` })
      }
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
