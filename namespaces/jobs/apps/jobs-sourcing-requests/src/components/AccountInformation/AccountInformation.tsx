import React from 'react'
import { Section, Container, Typography, Form } from '@toptal/picasso'
import { Form as PicassoForm } from '@toptal/picasso-forms'
import { SourcingRequestEnterpriseJobStatus } from '@staff-portal/graphql/staff'

import { BooleanAsString } from '../../types'

export type Props = {
  enterprise?: boolean
}

const ALLOWED_ENTERPRISE_JOB_STATUSES = [
  {
    value: SourcingRequestEnterpriseJobStatus.CURRENT_NEED,
    label: 'Current Need',
    hint: 'Client is actively seeking talent for this job'
  },
  {
    value: SourcingRequestEnterpriseJobStatus.DOOR_OPENING,
    label: 'Door Opening',
    hint: "We're pushing to open the door with the client"
  },
  {
    value: SourcingRequestEnterpriseJobStatus.EARLY_SOURCING,
    label: 'Early Sourcing',
    hint: 'We have clarity on future needs and are proactively sourcing for it'
  }
]

const AccountInformation = ({ enterprise }: Props) => {
  return (
    <Container top='medium'>
      <Section title='Account Information' variant='withHeaderBar'>
        <Form.Field>
          <Form.Label>Business Type</Form.Label>
          <Typography
            size='medium'
            weight='semibold'
            data-testid='business-type-label'
          >
            {enterprise ? 'Enterprise' : 'Not Enterprise'}
          </Typography>
        </Form.Field>

        {enterprise && (
          <PicassoForm.RadioGroup
            name='enterpriseJobStatus'
            label='Enterprise job status'
            data-testid='enterprise-job-status-radio-group'
            required
          >
            {ALLOWED_ENTERPRISE_JOB_STATUSES.map(status => (
              <Form.Field key={status.value} hint={status.hint}>
                <PicassoForm.Radio label={status.label} value={status.value} />
              </Form.Field>
            ))}
          </PicassoForm.RadioGroup>
        )}

        <PicassoForm.RadioGroup
          name='canShareCompanyName'
          label="Can the client's company name be shared?"
          data-testid='can-share-company-name-radio-group'
          horizontal
          required
        >
          <PicassoForm.Radio label='Yes' value={BooleanAsString.TRUE} />
          <PicassoForm.Radio label='No' value={BooleanAsString.FALSE} />
        </PicassoForm.RadioGroup>
      </Section>
    </Container>
  )
}

export default AccountInformation
