import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../CompanyExternalSourceInfo'
import { adjustTotalFunding } from '../../utils/adjust-values'
import { getCompanyFinancialInformationValueHook } from '../../utils/get-company-financial-information-value-hook'
import CompanyFinancialInformationTotalFunding from '.'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))

jest.mock('../../../CompanyExternalSourceInfo', () => ({
  ...jest.requireActual('../../../CompanyExternalSourceInfo'),
  __esModule: true,
  default: jest.fn(),
  getCompanyExternalSourceStage: jest.fn()
}))
jest.mock('../../utils/get-company-financial-information-value-hook', () => ({
  getCompanyFinancialInformationValueHook: jest.fn()
}))
jest.mock('../../utils/adjust-values', () => ({
  adjustTotalFunding: jest.fn()
}))
jest.mock('../../utils', () => ({
  useGetClientStages: jest.fn()
}))

const EditableFieldMock = EditableField as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock
const getCompanyFinancialInformationValueHookMock =
  getCompanyFinancialInformationValueHook as jest.Mock
const adjustTotalFundingMock = adjustTotalFunding as jest.Mock

const fieldName: keyof Pick<PatchClientProfileInput, 'totalFunding'> =
  'totalFunding'

const disabledMock = 'disabled' as unknown as boolean
const onChangeMock = jest.fn()

const getCompanyMock = (
  mock: Pick<
    CompanyFinancialInformationFragment,
    'totalFunding' | 'buyingSignalsService' | 'clientopedia'
  >
) => ({ id: 'company-id', ...mock } as CompanyFinancialInformationFragment)

const renderComponent = (
  company: CompanyFinancialInformationFragment,
  onChange = () => {}
) =>
  render(
    <TestWrapper>
      <CompanyFinancialInformationTotalFunding
        company={company}
        disabled={disabledMock}
        onChange={onChange}
      />
    </TestWrapper>
  )

describe('CompanyFinancialInformationTotalFunding', () => {
  beforeEach(() => {
    EditableFieldMock.mockReturnValue(null)
    getCompanyFinancialInformationValueHookMock.mockReturnValue('query')
    adjustTotalFundingMock.mockReturnValue('101.0')
    CompanyExternalSourceInfoMock.mockReturnValue(
      <div data-testid='buyingSignalsService-source-info' />
    )
  })

  it('default render', () => {
    const companyMock = getCompanyMock({
      totalFunding: '100.0',
      clientopedia: {
        totalFundingAmount: '101.0'
      },
      buyingSignalsService: {
        totalFunding: '102.0'
      }
    })

    renderComponent(companyMock, onChangeMock)

    expect(getCompanyFinancialInformationValueHookMock).toHaveBeenCalledWith(
      companyMock.id,
      'totalFunding'
    )

    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        adjustValues: adjustTotalFundingMock,
        onChange: onChangeMock,
        disabled: disabledMock,
        updateOnBlur: true,
        name: fieldName,
        queryValue: 'query',
        value: companyMock.totalFunding,
        viewer: '$100.00',
        editor: expect.any(Function)
      }),
      {}
    )

    expect(CompanyExternalSourceInfoMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        formattedValue: '$102.00',
        value: companyMock.buyingSignalsService?.totalFunding,
        userValue: companyMock.totalFunding,
        type: CompanyExternalSourceType.BSS
      }),
      {}
    )
    expect(CompanyExternalSourceInfoMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        formattedValue: '$101.00',
        value: companyMock.clientopedia?.totalFundingAmount,
        userValue: companyMock.totalFunding,
        type: CompanyExternalSourceType.CLIENTOPEDIA
      }),
      {}
    )
  })
})
