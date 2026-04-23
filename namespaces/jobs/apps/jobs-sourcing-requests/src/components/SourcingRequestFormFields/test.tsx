import { render, getByRole, screen } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import { SourcingRequestEnterpriseJobStatus } from '@staff-portal/graphql/staff'

import { SourcingRequestJobFragment } from '../../data'
import { BooleanAsString } from '../../types'
import SourcingRequestFormFields from './SourcingRequestFormFields'

type FormValues = {
  // AccountInformation
  enterpriseJobStatus?: SourcingRequestEnterpriseJobStatus
  canShareCompanyName?: BooleanAsString

  // BudgetDetails
  maximumTalentHourlyRate?: string
  noTalentHourlyRateLimit?: boolean
  canShareRate?: BooleanAsString
  canShareRateComment?: string
  canIncreaseRate?: BooleanAsString
  canIncreaseRateComment?: string

  // AdditionalNotes
  additionalNotes?: string
}

const arrangeTest = (
  options: {
    componentProps?: ComponentProps<typeof SourcingRequestFormFields>
    formValues?: FormValues
  } = {}
) => {
  const { componentProps, formValues } = options

  return render(
    <Form onSubmit={jest.fn()} initialValues={formValues}>
      <SourcingRequestFormFields {...componentProps} />
    </Form>
  )
}

const nonEnterpriseJob: SourcingRequestJobFragment = {
  id: '1',
  title: 'Junior Developer (1)',
  webResource: {
    text: 'Junior Developer (1)',
    url: 'http://localhost:3000/platform/staff/jobs/1'
  },
  client: {
    id: '1',
    enterprise: false
  }
}

const enterpriseJob: SourcingRequestJobFragment = {
  id: '2',
  title: 'Senior Developer (2)',
  webResource: {
    text: 'Senior Developer (2)',
    url: 'http://localhost:3000/platform/staff/jobs/2'
  },
  client: {
    id: '2',
    enterprise: true
  }
}

describe('SourcingRequestFormFields', () => {
  it('renders fields', () => {
    const { container } = arrangeTest()

    expect(
      container.querySelector('input[name="jobId"]')
    ).not.toBeInTheDocument()

    // AccountInformation
    expect(screen.getByText('Business Type')).toBeInTheDocument()
    expect(screen.getByTestId('business-type-label')).toHaveTextContent(
      'Not Enterprise'
    )
    expect(screen.queryByText('Enterprise job status')).not.toBeInTheDocument()
    expect(
      screen.getByTestId('can-share-company-name-radio-group')
    ).toHaveTextContent("Can the client's company name be shared?")

    // BudgetDetails
    expect(screen.getByText('Budget Details')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Maximum Talent Hourly Rate')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('No Rate Limit')).toBeInTheDocument()

    expect(screen.getByTestId('can-share-rate-radio-group')).toHaveTextContent(
      'Can this rate be shared with the talent?'
    )
    expect(
      screen.getByRole('textbox', { name: 'canShareRateComment' })
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('can-increase-rate-radio-group')
    ).toHaveTextContent('Can this rate be increased for the right talent?')
    expect(
      screen.getByRole('textbox', { name: 'canIncreaseRateComment' })
    ).toBeInTheDocument()

    // AdditionalNotes
    expect(screen.getByText('Additional Notes')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Additional Notes' })
    ).toBeInTheDocument()
  })

  it('renders fields with initial values', () => {
    const { container } = arrangeTest({
      componentProps: {
        jobId: nonEnterpriseJob.id,
        job: nonEnterpriseJob
      },
      formValues: {
        // AccountInformation
        enterpriseJobStatus: SourcingRequestEnterpriseJobStatus.NONE,
        canShareCompanyName: BooleanAsString.FALSE,

        // BudgetDetails
        maximumTalentHourlyRate: '40.5',
        noTalentHourlyRateLimit: false,
        canShareRate: BooleanAsString.FALSE,
        canShareRateComment: 'Do not share rate',
        canIncreaseRate: BooleanAsString.TRUE,
        canIncreaseRateComment: 'Can negotiate',

        // AdditionalNotes
        additionalNotes: 'Some text'
      }
    })

    expect(container.querySelector(`input[name="jobId"]`)).toHaveValue('1')

    // AccountInformation
    expect(screen.getByText('Business Type')).toBeInTheDocument()
    expect(screen.getByTestId('business-type-label')).toHaveTextContent(
      'Not Enterprise'
    )
    expect(screen.queryByText('Enterprise job status')).not.toBeInTheDocument()

    const canShareCompanyNameGroup = screen.getByTestId(
      'can-share-company-name-radio-group'
    )

    expect(
      getByRole(canShareCompanyNameGroup, 'radio', { name: 'No' })
    ).toBeChecked()

    // BudgetDetails
    expect(screen.getByLabelText('Maximum Talent Hourly Rate')).toHaveValue(
      '40.5'
    )
    expect(screen.getByLabelText('No Rate Limit')).not.toBeChecked()

    const canShareRateGroup = screen.getByTestId('can-share-rate-radio-group')

    expect(getByRole(canShareRateGroup, 'radio', { name: 'No' })).toBeChecked()
    expect(
      screen.getByRole('textbox', { name: 'canShareRateComment' })
    ).toHaveValue('Do not share rate')

    const canIncreaseRateGroup = screen.getByTestId(
      'can-increase-rate-radio-group'
    )

    expect(
      getByRole(canIncreaseRateGroup, 'radio', { name: 'Yes' })
    ).toBeChecked()
    expect(
      screen.getByRole('textbox', { name: 'canIncreaseRateComment' })
    ).toHaveValue('Can negotiate')

    // AdditionalNotes
    expect(screen.getByText('Additional Notes')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Additional Notes' })
    ).toHaveValue('Some text')
  })

  it('renders fields with enterprise job', () => {
    const { container } = arrangeTest({
      componentProps: {
        jobId: enterpriseJob.id,
        job: enterpriseJob
      },
      formValues: {
        enterpriseJobStatus: SourcingRequestEnterpriseJobStatus.CURRENT_NEED
      }
    })

    expect(container.querySelector(`input[name="jobId"]`)).toHaveValue('2')

    // AccountInformation
    expect(screen.getByText('Business Type')).toBeInTheDocument()
    expect(screen.getByTestId('business-type-label')).toHaveTextContent(
      'Enterprise'
    )

    const enterpriseJobStatusGroup = screen.getByTestId(
      'enterprise-job-status-radio-group'
    )

    expect(enterpriseJobStatusGroup).toHaveTextContent('Enterprise job status')
    expect(
      getByRole(enterpriseJobStatusGroup, 'radio', { name: 'Current Need' })
    ).toBeChecked()
  })
})
