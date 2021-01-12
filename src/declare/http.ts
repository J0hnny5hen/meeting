export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

export enum LoadingStatus {
  pending = 'pending',
  success = 'success',
  failure = 'failure',
}

export interface LoadingState {
  status: LoadingStatus,
  response?: any,
  error?: Error,
}

export interface SuccessState extends LoadingState {
  response: any,
}

export interface ErrorState extends LoadingState {
  error: Error
}
