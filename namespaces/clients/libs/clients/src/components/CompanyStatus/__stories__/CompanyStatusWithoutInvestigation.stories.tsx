import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'
import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import CompanyStatus from '../CompanyStatus'

export default {
  title: 'Company Status without an investigation'
}

const companyData = {
  id: 'testId',
  cumulativeStatus: ClientCumulativeStatus.ACTIVE,
  investigations: { nodes: {} }
}

export const CompanyStatusesSetWithoutInvestigation = () => {
  const statusOptions = Object.values(ClientCumulativeStatus).map(status => {
    companyData.cumulativeStatus = status

    return (
      <Container bottom='medium' key={status}>
        <Container bottom='medium'>
          <Typography size='medium'>
            <b>Company Cumulitive Status</b>: {status}, No any investigation
          </Typography>
        </Container>

        <CompanyStatus
          cumulativeStatus={status}
          investigations={{ nodes: [] }}
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
