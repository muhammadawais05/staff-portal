import React, { ReactNode } from 'react'
import { ColorType } from '@toptal/picasso'
import { CompanyRepresentativeCumulativeStatus as CumulativeStatus } from '@staff-portal/graphql/staff'

import TooltipWithIcon from '../TooltipWithIcon'
import * as S from './styles'

type StatusDisplay = {
  color: ColorType
  label: ReactNode
  tooltip?: ReactNode
}

const LoginStatus = ({ status }: { status: CumulativeStatus }) => {
  const { label, color, tooltip } = LOGIN_STATUSES[status]

  return (
    <TooltipWithIcon tooltip={tooltip} color={color}>
      {label}
    </TooltipWithIcon>
  )
}

const PreLine = ({ children }: { children: string }) => {
  return <pre css={S.preLine}>{children}</pre>
}

const LOGIN_STATUSES: Record<CumulativeStatus, StatusDisplay> = {
  // grey
  [CumulativeStatus.NO_LOGIN]: {
    color: 'grey',
    label: 'No Login',
    tooltip: (
      <PreLine>
        {`Cannot log in to the client portal.
        Is not visible to other contacts.
        Is receiving communication emails.
        May be contacted by staff via any method.`}
      </PreLine>
    )
  },
  [CumulativeStatus.PENDING_APPROVAL]: {
    color: 'grey',
    label: 'Pending Approval',
    tooltip: (
      <PreLine>
        {`Cannot log in to the client portal until company is approved.
        Is visible to other contacts.
        Is receiving communication emails.
        May be contacted by staff via any method.`}
      </PreLine>
    )
  },
  [CumulativeStatus.APPLIED]: {
    color: 'grey',
    label: 'Applied'
  },

  // green
  [CumulativeStatus.ACTIVE]: {
    color: 'green',
    label: 'Active',
    tooltip: (
      <PreLine>
        {`Has set a password and can log in to the portal.
        Is visible to other contacts and may be contacted by staff.`}
      </PreLine>
    )
  },
  [CumulativeStatus.PENDING_LOGIN]: {
    color: 'green',
    label: 'Pending Login',
    tooltip: (
      <PreLine>
        {`The user has been invited to log in,
        but has not yet set a password.
        Is visible to other contacts.
        Is receiving communication emails.
        May be contacted by staff via any method.`}
      </PreLine>
    )
  },

  // red
  [CumulativeStatus.DELETED]: {
    color: 'red',
    label: 'Deleted',
    tooltip: (
      <PreLine>
        {`Cannot log in to the client portal
        Is visible to other contacts.
        Is not receiving communication emails.
        Must not be contacted by staff for any reason.`}
      </PreLine>
    )
  },
  [CumulativeStatus.REJECTED]: {
    color: 'red',
    label: 'Rejected'
  },
  [CumulativeStatus.REMOVED]: {
    color: 'red',
    label: 'Removed'
  }
}

export default LoginStatus
