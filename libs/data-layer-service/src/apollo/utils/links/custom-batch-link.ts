import { Operation } from '@apollo/client'
import {
  BatchHttpLink,
  BatchHttpLinkOptions,
  UtilityLink
} from '@topkit/apollo-client/links'

export class CustomBatchLink extends UtilityLink<BatchHttpLinkOptions> {
  constructor(options: BatchHttpLinkOptions) {
    super(
      'CustomBatchLink',
      options,
      new BatchHttpLink({
        ...options,
        batchKey: ({ getContext }: Operation) => getContext().batchKey as string
      })
    )
  }

  shouldSkip({ getContext }: Operation) {
    return !getContext().batchKey
  }
}
