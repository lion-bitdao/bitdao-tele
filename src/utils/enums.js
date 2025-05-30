export function getRelations() {
  return [
    { id: 'self', text: '自己' },
    { id: 'parent', text: '父母' },
    { id: 'child', text: '子女' },
    { id: 'couple', text: '配偶' },
    { id: 'ancestor', text: '祖辈' },
    { id: 'friend', text: '朋友' },
    { id: 'partner', text: '搭档' },
    { id: 'enemy', text: '对手' },
    { id: 'other', text: '其他' }
  ]
}

export function getRelation(_id) {
  var _relations = getRelations()
  var _finded = _relations.find((t) => t.id === _id)
  return _finded === null || _finded === undefined ? '其他' : _finded.text
}

export function getGenders() {
  return [
    { id: 1, text: '男' },
    { id: 0, text: '女' }
  ]
}

export function getGender(_id) {
  var _values = getGenders()
  var _finded = _values.find((t) => t.id.toString() === _id)
  return _finded === null || _finded === undefined ? '未知' : _finded.text
}

export function getPredictType(_type) {
  return _type === 'luckynumber' ? '幸运数字' : _type === 'xiao6ren' ? '卜卦问事' : '吉日推算'
}
