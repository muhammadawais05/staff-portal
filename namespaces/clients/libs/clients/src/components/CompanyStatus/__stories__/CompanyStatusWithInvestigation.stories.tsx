import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'
import { ClientCumulativeStatus, Scalars } from '@staff-portal/graphql/staff'

import CompanyStatus from '../CompanyStatus'

export default {
  title: 'Company Status with an investigation'
}

const investigation: {
  startedAt: Scalars['Time']
} = {
  startedAt: '2020-02-20T00:00:00+00:00'
}

const companyData = {
  id: 'testId',
  cumulativeStatus: ClientCumulativeStatus.ACTIVE,
  investigations: { nodes: [investigation] }
}

export const CompanyStatusesSetWithInvestigation = () => {
  const statusOptions = Object.values(ClientCumulativeStatus).map(status => {
    return (
      <Container bottom='medium' key={status}>
        <Container bottom='medium'>
          <Typography size='medium'>
            <b>Company Cumulitive Status</b>: {status}, With an investigation
          </Typography>
        </Container>

        <CompanyStatus
          investigations={companyData.investigations}
          cumulativeStatus={status}
        />
      </Container>
    )
  })

  return (
    <Picasso>
      <Container padded='xlarge'>{statusOptions}</Container>
    </Picasso>
  )
}
