import { gql, useGetData } from '@staff-portal/data-layer-service'

import { GetMaxHourlyRateEnhancementsExperimentsDocument } from './get-max-hourly-rate-enabled.staff.gql.types'

export default gql`
  query GetMaxHourlyRateEnhancementsExperiments {
    experiments {
      maxHourlyRateEnhancements {
        enabled
      }
    }
  }
`

export const useGetMaxHourlyRateEnhancementsExperiments = () => {
  const { data: experiments, loading } = useGetData(
    GetMaxHourlyRateEnhancementsExperimentsDocument,
    'experiments'
  )()

  return { experiments, loading }
}
