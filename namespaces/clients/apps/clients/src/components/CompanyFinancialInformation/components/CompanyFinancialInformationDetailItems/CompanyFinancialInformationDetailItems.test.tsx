import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import CompanyFinancialInformationStage from '../CompanyFinancialInformationStage'
import CompanyFinancialInformationAcquiredBy from '../CompanyFinancialInformationAcquiredBy'
import CompanyFinancialInformationTotalFunding from '../CompanyFinancialInformationTotalFunding'
import CompanyFinancialInformationAcquiredCompanies from '../CompanyFinancialInformationAcquiredCompanies'
import CompanyFinancialInformationDetailItems from '.'

jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))

jest.mock('../CompanyFinancialInformationStage', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../CompanyFinancialInformationAcquiredBy', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../CompanyFinancialInformationTotalFunding', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../CompanyFinancialInformationAcquiredCompanies', () => ({
  __esModule: true,
  default: jest.fn()
}))

const CHANGE_HANDLER = Symbol()

const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const CompanyFinancialInformationStageMock =
  CompanyFinancialInformationStage as jest.Mock
const CompanyFinancialInformationAcquiredByMock =
  CompanyFinancialInformationAcquiredBy as jest.Mock
const CompanyFinancialInformationTotalFundingMock =
  CompanyFinancialInformationTotalFunding as jest.Mock
const CompanyFinancialInformationAcquiredCompaniesMock =
  CompanyFinancialInformationAcquiredCompanies as jest.Mock

describe('#CompanyFinancialInformationDetailItems', () => {
  it('renders proper items', () => {
    useEditableFieldChangeHandlerMock.mockReturnValue(CHANGE_HANDLER)
    CompanyFinancialInformationStageMock.mockReturnValueOnce(null)
    CompanyFinancialInformationAcquiredByMock.mockReturnValueOnce(null)
    CompanyFinancialInformationTotalFundingMock.mockReturnValueOnce(null)
    CompanyFinancialInformationAcquiredCompaniesMock.mockReturnValueOnce(null)

    const clientMock = {
      id: encodeEntityId('123', 'Client'),
      operations: {
        patchClientProfile: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    }

    render(
      <CompanyFinancialInformationDetailItems companyDetails={clientMock} />
    )

    expect(CompanyFinancialInformationStageMock).toHaveBeenCalledTimes(1)
    expect(CompanyFinancialInformationStageMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        company: clientMock,
        disabled: false,
        onChange: CHANGE_HANDLER
      }),
      {}
    )
    expect(CompanyFinancialInformationAcquiredByMock).toHaveBeenCalledTimes(1)
    expect(CompanyFinancialInformationAcquiredByMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        company: clientMock,
        disabled: false,
        onChange: CHANGE_HANDLER
      }),
      {}
    )
    expect(CompanyFinancialInformationTotalFundingMock).toHaveBeenCalledTimes(1)
    expect(CompanyFinancialInformationTotalFundingMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        company: clientMock,
        disabled: false,
        onChange: CHANGE_HANDLER
      }),
      {}
    )
    expect(
      CompanyFinancialInformationAcquiredCompaniesMock
    ).toHaveBeenCalledTimes(1)
    expect(
      CompanyFinancialInformationAcquiredCompaniesMock
    ).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        company: clientMock,
        disabled: false,
        onChange: CHANGE_HANDLER
      }),
      {}
    )
  })
})
