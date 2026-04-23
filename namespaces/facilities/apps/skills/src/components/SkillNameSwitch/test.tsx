import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { InlineSwitch } from '@staff-portal/editable'

import { SkillNameSwitch } from '..'
import {
  createSkillNamesListItemFragmentMock,
  createSkillNamesListItemOperationsFragmentMock
} from '../../data/get-skill-names-list/mocks'
import { Props } from './SkillNameSwitch'

const InlineSwitchMock = InlineSwitch as jest.Mock
const mockUseMutation = useMutation as jest.Mock

const expectedInlineSwitchProps = (
  disabled: boolean
): Partial<ComponentProps<typeof InlineSwitchMock>> => ({
  value: true,
  loading: false,
  disabled
})

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/editable', () => ({
  __esModule: true,
  InlineSwitch: jest.fn()
}))

const arrangeTest = ({ skillName, type }: Props) =>
  render(
    <TestWrapper>
      <SkillNameSwitch skillName={skillName} type={type} />
    </TestWrapper>
  )

describe('SkillNameSwitch', () => {
  beforeEach(() => {
    InlineSwitchMock.mockImplementation(() => (
      <div data-testid='InlineSwitch-mock' />
    ))

    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          cloneSkillName: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
  })
  describe('when operation hidden', () => {
    it('renders human readable value only', () => {
      const skillNameMock = createSkillNamesListItemFragmentMock({
        operations: createSkillNamesListItemOperationsFragmentMock({
          toggleCheckSkillName: createOperationMock({
            callable: OperationCallableTypes.HIDDEN
          })
        })
      })

      arrangeTest({ skillName: skillNameMock, type: 'editor' })

      expect(screen.queryByTestId('InlineSwitch-mock')).not.toBeInTheDocument()
      expect(screen.getByText('Yes')).toBeInTheDocument()
    })
  })
  describe('when operation enabled', () => {
    it('renders inline switch component', () => {
      const skillNameMock = createSkillNamesListItemFragmentMock({
        operations: createSkillNamesListItemOperationsFragmentMock({
          toggleCheckSkillName: createOperationMock({
            callable: OperationCallableTypes.ENABLED
          })
        })
      })

      arrangeTest({ skillName: skillNameMock, type: 'editor' })

      expect(screen.getByTestId('InlineSwitch-mock')).toBeInTheDocument()

      expect(InlineSwitchMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedInlineSwitchProps(false)),
        expect.anything()
      )
    })
  })
  describe('when operation disabled', () => {
    it('renders inline switch component', () => {
      const skillNameMock = createSkillNamesListItemFragmentMock({
        operations: createSkillNamesListItemOperationsFragmentMock({
          toggleCheckSkillName: createOperationMock({
            callable: OperationCallableTypes.DISABLED
          })
        })
      })

      arrangeTest({ skillName: skillNameMock, type: 'editor' })

      expect(screen.getByTestId('InlineSwitch-mock')).toBeInTheDocument()

      expect(InlineSwitchMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedInlineSwitchProps(true)),
        expect.anything()
      )
    })
  })
})
