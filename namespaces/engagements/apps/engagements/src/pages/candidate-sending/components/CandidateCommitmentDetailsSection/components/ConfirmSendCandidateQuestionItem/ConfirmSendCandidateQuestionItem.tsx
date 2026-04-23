import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'

import { getQuestionText } from './utils'
import { PreviousTalentEngagementForClientFragment } from '../../../../data/get-availability-step-data'

export type Props = {
  previousTalentEngagementForClient?: Maybe<PreviousTalentEngagementForClientFragment>
  talentFullName: string
  talentProfileLink?: Maybe<string>
}
const ConfirmSendCandidateQuestionItem = ({
  previousTalentEngagementForClient,
  talentFullName,
  talentProfileLink
}: Props) => {
  const hasPreviousTalentEngagementForClient =
    !!previousTalentEngagementForClient

  if (!hasPreviousTalentEngagementForClient) {
    return null
  }

  const questionText = getQuestionText({
    previousTalentEngagementForClient,
    talentFullName,
    talentProfileLink
  })

  return (
    <DetailedList.Row>
      <DetailedList.Item multilines label={<>{questionText}</>}>
        <Form.Checkbox
          required
          name='sendCandidateConfirmed'
          label='Yes, I want to send this candidate to the client.'
          titleCase={false}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default ConfirmSendCandidateQuestionItem
