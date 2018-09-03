export function formatTimestamp(timestamp) {
  const time = new Date(timestamp)
    
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()

  minutes = (`${minutes}`.length === 1) ? `0${minutes}` : minutes
  seconds = (`${seconds}`.length === 1) ? `0${seconds}` : seconds

  return `${hours}:${minutes}:${seconds}`
}

export function timeOnline(timestamp) {
  let time = parseInt((Date.now() - timestamp) / 60000, 10)
  if (time < 1) { time = 'less than a minute' }
  if (time === 1) { time = '1 minute' }
  if (time > 1) { time = `${time} minutes` }
  return time
}

export function pluralize(count, noun, suffix = 's') {
  return `${count} ${noun}${count !== 1 ? suffix: null}`
}