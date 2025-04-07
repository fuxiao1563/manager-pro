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
const validatorAuthcode = (_: any, value: any, callback: any) => {
  if (value.length === 4) {
    callback()
  } else {
    callback(new Error('验证码为4位, 且为数字'))
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
export {
  formatter_number,
  validatorUsername,
  validatorPhone,
  validatorAuthcode,
  validatorPassword,
}
