import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  DownloadTalentIpHistoryDocument,
  DownloadTalentIpHistoryMutation
} from './use-download-talent-ip-history.staff.gql.types'

export const DOWNLOAD_TALENT_IP_HISTORY: typeof DownloadTalentIpHistoryDocument = gql`
  mutation DownloadTalentIpHistory($input: DownloadTalentIpHistoryInput!) {
    downloadTalentIpHistory(input: $input) {
      ...MutationResultFragment
      downloadUrl
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDownloadTalentIpHistory = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: (error: Error) => void
  onCompleted: (data: DownloadTalentIpHistoryMutation) => void
}) =>
  useMutation(DOWNLOAD_TALENT_IP_HISTORY, {
    onError,
    onCompleted,
    variables: {
      input: {
        talentId
      }
    }
  })
