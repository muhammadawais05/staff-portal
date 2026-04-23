import { GetPurchaseOrderLinesToUpdateQuery } from '../data/getPurchaseOrderLinesToUpdate.graphql.types'

type Data = GetPurchaseOrderLinesToUpdateQuery['node']

const getInitialValues = (data: Data) => ({
  clientName: data?.client?.fullName,
  number: data?.poNumber,
  purchaseOrderLinesAttributes: data?.purchaseOrderLines?.nodes
    ?.filter(poLine => !poLine.archived)
    ?.map(poLine => ({
      id: poLine.id,
      number: poLine.poLineNumber,
      amount: poLine.totalAmount,
      threshold: poLine.threshold,
      expiryDate: poLine.expiryDate,
      disabled: true
    }))
})

export default getInitialValues
