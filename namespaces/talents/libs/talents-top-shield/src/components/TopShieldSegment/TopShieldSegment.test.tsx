import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TopShieldSegment from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-segment', () => ({
  useUpdateSegment: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldSegment>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldSegment
        talentId='123'
        applicationId='123'
        segment='Newcomer'
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldSegment', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Newcomer')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-segment')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Newcomer')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-segment')
      ).toBeEnabled()
    })
  })
})
