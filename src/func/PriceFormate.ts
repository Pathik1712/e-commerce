export const formatePrice = (str: string) => {
  let formated_str = "",
    num = 0
  for (let i = str.length - 1; i >= 0; i--) {
    num++
    if (num % 4 === 0) {
      formated_str = "," + formated_str
    }
    formated_str = str[i] + formated_str
  }
  return formated_str
}
