import { Form } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { OfacStatus, Maybe } from '@staff-portal/graphql/staff'

import { ClientStatus } from '../../../enums'
import { ClientClaimingOperationsFragment } from '../../data/client-claiming-operations-fragment'
import LogSalesCallRadioButton from '../LogSalesCallRadioButton'
import * as S from './styles'
import { getLogSalesCallBusinessActions } from './utils'

export interface Props {
  clientPaused: boolean
  clientStatus?: Maybe<string>
  ofacStatus?: OfacStatus
  ofacStatusSuccess: boolean
  ofacCheckNotStarted: boolean
  ofacCheckInProgress: boolean
  ofacFullyChecked: boolean
  operations: ClientClaimingOperationsFragment
}

const LogSalesCallBusinessActions = ({
  clientPaused,
  clientStatus,
  ofacStatus,
  ofacStatusSuccess,
  ofacCheckNotStarted,
  ofacCheckInProgress,
  ofacFullyChecked,
  operations
}: Props) => {
  const {
    approveRadio,
    pauseRadio,
    repauseRadio,
    resumeRadio,
    markAsBadLeadRadio,
    checkComplianceRadio
  } = getLogSalesCallBusinessActions(operations)

  const pausedStatuses = useMemo(() => {
    let result = [markAsBadLeadRadio, resumeRadio, repauseRadio]

    if (ofacStatusSuccess) {
      result = [approveRadio, ...result]
    }

    if (ofacCheckNotStarted) {
      result = [...result, checkComplianceRadio]
    }

    return result
  }, [
    approveRadio,
    checkComplianceRadio,
    markAsBadLeadRadio,
    ofacCheckNotStarted,
    ofacStatusSuccess,
    repauseRadio,
    resumeRadio
  ])

  const statuses = useMemo(() => {
    if (clientPaused) {
      return pausedStatuses
    }

    if (
      ofacCheckInProgress ||
      clientStatus === ClientStatus.ACTIVE ||
      (ofacStatus === OfacStatus.INVESTIGATION && ofacFullyChecked)
    ) {
      return [pauseRadio, markAsBadLeadRadio]
    }

    if (ofacCheckNotStarted) {
      return [markAsBadLeadRadio, pauseRadio, checkComplianceRadio]
    }

    return [approveRadio, pauseRadio, markAsBadLeadRadio]
  }, [
    approveRadio,
    checkComplianceRadio,
    clientPaused,
    clientStatus,
    markAsBadLeadRadio,
    ofacCheckInProgress,
    ofacCheckNotStarted,
    ofacFullyChecked,
    ofacStatus,
    pauseRadio,
    pausedStatuses
  ])

  return (
    <Form.RadioGroup
      css={S.companyAction}
      required
      name='companyAction'
      horizontal
    >
      {statuses.map(({ label, value, operation }) => (
        <LogSalesCallRadioButton
          key={value}
          label={label}
          value={value}
          operation={operation}
        />
      ))}
    </Form.RadioGroup>
  )
}

export default LogSalesCallBusinessActions
