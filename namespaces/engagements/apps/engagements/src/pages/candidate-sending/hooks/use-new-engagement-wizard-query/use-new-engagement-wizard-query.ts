import { useMemo, useRef } from 'react'
import { useQuery, TypedDocumentNode } from '@staff-portal/data-layer-service'

import {
  NewEngagementWizardQueryData,
  NewEngagementWizardQueryVariables
} from './types'

const useNewEngagementWizardQuery = <
  TDocumentNode extends TypedDocumentNode,
  TData extends NewEngagementWizardQueryData<TDocumentNode>,
  TVariables extends NewEngagementWizardQueryVariables<TDocumentNode>
>(
  query: TDocumentNode,
  options: {
    variables: TVariables
    skip?: boolean
    refetchOnAttributesChange?: boolean
    throwOnError?: boolean
    onCompleted?: (data: TData | undefined, isRefetch: boolean) => void
  }
) => {
  const {
    variables,
    skip,
    throwOnError = false,
    refetchOnAttributesChange = false,
    onCompleted
  } = options

  // In case when `refetchOnAttributesChange: false` (default value) we have to memoize initial steps attributes to prevent
  // any subsequent query calls with an updated steps attributes.
  // Steps attributes might be updated:
  //     1) During step submission but before going to the next step
  //     2) Initial render of a form for each step
  //     3) When change some form value and have to refetch `newEngagementWizard` query with a new value
  // All these cases produce updated steps attributes but should not trigger query call
  const memoizedAttributes = useMemo(
    () => variables.attributes,
    // In case of `skip` value is changed, we need to update memoizedAttributes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [skip]
  )

  const isRefetchingRef = useRef(false)

  const { refetch, ...rest } = useQuery<TData, TVariables>(query, {
    variables: {
      ...variables,
      attributes: refetchOnAttributesChange
        ? variables.attributes
        : memoizedAttributes
    },
    skip,
    throwOnError,
    onCompleted: onCompleted
      ? (onCompletedData: TData | undefined) => {
          const isRefetching = isRefetchingRef.current

          isRefetchingRef.current = false

          onCompleted(onCompletedData, isRefetching)
        }
      : undefined,
    // important to have it to correctly trigger `onCompleted`
    notifyOnNetworkStatusChange: !!onCompleted
  })

  return {
    ...rest,
    refetch: (...attributes: Parameters<typeof refetch>) => {
      isRefetchingRef.current = true

      return refetch(...attributes)
    }
  }
}

export default useNewEngagementWizardQuery
