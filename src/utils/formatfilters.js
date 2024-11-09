export default function formatFilter(_formatted, _value, _valueadd, _allowEmpty) {
  if (_value === undefined) return
  if (_allowEmpty === undefined) _allowEmpty = true
  if (!_allowEmpty && _value === '') return
  for (var i in _valueadd) {
    _formatted.push(_valueadd[i])
  }
}
