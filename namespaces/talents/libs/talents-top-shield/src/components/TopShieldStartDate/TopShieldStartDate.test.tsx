import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TopShieldStartDate from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-start-date', () => ({
  useUpdateStartDate: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldStartDate>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldStartDate
        applicationId='123'
        talentId='123'
        date={'2022-01-01'}
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldStartDate', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Jan 1, 2022')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-startDate')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Jan 1, 2022')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-startDate')
      ).toBeEnabled()
    })
  })
})
