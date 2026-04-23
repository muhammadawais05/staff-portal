import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { StepIndicatorData, StepMainButton } from '@staff-portal/ui'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { AssigneeFragment } from '@staff-portal/talents'

import ApproveActivationStepModal from '../ApproveActivationStepModal'

export interface Props {
  talentId: string
  stepId: string
  stepName: string
  needsToptalEmail: boolean
  operation: OperationType
  otherAssignee?: AssigneeFragment
  indicatorData: StepIndicatorData
  showCalendarIcon: boolean
}

const ApproveActivationStepModalButton = ({
  talentId,
  stepId,
  stepName,
  otherAssignee,
  needsToptalEmail,
  indicatorData,
  showCalendarIcon,
  operation
}: Props) => {
  const { showModal } = useModal(ApproveActivationStepModal, {
    talentId,
    activationStepId: stepId,
    stepName,
    otherAssignee,
    needsToptalEmail
  })

  return (
    <Operation
      operation={operation}
      disableTooltip
      render={disabled => (
        <StepMainButton
          label={stepName}
          onClick={showModal}
          disabled={disabled}
          indicatorData={indicatorData}
          showCalendarIcon={showCalendarIcon}
          tooltip={
            <StepMainButton.TooltipContent
              stepName={stepName}
              messages={operation.messages}
            />
          }
        />
      )}
    />
  )
}

export default ApproveActivationStepModalButton
