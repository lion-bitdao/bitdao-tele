<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <div class="dialog_white_head"></div>
      <div class="dialog_white_body">
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <div class="avatar_panel">
            <div class="avatar"></div>
            <div class="avatar_name">{{ nickName }}</div>
            <div class="avatar_attrib_panel">
              <div class="avatar_attrib_item" @click="jumpTo('/aurahistory', undefined)">
                <div class="avatar_attrib_item_icon"><img src="../../assets/images/home_group1_aura@1x.png" class="avatar_attrib_item_icon_img" /></div>
                <div class="avatar_attrib_item_text">灵力:{{ [point] }}</div>
              </div>
              <div class="avatar_attrib_item" @click="jumpTo('/userprofile', undefined)">
                <div class="avatar_attrib_item_icon"><img src="../../assets/images/home_group1_profile@1x.png" class="avatar_attrib_item_icon_img" /></div>
                <div class="avatar_attrib_item_text">用户信息</div>
              </div>
              <div class="avatar_attrib_item" @click="jumpTo('/more', undefined)">
                <div class="avatar_attrib_item_icon"><img src="../../assets/images/home_group1_more@1x.png" class="avatar_attrib_item_icon_img" /></div>
                <div class="avatar_attrib_item_text">选项</div>
              </div>
            </div>
          </div>
          <div class="dialog_white_panel">
            <div class="dialog_white_panel_child" style="margin-left: 15px; margin-right: 15px">
              <div class="avatar_attrib_panel_button" style="width: 100%" @click="jumpTo('/dailyforcast', { undefined })">
                <img src="../../assets/images/home_group2_rili@1x.png" class="type_button_icon_img" />
                <div style="margin-left: 10px">每日运势</div>
              </div>
            </div>
          </div>
          <div class="avatar_attrib_panel">
            <div class="type_button" @click="jumpTo('/luckynumber', undefined)">
              <div class="type_button_icon"><img src="../../assets/images/home_group3_num@1x.png" class="type_button_icon_img" /></div>
              <div class="avatar_attrib_item_text">幸运数字</div>
            </div>
            <div class="type_button" style="margin-left: 15px" @click="jumpTo('/divination', undefined)">
              <div class="type_button_icon"><img src="../../assets/images/home_group3_div@1x.png" class="type_button_icon_img" /></div>
              <div class="avatar_attrib_item_text">卜卦问事</div>
            </div>
            <div class="type_button" style="margin-left: 15px" @click="jumpTo('/goodday', undefined)">
              <div class="type_button_icon"><img src="../../assets/images/home_group3_days@1x.png" class="type_button_icon_img" /></div>
              <div class="avatar_attrib_item_text">吉日推算</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMemberInfo } from '../../api/member'
import { setToken, setUid } from '../../utils/auth'
export default {
  name: 'Profile',
  data() {
    return {
      nickName: '',
      point: 0,
      token: this.$route.query.t,
      tid: this.$route.query.tid
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      setToken(this.token)
      setUid(this.tid)
      getMemberInfo()
        .then((result) => {
          this.nickName = result.nickname.trim() === '' ? '匿名' : this.result.nickname
          this.point = result.point
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
      if (_query === undefined) {
        _query = {}
      }
      _query.tid = this.tid
      _query.t = this.token
      _jumpArg.query = _query
      this.$router.push(_jumpArg)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
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
  width: inherit;
  height: 20px;
  display: flex;
  justify-content: center;
  justify-items: center;
}

.avatar_attrib_item_icon_img {
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
  display: flex;
  justify-items: center;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-content: center;
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
  width: inherit;
  height: 48px;
  display: flex;
  justify-items: center;
  justify-content: center;
}
.type_button_icon_img {
  width: 36px;
  height: 36px;
  display: flex;
  justify-items: center;
  justify-content: center;
}
</style>
