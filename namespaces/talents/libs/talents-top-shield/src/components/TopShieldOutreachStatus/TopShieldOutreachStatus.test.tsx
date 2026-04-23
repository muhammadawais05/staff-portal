import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TopShieldApplicationOutreachStatus } from '@staff-portal/graphql/staff'

import TopShieldOutreachStatus from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-outreach-status', () => ({
  useUpdateOutreachStatus: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldOutreachStatus>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldOutreachStatus
        talentId='123'
        applicationId='123'
        outreachStatus={TopShieldApplicationOutreachStatus.WAITING_FOR_RESPONSE}
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldOutreachStatus', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Waiting for response')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-outreachStatus')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Waiting for response')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-outreachStatus')
      ).toBeEnabled()
    })
  })
})
