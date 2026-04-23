import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import AdditonalStatusMessages from './AdditionalStatusMessages'
import {
  useCandidateSendingContext,
  useNewEngagementWizardQuery
} from '../../../../hooks'

jest.mock('@staff-portal/data-layer-service')

jest.mock('../../../../hooks', () => ({
  useNewEngagementWizardQuery: jest.fn(),
  useCandidateSendingContext: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useNewEngagementWizardQueryMock = useNewEngagementWizardQuery as jest.Mock

const renderComponent = ({
  currentStep
}: {
  currentStep: NewEngagementWizardStep
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    currentStep
  }))

  useNewEngagementWizardQueryMock.mockImplementation(() => ({
    data: {
      newEngagementWizard: {
        talentHasAppropriateSpecialization: false,
        talent: {
          id: '123',
          unrealisticOnRate: true
        }
      }
    },
    loading: false
  }))

  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <AdditonalStatusMessages />
    </TestWrapper>
  )

  return { content: innerHTML }
}

describe('AdditonalStatusMessages', () => {
  describe('when we are on `POSITION` step', () => {
    it('does not display any warnings', () => {
      const { content } = renderComponent({
        currentStep: NewEngagementWizardStep.POSITION
      })

      expect(content).not.toContain(
        'This talent does not have the required specialization for this job.'
      )
      expect(content).not
        .toContain(`This candidate's rate is unrealistic. Please note this before
      confirming that you want to send this candidate to this position.`)
    })
  })

  describe('when we are on `AVAILABILITY` step', () => {
    it('shows both warnings', () => {
      const { content } = renderComponent({
        currentStep: NewEngagementWizardStep.AVAILABILITY
      })

      expect(content).toContain(
        'This talent does not have the required specialization for this job.'
      )
      expect(content).toContain(
        `This candidate's rate is unrealistic. Please note this before confirming that you want to send this candidate to this position.`
      )
    })
  })

  describe('when we are on any step after `AVAILABILITY`', () => {
    it('shows only the specialization warning', () => {
      const { content } = renderComponent({
        currentStep: NewEngagementWizardStep.DETAILS
      })

      expect(content).toContain(
        'This talent does not have the required specialization for this job.'
      )
      expect(content).not.toContain(
        `This candidate's rate is unrealistic. Please note this before confirming that you want to send this candidate to this position.`
      )
    })
  })
})
