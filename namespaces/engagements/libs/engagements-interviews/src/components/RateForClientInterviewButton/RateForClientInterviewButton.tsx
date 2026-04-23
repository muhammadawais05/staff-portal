import { Operation } from '@staff-portal/graphql/staff'
import { ModalActionItem } from '@staff-portal/modals-service'
import React from 'react'

import RateForClientInterviewModal from '../RateForClientInterviewModal/RateForClientInterviewModal'

interface Props {
  interviewId: string
  engagementId: string
  operation: Operation
}

const RateForClientInterviewButton = ({
  interviewId,
  engagementId,
  operation
}: Props) => (
  <ModalActionItem
    size='small'
    variant='secondary'
    componentType='button'
    modal={RateForClientInterviewModal}
    modalProps={{ engagementId, interviewId }}
    operation={operation}
    data-testid='rate-for-client-interview-button'
  >
    Rate for Client
  </ModalActionItem>
)

export default RateForClientInterviewButton
