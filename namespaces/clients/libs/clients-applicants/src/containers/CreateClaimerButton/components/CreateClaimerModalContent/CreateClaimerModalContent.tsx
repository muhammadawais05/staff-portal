import React from 'react'

import { GetCreateClaimerDetailsQuery } from '../../data'
import { getQuestionText } from '../../services'
import ContentWithoutPendingCallbackRequest from '../ContentWithoutPendingCallbackRequest/ContentWithoutPendingCallbackRequest'
import ContentWithPendingCallbackRequest from '../ContentWithPendingCallbackRequest/ContentWithPendingCallbackRequest'

type Props = {
  company: NonNullable<GetCreateClaimerDetailsQuery['node']>
  timeZoneName?: string
}

const CreateClaimerModalContent = ({ company, timeZoneName }: Props) => {
  const { fullName, pendingCallbackRequest, obscureLead } = company
  const question = getQuestionText({
    obscureLead,
    fullName
  })

  if (!pendingCallbackRequest) {
    return <ContentWithoutPendingCallbackRequest question={question} />
  }

  return (
    <ContentWithPendingCallbackRequest
      question={question}
      pendingCallbackRequest={pendingCallbackRequest}
      timeZoneName={timeZoneName}
    />
  )
}

export default CreateClaimerModalContent
