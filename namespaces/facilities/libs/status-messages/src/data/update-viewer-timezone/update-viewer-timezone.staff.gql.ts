import { cloneDeep } from 'lodash-es'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import {
  GetCurrentUserQuery,
  GET_CURRENT_USER
} from '@staff-portal/current-user'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateViewerTimezoneDocument,
  UpdateViewerTimezoneMutation
} from './update-viewer-timezone.staff.gql.types'
import getCurrentTimezoneSettings from '../../utils/get-current-timezone-settings'

export const UPDATE_VIEWER_TIMEZONE: typeof UpdateViewerTimezoneDocument = gql`
  mutation UpdateViewerTimezone($input: UpdateViewerTimeZoneInput!) {
    updateViewerTimeZone(input: $input) {
      ...MutationResultFragment
      viewer {
        me {
          id
          timeZone {
            ...TimeZoneFragment
          }
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`

interface Options {
  onCompleted: (data: UpdateViewerTimezoneMutation) => void
  onError: () => void
}

export const useUpdateViewerTimezone = ({ onCompleted, onError }: Options) => {
  const { timezoneName } = getCurrentTimezoneSettings()

  const [updateViewerTimezone] = useMutation(UPDATE_VIEWER_TIMEZONE, {
    onCompleted,
    onError,
    update(cache, { data }) {
      if (!data?.updateViewerTimeZone?.success) {
        return
      }

      const currentUserCache = cache.readQuery<GetCurrentUserQuery>({
        query: GET_CURRENT_USER
      })

      if (!currentUserCache) {
        return
      }

      // Apollo v3 does not accept directly mutations in the cache:
      // https://github.com/apollographql/apollo-client/issues/5903
      const nextCurrentUser = cloneDeep(currentUserCache)

      nextCurrentUser.viewer.me.timeZone = {
        value: data.updateViewerTimeZone.viewer?.me.timeZone?.value,
        name: data.updateViewerTimeZone.viewer?.me.timeZone?.name,
        __typename: 'TimeZone'
      } as GetCurrentUserQuery['viewer']['me']['timeZone']

      cache.writeQuery({ query: GET_CURRENT_USER, data: nextCurrentUser })
    }
  })

  return {
    updateViewerTimezone: () => {
      if (!timezoneName) {
        throw new Error('Unable to detect current timezone.')
      }

      updateViewerTimezone({
        variables: { input: { timeZoneName: timezoneName } }
      })
    }
  }
}
