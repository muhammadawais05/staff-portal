import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { ContractBillingType, ContractKind } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, noop } from '@staff-portal/test-utils'

import {
  createImportTalentContractInvalidMock,
  createImportTalentContractMock
} from './data/mocks'
import {
  ImportTalentContractModal,
  Props,
  billingTypeOptions
} from './ImportTalentContractModal'

const TALENT_ID = encodeEntityId('100', 'Test')
const GUID = '5bc65b65-3bfa-4309-aaed-2a3e079dcf11'

const KIND_TEST_ID = 'talent-contract-kind'
const BILLING_TYPE_TEST_ID = 'talent-contract-billing-type'
const GUID_TEST_ID = 'talent-contract-guid'
const SUBMIT_TEST_ID = 'import-contract-submit-button'

const billingThroughBusinessText = billingTypeOptions.find(
  ({ value }) => value === ContractBillingType.ENTITY
)?.text

const arrangeTest = (hideModal: Props['hideModal'], mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ImportTalentContractModal talentId={TALENT_ID} hideModal={hideModal} />
    </TestWrapperWithMocks>
  )

const getControls = () => {
  const kind = screen.getByTestId(KIND_TEST_ID)
  const billingType = screen.getByTestId(BILLING_TYPE_TEST_ID)
  const guid = screen.getByTestId(GUID_TEST_ID)

  const kindInput = kind.querySelector('input[type="text"]') as HTMLElement
  const billingTypeInput = billingType.querySelector(
    'input[type="text"]'
  ) as HTMLElement
  const guidInput = guid.querySelector('input[type="text"]') as HTMLElement

  return {
    kindInput,
    billingTypeInput,
    guidInput
  }
}

describe('ImportTalentContractModal', () => {
  it('should render modal with four fields', () => {
    arrangeTest(noop, [])
    const { kindInput, billingTypeInput, guidInput } = getControls()

    expect(kindInput).toBeInTheDocument()
    expect(billingTypeInput).toBeInTheDocument()
    expect(billingTypeInput).toHaveValue(billingThroughBusinessText)
    expect(guidInput).toBeInTheDocument()
  })

  it('successfully import talent contract', async () => {
    const onClose = jest.fn()

    arrangeTest(onClose, [
      createImportTalentContractMock({
        guid: GUID,
        kind: ContractKind.TAX_FORM,
        billingType: ContractBillingType.INDIVIDUAL,
        talentId: TALENT_ID
      })
    ])
    const { kindInput, billingTypeInput, guidInput } = getControls()

    fireEvent.click(kindInput)
    fireEvent.click(screen.getByText(/tax form/i))

    fireEvent.click(billingTypeInput)
    fireEvent.click(screen.getByText(/individual/i))

    fireEvent.change(guidInput, {
      target: { value: GUID }
    })
    fireEvent.click(screen.getByTestId(SUBMIT_TEST_ID))

    expect(
      await screen.findByText('Contract has been imported.')
    ).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('incorrect guid', async () => {
    const ERROR_MESSAGE = 'ERROR_MESSAGE.'
    const INVALID_GUID = 'invalid guid'
    const onClose = jest.fn()

    arrangeTest(onClose, [
      createImportTalentContractInvalidMock(
        {
          guid: INVALID_GUID,
          kind: ContractKind.TAX_FORM,
          billingType: ContractBillingType.INDIVIDUAL,
          talentId: TALENT_ID
        },
        [
          {
            key: 'base',
            message: ERROR_MESSAGE
          }
        ]
      )
    ])

    const { kindInput, billingTypeInput, guidInput } = getControls()

    fireEvent.click(kindInput)
    fireEvent.click(screen.getByText(/tax form/i))

    fireEvent.click(billingTypeInput)
    fireEvent.click(screen.getByText(/individual/i))

    fireEvent.change(guidInput, {
      target: { value: INVALID_GUID }
    })
    fireEvent.click(screen.getByTestId(SUBMIT_TEST_ID))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(0)
  })
})
