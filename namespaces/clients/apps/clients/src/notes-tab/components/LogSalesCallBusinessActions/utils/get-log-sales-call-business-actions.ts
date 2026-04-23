import { CompanyAction } from '@staff-portal/graphql/staff'
import { CompanyOperationFragment } from '@staff-portal/clients'

import {
  LogSalesCallBusinessAction,
  LogSalesCallMissingAction
} from '../../../types'
import { ClientClaimingOperationsFragment } from '../../../data/client-claiming-operations-fragment'

type Item = {
  label: string
  value: LogSalesCallBusinessAction
  operation: CompanyOperationFragment
}

export const getLogSalesCallBusinessActions = ({
  approveClient: approveClientOperation,
  markClientAsBadLead: markClientAsBadLeadOperation,
  pauseClient: pauseClientOperation,
  repauseClient: repauseClientOperation,
  resumeClient: resumeClientOperation,
  checkClientCompliance: checkClientComplianceOperation
}: ClientClaimingOperationsFragment) => {
  const approveRadio: Item = {
    label: 'Approve',
    value: CompanyAction.APPROVE,
    operation: approveClientOperation
  }

  const pauseRadio: Item = {
    label: 'Pause Lead',
    value: CompanyAction.PAUSE,
    operation: pauseClientOperation
  }

  const resumeRadio: Item = {
    label: 'Resume',
    value: CompanyAction.RESUME,
    operation: resumeClientOperation
  }

  const repauseRadio: Item = {
    label: 'Repause',
    value: CompanyAction.REPAUSE,
    operation: repauseClientOperation
  }

  const markAsBadLeadRadio: Item = {
    label: 'Mark as Bad Lead',
    value: CompanyAction.BAD_LEAD,
    operation: markClientAsBadLeadOperation
  }

  const checkComplianceRadio: Item = {
    label: 'Initiate Compliance Check',
    value: LogSalesCallMissingAction.CHECK_COMPLIANCE,
    operation: checkClientComplianceOperation
  }

  return {
    approveRadio,
    pauseRadio,
    repauseRadio,
    resumeRadio,
    markAsBadLeadRadio,
    checkComplianceRadio
  }
}
