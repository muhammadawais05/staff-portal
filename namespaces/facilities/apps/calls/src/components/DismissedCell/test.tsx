import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DismissedCell from '.'

const FIELD_VALUE = 'N/A'

const arrangeTest = (props: {
  isDismissed: ComponentProps<typeof DismissedCell>['isDismissed']
}) =>
  render(
    <TestWrapper>
      <DismissedCell {...props}>Some Child</DismissedCell>
    </TestWrapper>
  )

describe('DismissedCell', () => {
  describe('renders', () => {
    it('displays children when call is not dismissed', () => {
      arrangeTest({
        isDismissed: false
      })

      expect(screen.getByText('Some Child')).toBeInTheDocument()
    })

    it('displays N/A when call is dismissed', () => {
      arrangeTest({
        isDismissed: true
      })

      expect(screen.getByText(FIELD_VALUE)).toBeInTheDocument()
    })
  })
})
