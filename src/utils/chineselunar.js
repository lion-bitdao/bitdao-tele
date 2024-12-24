export function getChineseTime(_hour, _minute) {
  if (_hour < 1 || (_hour === 1 && _minute === 0) || (_hour >= 23 && _minute > 0)) {
    return 0
  }
  if ((_hour >= 1 && _hour < 3) || (_hour === 3 && _minute === 0)) {
    return 1
  }
  if ((_hour >= 3 && _hour < 5) || (_hour === 5 && _minute === 0)) {
    return 2
  }
  if ((_hour >= 5 && _hour < 7) || (_hour === 7 && _minute === 0)) {
    return 3
  }
  if ((_hour >= 7 && _hour < 9) || (_hour === 9 && _minute === 0)) {
    return 4
  }
  if ((_hour >= 9 && _hour < 11) || (_hour === 11 && _minute === 0)) {
    return 5
  }
  if ((_hour >= 11 && _hour < 13) || (_hour === 13 && _minute === 0)) {
    return 6
  }
  if ((_hour >= 13 && _hour < 15) || (_hour === 15 && _minute === 0)) {
    return 7
  }
  if ((_hour >= 15 && _hour < 17) || (_hour === 17 && _minute === 0)) {
    return 8
  }
  if ((_hour >= 17 && _hour < 19) || (_hour === 19 && _minute === 0)) {
    return 9
  }
  if ((_hour >= 19 && _hour < 21) || (_hour === 21 && _minute === 0)) {
    return 10
  }
  if ((_hour >= 21 && _hour < 23) || (_hour === 23 && _minute === 0)) {
    return 11
  }
  return 0
}
