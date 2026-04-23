import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentRateField from './TalentRateField'
import { ApproveCommitmentChangeRequestFormValues } from '../ApproveCommitmentChangeRequestForm/types'

const commitmentChangeRequestsData = [
  {
    commitment: EngagementCommitmentEnum.HOURLY,
    label: /How Much Will You Be Paying the Talent Per Hour?/
  },
  {
    commitment: EngagementCommitmentEnum.PART_TIME,
    label: /How Much Will You Be Paying the Talent Part-Time Per Week?/
  },
  {
    commitment: EngagementCommitmentEnum.FULL_TIME,
    label: /How Much Will You Be Paying the Talent Per Week?/
  }
]

const arrangeTest = ({
  commitment,
  initialValues
}: Partial<
  ComponentProps<typeof TalentRateField> & {
    initialValues: Partial<ApproveCommitmentChangeRequestFormValues>
  }
> = {}) =>
  render(
    <TestWrapper>
      <Form initialValues={initialValues} onSubmit={() => {}}>
        <TalentRateField commitment={commitment} />
      </Form>
    </TestWrapper>
  )

describe('TalentRateField', () => {
  describe('when there is no commitment', () => {
    it('renders nothing', async () => {
      arrangeTest()

      expect(
        screen.queryByTestId('TalentRateField-rate')
      ).not.toBeInTheDocument()
    })
  })

  it.each(commitmentChangeRequestsData)(
    'displays correct label of the field`',
    ({ commitment, label }) => {
      arrangeTest({ commitment })

      expect(screen.getByLabelText(label)).toBeInTheDocument()
    }
  )
})
