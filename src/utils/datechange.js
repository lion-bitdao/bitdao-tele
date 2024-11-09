import moment from 'moment'

export function dateAddDay(dtTmp, num) {
  return dateAdd(dtTmp, 'days', num)
}

export function dateAddMonth(dtTmp, num) {
  return dateAdd(dtTmp, 'months', num)
}
export function dateAdd(dtTmp, strInterval, num) {
  var _re = moment(dtTmp)
  if (num > 0) {
    _re.add(1, strInterval, Math.abs(num))
  } else {
    _re.subtract(1, strInterval, Math.abs(num))
  }
  if (_re.format('YYYY') === '1900' || _re.format('YYYY') === '1970') {
    return ''
  }
  return _re.format('YYYY-MM-DD HH:mm:ss')
}

export function dateFormat(datevalue) {
  console.log(datevalue)
  var _re = moment(datevalue)
  console.log(_re)
  if (_re.format('YYYY') === '1900' || _re.format('YYYY') === '1970') return ''
  var _dateString = _re.format('YYYY-MM-DD HH:mm:ss')
  console.log(_dateString)
  return _dateString === 'Invalid date' ? '' : _dateString
}

export function dateFormatDay(datevalue) {
  console.log(datevalue)
  var _re = moment(datevalue)
  console.log(_re)
  if (_re.format('YYYY') === '1900' || _re.format('YYYY') === '1970') return ''
  var _dateString = _re.format('YYYY-MM-DD')
  console.log(_dateString)
  return _dateString === 'Invalid date' ? '' : _dateString
}
