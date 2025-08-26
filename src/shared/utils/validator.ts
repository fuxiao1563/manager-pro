// 指定输入格式为数字
const formatter_number = (value: any) => value.replace(/\D/g, '')
// 账号的校验规则
const validatorUsername = (_: any, value: any, callback: any) => {
  if (value.length >= 5 || value.length <= 10) {
    callback()
  } else {
    callback(new Error('账号长度为5-10位'))
  }
}
// 手机号的校验规则
const validatorPhone = (_: any, value: any, callback: any) => {
  if (value.length === 11) {
    callback()
  } else {
    callback(new Error('手机号长度为11位, 且为数字'))
  }
}
// 验证码的校验规则
const validatorAuthCode = (_: any, value: any, callback: any) => {
  if (value.length === 6) {
    callback()
  } else {
    callback(new Error('验证码为6位, 且为数字'))
  }
}
// 密码的校验规则
const validatorPassword = (_: any, value: any, callback: any) => {
  if (value.length >= 5 || value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码长度为5-10位'))
  }
}
// 邮箱的校验规则
const validatorEmail = (_: any, value: any, callback: any) => {
  const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (value != '' && regEmail.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的邮箱格式'))
  }
}
export {
  formatter_number,
  validatorUsername,
  validatorPhone,
  validatorAuthCode,
  validatorPassword,
  validatorEmail,
}
