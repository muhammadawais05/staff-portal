import React, { ComponentProps, useCallback } from 'react'
import { BillCycle, OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import BillingDetailsContent from './BillingDetailsContent'
import BillingDetailsItems from '../BillingDetailsItems'
import JobBillingDefaultsDetails from '../JobBillingDefaultsDetails'
import BillingOption from '../BillingOption'
import { shouldShowJobBillingDefaultsActions } from '../../utils'
import JobBillingDefaultsActions from '../JobBillingDefaultsActions'

jest.mock('../JobBillingDefaultsActions')
jest.mock('../BillingDetailsItems', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../JobBillingDefaultsDetails', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../BillingOption')
const mockedGetShowInvoicesOperations = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

jest.mock('../../utils', () => ({
  useOnOpenJobBillingDeleteModal: jest.fn(),
  getBillingDetailsItems: jest.fn(),
  useBillingOptionActions: jest.fn().mockReturnValue({
    handleOnPreferEnterpriseBillingOption: jest.fn(),
    handleOnUnsetPreferredBillingOption: jest.fn()
  }),
  useBillingOptionCreditCardActions: jest.fn().mockImplementation(() => ({
    handleOnReverifyCreditCardBillingOption: jest.fn()
  })),
  useBillingOptionSetUnsetPreferredActions: jest
    .fn()
    .mockImplementation(() => ({
      handleOnPreferEnterpriseBillingOption: jest.fn(),
      handleOnUnsetPreferredBillingOption: jest.fn()
    })),
  useBillingOptionRemoveActions: jest.fn().mockImplementation(() => ({
    handleOnRemoveBillingOption: jest.fn(),
    handleOnRemoveEnterpriseBillingOption: jest.fn()
  })),
  useWireBillingOptionVerificationActions: jest.fn().mockReturnValue({
    handleOnVerifyWireBillingOption: jest.fn(),
    handleOnUnverifyWireBillingOption: jest.fn()
  }),
  getShowInvoicesOperations: () => mockedGetShowInvoicesOperations,
  getJobBillingDefaultsDetails: jest.fn(),
  useBillingOptionUpdateActions: jest.fn().mockReturnValue({
    handleOnUpdateBillingOption: jest.fn()
  }),
  shouldShowJobBillingDefaultsActions: jest.fn()
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn()
}))

const { MockClient } = fixtures

const jobTemplate = {
  billCycle: BillCycle.BI_WEEKLY,
  id: 'VjEtSm9iVGVtcGxhdGUtMjIy',
  operations: {
    deleteJobTemplate: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    updateJobTemplate: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}

const mockUseCallBack = jest.fn()
const mockedUseCallback = useCallback as jest.Mock
const mockedJobBillingDefaultsDetails = JobBillingDefaultsDetails as jest.Mock
const mockedBillingDetailsItems = BillingDetailsItems as jest.Mock
const mockedShouldShowJobBillingDefaultsActions =
  shouldShowJobBillingDefaultsActions as jest.Mock

const render = (props: ComponentProps<typeof BillingDetailsContent>) =>
  renderComponent(<BillingDetailsContent {...props} />)

describe('BillingDetailsContent', () => {
  beforeEach(jest.clearAllMocks)

  it('renders properly', () => {
    mockedUseCallback.mockReturnValue(mockUseCallBack)
    mockedJobBillingDefaultsDetails.mockReturnValueOnce(null)
    mockedBillingDetailsItems.mockReturnValueOnce(null)
    mockedShouldShowJobBillingDefaultsActions.mockReturnValueOnce(true)

    const mockClient = {
      ...MockClient,
      id: 'VjEtQ29tcGFueS0xMjM0NQ',
      invoices: { totalCount: 15 }
    }

    const { getByTestId } = render({
      client: mockClient,
      viewer: {
        permits: { canManageBillingOptions: true }
      }
    })

    expect(getByTestId('Section-title')).toHaveTextContent('Billing Details')
    expect(getByTestId('ShowInvoicesButton')).toBeInTheDocument()
    expect(mockedJobBillingDefaultsDetails).toHaveBeenCalledWith(
      { jobTemplate: null },
      {}
    )
    expect(mockedBillingDetailsItems).toHaveBeenCalledWith(
      { client: mockClient },
      {}
    )
    expect(JobBillingDefaultsActions).toHaveBeenCalledTimes(1)
    expect(JobBillingDefaultsActions).toHaveBeenCalledWith(
      {
        handleOnClick: mockUseCallBack,
        type: 'create'
      },
      {}
    )
    expect(JobBillingDefaultsActions).not.toHaveBeenCalledWith(
      {
        handleOnClick: mockUseCallBack,
        type: 'update'
      },
      {}
    )
    expect(BillingOption).toHaveBeenCalledTimes(3)
    expect(BillingOption).toHaveBeenNthCalledWith(
      1,
      {
        billingOption: MockClient.billingOptions.nodes[0],
        activeId: '',
        handleOnClick: mockUseCallBack,
        canManageBillingOptions: true
      },
      {}
    )
    expect(BillingOption).toHaveBeenNthCalledWith(
      2,
      {
        billingOption: MockClient.billingOptions.nodes[1],
        activeId: '',
        handleOnClick: mockUseCallBack,
        canManageBillingOptions: true
      },
      {}
    )
    expect(BillingOption).toHaveBeenNthCalledWith(
      3,
      {
        activeId: '',
        billingOption: {
          ...MockClient.billingOptions.nodes[2],
          __typename: 'PaypalBillingOption',
          accountInfo: [
            {
              __typename: 'AccountInfo',
              label: 'Business name',
              value: 'Paypal business name'
            },
            {
              __typename: 'AccountInfo',
              label: 'Email',
              value: 'paypal@toptal.com'
            }
          ],
          billingMethod: 'PAYPAL',
          comment: 'Example comment.',
          discountValue: 3,
          discountable: false,
          id: 'VjEtUGF5cGFsQmlsbGluZ09wdGlvbi0xNjY5',
          isLastPullMethod: false,
          name: 'PayPal',
          operations: {
            __typename: 'PaypalBillingOptionOperations',
            preferEnterpriseBillingOption: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            removeBillingOption: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            removeEnterpriseBillingOption: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: []
            },
            unsetPreferredBillingOption: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: []
            },
            updateBillingOption: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            }
          },
          preferred: false,
          status: 'VERIFIED'
        },
        handleOnClick: mockUseCallBack,
        canManageBillingOptions: true
      },
      {}
    )
    expect(
      getByTestId(`BillingDetailsContent-downloadBillingReport`)
    ).toHaveTextContent('Download Billing Report')
  })

  it('renders Billing Defaults Update section', () => {
    mockedUseCallback.mockReturnValueOnce(mockUseCallBack)
    mockedJobBillingDefaultsDetails.mockReturnValueOnce([])
    mockedBillingDetailsItems.mockReturnValueOnce([])
    mockedShouldShowJobBillingDefaultsActions.mockReturnValueOnce(true)

    render({
      client: {
        ...MockClient,
        jobTemplate,
        id: 'VjEtQ29tcGFueS0xMjM0NQ',
        invoices: { totalCount: 15 }
      },
      viewer: {
        permits: { canManageBillingOptions: true }
      }
    })

    expect(JobBillingDefaultsActions).toHaveBeenCalledTimes(2)
    expect(JobBillingDefaultsActions).toHaveBeenNthCalledWith(
      1,
      {
        handleOnClick: mockUseCallBack,
        operation: { callable: 'ENABLED', messages: [] },
        type: 'update'
      },
      {}
    )
    expect(JobBillingDefaultsActions).toHaveBeenNthCalledWith(
      2,
      {
        handleOnClick: mockUseCallBack,
        operation: { callable: 'ENABLED', messages: [] },
        type: 'remove'
      },
      {}
    )
  })

  it('does not render Billing Defaults Update section if not accessible', () => {
    mockedUseCallback.mockReturnValueOnce(mockUseCallBack)
    mockedJobBillingDefaultsDetails.mockReturnValueOnce([])
    mockedBillingDetailsItems.mockReturnValueOnce([])
    mockedShouldShowJobBillingDefaultsActions.mockReturnValueOnce(false)

    render({
      client: {
        ...MockClient,
        jobTemplate,
        id: 'VjEtQ29tcGFueS0xMjM0NQ',
        invoices: { totalCount: 15 }
      },
      viewer: {
        permits: { canManageBillingOptions: true }
      }
    })

    expect(JobBillingDefaultsActions).not.toHaveBeenCalled()
  })
})
