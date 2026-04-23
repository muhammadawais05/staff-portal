import { useGetNode } from '@staff-portal/data-layer-service'
import { Container, SkeletonLoader, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React from 'react'

import { GetClientAvailabilityRequestsDocument } from '../../data/get-client-availability-requests'
import { getNoJobsInfo } from './utils'

type Props = {
  clientId: string
  talentType?: string
  talentId?: string | null
  hasTalentVertical?: boolean
}

const ClientAvailabilityRequestsSelectField = ({
  clientId,
  talentType,
  talentId,
  hasTalentVertical
}: Props) => {
  const { data, loading } = useGetNode(GetClientAvailabilityRequestsDocument)({
    clientId,
    talentId
  })

  if (loading) {
    return (
      <Container data-testid='client-availability-requests-select-field-skeleton'>
        <SkeletonLoader.Typography />
      </Container>
    )
  }
  if (!data) {
    return null
  }

  if (!data.jobs?.nodes.length) {
    const noJobsInfo = getNoJobsInfo({ talentType, hasTalentVertical })

    return (
      <Container data-testid='client-availability-requests-select-field-no-jobs-info'>
        <Typography weight='regular' size='medium'>
          {noJobsInfo}
        </Typography>
      </Container>
    )
  }

  const options = data.jobs.nodes.map(item => ({
    text: item.title,
    value: item.id
  }))

  return (
    <Form.Select
      data-testid='client-availability-requests-select-field-select'
      placeholder='Select Job...'
      name='jobId'
      options={options}
      enableReset
      hint='Select a job from the list'
    />
  )
}

export default ClientAvailabilityRequestsSelectField
