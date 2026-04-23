import React, { ReactNode } from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { StepIndicatorData, StepMainButton } from '@staff-portal/ui'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import ClaimActivationStepModal from '../ClaimActivationStepModal'

export interface Props {
  talentId: string
  stepId: string
  stepName: string
  staffId: string
  staffFullName: string
  talentFullName: string
  indicatorData: StepIndicatorData
  showCalendarIcon: boolean
  icon?: ReactNode
  operation: OperationType
}

export const ClaimActivationStepModalButton = ({
  talentId,
  stepId,
  stepName,
  staffId,
  staffFullName,
  talentFullName,
  indicatorData,
  showCalendarIcon,
  operation
}: Props) => {
  const { showModal } = useModal(ClaimActivationStepModal, {
    talentId,
    stepId,
    stepName,
    talentFullName,
    staffId,
    staffFullName
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

export default ClaimActivationStepModalButton
