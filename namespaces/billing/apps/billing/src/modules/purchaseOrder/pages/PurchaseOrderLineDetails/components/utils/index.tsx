import { useGetPurchaseOrderLineDetailsAttributesLazyQuery } from '../../data'

type requestProperty = 'totalAmount' | 'expiryDate' | 'threshold'

export const getPropertyValue = (id: string, name: requestProperty) => () => {
  const [request, { data, loading, called, error }] =
    useGetPurchaseOrderLineDetailsAttributesLazyQuery({
      variables: {
        id
      }
    })

  return {
    request,
    loading,
    error,
    data: data?.node?.[name] ?? '',
    called
  }
}

export default getPropertyValue
export { adjustAmount, adjustThreshold } from './adjust-values'
