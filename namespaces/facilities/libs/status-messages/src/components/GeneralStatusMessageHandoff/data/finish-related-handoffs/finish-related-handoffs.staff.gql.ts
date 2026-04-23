import { StatusMessageTag } from '@staff-portal/graphql/staff'
import { gql, useMutation } from '@staff-portal/data-layer-service'

import { GetStatusMessagesQuery } from '../../../../data/get-general-status-messages'
import {
  FinishRelatedHandoffsDocument,
  FinishRelatedHandoffsMutation
} from './finish-related-handoffs.staff.gql.types'
import getCurrentTimezoneSettings from '../../../../utils/get-current-timezone-settings'
import { GET_STATUS_MESSAGES } from '../../../../data/get-general-status-messages/get-status-messages.staff.gql'

export const FINISH_RELATED_HANDOFFS: typeof FinishRelatedHandoffsDocument = gql`
  mutation FinishRelatedHandoffs {
    finishRelatedHandoffs(input: {}) {
      success
      errors {
        code
        key
        message
      }
    }
  }
`

export const useFinishRelatedHandoffs = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: FinishRelatedHandoffsMutation) => void
}) => {
  return useMutation(FINISH_RELATED_HANDOFFS, {
    onError,
    onCompleted,
    update: (cache, { data }) => {
      if (!data?.finishRelatedHandoffs?.success) {
        return
      }

      const { timezoneName, timezoneOffset } = getCurrentTimezoneSettings()
      const cacheData = cache.readQuery<GetStatusMessagesQuery>({
        query: GET_STATUS_MESSAGES,
        variables: { timezoneName, timezoneOffset }
      })

      if (!cacheData) {
        return
      }

      const newCacheData = {
        ...cacheData,
        viewer: {
          ...cacheData.viewer,
          statusMessages: {
            nodes: cacheData.viewer.statusMessages.nodes,
            __typename: 'StatusMessageConnection'
          },
          __typename: 'Viewer'
        }
      }
      const { statusMessages } = newCacheData.viewer

      statusMessages.nodes = statusMessages.nodes.filter(
        statusMessage => statusMessage.tag !== StatusMessageTag.HANDOFF_FINISHED
      )

      cache.writeQuery({
        query: GET_STATUS_MESSAGES,
        variables: { timezoneName, timezoneOffset },
        data: newCacheData
      })
    }
  })
}
