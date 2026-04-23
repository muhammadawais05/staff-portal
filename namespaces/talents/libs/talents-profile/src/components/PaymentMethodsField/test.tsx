import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useNotifications } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { PaymentOptionPaymentMethod } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import PaymentMethodsField from './PaymentMethodsField'
import {
  createGetTalentPaymentOptionsMock,
  createGetTalentPaymentOptionsFailedMock
} from './data/get-talent-payment-options/mocks'
import { useGetTalentPaymentOptions } from './data/get-talent-payment-options/get-talent-payment-options.staff.gql'

const mockShowDevError = jest.fn()

jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  useNotifications: () => ({
    showDevError: mockShowDevError
  })
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const TALENT_ID = '123'
const ERROR_MESSAGE = 'Failed fetching payment options.'

const defaultProps = {
  paymentOptions: {
    manageLink: {
      text: 'Toptal Payments, ★ Bank Wire',
      url: null
    },
    viewLink: {
      text: 'Toptal Payments, ★ Bank Wire',
      url: null
    },
    nodes: [
      {
        accountInfo: [],
        paymentMethod: PaymentOptionPaymentMethod.TOPTAL_PAYMENTS,
        placeholder: false,
        preferred: false
      },
      {
        accountInfo: [],
        paymentMethod: PaymentOptionPaymentMethod.BANK_WIRE,
        placeholder: false,
        preferred: true
      }
    ]
  }
}

const TestComponent = () => {
  const { showError } = useNotifications()
  const { data: paymentOptions, loading } = useGetTalentPaymentOptions({
    talentId: TALENT_ID,
    onError: () => showError(ERROR_MESSAGE)
  })

  if (loading) {
    return null
  }

  return (
    <div data-testid='payments-container'>
      <PaymentMethodsField paymentOptions={paymentOptions} />
    </div>
  )
}

const arrangeTest = async (mocks: MockedResponse[] = []) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestComponent />
    </TestWrapperWithMocks>
  )

  await screen.findByTestId('payments-container')
}

describe('PaymentMethodsField', () => {
  const showModalMock = jest.fn()

  beforeEach(() => {
    mockUseModal.mockReturnValue({
      showModal: showModalMock
    })
  })

  describe('when the query fails for fetching payment methods', () => {
    it('shows an error', async () => {
      await arrangeTest([
        createGetTalentPaymentOptionsFailedMock({ talentId: TALENT_ID })
      ])

      await expect(() =>
        waitFor(() => {
          expect(mockShowDevError).toHaveBeenCalledWith(ERROR_MESSAGE)
        })
      ).rejects.toThrow()
    })
  })

  describe('when the viewer has basic ability', () => {
    it('renders a simple text', async () => {
      // preferred payment (star) is not shown for users with basic abilities
      const FIELD_TEXT = 'Toptal Payments, Bank Wire'

      await arrangeTest([
        createGetTalentPaymentOptionsMock({
          paymentOptions: defaultProps.paymentOptions,
          talentId: TALENT_ID
        })
      ])

      expect(screen.getByText(FIELD_TEXT)).toBeInTheDocument()
    })
  })
  describe('when the viewer has ability to manage payments', () => {
    it('renders a link that redirects to the payment methods page', async () => {
      const FIELD_TEXT = 'Toptal Payments, ★ Bank Wire'
      const MANAGE_PAYMENTS_URL = 'TEST_LINK'

      const paymentOptions = {
        ...defaultProps.paymentOptions,
        manageLink: {
          text: FIELD_TEXT,
          url: MANAGE_PAYMENTS_URL
        }
      }

      await arrangeTest([
        createGetTalentPaymentOptionsMock({
          paymentOptions,
          talentId: TALENT_ID
        })
      ])

      expect(screen.getByText(FIELD_TEXT)).toBeInTheDocument()
      const link = screen.getByTestId('manage-payments')

      expect(link).toHaveAttribute('href', MANAGE_PAYMENTS_URL)
    })

    it('displays no value if the link text is not provided', async () => {
      const MANAGE_PAYMENTS_URL = 'TEST_LINK'

      const paymentOptions = {
        ...defaultProps.paymentOptions,
        manageLink: {
          text: '',
          url: MANAGE_PAYMENTS_URL
        }
      }

      await arrangeTest([
        createGetTalentPaymentOptionsMock({
          paymentOptions,
          talentId: TALENT_ID
        })
      ])

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })

  describe('when the viewer has ability to view payments', () => {
    it('displays a link that opens a modal with the payment methods', async () => {
      const FIELD_TEXT = 'Toptal Payments, ★ Bank Wire'
      const VIEW_PAYMENTS_URL = 'TEST_LINK'

      const paymentOptions = {
        ...defaultProps.paymentOptions,
        viewLink: {
          text: FIELD_TEXT,
          url: VIEW_PAYMENTS_URL
        }
      }

      await arrangeTest([
        createGetTalentPaymentOptionsMock({
          paymentOptions,
          talentId: TALENT_ID
        })
      ])

      expect(screen.getByText(FIELD_TEXT)).toBeInTheDocument()

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('view-payments'))
      })

      expect(showModalMock).toHaveBeenCalled()
    })

    it('displays no value if the link text is not provided', async () => {
      const VIEW_PAYMENTS_URL = 'TEST_LINK'

      const paymentOptions = {
        ...defaultProps.paymentOptions,
        viewLink: {
          text: '',
          url: VIEW_PAYMENTS_URL
        }
      }

      await arrangeTest([
        createGetTalentPaymentOptionsMock({
          paymentOptions,
          talentId: TALENT_ID
        })
      ])

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })

  describe('when there are no payments to display', () => {
    it('displays no value result', async () => {
      const paymentOptions = {
        nodes: []
      }

      await arrangeTest([
        createGetTalentPaymentOptionsMock({
          paymentOptions,
          talentId: TALENT_ID
        })
      ])

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })
})
