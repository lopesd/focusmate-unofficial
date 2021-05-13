import AsyncStorage from "@react-native-async-storage/async-storage"

export async function storeJson(key: string, value: any) {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function getJson<T>(key: string): Promise<T | undefined> {
  const dataStr = await AsyncStorage.getItem(key)
  if (dataStr) {
    return JSON.parse(dataStr) as T
  } else {
    return undefined
  }
}

export async function clearJson(key: string): Promise<void> {
  return AsyncStorage.removeItem(key)
}