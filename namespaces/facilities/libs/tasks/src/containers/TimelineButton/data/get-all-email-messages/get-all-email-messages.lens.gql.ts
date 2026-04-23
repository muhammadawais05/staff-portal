import { useEffect, useMemo, useRef, useState } from 'react'
import { gql, useQuery, LENS_CONTEXT } from '@staff-portal/data-layer-service'

import {
  GetAllEmailMessagesDocument,
  GetAllEmailMessagesQuery
} from './get-all-email-messages.lens.gql.types'
import { TIMELINE_EMAIL_MESSAGE_FRAGMENT } from '../timeline-email-message-fragment'

const MAX_PAGE_SIZE = 100

export const GET_ALL_EMAIL_MESSAGES: typeof GetAllEmailMessagesDocument = gql`
  query GetAllEmailMessages(
    $badges: EmailMessageBadgedSearch
    $page: Int
    $pageSize: PageSize
  ) {
    emailMessages(badges: $badges, page: $page, pageSize: $pageSize) {
      totalCount
      maxCount
      entities {
        ...TimelineEmailMessageFragment
      }
      __typename
    }
  }

  ${TIMELINE_EMAIL_MESSAGE_FRAGMENT}
`

export const useGetAllEmailMessages = (
  userEmail?: string,
  roleOrClientId?: string
) => {
  const page = useRef(1)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const variables = useMemo(
    () => ({
      badges: { userEmails: [[userEmail as string]] },
      pageSize: MAX_PAGE_SIZE
    }),
    [userEmail]
  )

  const {
    data,
    loading: initialFetchLoading,
    error,
    fetchMore
  } = useQuery(GET_ALL_EMAIL_MESSAGES, {
    variables,
    context: { type: LENS_CONTEXT, roleId: roleOrClientId },
    skip: !userEmail
  })

  useEffect(() => {
    if (
      !data ||
      data.emailMessages.totalCount <= data.emailMessages.entities.length
    ) {
      return
    }

    page.current++
    setFetchMoreLoading(true)

    // TODO: https://toptal-core.atlassian.net/browse/SP-1441
    // eslint-disable-next-line promise/catch-or-return
    fetchMore({
      variables: {
        ...variables,
        page: page.current
      },
      updateQuery: (
        previousResult: GetAllEmailMessagesQuery,
        { fetchMoreResult }: { fetchMoreResult?: GetAllEmailMessagesQuery }
      ) => {
        if (!fetchMoreResult?.emailMessages.entities.length) {
          return previousResult
        }

        return {
          emailMessages: {
            ...fetchMoreResult.emailMessages,
            entities: [
              ...previousResult.emailMessages.entities,
              ...fetchMoreResult.emailMessages.entities
            ]
          }
        }
      }
    }).finally(() => setFetchMoreLoading(false))
  }, [data, variables, fetchMore])

  return { data, loading: initialFetchLoading || fetchMoreLoading, error }
}
