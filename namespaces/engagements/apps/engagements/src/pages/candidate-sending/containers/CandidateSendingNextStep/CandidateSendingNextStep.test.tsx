import { useGetNode } from '@staff-portal/data-layer-service'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { ScrollToTop } from '@staff-portal/ui'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import {
  CandidateSendingNextLoader,
  TalentAssigned,
  TalentSent
} from '../../components'
import { useCandidateSendingContext } from '../../hooks'
import TalentSentForReview from '../TalentSentForReview'
import CandidateSendingNextStep from './CandidateSendingNextStep'

jest.mock('@staff-portal/ui')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')
jest.mock('../../hooks')
jest.mock('../../components')
jest.mock('../TalentSentForReview')

const mockScrollToTop = ScrollToTop as jest.Mock
const mockUseGetNode = useGetNode as jest.Mock
const mockUseCandidateSendingContext = useCandidateSendingContext as jest.Mock
const mockCandidateSendingNextLoader = CandidateSendingNextLoader as jest.Mock
const mockTalentAssigned = TalentAssigned as jest.Mock
const mockTalentSent = TalentSent as jest.Mock
const mockTalentSentForReview = TalentSentForReview as jest.Mock

const renderComponent = ({
  newEngagementId,
  data,
  loading,
  hasPendingAssignment
}: {
  newEngagementId?: string
  data?: object
  loading?: boolean
  hasPendingAssignment?: boolean
} = {}) => {
  mockScrollToTop.mockImplementation(() => null)
  mockCandidateSendingNextLoader.mockImplementation(() => null)
  mockTalentAssigned.mockImplementation(() => null)
  mockTalentSent.mockImplementation(() => null)
  mockTalentSentForReview.mockImplementation(() => null)
  mockUseGetNode.mockImplementation(() => () => ({ data, loading }))
  mockUseCandidateSendingContext.mockImplementation(() => ({
    hasPendingAssignment,
    newEngagementId
  }))

  return render(
    <TestWrapper>
      <CandidateSendingNextStep />
    </TestWrapper>
  )
}

describe('CandidateSendingNextStep', () => {
  describe('when is loading data', () => {
    it('shows the loading', () => {
      renderComponent({ loading: true })

      expect(mockCandidateSendingNextLoader).toHaveBeenCalled()

      expect(mockTalentAssigned).not.toHaveBeenCalled()
      expect(mockTalentSentForReview).not.toHaveBeenCalled()
      expect(mockTalentSent).not.toHaveBeenCalled()
    })
  })

  describe('when data is missing', () => {
    it('returns null', () => {
      renderComponent({ newEngagementId: '123' })

      expect(mockCandidateSendingNextLoader).not.toHaveBeenCalled()
      expect(mockTalentAssigned).not.toHaveBeenCalled()
      expect(mockTalentSentForReview).not.toHaveBeenCalled()
      expect(mockTalentSent).not.toHaveBeenCalled()
    })
  })

  describe('when engagement ID is missing', () => {
    it('returns null', () => {
      renderComponent({ data: {} })

      expect(mockCandidateSendingNextLoader).not.toHaveBeenCalled()
      expect(mockTalentAssigned).not.toHaveBeenCalled()
      expect(mockTalentSentForReview).not.toHaveBeenCalled()
      expect(mockTalentSent).not.toHaveBeenCalled()
    })
  })

  describe('when has pending assignment', () => {
    it('shows the talent assigned component', () => {
      const TALENT_TYPE = 'developer'
      const TALENT_WEB_RESOURCE = { text: 'Talent Name' }
      const JOB_WEB_RESOURCE = { text: 'Job Title' }

      renderComponent({
        newEngagementId: '123',
        hasPendingAssignment: true,
        data: {
          talent: { type: TALENT_TYPE, webResource: TALENT_WEB_RESOURCE },
          job: { webResource: JOB_WEB_RESOURCE },
          webResource: { url: '' }
        }
      })

      expect(mockTalentAssigned).toHaveBeenCalledWith(
        {
          jobLink: JOB_WEB_RESOURCE,
          talentLink: TALENT_WEB_RESOURCE,
          talentType: TALENT_TYPE
        },
        expect.anything()
      )

      expect(mockScrollToTop).toHaveBeenCalled()
      expect(mockCandidateSendingNextLoader).not.toHaveBeenCalled()
      expect(mockTalentSentForReview).not.toHaveBeenCalled()
      expect(mockTalentSent).not.toHaveBeenCalled()
    })
  })

  describe('when is pending approval', () => {
    it('shows the talent sent for review component', () => {
      const TALENT_TYPE = 'developer'
      const JOB_WEB_RESOURCE = { text: 'Job Title' }

      renderComponent({
        newEngagementId: '123',
        data: {
          status: EngagementStatus.PENDING_APPROVAL,
          talent: { type: TALENT_TYPE },
          job: { webResource: JOB_WEB_RESOURCE },
          webResource: { url: '' }
        }
      })

      expect(mockTalentSentForReview).toHaveBeenCalledWith(
        {
          engagementId: '123',
          talentType: TALENT_TYPE,
          jobLink: JOB_WEB_RESOURCE
        },
        expect.anything()
      )

      expect(mockScrollToTop).toHaveBeenCalled()
      expect(mockCandidateSendingNextLoader).not.toHaveBeenCalled()
      expect(mockTalentAssigned).not.toHaveBeenCalled()
      expect(mockTalentSent).not.toHaveBeenCalled()
    })
  })

  it('shows the talent send component', () => {
    const TALENT_TYPE = 'developer'
    const ENGAGEMENT_URL = '/engagements/123'
    const TALENT_WEB_RESOURCE = { text: 'Talent Name' }
    const JOB_WEB_RESOURCE = { text: 'Job Title' }

    renderComponent({
      newEngagementId: '123',
      data: {
        talent: { type: TALENT_TYPE, webResource: TALENT_WEB_RESOURCE },
        job: { webResource: JOB_WEB_RESOURCE },
        webResource: { url: ENGAGEMENT_URL }
      }
    })

    expect(mockTalentSent).toHaveBeenCalledWith(
      {
        jobLink: JOB_WEB_RESOURCE,
        talentLink: TALENT_WEB_RESOURCE,
        talentType: TALENT_TYPE,
        engagementUrl: ENGAGEMENT_URL
      },
      expect.anything()
    )

    expect(mockScrollToTop).toHaveBeenCalled()
    expect(mockCandidateSendingNextLoader).not.toHaveBeenCalled()
    expect(mockTalentAssigned).not.toHaveBeenCalled()
    expect(mockTalentSentForReview).not.toHaveBeenCalled()
  })
})
