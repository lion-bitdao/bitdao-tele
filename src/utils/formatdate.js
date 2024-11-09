import moment from 'moment'

export function formatDate(datevalue) {
  try {
    var _re = moment(datevalue).format('YYYY-MM-DD HH:mm')
    if (moment(datevalue).format('YYYY') === '1900') return ''
    return _re === 'Invalid date' ? '' : _re
  } catch {
    return ''
  }
}
