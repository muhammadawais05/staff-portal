import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import CandidateSendingSkillsStep from './CandidateSendingSkillsStep'
import {
  useCandidateSendingContext,
  useGetCandidateSendingDataForSkillsStep
} from '../../hooks'
import { SkillsStepDataFragment } from '../../data/get-skills-step-data'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetCandidateSendingDataForSkillsStep: jest.fn()
}))
jest.mock('../../components', () => ({
  CandidateSendingSkillsStepFormSkeleton: () => (
    <div data-testid='candidate-sending-skills-step-form-skeleton' />
  )
}))
jest.mock('../CandidateSendingForm', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='candidate-sending-form'>{children}</div>
  )
}))
jest.mock('../CandidateSendingSkillsStepForm', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-skills-step-form' />
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetCandidateSendingDataForSkillsStepMock =
  useGetCandidateSendingDataForSkillsStep as jest.Mock

const arrangeTest = ({
  data,
  loading
}: {
  data?: SkillsStepDataFragment
  loading?: boolean
} = {}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    stepsAttributes: {}
  }))
  useGetCandidateSendingDataForSkillsStepMock.mockImplementation(() => ({
    data,
    loading
  }))

  return render(
    <TestWrapper>
      <CandidateSendingSkillsStep />
    </TestWrapper>
  )
}

describe('CandidateSendingSkillsStep', () => {
  describe('when `loading` equals `true`', () => {
    it('renders skeleton', () => {
      arrangeTest({ loading: true })

      expect(
        screen.getByTestId('candidate-sending-skills-step-form-skeleton')
      ).toBeInTheDocument()
    })
  })

  describe('when there is no `data`', () => {
    it('does not render form', () => {
      arrangeTest()

      expect(
        screen.queryByTestId('candidate-sending-skills-step-form')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is data', () => {
    it('renders form', () => {
      arrangeTest({
        data: {
          skillSetToVet: {
            skill: { name: 'some skill name' }
          },
          talent: { webResource: { text: 'some text' } }
        } as SkillsStepDataFragment
      })

      expect(
        screen.getByTestId('candidate-sending-skills-step-form')
      ).toBeInTheDocument()
    })
  })
})
