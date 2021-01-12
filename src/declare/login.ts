import { v4 as uuidv4 } from 'uuid'

export enum LoginFieldKey {
  USERUUID = 'userUuid',
  USERNAME = 'userName',
  ROOMNAME = 'roomName',
  ROOMID = 'roomUuid',
  ENABLEAUDIO = 'enableAudio',
  ENABLEVIDEO = 'enableVideo',
  PASSWORD = 'password',
}

export type LoginFields = typeof initialLoginFields

export const initialLoginFields = {
  [LoginFieldKey.USERUUID]: uuidv4(),
  [LoginFieldKey.USERNAME]: '',
  [LoginFieldKey.ROOMNAME]: '',
  [LoginFieldKey.ROOMID]: '',
  [LoginFieldKey.ENABLEAUDIO]: true,
  [LoginFieldKey.ENABLEVIDEO]: true,
  [LoginFieldKey.PASSWORD]: '',
}
