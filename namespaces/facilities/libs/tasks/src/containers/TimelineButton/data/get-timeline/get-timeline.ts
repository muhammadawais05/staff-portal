import { useMemo } from 'react'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'
import { usePerformedActionsQuery } from '@staff-portal/chronicles'
import { useGetUsersByEmails as useGetUsersByEmailsDataHook } from '@staff-portal/communication'

import { TimelineEmailMessageFragment } from '../timeline-email-message-fragment/timeline-email-message-fragment.lens.gql.types'
import { useGetAllEmailMessages, useGetNotableNode } from '../../data'
import {
  getTimelineRecordsFromCommunications,
  getTimelineRecordsFromHistoryActions,
  getTimelineRecordsFromNotes
} from './utils'

const HISTORY_ACTIONS_COUNT = 500

const getNodeType = (type?: 'Client' | string) => {
  if (!type) {
    return
  }

  if (type === 'Client') {
    return 'Company'
  }

  return titleize(type.replace(/([A-Z])/g, ' $1').trim())
}

const useGetHistoryActions = (nodeId: string) => {
  const { type, id } = decodeEntityId(nodeId)
  const nodeGID = encodeGid(type, id)

  return usePerformedActionsQuery({
    feeds: [[nodeGID]],
    limit: HISTORY_ACTIONS_COUNT
  })
}

const useGetUsersByEmails = (
  emailMessages: TimelineEmailMessageFragment[] | undefined,
  skip: boolean
) => {
  const emails = emailMessages?.flatMap(entry => [
    entry.from.email,
    ...entry.to.map(toEmail => toEmail.email)
  ])

  return useGetUsersByEmailsDataHook(emails ?? [], { skip })
}

const useGetCommunications = (nodeId: string, email?: string) => {
  const { data, error, loading } = useGetAllEmailMessages(email, nodeId)

  const emailMessages = data?.emailMessages.entities
  const emailMessagesTotalCount = data?.emailMessages.totalCount

  const skipGetUsersByEmails =
    !emailMessagesTotalCount ||
    emailMessages?.length !== emailMessagesTotalCount

  const {
    data: usersWithEmails,
    error: usersByEmailsError,
    loading: usersByEmailsLoading
  } = useGetUsersByEmails(emailMessages, skipGetUsersByEmails)

  const result = useMemo(
    () =>
      emailMessages?.map(entry => ({
        ...entry,
        fromUser:
          usersWithEmails?.find(user => user?.email === entry.from.email) ||
          entry.from,
        toUsers: entry.to.map(
          toEmail =>
            // eslint-disable-next-line max-nested-callbacks
            usersWithEmails?.find(user => user?.email === toEmail.email) ||
            toEmail
        )
      })) ?? [],
    [emailMessages, usersWithEmails]
  )

  return {
    data: result,
    error: error || usersByEmailsError,
    loading: loading || usersByEmailsLoading
  }
}

/* eslint-disable complexity */
export const useGetTimeline = (nodeId: string) => {
  const {
    data: notesData,
    error: notesError,
    loading: notesLoading
  } = useGetNotableNode(nodeId)

  const email = notesData && 'email' in notesData ? notesData.email : undefined

  const {
    data: historyActionsData,
    error: historyActionsError,
    loading: historyActionsLoading
  } = useGetHistoryActions(nodeId)

  const {
    data: communicationsData,
    error: communicationsError,
    loading: communicationsLoading
  } = useGetCommunications(nodeId, email)

  const data = useMemo(
    () => ({
      timeline: {
        notes: getTimelineRecordsFromNotes(notesData?.notes?.nodes || []),
        actions: getTimelineRecordsFromHistoryActions(historyActionsData),
        communications: getTimelineRecordsFromCommunications(communicationsData)
      },
      nodeType: getNodeType(notesData?.__typename),
      nodeTitle: notesData?.webResource.text,
      hasCommunication: !!email
    }),
    [notesData, historyActionsData, communicationsData, email]
  )

  const loading = notesLoading || historyActionsLoading || communicationsLoading
  const error = notesError || historyActionsError || communicationsError

  return { data, loading, error }
}
