export const getTime = () => {
  let message = ''
  let hour = new Date().getHours()
  if (hour < 9) {
    message = '早上好'
  } else if (hour < 14) {
    message = '上午好'
  } else if (hour <= 18) {
    message = '下午好'
  } else if (hour <= 24) {
    message = '晚上好'
  }
  return message
}
