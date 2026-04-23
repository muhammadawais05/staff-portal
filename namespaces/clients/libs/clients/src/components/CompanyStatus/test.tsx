import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyStatus from './CompanyStatus'

jest.mock('@staff-portal/ui/src/components/ColoredStatus')

const arrangeTest = (
  props: Partial<ComponentProps<typeof CompanyStatus>> = {}
) =>
  render(
    <TestWrapper>
      <CompanyStatus {...props} />
    </TestWrapper>
  )

describe('CompanyStatus', () => {
  describe('when there is no cumulativeStatus', () => {
    it('renders NO_VALUE', () => {
      arrangeTest()

      expect(screen.getByText('—')).toBeInTheDocument()
    })
  })

  describe('when there is cumulativeStatus', () => {
    it('renders status', () => {
      arrangeTest({
        cumulativeStatus: ClientCumulativeStatus.ACTIVE
      })

      expect(screen.getByTestId('ColoredStatus-status')).toHaveTextContent(
        'Active'
      )
    })
  })
})
