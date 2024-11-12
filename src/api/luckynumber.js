import request from '@/utils/request'

export function getLuckyNumber(numCount, min, max) {
  return request({
    url: '/teleapi',
    method: 'post',
    dataType: 'json',
    data: {}
  })
}

export function getPlotPresetList() {
  return request({
    url: '/plot/plot_preset',
    method: 'post',
    dataType: 'json',
    data: {}
  })
}

export function SyncConfStat() {
  return request({
    url: '/conf/sync_stat',
    method: 'post',
    dataType: 'json',
    data: {}
  })
}
