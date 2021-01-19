import { GetRoomInfoOperation } from '@service'
import { OperatorAPI, LoadingStreamGetter } from '../../OperatorAPI'

OperatorAPI.prototype.getRoomInfo = function (
  this: OperatorAPI,
  roomId: string,
  userToken: string,
) {
  const operation = new GetRoomInfoOperation(this.ajax, roomId, userToken)
  this.processor.add(operation)
  return this.createOperationResult(operation)
}

type GetRoomInfo = (
  roomId: string,
  userToken: string
) => LoadingStreamGetter & GetRoomInfoOperation

declare module '../../OperatorAPI' {
  interface OperatorAPI {
    getRoomInfo: GetRoomInfo
  }
}
