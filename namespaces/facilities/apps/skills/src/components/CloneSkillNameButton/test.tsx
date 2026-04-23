import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { Props, default as CloneSkillNameButton } from './CloneSkillNameButton'
import {
  createSkillNamesListItemFragmentMock,
  createSkillNamesListItemOperationsFragmentMock
} from '../../data/get-skill-names-list/mocks'

const ButtonMock = Button as unknown as jest.Mock

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@staff-portal/filters', () => ({
  createAutocompleteCategory: jest.fn()
}))

const arrangeTest = ({ skillName }: Props) =>
  render(
    <TestWrapper>
      <CloneSkillNameButton skillName={skillName} />
    </TestWrapper>
  )

const mockSkillName = (callable: OperationCallableTypes) =>
  createSkillNamesListItemFragmentMock({
    operations: createSkillNamesListItemOperationsFragmentMock({
      cloneSkillName: createOperationMock({
        callable
      })
    })
  })

const expectedButtonProps = (
  disabled: boolean
): Partial<ComponentProps<typeof ButtonMock>> => ({
  loading: false,
  disabled
})

describe('CloneSkillNameButton', () => {
  beforeEach(() => {
    ButtonMock.mockImplementation(() => (
      <div data-testid='CloneSkillNameButton-mock' />
    ))
  })

  describe('when operation hidden', () => {
    it('renders nothing', () => {
      const skillNameMock = mockSkillName(OperationCallableTypes.HIDDEN)

      arrangeTest({ skillName: skillNameMock })

      expect(
        screen.queryByTestId('CloneSkillNameButton-mock')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation disabled', () => {
    it('renders disabled button', () => {
      const skillNameMock = mockSkillName(OperationCallableTypes.DISABLED)

      arrangeTest({ skillName: skillNameMock })

      expect(
        screen.getByTestId('CloneSkillNameButton-mock')
      ).toBeInTheDocument()

      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedButtonProps(true)),
        expect.anything()
      )
    })
  })

  describe('when operation enabled', () => {
    it('renders active button', () => {
      const skillNameMock = mockSkillName(OperationCallableTypes.ENABLED)

      arrangeTest({ skillName: skillNameMock })

      expect(
        screen.getByTestId('CloneSkillNameButton-mock')
      ).toBeInTheDocument()

      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedButtonProps(false)),
        expect.anything()
      )
    })
  })
})
