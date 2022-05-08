import { NativeModules } from 'react-native'
const AlarmModule = NativeModules.AlarmModule

interface AlarmModuleInterface {
  registerAlarm(time: number): void
}

export default AlarmModule as AlarmModuleInterface