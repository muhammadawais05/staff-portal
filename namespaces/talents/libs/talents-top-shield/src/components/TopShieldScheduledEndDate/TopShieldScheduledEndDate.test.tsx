import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TopShieldScheduledEndDate from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-scheduled-end-date', () => ({
  useUpdateScheduledEndDate: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldScheduledEndDate>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldScheduledEndDate
        applicationId='123'
        talentId='123'
        date='2021-01-01'
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldScheduledEndDate', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Jan 1, 2021')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-scheduledEndDate')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Jan 1, 2021')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-scheduledEndDate')
      ).toBeEnabled()
    })
  })
})
