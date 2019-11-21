interface String {
  [key: string]: any
}
interface Number {
  [key: string]: any
}
interface Date {
  [key: string]: any
}

window.Number.prototype._padStart = window.String.prototype._padStart = function (l: any, w: any) {
  let s = this + ''
  w = w + ''
  while (s.length < l) {
    s = w + s
  }
  return s
}
window.Date.prototype._setY = function (y: any = new Date().getFullYear()) {
  return new window.Date(new window.Date(this).setFullYear(y))
}
window.Date.prototype._setMN = function (mn: any = new Date().getMonth()) {
  return new window.Date(this.setMonth(mn))
}
window.Date.prototype._setD = function (d: any = 1) {
  return new window.Date(new window.Date(this).setDate(d))
}
window.Date.prototype._setH = function (h: any = 0) {
  return new window.Date(this.setHours(h))
}
window.Date.prototype._setM = function (m: any = 0) {
  return new window.Date(this.setMinutes(m))
}
window.Date.prototype._setS = function (s: any = 0) {
  return new window.Date(this.setSeconds(s))
}
window.Date.prototype._setHMS = function (hsm: any = '0:0:0') {
  return this._setH(hsm.split(':')[0] || 0)._setM(hsm.split(':')[1] || 0)._setS(hsm.split(':')[2] || 0)
}
window.Date.prototype._bf = function (d: any) {
  return this._setD(this.getDate() + d)
}
window.Date.prototype._bfM = function (d: any) {
  return new window.Date(new window.Date(this).setMonth(this.getMonth() + d))
}
window.Date.prototype._bfY = function (y: any) {
  return new window.Date(new window.Date(this).setFullYear(this.getFullYear() + y))
}
window.Date.prototype._toString = function (s: any = '-') {
  return this.getFullYear() + s + (this.getMonth() + 1)._padStart(2, 0) + s + this.getDate()._padStart(2, 0) + ' ' + this.getHours()._padStart(2, 0) + ':' + this.getMinutes()._padStart(2, 0) + ':' + this.getSeconds()._padStart(2, 0)
}
window.Date.prototype._toMonthString = function (s: any = '-') {
  return this.getFullYear() + s + (this.getMonth() + 1)._padStart(2, 0)
}
window.Date.prototype._toDayString = function (s: any = '-') {
  return this.getFullYear() + s + (this.getMonth() + 1)._padStart(2, 0) + s + this.getDate()._padStart(2, 0)
}
window.Date.prototype._toAllString = function () {
  return this.getFullYear() + (this.getMonth() + 1)._padStart(2, 0) + this.getDate()._padStart(2, 0) + this.getHours()._padStart(2, 0) + this.getMinutes()._padStart(2, 0) + this.getSeconds()._padStart(2, 0)
}
window.Date.prototype._toMonthDayStringCN = function () {
  return (this.getMonth() + 1) + '月' + this.getDate() + '日'
}
window.Date.prototype._toMDHMString = function (s: any = '-') {
  return (this.getMonth() + 1) + s + this.getDate() + ' ' + this.getHours()._padStart(2, 0) + ':' + this.getMinutes()._padStart(2, 0)
}
window.Date.prototype._toWeekString = function () {
  return '星期' + ['日', '一', '二', '三', '四', '五', '六'][this.getDay()]
}