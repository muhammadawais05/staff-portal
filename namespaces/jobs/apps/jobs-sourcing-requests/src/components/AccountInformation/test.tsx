import { render, getByRole, screen } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import { SourcingRequestEnterpriseJobStatus } from '@staff-portal/graphql/staff'

import { BooleanAsString } from '../../types'
import AccountInformation from './AccountInformation'

type FormValues = {
  enterpriseJobStatus?: SourcingRequestEnterpriseJobStatus
  canShareCompanyName?: BooleanAsString
}

const arrangeTest = (
  options: {
    componentProps?: ComponentProps<typeof AccountInformation>
    formValues?: FormValues
  } = {}
) => {
  const { componentProps, formValues } = options

  return render(
    <Form onSubmit={jest.fn()} initialValues={formValues}>
      <AccountInformation {...componentProps} />
    </Form>
  )
}

describe('AccountInformation', () => {
  it('renders fields without initial values', () => {
    arrangeTest()

    // AccountInformation
    expect(screen.getByText('Business Type')).toBeInTheDocument()
    expect(screen.getByTestId('business-type-label')).toHaveTextContent(
      'Not Enterprise'
    )
    expect(screen.queryByText('Enterprise job status')).not.toBeInTheDocument()
    expect(
      screen.getByTestId('can-share-company-name-radio-group')
    ).toHaveTextContent("Can the client's company name be shared?")
  })

  it('renders fields with initial values', () => {
    arrangeTest({
      formValues: {
        canShareCompanyName: BooleanAsString.FALSE
      }
    })

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
  })

  it('renders Enterprise job status field', () => {
    arrangeTest({
      componentProps: {
        enterprise: true
      },
      formValues: {
        enterpriseJobStatus: SourcingRequestEnterpriseJobStatus.CURRENT_NEED
      }
    })

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
