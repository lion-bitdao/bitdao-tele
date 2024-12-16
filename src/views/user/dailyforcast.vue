<template>
  <div class="app-container" style="height: 100vh">
    <div class="dialog_white">
      <ReturnBar title=""></ReturnBar>
      <div class="dialog_white_body" style="margin-top: 20px">
        <div style="font-size: 32px; color: #2a2a2a; letter-spacing: 0; line-height: 32px; text-align: left">每日运势</div>
        <div style="margin: 15px; align: center; justify-content: center; justify-items: center">
          <CnLunar :times="lunarTimes" day="七月廿九" date="2024年9月1日" cnyear="甲辰年" cnmonth="壬申月" cnday="⼰巳日" good="结婚 会亲友 搬家 签订合同 交易 买衣服 动⼟ 买⾞ 祈福 栽种 安床 祭祀 修造 成⼈礼 收养⼦女 求⼦ 上梁竖柱" bad="出⾏ 纳畜 安葬 ⾏丧 伐⽊ 造桥 作梁"></CnLunar>
        </div>
        <div style="font-size: 24px; color: #bda06f; text-align: left; margin-top: 30px">我的运势</div>
        <div style="font-size: 15px; line-height: 30px; text-align: left">在线排盘，采用最精确的排盘程序，包括八字排盘、六爻排盘、梅花易数排盘、紫微斗数排盘等。对於普通易经爱好者而言，最不容易理解的什么是「真太阳时」</div>
      </div>
    </div>
  </div>
</template>
<script>
import ReturnBar from '../../components/ReturnBar'
import CnLunar from '../../components/CnLunar'
export default {
  name: 'DailyForcast',
  components: { ReturnBar, CnLunar },
  data() {
    return {
      listLoading: false,
      rowsData: [
        { id: 1, text: '男' },
        { id: 2, text: '女' }
      ],
      relations: [
        { id: 1, text: '父母' },
        { id: 2, text: '子女' },
        { id: 3, text: '配偶' },
        { id: 4, text: '朋友' },
        { id: 5, text: '搭档' },
        { id: 6, text: '对手' }
      ],
      total: 0,
      filter: {
        page: 0,
        size: 20,
        status: 0,
        filter: ''
      },
      value1: '',
      value2: '',
      lunarTimes: [
        {
          text: '癸亥時',
          good: true,
          seleted: false
        },
        {
          text: '壬⼦時',
          good: true,
          seleted: false
        },
        {
          text: '癸醜時',
          good: true,
          seleted: false
        },
        {
          text: '甲寅時',
          good: true,
          seleted: false
        },
        {
          text: '⼄卯時',
          good: true,
          seleted: false
        },
        {
          text: '丙辰時',
          good: true,
          seleted: false
        },
        {
          text: '丁巳時',
          good: true,
          seleted: false
        },
        {
          text: '戊午時',
          good: true,
          seleted: true
        },
        {
          text: '⼰未時',
          good: true,
          seleted: false
        },
        {
          text: '庚申時',
          good: false,
          seleted: false
        },
        {
          text: '辛⾣時',
          good: true,
          seleted: false
        },
        {
          text: '壬戌時',
          good: true,
          seleted: false
        }
      ]
    }
  },
  created() {},
  methods: {
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
