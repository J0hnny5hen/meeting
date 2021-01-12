import { Observable } from 'rxjs'

import { LoadingState } from '@declare'
import { Processor, Loading } from '@service'
import { BasicAjax } from '@tool'
import { finalize } from 'rxjs/operators'

export interface LoadingStreamGetter {
  getLoading$: () => Observable<LoadingState | null>,
}

export class OperatorAPI {
  constructor(
    public ajax: BasicAjax,
    public loading: Loading,
    public processor: Processor,
  ) {}

  createOperationResult<T extends { id: string }>(operation: T): T & LoadingStreamGetter {
    const getLoading$ = () => this.loading.get$(operation.id).pipe(
      finalize(() => {
        this.processor.remove(operation.id)
      }),
    )
    return { getLoading$, ...operation }
  }
}
