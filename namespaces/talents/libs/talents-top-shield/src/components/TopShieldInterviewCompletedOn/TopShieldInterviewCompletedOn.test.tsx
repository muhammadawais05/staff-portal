import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TopShieldInterviewCompletedDate from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-interview-completed-date', () => ({
  useUpdateInterviewCompletedDate: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldInterviewCompletedDate>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldInterviewCompletedDate
        applicationId='123'
        date='2021-01-01'
        talentId='123'
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldInterviewCompletedDate', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Jan 1, 2021')).toBeInTheDocument()
      expect(
        screen.queryByTestId(
          'EditableField-toggle-button-interviewCompletedDate'
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Jan 1, 2021')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-interviewCompletedDate')
      ).toBeEnabled()
    })
  })
})
