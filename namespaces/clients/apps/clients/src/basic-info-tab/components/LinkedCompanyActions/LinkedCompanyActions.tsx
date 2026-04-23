import React from 'react'
import { isOperationHidden } from '@staff-portal/operations'
import { MoreButton } from '@staff-portal/ui'

import {
  ImportSTAMenuItem,
  SuspendNegotiationMenuItem,
  StartNegotiationMenuItem,
  UpdateNegotiationStatusMenuItem
} from '../../../modals'
import { LinkedCompanyNodeFragment } from '../LinkedCompaniesSection/data'

const LinkedCompanyActions = ({
  company
}: {
  company: LinkedCompanyNodeFragment
}) => {
  const { id: companyId, fullName: companyName, currentNegotiation } = company
  const actionsAvailable =
    !isOperationHidden(company.operations?.importSTA) ||
    !isOperationHidden(company.operations?.startNegotiationForClient) ||
    !isOperationHidden(
      company?.currentNegotiation?.operations?.updateNegotiationStatus
    ) ||
    !isOperationHidden(
      company?.currentNegotiation?.operations?.suspendNegotiation
    )

  return (
    <MoreButton hidden={!actionsAvailable} flex justifyContent='flex-end'>
      <ImportSTAMenuItem
        companyId={companyId}
        operation={company.operations?.importSTA}
      />
      <StartNegotiationMenuItem
        companyId={companyId}
        companyName={companyName}
        operation={company.operations?.startNegotiationForClient}
      />
      {currentNegotiation &&
        <UpdateNegotiationStatusMenuItem
          companyName={companyName}
          operation={
            currentNegotiation.operations?.updateNegotiationStatus
          }
          negotiationId={currentNegotiation.id}
          negotiationStatus={currentNegotiation.status}
        />
      }
      {currentNegotiation &&
        <SuspendNegotiationMenuItem
          companyName={companyName}
          operation={currentNegotiation.operations?.suspendNegotiation}
          negotiationId={currentNegotiation.id}
        />
      }
    </MoreButton>
  )
}

export default LinkedCompanyActions
