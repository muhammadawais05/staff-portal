import React from 'react'
import { Alert, Container } from '@toptal/picasso'
import { OfacStatus } from '@staff-portal/graphql/staff'

import { EmailApplicantsApplicationFragment } from '../../data/get-email-applicants-recipient/get-email-applicants-recipient.staff.gql.types'

const OFAC_STATUS_TEXT: Record<OfacStatus, string> = {
  [OfacStatus.NORMAL]: 'normal',
  [OfacStatus.RESTRICTED]: 'restricted',
  [OfacStatus.INVESTIGATION]: 'investigation'
}

type Props = {
  applications?: EmailApplicantsApplicationFragment[]
}

const OfacStatusesNotification = ({ applications }: Props) => {
  if (!applications) {
    return null
  }

  const problematicApplications = applications?.filter(
    applicant => applicant.talent.ofacStatus !== OfacStatus.NORMAL
  )

  if (!problematicApplications?.length) {
    return null
  }

  const statuses: OfacStatus[] = []
  const names: string[] = []

  problematicApplications.forEach(({ talent }) => {
    const { ofacStatus, fullName } = talent

    if (ofacStatus && !statuses.includes(ofacStatus)) {
      statuses.push(ofacStatus)
    }
    names.push(fullName)
  })

  const statusesFormatted = statuses
    .map(status => OFAC_STATUS_TEXT[status])
    .join(' and ')
  const namesFormatted = names.join(' and ')

  return (
    <Container top='small' data-testid='ofac-statuses-notification'>
      <Alert variant='red'>
        {namesFormatted} have {`"${statusesFormatted}"`} OFAC status(es) -
        communication with them should be avoided except the communication
        required for the OFAC investigation.
      </Alert>
    </Container>
  )
}

export default OfacStatusesNotification
