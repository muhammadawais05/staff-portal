import React from 'react'
import { Container } from '@toptal/picasso'
import { CompanyRepresentativeCumulativeStatus as CumulativeStatus } from '@staff-portal/graphql/staff'

import LoginStatus from '..'
import { withPicasso } from '../../../../services'

export default {
  title: 'Company Profile/Contacts/Login Status'
}

export const AllStatuses = () => {
  const statuses = Object.keys(CumulativeStatus).map(status => (
    <Container css={{ display: 'inline-flex', padding: '1rem' }} key={status}>
      <LoginStatus status={status as CumulativeStatus} />
    </Container>
  ))

  return withPicasso(<Container padded='xlarge'>{statuses}</Container>)
}
