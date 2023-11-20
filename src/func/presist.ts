import cjs from "crypto-js"

export const store_session = (data: string) => {
  const enc_data = cjs.AES.encrypt(
    data,
    process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY!
  ).toString()
  window.sessionStorage.setItem("user", enc_data)
}

export const get_session = () => {
  const str = window.sessionStorage.getItem("user")!
  if(str){
      const dec_data = cjs.AES.decrypt(str,
        process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY!
        ).toString(cjs.enc.Utf8)
        return JSON.parse(dec_data)
    }
    return false
}
