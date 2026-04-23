import React from 'react'
import { AnswerWithComments } from '@staff-portal/jobs'
import { Maybe } from '@staff-portal/graphql/staff'

export interface Props {
  positionsCount?: Maybe<number>
  positionsComment?: Maybe<string>
}

const SourcingRequestPositionsField = ({
  positionsCount,
  positionsComment
}: Props) => (
  <AnswerWithComments
    data-testid='sourcing-request-positions'
    answer={positionsCount}
    comments={positionsComment}
  />
)

export default SourcingRequestPositionsField
