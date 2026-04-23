import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TopShieldSkill from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-skill', () => ({
  useUpdateSkill: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldSkill>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldSkill
        talentId='123'
        applicationId='123'
        skill='React'
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldSkill', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('React')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-skill')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('React')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-skill')
      ).toBeEnabled()
    })
  })
})
