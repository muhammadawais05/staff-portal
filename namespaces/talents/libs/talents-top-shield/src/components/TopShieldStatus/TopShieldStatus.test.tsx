import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TopShieldApplicationStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import TopShieldStatus from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-status', () => ({
  useUpdateStatus: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldStatus>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldStatus
        talentId='123'
        applicationId='123'
        status={TopShieldApplicationStatus.ACTIVE}
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldStatus', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Active')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-status')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Active')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-status')
      ).toBeEnabled()
    })
  })
})
