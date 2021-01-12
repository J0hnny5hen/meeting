import { LoginOperation } from '@service'
import { LoginFields } from '@declare'
import { OperatorAPI, LoadingStreamGetter } from '../../OperatorAPI'

OperatorAPI.prototype.login = function (fields: LoginFields) {
  const operation = new LoginOperation(this.ajax, fields)
  this.processor.add(operation)
  return this.createOperationResult(operation)
}

type Login = (fields: LoginFields) => LoadingStreamGetter & LoginOperation

declare module '../../OperatorAPI' {
  interface OperatorAPI {
    login: Login
  }
}
