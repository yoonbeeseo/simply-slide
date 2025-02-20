type T = string | null
export const emailValidator = (email: string): T => {
  if (email.length === 0) {
    return "이메일을 입력해주세요."
  }
  if (!email.includes("@")) {
    return '"@"를 반드시 포함해야 합니다.'
  }
  const con1 = email.split("@")
  const message = "이메일 형식을 확인해주세요."
  if (con1[1].length === 0) {
    return message
  }
  if (!con1[1].includes(".")) {
    return message
  }
  const con2 = email.split(".")
  if (con2[con2.length - 1].length === 0) {
    return message
  }

  return null
}

export const passwordValidator = (
  password: string,
  option?: { min?: number; max?: number },
  confirmPassword?: string
) => {
  if (password.length === 0) {
    return "비밀번호를 입력해주세요."
  }
  if (option) {
    if (option.min && option.min > password.length) {
      return `비밀번호는 최소 ${option.min}자리입니다.`
    }
    if (option.max && password.length > option.max) {
      return `비밀번호는 최대 ${option.max}자리입니다.`
    }
  }
  if (!option?.min && password.length < 6) {
    return "비밀번호는 최소 6자리입니다."
  }
  if (!option?.max && password.length > 18) {
    return "비밀번호는 최대 18자리입니다."
  }

  if (confirmPassword && confirmPassword !== password) {
    return "비밀번호가 일치하지 않습니다."
  }

  return null
}
