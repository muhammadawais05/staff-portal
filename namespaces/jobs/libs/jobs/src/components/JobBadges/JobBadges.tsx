import React from 'react'
import { Container, Tag } from '@toptal/picasso'

export interface Props {
  rehire?: boolean | null
  enterprise?: boolean
  automatedAvailabilityRequests?: boolean | null
}

const JobBadges = ({
  enterprise,
  rehire,
  automatedAvailabilityRequests
}: Props) => {
  if (!enterprise && !rehire && !automatedAvailabilityRequests) {
    return null
  }

  return (
    <Container flex alignItems='center'>
      {rehire && (
        <Container right='xsmall'>
          <Tag.Rectangular indicator='green' data-testid='rehire-tag'>
            Rehire
          </Tag.Rectangular>
        </Container>
      )}
      {enterprise && (
        <Container right='xsmall'>
          <Tag.Rectangular indicator='blue' data-testid='enterprise-tag'>
            Enterprise
          </Tag.Rectangular>
        </Container>
      )}

      {automatedAvailabilityRequests && (
        <Tag.Rectangular indicator='yellow' data-testid='auto-tag'>
          Auto
        </Tag.Rectangular>
      )}
    </Container>
  )
}

export default JobBadges
