import { gql, useGetData } from '@staff-portal/data-layer-service'

import { GetInvestigationsExperimentsDocument } from './get-investigations-experiments.staff.gql.types'

export const INVESTIGATIONS_EXPERIMENTS_FRAGMENT = gql`
  fragment InvestigationsExperiments on Experiments {
    clientProfileInvestigationTabUpdate {
      enabled
    }
  }
`

export default gql`
  query GetInvestigationsExperiments {
    experiments {
      ...InvestigationsExperiments
    }
  }

  ${INVESTIGATIONS_EXPERIMENTS_FRAGMENT}
`

export const useGetInvestigationsExperiments = () => {
  const { data: experiments, loading } = useGetData(
    GetInvestigationsExperimentsDocument,
    'experiments'
  )({}, { fetchPolicy: 'network-only' })

  return { experiments, loading }
}
