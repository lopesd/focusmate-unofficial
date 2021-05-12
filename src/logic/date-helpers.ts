export function simpleTimeFormat(date: Date) {
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'p' : 'a'
  hours = hours % 12
  const hoursStr = hours !== 0 ? hours.toString() : '12' // the hour '0' should be '12'

  const minutes = date.getMinutes()
  let minutesString = minutes === 0 ? '' : minutes < 10 ? `:0${minutes}` : `:${minutes}`
  return `${hoursStr}${minutesString}${ampm}`
}