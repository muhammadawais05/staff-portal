import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import CandidateSendingPositionStep from './CandidateSendingPositionStep'
import {
  useCandidateSendingContext,
  useGetCandidateSendingDataForPositionStep
} from '../../hooks'
import { useGetSectionInfoText } from './hooks'
import { GetPositionStepDataQuery } from '../../data/get-position-step-data'

jest.mock('@staff-portal/data-layer-service')

jest.mock('./hooks', () => ({
  useGetSectionInfoText: jest.fn()
}))
jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetCandidateSendingDataForPositionStep: jest.fn()
}))
jest.mock('../../components', () => ({
  InfoSection: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  RelatedJobApplicationSection: () => (
    <div data-testid='related-job-application-section' />
  )
}))
jest.mock('../CandidateSendingForm', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='candidate-sending-form'>{children}</div>
  )
}))
jest.mock('../CandidateSendingJobSection', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-job-section' />
}))
jest.mock('../CandidateSendingTalentSection', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-talent-section' />
}))
jest.mock('../CandidateSendingPositionStepForm', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-position-step-form' />
}))

const useGetSectionInfoTextMock = useGetSectionInfoText as jest.Mock
const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetCandidateSendingDataForPositionStepMock =
  useGetCandidateSendingDataForPositionStep as jest.Mock

const arrangeTest = ({
  queryParametersJobId,
  queryParametersTalentId,
  data,
  loading,
  stepsAttributes,
  sectionInfoText
}: {
  queryParametersJobId?: string | null
  queryParametersTalentId?: string | null
  data?: GetPositionStepDataQuery
  loading?: boolean
  stepsAttributes?: { jobId?: boolean; talentId?: boolean }
  displaySectionAlert?: boolean
  sectionInfoText?: string
} = {}) => {
  useGetSectionInfoTextMock.mockImplementation(() => sectionInfoText)
  useCandidateSendingContextMock.mockImplementation(() => ({
    queryParametersJobId,
    queryParametersTalentId,
    stepsAttributes
  }))
  useGetCandidateSendingDataForPositionStepMock.mockImplementation(() => ({
    data,
    loading
  }))

  return render(
    <TestWrapper>
      <CandidateSendingPositionStep />
    </TestWrapper>
  )
}

describe('CandidateSendingPositionStep', () => {
  describe('when `initialJobId` context value is `true`', () => {
    it('renders job section', () => {
      arrangeTest({ queryParametersJobId: 'job-id' })

      expect(
        screen.getByTestId('candidate-sending-job-section')
      ).toBeInTheDocument()
    })
  })

  describe('when `initialJobId` context value is `false`', () => {
    it('does not render job section', () => {
      arrangeTest()

      expect(
        screen.queryByTestId('candidate-sending-job-section')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `initialTalentId` context value is `true`', () => {
    it('renders talent section', () => {
      arrangeTest({ queryParametersTalentId: 'talent-id' })

      expect(
        screen.getByTestId('candidate-sending-talent-section')
      ).toBeInTheDocument()
    })
  })

  describe('when `initialTalentId` context value is `false`', () => {
    it('does not render talent section', () => {
      arrangeTest()

      expect(
        screen.queryByTestId('candidate-sending-talent-section')
      ).not.toBeInTheDocument()
    })
  })

  it('renders form section and step form', () => {
    arrangeTest()

    expect(screen.getByTestId('candidate-sending-form')).toBeInTheDocument()
    expect(
      screen.getByTestId('candidate-sending-position-step-form')
    ).toBeInTheDocument()
  })

  describe('when `sectionInfoText` exists', () => {
    it('renders section info text', () => {
      arrangeTest({ sectionInfoText: 'some text' })

      expect(screen.getByText('some text')).toBeInTheDocument()
    })
  })

  describe('when `loading` is `true`', () => {
    it('renders field skeleton', () => {
      arrangeTest({ loading: true })

      expect(
        screen.getByTestId('candidate-sending-position-form-skeleton')
      ).toBeInTheDocument()
    })
  })
})
