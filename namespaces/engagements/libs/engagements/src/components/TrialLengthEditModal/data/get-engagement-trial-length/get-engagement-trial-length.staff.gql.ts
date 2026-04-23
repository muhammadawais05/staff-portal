import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@toptal/picasso/utils'

import { GetEngagementTrialLengthDocument } from './get-engagement-trial-length.staff.gql.types'

export default gql`
  query GetEngagementTrialLength($engagementId: ID!) {
    viewer {
      maxEngagementTrialLength
    }
    node(id: $engagementId) {
      ... on Engagement {
        id
        startDate
        trialLength
      }
    }
  }
`

export const useGetEngagementTrialLength = (engagementId: string) => {
  const { showError } = useNotifications()
  const { data, loading } = useQuery(GetEngagementTrialLengthDocument, {
    variables: { engagementId },
    onCompleted: ({ node }) => {
      if (!node) {
        showError('Unable to get the trial length.')

        return
      }
    },
    onError: () => {
      showError('Unable to get the trial length.')
    },
    fetchPolicy: 'cache-first'
  })

  return {
    trialLength: data?.node?.trialLength,
    startDate: data?.node?.startDate,
    maxEngagementTrialLength: data?.viewer?.maxEngagementTrialLength,
    loading
  }
}
