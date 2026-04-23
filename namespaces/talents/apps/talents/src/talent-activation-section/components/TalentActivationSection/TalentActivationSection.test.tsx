import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  OperationCallableTypes,
  StepStatus,
  StepType
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { createStep } from '../../test-utils'
import {
  TalentActivationStepsFragment,
  useGetTalentActivation
} from '../../data/get-talent-activation'
import { createGetTalentActivationStepsMock } from '../../data/get-talent-activation/mocks'
import TalentActivationSection from './TalentActivationSection'
import { ActivationStatus } from '../../types'

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageListener: jest.fn()
}))

jest.mock('../ActivationStepButton', () => ({
  ActivationStepButton: ({ step }: { step: { type: string } }) => (
    <div data-testid='ActivationStepButton'>{step.type}</div>
  )
}))

jest.mock('../ActivationDisabledStepButton', () => ({
  __esModule: true,
  default: ({ type }: { type: string }) => (
    <div data-testid='ActivationDisabledStepButton'>{type}</div>
  )
}))

jest.mock('../../data/get-talent-activation', () => ({
  useGetTalentActivation: jest.fn()
}))

const useGetTalentActivationMock = useGetTalentActivation as jest.Mock

const TALENT_ID = '123'
const steps = [
  StepType.TALENT_AGREEMENT,
  StepType.TOPTAL_TRAINING,
  StepType.PROFILE_CREATION,
  StepType.PROFILE_APPROVE,
  StepType.PROFILE_EDITING,
  StepType.LEGAL,
  StepType.PAYMENT,
  StepType.TOPTAL_EMAIL
]

const arrangeTest = ({
  talent,
  loading,
  refetch = jest.fn()
}: {
  talent: TalentActivationStepsFragment
  loading?: boolean
  refetch?: () => void
}) => {
  useGetTalentActivationMock.mockImplementation(() => ({
    talent,
    loading,
    refetch
  }))

  return render(
    <TestWrapper>
      <TalentActivationSection talentId={TALENT_ID} />
    </TestWrapper>
  )
}

describe('TalentActivationSection', () => {
  describe('when activation section is "visible" & activation is "inProgress"', () => {
    it('shows activation steps', () => {
      const staff = {
        id: '123',
        fullName: 'TEST_NAME'
      }
      const talent = createGetTalentActivationStepsMock({
        id: TALENT_ID,
        activationSectionInProgress: true,
        activationSectionVisible: true,
        activation: {
          id: '123',
          status: ActivationStatus.InProgress,
          steps: {
            nodes: steps.map((type, index) =>
              createStep({
                id: String(index),
                type,
                status: StepStatus.PENDING_STAFF_ACTION,
                staff,
                operations: {
                  assign: {
                    callable: OperationCallableTypes.ENABLED,
                    messages: []
                  }
                }
              })
            )
          }
        }
      } as TalentActivationStepsFragment)

      arrangeTest({ talent })

      expect(screen.getByText('Activation')).toBeInTheDocument()

      expect(screen.getByText('TALENT_AGREEMENT')).toBeInTheDocument()
      expect(screen.getByText('TOPTAL_TRAINING')).toBeInTheDocument()
      expect(screen.getByText('PROFILE_CREATION')).toBeInTheDocument()
      expect(screen.getByText('PROFILE_APPROVE')).toBeInTheDocument()
      expect(screen.getByText('PROFILE_EDITING')).toBeInTheDocument()
      expect(screen.getByText('LEGAL')).toBeInTheDocument()
      expect(screen.getByText('PAYMENT')).toBeInTheDocument()
      expect(screen.getByText('TOPTAL_EMAIL')).toBeInTheDocument()
      expect(screen.getAllByTestId('ActivationStepButton')).toHaveLength(8)
    })
  })

  describe('when activation section is "visible" & activation is not "inProgress"', () => {
    it('shows activation disabled steps', () => {
      const talent = createGetTalentActivationStepsMock({
        id: TALENT_ID,
        activationSectionInProgress: false,
        activationSectionVisible: true,
        activationTemplate: {
          id: '123',
          steps: {
            nodes: steps.map((type, index) => ({ id: String(index), type }))
          }
        }
      } as TalentActivationStepsFragment)

      arrangeTest({ talent })

      expect(screen.getByText('Activation')).toBeInTheDocument()

      expect(screen.getByText('TALENT_AGREEMENT')).toBeInTheDocument()
      expect(screen.getByText('TOPTAL_TRAINING')).toBeInTheDocument()
      expect(screen.getByText('PROFILE_CREATION')).toBeInTheDocument()
      expect(screen.getByText('PROFILE_APPROVE')).toBeInTheDocument()
      expect(screen.getByText('PROFILE_EDITING')).toBeInTheDocument()
      expect(screen.getByText('LEGAL')).toBeInTheDocument()
      expect(screen.getByText('PAYMENT')).toBeInTheDocument()
      expect(screen.getByText('TOPTAL_EMAIL')).toBeInTheDocument()
      expect(
        screen.getAllByTestId('ActivationDisabledStepButton')
      ).toHaveLength(8)
    })
  })

  describe('when "activationSectionVisible" is "falsy"', () => {
    it('hides talent activation section', () => {
      const talent = createGetTalentActivationStepsMock({
        activationSectionVisible: false
      } as TalentActivationStepsFragment)

      arrangeTest({ talent })

      expect(screen.queryByText('Activation')).not.toBeInTheDocument()
    })
  })

  describe('when message listener event is triggered', () => {
    it('calls the refetch function', () => {
      const refetch = jest.fn()
      const mockUseMessageListener = useMessageListener as jest.Mock

      mockUseMessageListener.mockImplementation(
        (_, callback: (props: { talentId: string }) => void) => {
          callback({ talentId: TALENT_ID })
        }
      )

      const talent = createGetTalentActivationStepsMock({
        id: TALENT_ID,
        activation: {
          id: '123',
          status: ActivationStatus.Active
        }
      } as TalentActivationStepsFragment)

      arrangeTest({ talent, refetch })

      expect(refetch).toHaveBeenCalled()
    })
  })
})
