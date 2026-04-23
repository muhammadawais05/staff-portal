import React, { ComponentProps } from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  OperationCallableTypes,
  RateChangeRequestStatus
} from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'

import {
  CompleteRateChangeRequestModal,
  RequestDetailsModal
} from '../../components'
import {
  createActiveEngagementMock,
  createRateChangeRequestMock
} from '../../data/rate-change-request-fragment/mocks'
import RateChangeRequestItemActions from './RateChangeRequestItemActions'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
const useModalMock = useModal as jest.Mock
const showModalMock = jest.fn()

const arrangeTest = (
  props: ComponentProps<typeof RateChangeRequestItemActions>
) => {
  useModalMock.mockReturnValue({
    showModal: showModalMock
  })

  render(
    <TestWrapper>
      <RateChangeRequestItemActions {...props} />
    </TestWrapper>
  )
}

describe('RateChangeRequestItemActions', () => {
  it('calls useModal with rateChangeRequest', () => {
    const rateChangeRequest = createRateChangeRequestMock()

    arrangeTest({
      ...rateChangeRequest,
      completeRateChangeRequestOperation:
        rateChangeRequest.operations.completeRateChangeRequest,
      talentSlackContacts: rateChangeRequest.talent?.slackContacts
    })

    expect(useModalMock).toHaveBeenNthCalledWith(
      1,
      CompleteRateChangeRequestModal,
      expect.objectContaining({
        id: rateChangeRequest.id,
        requestTypeEnumValue: rateChangeRequest.requestTypeEnumValue,
        currentRate: rateChangeRequest.currentRate,
        desiredRate: rateChangeRequest.desiredRate,
        talentComment: rateChangeRequest.talentComment
      })
    )

    expect(useModalMock).toHaveBeenNthCalledWith(
      2,
      RequestDetailsModal,
      expect.objectContaining({
        currentRate: rateChangeRequest.currentRate,
        desiredRate: rateChangeRequest.desiredRate,
        talent: rateChangeRequest.talent,
        engagement: rateChangeRequest.engagement,
        createdAt: rateChangeRequest.createdAt,
        answers: undefined
      })
    )
  })

  describe('when complete rate change request operation is disabled', () => {
    it('renders disabled "Complete Request" button', () => {
      const rateChangeRequest = createRateChangeRequestMock()

      arrangeTest({
        ...rateChangeRequest,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts,
        completeRateChangeRequestOperation: {
          callable: OperationCallableTypes.DISABLED,
          messages: []
        }
      })

      expect(
        screen.getByTestId('complete-rate-change-request-button')
      ).toBeDisabled()
    })
  })

  describe('when complete rate change request operation is hidden', () => {
    it('hides the "Complete Request" button', () => {
      const rateChangeRequest = createRateChangeRequestMock()

      arrangeTest({
        ...rateChangeRequest,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts,
        completeRateChangeRequestOperation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })

      expect(
        screen.queryByTestId('complete-rate-change-request-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when complete rate change request operation is enabled', () => {
    const rateChangeRequest = createRateChangeRequestMock()
    const props = {
      ...rateChangeRequest,
      talentSlackContacts: rateChangeRequest.talent?.slackContacts,
      completeRateChangeRequestOperation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }

    it('shows the "Complete Request" button', () => {
      arrangeTest(props)

      expect(
        screen.getByTestId('complete-rate-change-request-button')
      ).toBeInTheDocument()
    })

    it('shows modal when the "Complete Request" button is clicked', () => {
      arrangeTest(props)

      fireEvent.click(screen.getByTestId('complete-rate-change-request-button'))

      expect(showModalMock).toHaveBeenCalled()
    })
  })

  describe('when rate change request status is not "CLAIMED"', () => {
    it('hides the "Contact in Slack" button', () => {
      const rateChangeRequest = createRateChangeRequestMock({
        status: RateChangeRequestStatus.COMPLETED
      })

      arrangeTest({
        ...rateChangeRequest,
        completeRateChangeRequestOperation:
          rateChangeRequest.operations.completeRateChangeRequest,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts
      })

      expect(
        screen.queryByTestId('contact-in-slack-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when rate change request status is "CLAIMED"', () => {
    it('shows "Contact in Slack" button', () => {
      const rateChangeRequest = createRateChangeRequestMock({
        status: RateChangeRequestStatus.CLAIMED
      })

      arrangeTest({
        ...rateChangeRequest,
        completeRateChangeRequestOperation:
          rateChangeRequest.operations.completeRateChangeRequest,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts
      })

      expect(screen.getByTestId('contact-in-slack-button')).toHaveAttribute(
        'href',
        rateChangeRequest.talent?.slackContacts.nodes[0].webResource.url
      )
    })
  })

  describe('when rateChangeRequest does not have an engagement', () => {
    it('hides the "Request Details" button', () => {
      const rateChangeRequest = createRateChangeRequestMock()

      arrangeTest({
        ...rateChangeRequest,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts,
        completeRateChangeRequestOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(
        screen.queryByTestId('request-details-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when rateChangeRequest has an engagement', () => {
    it('shows the "Request Details" button', () => {
      const rateChangeRequest = createRateChangeRequestMock({
        engagement: createActiveEngagementMock()
      })

      arrangeTest({
        ...rateChangeRequest,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts,
        completeRateChangeRequestOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(screen.getByTestId('request-details-button')).toBeInTheDocument()
    })
  })
})
