import React, { ReactNode } from 'react'
import { Table, Typography, Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { OnlineTestAttemptOperations } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'
import { useUserDateFormatter } from '@staff-portal/current-user'

import TalentSendNewOnlineTestAttemptButton from '../TalentSendNewOnlineTestAttemptButton'
import TalentTrackOnlineTestAttemptButton from '../TalentTrackOnlineTestAttemptButton'
import TalentCancelOnlineTestButton from '../TalentCancelOnlineTestButton'

const getActions = ({
  id,
  testName,
  tracked,
  operations: {
    sendNewTestForOnlineTestAttempt: sendNewTestForOnlineTestAttemptOperation,
    trackOnlineTestAttempt: trackOnlineTestAttemptOperation,
    cancelOnlineTestAttempt: cancelOnlineTestAttemptOperation
  },
  typename,
  talentId
}: {
  id: string
  testName: string
  tracked: boolean
  operations: OnlineTestAttemptOperations
  typename: string
  talentId: string
}) => {
  // TODO: this double type check problem should be fixed after this reported bug in apollo
  // get merged: https://github.com/apollographql/apollo-server/issues/4283
  const testType =
    typename === NodeType.CODILITY_RESULT
      ? NodeType.CODILITY_RESULT
      : NodeType.HACKER_RANK_RESULT

  if (tracked) {
    return (
      <TalentSendNewOnlineTestAttemptButton
        talentId={talentId}
        onlineTestAttemptId={id}
        operation={sendNewTestForOnlineTestAttemptOperation}
        nodeType={testType}
      />
    )
  }

  return (
    <Container flex>
      <TalentTrackOnlineTestAttemptButton
        talentId={talentId}
        onlineTestAttemptId={id}
        operation={trackOnlineTestAttemptOperation}
        nodeType={testType}
      />
      <TalentCancelOnlineTestButton
        talentId={talentId}
        testId={id}
        testName={testName}
        operation={cancelOnlineTestAttemptOperation}
        nodeType={testType}
      />
    </Container>
  )
}

export type Props = {
  id: string
  testName?: string
  createdAt: string
  finishedAt?: string | null
  tracked: boolean
  statusText: ReactNode
  operations: OnlineTestAttemptOperations
  typename: string
  talentId: string
  isActionsVisible: boolean
  stripeEven?: boolean
}

const TalentOnlineTestsItem = ({
  id,
  testName = '',
  createdAt,
  finishedAt,
  tracked,
  statusText,
  operations,
  typename,
  talentId,
  isActionsVisible,
  stripeEven
}: Props) => {
  const userDateFormatter = useUserDateFormatter()

  return (
    <Table.Row key={id} stripeEven={stripeEven}>
      <Table.Cell>{testName}</Table.Cell>
      <Table.Cell>
        {tracked ? (
          <Typography color='green' weight='semibold'>
            Tracked
          </Typography>
        ) : (
          NO_VALUE
        )}
      </Table.Cell>
      <Table.Cell>{statusText}</Table.Cell>
      <Table.Cell>{userDateFormatter(createdAt)}</Table.Cell>
      <Table.Cell>
        {finishedAt ? userDateFormatter(finishedAt) : NO_VALUE}
      </Table.Cell>
      {isActionsVisible && (
        <Table.Cell>
          {getActions({
            id,
            testName,
            tracked,
            operations,
            typename,
            talentId
          })}
        </Table.Cell>
      )}
    </Table.Row>
  )
}

export default TalentOnlineTestsItem
