import React, { ComponentProps } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'

import {
  CompleteRateChangeRequestFormFields,
  CompleteRateChangeRequestModalContent
} from './components'
import { createRateChangeRequestMock } from '../../data/rate-change-request-fragment/mocks'
import {
  RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CONSULTATION,
  RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CURRENT_ENGAGEMENT,
  RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_FUTURE_ENGAGEMENTS
} from '../../constants'
import CompleteRateChangeRequestModal from './CompleteRateChangeRequestModal'

const mockNotificationError = jest.fn()
const mockHandleMutationResult = jest.fn()
const mockCompleteRateChangeRequest = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({
    showError: mockNotificationError
  })
}))
jest.mock(
  '@staff-portal/mutation-result-handlers/src/form-error-handler',
  () => ({
    __esModule: true,
    useHandleMutationResult: () => ({
      handleMutationResult: mockHandleMutationResult
    })
  })
)
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  formatDate: jest.fn()
}))
jest.mock(
  '../CompleteRateChangeRequestModal/data/complete-rate-change-request',
  () => ({
    __esModule: true,
    useCompleteRateChangeRequest: () => [mockCompleteRateChangeRequest]
  })
)
jest.mock(
  '../CompleteRateChangeRequestModal/components/CompleteRateChangeRequestFormFields'
)
jest.mock(
  '../CompleteRateChangeRequestModal/components/CompleteRateChangeRequestModalContent'
)

const CompleteRateChangeRequestFormFieldsMock =
  CompleteRateChangeRequestFormFields as jest.Mock
const CompleteRateChangeRequestModalContentMock =
  CompleteRateChangeRequestModalContent as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof CompleteRateChangeRequestModal>
) => {
  render(
    <TestWrapper>
      <CompleteRateChangeRequestModal {...props} />
    </TestWrapper>
  )
}

describe('CompleteRateChangeRequestModal', () => {
  beforeEach(() => {
    CompleteRateChangeRequestFormFieldsMock.mockReturnValueOnce(null)
    CompleteRateChangeRequestModalContentMock.mockReturnValueOnce(null)
  })

  it('renders complete consultation modal', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      requestTypeEnumValue: RateChangeRequestTypeEnum.CONSULTATION
    })

    arrangeTest({
      ...rateChangeRequest,
      hideModal: jest.fn()
    })

    expect(screen.getByText('Complete Consultation')).toBeInTheDocument()
    expect(CompleteRateChangeRequestModalContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        requestTypeEnumValue: rateChangeRequest.requestTypeEnumValue,
        currentRate: rateChangeRequest.currentRate,
        desiredRate: rateChangeRequest.desiredRate,
        talentComment: rateChangeRequest.talentComment
      }),
      {}
    )
    expect(CompleteRateChangeRequestFormFieldsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        requestTypeEnumValue: rateChangeRequest.requestTypeEnumValue
      }),
      {}
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Complete' })).toBeInTheDocument()
  })

  it('renders complete rate change modal', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      requestTypeEnumValue: RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT
    })

    arrangeTest({
      ...rateChangeRequest,
      hideModal: jest.fn()
    })

    expect(screen.getByText('Rate Update')).toBeInTheDocument()
    expect(CompleteRateChangeRequestModalContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        requestTypeEnumValue: rateChangeRequest.requestTypeEnumValue,
        currentRate: rateChangeRequest.currentRate,
        desiredRate: rateChangeRequest.desiredRate,
        talentComment: rateChangeRequest.talentComment
      }),
      {}
    )
    expect(CompleteRateChangeRequestFormFieldsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        requestTypeEnumValue: rateChangeRequest.requestTypeEnumValue
      }),
      {}
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Save and Complete' })
    ).toBeInTheDocument()
  })

  it('calls hideModal on close', () => {
    const hideModal = jest.fn()

    arrangeTest({
      ...createRateChangeRequestMock(),
      hideModal
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(hideModal).toHaveBeenCalled()
  })

  it('calls mutation on submit', async () => {
    const rateChangeRequest = createRateChangeRequestMock({
      requestTypeEnumValue: RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT
    })

    arrangeTest({
      ...rateChangeRequest,
      hideModal: jest.fn()
    })

    fireEvent.click(screen.getByTestId('button-complete'))

    await waitFor(() => {
      expect(mockCompleteRateChangeRequest).toHaveBeenCalledWith({
        variables: {
          input: expect.objectContaining({
            rateChangeRequestId: rateChangeRequest.id
          })
        }
      })
    })
  })

  describe('handleMutationResult when mutation is completed', () => {
    const setupTest = (requestTypeEnumValue: RateChangeRequestTypeEnum) => {
      const rateChangeRequest = createRateChangeRequestMock({
        requestTypeEnumValue
      })

      const mutationResult = {
        data: {
          completeRateChangeRequest: {
            rateChangeRequest,
            success: true,
            errors: []
          }
        }
      }

      mockCompleteRateChangeRequest.mockResolvedValueOnce(mutationResult)

      arrangeTest({
        ...rateChangeRequest,
        hideModal: jest.fn()
      })

      return { mutationResult }
    }

    describe('when requestType is "current_engagement', () => {
      it('calls with correct params', async () => {
        const { mutationResult } = setupTest(
          RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT
        )

        fireEvent.click(screen.getByTestId('button-complete'))

        await waitFor(() => {
          expect(mockHandleMutationResult).toHaveBeenCalledWith(
            expect.objectContaining({
              mutationResult: mutationResult.data.completeRateChangeRequest,
              successNotificationMessage:
                RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CURRENT_ENGAGEMENT
            })
          )
        })
      })
    })

    describe('when requestType is "future_engagements', () => {
      it('calls with correct params', async () => {
        const { mutationResult } = setupTest(
          RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS
        )

        fireEvent.click(screen.getByTestId('button-complete'))

        await waitFor(() => {
          expect(mockHandleMutationResult).toHaveBeenCalledWith(
            expect.objectContaining({
              mutationResult: mutationResult.data.completeRateChangeRequest,
              successNotificationMessage:
                RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_FUTURE_ENGAGEMENTS
            })
          )
        })
      })
    })

    describe('when requestType is "consultation', () => {
      it('calls with correct params', async () => {
        const { mutationResult } = setupTest(
          RateChangeRequestTypeEnum.CONSULTATION
        )

        fireEvent.click(screen.getByTestId('button-complete'))

        await waitFor(() => {
          expect(mockHandleMutationResult).toHaveBeenCalledWith(
            expect.objectContaining({
              mutationResult: mutationResult.data.completeRateChangeRequest,
              successNotificationMessage:
                RATE_CHANGE_REQUEST_COMPLETE_SUCCESS_MESSAGE_FOR_CONSULTATION
            })
          )
        })
      })
    })
  })
})
