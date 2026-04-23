import {
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery
} from '@staff-portal/data-layer-service'

export const getOpportunityDataHook =
  <TData = string | undefined>(
    variables: OperationVariables & { opportunityId: string },
    queryDocument: TypedDocumentNode,
    dataSelector: (data: TypedDocumentNode['__resultType']) => TData
  ) =>
  () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      queryDocument,
      {
        variables
      }
    )

    return {
      request,
      loading,
      error,
      data: dataSelector(data),
      called
    }
  }
