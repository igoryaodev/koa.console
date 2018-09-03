/*
* @时间格式化
*/
const dateTimeFormat = (value) => {
  if(!value || typeof value !== 'string') return value
  var date, time, yyyy, mm, dd, HH, MM, ss;
  yyyy = value.getFullYear()
  mm = value.getMonth() + 1
  dd = value.getDate()
  HH = value.getHours()
  MM = value.getMinutes()
  ss = value.getSeconds()
  time = [yyyy, mm, dd, HH, MM, ss].map(item => {
    item = item.toString()
    if(item.length < 2) item = '0' + item
    return item
  })
  date = `${time[0]}-${time[1]}-${time[2]}T${time[3]}:${time[4]}:${time[5]}`
  return date.toString()
}

module.exports = {
  dateTimeFormat: dateTimeFormat
}