import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CandidateSendingTalentSection from './CandidateSendingTalentSection'
import {
  useCandidateSendingContext,
  useGetTalentCandidateData
} from '../../hooks'
import { GetTalentCandidateDataQuery } from '../../data/get-talent-candidate-data'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetTalentCandidateData: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetTalentCandidateDataMock = useGetTalentCandidateData as jest.Mock

const TALENT_ID = '123'

const renderComponent = ({
  talentData,
  talentDataLoading
}: {
  talentData: GetTalentCandidateDataQuery['staffNode']
  talentDataLoading: boolean
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    talentId: TALENT_ID
  }))

  useGetTalentCandidateDataMock.mockImplementation(() => ({
    talentData,
    talentDataLoading
  }))

  render(
    <TestWrapper>
      <CandidateSendingTalentSection />
    </TestWrapper>
  )
}

const talentDataMock = {
  id: TALENT_ID,
  fullName: 'Andrei Mocanu',
  type: 'Developer',
  email: 'andrei.mocanu123321@toptal.com',
  engagements: {
    counters: {
      trialsNumber: 0,
      workingNumber: 0,
      clientsNumber: 0,
      repeatedClientsNumber: 0
    }
  },
  phoneContacts: {
    nodes: []
  }
}

describe('CandidateSendingTalentSection', () => {
  describe('when data is loading', () => {
    it('renders the skeleton loader', () => {
      renderComponent({ talentData: null, talentDataLoading: true })

      expect(
        screen.getByTestId('candidate-sending-talent-section-skeleton-loader')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('talent-details')).not.toBeInTheDocument()
    })
  })

  describe('when there is no data', () => {
    it('does not render the section', () => {
      renderComponent({ talentData: null, talentDataLoading: false })

      expect(
        screen.queryByTestId('candidate-sending-talent-section-skeleton-loader')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('talent-details')).not.toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('renders the talent details', () => {
      renderComponent({
        talentData: talentDataMock,
        talentDataLoading: false
      })

      expect(screen.getByTestId('talent-details')).toBeInTheDocument()
    })
  })
})
