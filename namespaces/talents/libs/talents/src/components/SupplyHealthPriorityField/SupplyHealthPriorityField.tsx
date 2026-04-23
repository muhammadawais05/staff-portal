import React from 'react'
import { Tooltip, QuestionMark16, Typography, Container } from '@toptal/picasso'
import { TalentSupplyHealthModelData } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

const SupplyHealthPriorityField = ({
  priority,
  snapshotAt
}: TalentSupplyHealthModelData) => {
  return (
    <Container
      as='span'
      flex
      inline
      alignItems='center'
      data-testid='supply-health-priority'
    >
      {titleize(priority)}
      <Tooltip
        placement='top'
        content={
          <Typography>
            This is the talent's priority as of {snapshotAt}.
            <br />
            The supply health priority identifies where gaps exist between
            client needs and talent in the network.
            <br />
            It depends on talent attributes, including skills, location, rate,
            availability, work experience, and English proficiency.
            <br />
            These attributes are cross-referenced with the demand for current
            jobs, forecasted jobs, and signals from the Growth team to generate
            priority profiles.
          </Typography>
        }
      >
        <Container flex left='xsmall'>
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default SupplyHealthPriorityField
