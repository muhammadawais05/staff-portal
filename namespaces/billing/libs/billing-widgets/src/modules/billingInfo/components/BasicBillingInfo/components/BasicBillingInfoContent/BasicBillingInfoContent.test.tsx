import React from 'react'
import { Amount } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import MockClient from '@staff-portal/billing/src/_fixtures/graphql/gateway/client'
/**
 * TODO: remove the comment, once the component would be extracted to the correct folder
 * https://toptal-core.atlassian.net/browse/SP-2308
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PaymentMethodsField } from '@staff-portal/talents-profile'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import BasicBillingInfoContent from '.'
import AccountBalance from '../../../../components/AccountBalance'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Amount: jest.fn()
}))
jest.mock('@staff-portal/ui', () => {
  const mock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  mock.Row = jest.fn()
  mock.Item = jest.fn()

  return {
    DetailedList: mock
  }
})
jest.mock('@staff-portal/talents-profile', () => ({
  PaymentMethodsField: jest.fn()
}))
jest.mock('../../../../components/AccountBalance', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: jest.fn().mockReturnValue({
    handleOnOpenModalWithUrlSearch: jest.fn(),
    handleOnOpenModal: jest.fn()
  })
}))

const mockedDetailedList = DetailedList as unknown as jest.Mock
const mockedDetailedListRow = DetailedList.Row as unknown as jest.Mock
const mockedDetailedListItem = DetailedList.Item as unknown as jest.Mock
const mockedPaymentMethodsField = PaymentMethodsField as jest.Mock
const mockedAccountBalance = AccountBalance as jest.Mock
const mockedAmount = Amount as unknown as jest.Mock

const client = {
  ...MockClient,
  unallocatedMemorandums: {
    ...MockClient.unallocatedMemorandums,
    totalAmount: '550.0',
    webResource: {
      text: '',
      url: 'mockUrlValue'
    }
  },
  unappliedCashBalance: '100'
}

interface Props {
  canViewPaymentOptions?: boolean
  availablePrepaymentBalanceNullable?: string | null
}

const render = (props: Props = {}) => {
  const {
    canViewPaymentOptions = true,
    availablePrepaymentBalanceNullable = client.availablePrepaymentBalanceNullable
  } = props

  mockedDetailedList.mockImplementation(({ children }) => children)
  mockedDetailedListRow.mockImplementation(({ children }) => children)
  mockedDetailedListItem.mockImplementation(({ label, children }) => (
    <div data-testid={label}>{children}</div>
  ))

  mockedPaymentMethodsField.mockReturnValue(null)
  mockedAccountBalance.mockReturnValue(null)
  mockedAmount.mockReturnValue(null)

  const viewer = {
    permits: {
      canViewPaymentOptions
    }
  }

  return renderComponent(
    <BasicBillingInfoContent
      client={{ ...client, availablePrepaymentBalanceNullable }}
      viewer={viewer}
    />
  )
}

describe('BasicBillingInfoContent', () => {
  it('renders expected components with appropriate props', () => {
    const { getByText, getByTestId } = render()

    expect(getByText('Basic Billing Info')).toBeInTheDocument()
    expect(
      getByTestId('BasicBillingInfoContent-clientRefundCreditBalance-button')
    ).toBeInTheDocument()

    expect(mockedPaymentMethodsField).toHaveBeenCalledTimes(1)
    expect(mockedPaymentMethodsField).toHaveBeenCalledWith(
      {
        paymentOptions: client.paymentOptions
      },
      {}
    )
    expect(mockedAccountBalance).toHaveBeenCalledTimes(1)
    expect(mockedAccountBalance).toHaveBeenCalledWith(
      {
        accountBalance: client.unallocatedMemorandums.totalAmount,
        accountBalanceUrl: 'mockUrlValue'
      },
      {}
    )
    expect(mockedAmount).toHaveBeenCalledTimes(2)
    expect(mockedAmount).toHaveBeenNthCalledWith(
      1,
      {
        amount: client.availablePrepaymentBalanceNullable
      },
      {}
    )
    expect(mockedAmount).toHaveBeenNthCalledWith(
      2,
      {
        amount: client.unappliedCashBalance,
        weight: 'semibold'
      },
      {}
    )
  })

  it('renders unapplied cash entries details button', () => {
    const { handleOnOpenModal } = useModals()
    const { getByTestId } = render()
    const mockedHandleOnOpenModal = handleOnOpenModal as jest.Mock

    getByTestId('unapplied-cash-entries-button').click()

    expect(mockedHandleOnOpenModal).toHaveBeenCalledWith(
      ModalKey.unappliedCashEntries,
      {
        nodeId: '217389',
        nodeType: 'client'
      }
    )
  })

  describe('when the user cannot view payment options', () => {
    it('does not render Unapplied Cash Balance field', () => {
      jest.clearAllMocks()

      const { queryByTestId } = render({
        canViewPaymentOptions: false
      })

      expect(mockedAmount).toHaveBeenCalledTimes(1)
      expect(queryByTestId('Unapplied cash balance')).not.toBeInTheDocument()
    })
  })

  describe('when Credit Balance is not available', () => {
    it('renders EMPTY_DATA instead of Amount as Credit Balance value', () => {
      jest.clearAllMocks()

      const { queryByTestId } = render({
        availablePrepaymentBalanceNullable: null,
        canViewPaymentOptions: false
      })

      expect(mockedAmount).toHaveBeenCalledTimes(0)
      expect(queryByTestId('Credit balance')).toHaveTextContent(EMPTY_DATA)
    })
  })
})
