import CryptoJS from 'crypto-js'

export function encrypt(key: string, data: string): string {
  return CryptoJS.AES.encrypt(data, key).toString()
}

export function decrypt(key: string, cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
