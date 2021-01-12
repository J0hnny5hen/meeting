import { LoadingStatus, LoadingState, SuccessState, ErrorState } from '@declare'

export function isCompleteState(s: LoadingState | null): s is LoadingState {
  return !!s && s.status !== LoadingStatus.pending
}

export function isSuccessState(s: LoadingState | null): s is SuccessState {
  return !!s && s.status === LoadingStatus.success
}

export function isErrorState(s: LoadingState | null): s is ErrorState {
  return !!s && s.status === LoadingStatus.failure
}
