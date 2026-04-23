import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentContractsAndAgreementsSection from './TalentContractsAndAgreementsSection'
import {
  createGetTalentContractsMock,
  createGetTalentContractsFailedMock
} from './data/get-talent-contracts/mocks'

jest.mock('../TalentContractItem', () => ({
  __esModule: true,
  default: () => <div data-testid='contract-item' />
}))

jest.mock('../TalentAgreementItem', () => ({
  __esModule: true,
  default: () => <div data-testid='agreement-item' />
}))

const arrangeTest = (talentId: string, mocks: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentContractsAndAgreementsSection talentId={talentId} />
    </TestWrapperWithMocks>
  )
}

describe('TalentContractsAndAgreementsSection', () => {
  it('shows an error message if unable to fetch contracts', async () => {
    const id = '123'

    arrangeTest(id, [createGetTalentContractsFailedMock({ talentId: id })])

    expect(
      await screen.findByText(
        'Failed to fetch talent contracts and agreements.'
      )
    ).toBeInTheDocument()
  })

  it('lists contracts and agreements', async () => {
    const id = 'VjEtVGFsZW50LTE5NzE4OTc'

    arrangeTest(id, [
      createGetTalentContractsMock({
        talentId: id
      })
    ])

    const contracts = await screen.findAllByTestId('contract-item')
    const agreements = await screen.findAllByTestId('agreement-item')

    expect(screen.queryByText('Contracts and Agreements')).toBeInTheDocument()
    expect(contracts).toHaveLength(1)
    expect(agreements).toHaveLength(1)
  })

  it('hides the section when there are not contracts or agreements to display', async () => {
    const id = 'VjEtVGFsZW50LTE5NzE4OTc'

    arrangeTest(id, [
      createGetTalentContractsMock({
        talentId: id,
        contractsAndAgreements: { edges: [] }
      })
    ])

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('skeleton-loader')
    )

    expect(
      screen.queryByText('Contracts and Agreements')
    ).not.toBeInTheDocument()
  })
})
