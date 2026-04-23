import React, { useMemo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { getRoleTypeText } from '@staff-portal/facilities'

import { JobAvailabilityRequestEdgeFragment } from '../RequestAvailabilityForm/data'

export interface Props {
  jobAvailabilityRequests: JobAvailabilityRequestEdgeFragment[]
  talentType: string
  initialValue?: string
}

const FormJobSelection = ({
  jobAvailabilityRequests,
  talentType,
  initialValue
}: Props) => {
  const jobOptions = useMemo(
    () =>
      jobAvailabilityRequests.map(({ job: { id, title } }) => ({
        text: title,
        value: id
      })),
    [jobAvailabilityRequests]
  )

  if (!jobAvailabilityRequests?.length) {
    const talentTypeText = getRoleTypeText(talentType)

    return (
      <Container top='small' bottom='small'>
        <Typography size='medium'>
          This company has no pending jobs matching {talentTypeText}'s
          specializations. Try to select another one.
        </Typography>
      </Container>
    )
  }

  return (
    <Form.Select
      required
      label='Job'
      name='jobId'
      placeholder='Select job...'
      initialValue={initialValue}
      options={jobOptions}
      data-testid='form-job-select-job-field'
    />
  )
}

export default FormJobSelection
