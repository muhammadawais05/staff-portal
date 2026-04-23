import { useGetClientBillingNetTermsLazyQuery } from '../../../data/getClientBillingNetTerms.graphql.types'

export const useGetNetTerms = (clientId: string) => {
  const [request, { data, loading, error }] =
    useGetClientBillingNetTermsLazyQuery({
      fetchPolicy: 'network-only',
      variables: {
        clientId
      }
    })

  return () => ({
    data: data?.node?.netTerms ?? undefined,
    request,
    loading,
    error
  })
}
