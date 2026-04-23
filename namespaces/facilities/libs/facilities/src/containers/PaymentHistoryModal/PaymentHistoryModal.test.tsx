import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor, within } from '@toptal/picasso/test-utils'
import React from 'react'
import { navigateExternallyTo } from '@staff-portal/navigation'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, noop } from '@staff-portal/test-utils'
import { NodeType } from '@staff-portal/graphql'

import {
  createDownloadRolePaymentHistoryFailedMock,
  createDownloadRolePaymentHistoryMock
} from './data/mocks'
import PaymentHistoryModal, { Props } from './PaymentHistoryModal'

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  navigateExternallyTo: jest.fn()
}))

const navigateExternallyToMock = navigateExternallyTo as jest.Mock

const TALENT_ID = encodeEntityId('100', 'Test')

const START_DATE_TEST_ID = 'payment-history-start-date'
const END_DATE_TEST_ID = 'payment-history-end-date'
const PAYMENT_HISTORY_SUBMIT_BTN = 'payment-history-submit-button'

const arrangeTest = (
  hideModal: Props['hideModal'],
  mocks: MockedResponse[]
) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <PaymentHistoryModal
        nodeId={TALENT_ID}
        hideModal={hideModal}
        nodeType={NodeType.TALENT}
      />
    </TestWrapperWithMocks>
  )
}

const fillInForm = async () => {
  const { startDateInput, endDateInput, submitBtn } = await getControls()

  fireEvent.change(startDateInput, {
    target: { value: '2020-10-10' }
  })
  fireEvent.change(endDateInput, {
    target: { value: '2020-11-11' }
  })
  fireEvent.click(submitBtn)
}

const getControls = async () => {
  const startDate = await screen.findByTestId(START_DATE_TEST_ID)
  const endDate = await screen.findByTestId(END_DATE_TEST_ID)
  const submitBtn = await screen.findByTestId(PAYMENT_HISTORY_SUBMIT_BTN)
  const startDateInput = within(startDate).getByPlaceholderText('yyyy-mm-dd')
  const endDateInput = within(endDate).getByPlaceholderText('yyyy-mm-dd')

  return { startDateInput, endDateInput, submitBtn }
}

describe('PaymentHistoryModal', () => {
  it('should render modal with two fields', async () => {
    arrangeTest(noop, [])
    const { startDateInput, endDateInput } = await getControls()

    expect(startDateInput).toBeInTheDocument()
    expect(endDateInput).toBeInTheDocument()
  })

  it('successfully download payment history', async () => {
    const onClose = jest.fn()

    arrangeTest(onClose, [
      createDownloadRolePaymentHistoryMock({
        roleId: TALENT_ID,
        startDate: '2020-10-10',
        endDate: '2020-11-11'
      })
    ])
    await fillInForm()
    await waitFor(() =>
      expect(navigateExternallyToMock).toHaveBeenCalledWith('downloadMockUrl')
    )
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
  })

  it('handle request with an error', async () => {
    const onClose = jest.fn()

    arrangeTest(onClose, [
      createDownloadRolePaymentHistoryFailedMock({
        roleId: TALENT_ID,
        startDate: '2020-10-10',
        endDate: '2020-11-11'
      })
    ])

    await fillInForm()

    expect(
      await screen.findByText('Unable to download payment history.')
    ).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(0)
  })
})
