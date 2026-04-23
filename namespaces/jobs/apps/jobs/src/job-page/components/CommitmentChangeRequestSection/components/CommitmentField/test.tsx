import React from 'react'
import { render, screen } from '@testing-library/react'
import { Typography } from '@toptal/picasso'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CommitmentField, { Props } from './CommitmentField'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Typography: jest.fn()
}))

const TypographyMock = Typography as unknown as jest.Mock

const arrangeTest = (props: Partial<Props> = {}) => {
  render(
    <TestWrapper>
      <CommitmentField
        commitment={EngagementCommitmentEnum.HOURLY}
        newExtraHoursEnabled={false}
        {...props}
      />
    </TestWrapper>
  )
}

const commitmentChangeRequestsData = [
  {
    commitmentChangeRequest: {
      commitment: EngagementCommitmentEnum.HOURLY,
      newExtraHoursEnabled: true
    },
    value: 'Hourly',
    color: 'yellow'
  },
  {
    commitmentChangeRequest: {
      commitment: EngagementCommitmentEnum.PART_TIME,
      newExtraHoursEnabled: false
    },
    value: 'Part-Time with Extra Hours Disabled',
    color: 'yellow'
  },
  {
    commitmentChangeRequest: {
      commitment: EngagementCommitmentEnum.FULL_TIME,
      newExtraHoursEnabled: true
    },
    value: 'Full-Time with Extra Hours Enabled',
    color: 'green'
  }
]

describe('CommitmentField', () => {
  it.each(commitmentChangeRequestsData)(
    'displays correct value and color of the field`',
    ({ commitmentChangeRequest, value, color }) => {
      TypographyMock.mockImplementation(({ children }) => children)

      arrangeTest(commitmentChangeRequest)

      expect(screen.getByText(value)).toBeInTheDocument()
      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color
        }),
        expect.anything()
      )
    }
  )
})
