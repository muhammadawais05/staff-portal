import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'

import {
  useCandidateSendingContext,
  useDeleteStaleDraftTalentPitch,
  useGetPitchStepData
} from '../../hooks'
import PitchCandidateDetails from '../PitchCandidateDetails'
import PitchEmailingSections from '../PitchEmailingSections'
import CandidateSendingPitchStep from './CandidateSendingPitchStep'
import { PitchStepDataFragment } from '../../data/get-pitch-step-data'

jest.mock('../../components')
jest.mock('../../hooks')
jest.mock('../PitchCandidateDetails')
jest.mock('../PitchEmailingSections')

const mockPitchCandidateDetails = PitchCandidateDetails as jest.Mock
const mockPitchEmailingSections = PitchEmailingSections as jest.Mock
const mockUseCandidateSendingContext = useCandidateSendingContext as jest.Mock
const mockUseGetPitchStepData = useGetPitchStepData as jest.Mock
const mockUseDeleteStaleDraftTalentPitch =
  useDeleteStaleDraftTalentPitch as jest.Mock

const renderComponent = ({
  pitchStepData,
  staleDraftTalentPitchDeletedLoading,
  isStaleDraftTalentPitchDeleteMutationCompleted,
  loading
}: {
  pitchStepData?: PitchStepDataFragment
  staleDraftTalentPitchDeletedLoading?: boolean
  isStaleDraftTalentPitchDeleteMutationCompleted?: boolean
  loading?: boolean
} = {}) => {
  mockPitchCandidateDetails.mockImplementation(() => null)
  mockPitchEmailingSections.mockImplementation(() => null)

  mockUseCandidateSendingContext.mockImplementation(() => ({
    stepsAttributes: {
      jobId: '123',
      talentId: '456'
    }
  }))
  mockUseGetPitchStepData.mockImplementation(() => ({
    data: pitchStepData,
    loading
  }))
  mockUseDeleteStaleDraftTalentPitch.mockImplementation(() => ({
    loading: staleDraftTalentPitchDeletedLoading,
    isCompleted: isStaleDraftTalentPitchDeleteMutationCompleted
  }))

  render(
    <TestWrapper>
      <CandidateSendingPitchStep />
    </TestWrapper>
  )
}

describe('CandidateSendingPitchStep', () => {
  describe('when `staleDraftTalentPitchDeletedLoading` value is `true`', () => {
    it('shows the loading sections', () => {
      renderComponent({
        pitchStepData: undefined,
        staleDraftTalentPitchDeletedLoading: true,
        loading: false
      })

      expect(mockPitchCandidateDetails).toHaveBeenCalledWith(
        {
          pitchStepData: undefined,
          loading: true
        },
        {}
      )
      expect(mockPitchEmailingSections).toHaveBeenCalledWith(
        {
          pitchStepData: undefined,
          loading: true
        },
        {}
      )
    })
  })

  describe('when pitch step data is loading', () => {
    it('shows the loading sections', () => {
      renderComponent({
        pitchStepData: undefined,
        staleDraftTalentPitchDeletedLoading: false,
        loading: true
      })

      expect(mockPitchCandidateDetails).toHaveBeenCalledWith(
        {
          pitchStepData: undefined,
          loading: true
        },
        {}
      )
      expect(mockPitchEmailingSections).toHaveBeenCalledWith(
        {
          pitchStepData: undefined,
          loading: true
        },
        {}
      )
    })
  })

  describe('when should delete stale draft talent pitch', () => {
    describe('when stale draft talent pitch is deleting', () => {
      it('renders sections', () => {
        renderComponent({
          pitchStepData: undefined,
          isStaleDraftTalentPitchDeleteMutationCompleted: false,
          staleDraftTalentPitchDeletedLoading: true,
          loading: false
        })

        expect(mockUseGetPitchStepData).toHaveBeenCalledWith(
          {
            jobId: '123',
            talentId: '456'
          },
          {
            skip: true
          }
        )

        expect(mockPitchCandidateDetails).toHaveBeenCalledWith(
          {
            pitchStepData: undefined,
            loading: true
          },
          {}
        )
        expect(mockPitchEmailingSections).toHaveBeenCalledWith(
          {
            pitchStepData: undefined,
            loading: true
          },
          {}
        )
      })
    })

    describe('when stale draft talent pitch is not deleted', () => {
      it('renders nothing', () => {
        renderComponent({
          pitchStepData: undefined,
          isStaleDraftTalentPitchDeleteMutationCompleted: false,
          staleDraftTalentPitchDeletedLoading: false,
          loading: false
        })

        expect(mockUseGetPitchStepData).toHaveBeenCalledWith(
          {
            jobId: '123',
            talentId: '456'
          },
          {
            skip: true
          }
        )

        expect(mockPitchCandidateDetails).toHaveBeenCalledWith(
          {
            pitchStepData: undefined,
            loading: false
          },
          {}
        )
        expect(mockPitchEmailingSections).toHaveBeenCalledWith(
          {
            pitchStepData: undefined,
            loading: false
          },
          {}
        )
      })
    })

    describe('when stale draft talent pitch is deleted', () => {
      it('renders sections', () => {
        renderComponent({
          pitchStepData: { isPitchTextEnabled: true },
          isStaleDraftTalentPitchDeleteMutationCompleted: true,
          staleDraftTalentPitchDeletedLoading: false,
          loading: false
        })

        expect(mockUseGetPitchStepData).toHaveBeenCalledWith(
          {
            jobId: '123',
            talentId: '456'
          },
          {
            skip: false
          }
        )

        expect(mockPitchCandidateDetails).toHaveBeenCalledWith(
          {
            pitchStepData: { isPitchTextEnabled: true },
            loading: false
          },
          {}
        )
        expect(mockPitchEmailingSections).toHaveBeenCalledWith(
          {
            pitchStepData: { isPitchTextEnabled: true },
            loading: false
          },
          {}
        )
      })
    })
  })
})
