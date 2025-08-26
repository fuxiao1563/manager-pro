// auth 相关的公共类型

// 验证登录
export interface AuthLogin {
  phone: string
  authCode: string
}

// 忘记密码
export interface ForgetPassword extends AuthLogin {
  newPassword: string
  confirmPassword: string
}
