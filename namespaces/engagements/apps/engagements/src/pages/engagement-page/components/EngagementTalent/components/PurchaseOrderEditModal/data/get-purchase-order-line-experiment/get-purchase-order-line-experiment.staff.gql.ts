import { gql, useGetData } from '@staff-portal/data-layer-service'

import { GetPurchaseOrderLineExperimentDocument } from './get-purchase-order-line-experiment.staff.gql.types'

export default gql`
  query GetPurchaseOrderLineExperiment {
    experiments {
      poLines {
        enabled
      }
    }
  }
`

export const useGetPurchaseOrderLineExperiment = () => {
  const { data: experiments, loading } = useGetData(
    GetPurchaseOrderLineExperimentDocument,
    'experiments'
  )({}, { fetchPolicy: 'network-only' })

  return { experiments, loading }
}
