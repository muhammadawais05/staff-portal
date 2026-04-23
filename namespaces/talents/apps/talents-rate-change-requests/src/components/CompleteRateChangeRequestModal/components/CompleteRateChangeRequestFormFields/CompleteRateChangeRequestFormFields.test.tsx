import React, { ComponentProps } from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'

import CompleteRateChangeRequestFormFields from './CompleteRateChangeRequestFormFields'

const arrangeTest = (
  props: ComponentProps<typeof CompleteRateChangeRequestFormFields>
) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CompleteRateChangeRequestFormFields {...props} />
      </Form>
    </TestWrapper>
  )

describe('CompleteRateChangeRequestFormFields', () => {
  it('renders form for rate consultation', () => {
    arrangeTest({
      requestTypeEnumValue: RateChangeRequestTypeEnum.CONSULTATION
    })

    expect(screen.getByText('Recommended Rate')).toBeInTheDocument()
    expect(
      screen.getByText("Set recommended rate to talent's profile.")
    ).toBeInTheDocument()
    expect(screen.getByText('Comment')).toBeInTheDocument()
    expect(
      screen.getByText(
        "This is for internal usage, it won't be shared with talent."
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Talent Contacted At')).toBeInTheDocument()
    expect(
      screen.getByText('I discussed rate with the talent.')
    ).toBeInTheDocument()
  })

  it('renders form for rate change', () => {
    arrangeTest({
      requestTypeEnumValue: RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT
    })

    expect(screen.getByText('New Hourly Rate')).toBeInTheDocument()
    expect(
      screen.queryByLabelText("Set recommended rate to talent's profile.")
    ).not.toBeInTheDocument()
    expect(screen.getByText('Comment')).toBeInTheDocument()
    expect(
      screen.getByText(
        "This is for internal usage, it won't be shared with talent."
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Talent Contacted At')).toBeInTheDocument()
    expect(
      screen.getByText('I discussed rate with the talent.')
    ).toBeInTheDocument()
  })
})
