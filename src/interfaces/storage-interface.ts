import EncryptedStorage from "react-native-encrypted-storage";

export async function storeEncryptedJson(key: string, value: any) {
  return EncryptedStorage.setItem(key, JSON.stringify(value))
}

export async function getEncryptedJson<T>(key: string): Promise<T | undefined> {
  const dataStr = await EncryptedStorage.getItem(key)
  if (dataStr) {
    return JSON.parse(dataStr) as T
  } else {
    return undefined
  }
}