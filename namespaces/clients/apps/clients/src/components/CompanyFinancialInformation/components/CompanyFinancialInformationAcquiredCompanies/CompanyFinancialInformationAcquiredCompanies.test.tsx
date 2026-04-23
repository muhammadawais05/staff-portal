import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  CompanyExternalSourceType,
  getCompanyExternalSourceAcquiredCompanies
} from '../../../CompanyExternalSourceInfo'
import { adjustAcquiredCompanies } from '../../utils/adjust-values'
import { getCompanyFinancialInformationValueHook } from '../../utils/get-company-financial-information-value-hook'
import CompanyFinancialInformationAcquiredCompanies from '.'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))

jest.mock('../../../CompanyExternalSourceInfo', () => ({
  ...jest.requireActual('../../../CompanyExternalSourceInfo'),
  __esModule: true,
  default: jest.fn(),
  getCompanyExternalSourceAcquiredCompanies: jest.fn()
}))
jest.mock('../../utils/get-company-financial-information-value-hook', () => ({
  getCompanyFinancialInformationValueHook: jest.fn()
}))
jest.mock('../../utils/adjust-values', () => ({
  adjustAcquiredCompanies: jest.fn()
}))
jest.mock('../../utils', () => ({
  useGetClientStages: jest.fn()
}))

const EditableFieldMock = EditableField as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock
const getCompanyFinancialInformationValueHookMock =
  getCompanyFinancialInformationValueHook as jest.Mock
const adjustAcquiredCompaniesMock = adjustAcquiredCompanies as jest.Mock
const getCompanyExternalSourceAcquiredCompaniesMock =
  getCompanyExternalSourceAcquiredCompanies as jest.Mock

const fieldName: keyof Pick<PatchClientProfileInput, 'acquiredCompanies'> =
  'acquiredCompanies'

const disabledMock = 'disabled' as unknown as boolean
const onChangeMock = jest.fn()

const getCompanyMock = (
  mock: Pick<
    CompanyFinancialInformationFragment,
    'acquiredCompanies' | 'buyingSignalsService'
  >
) => ({ id: 'company-id', ...mock } as CompanyFinancialInformationFragment)

const renderComponent = (
  company: CompanyFinancialInformationFragment,
  onChange = () => {}
) =>
  render(
    <TestWrapper>
      <CompanyFinancialInformationAcquiredCompanies
        company={company}
        disabled={disabledMock}
        onChange={onChange}
      />
    </TestWrapper>
  )

describe('CompanyFinancialInformationTotalFunding', () => {
  beforeEach(() => {
    EditableFieldMock.mockReturnValue(null)
    getCompanyExternalSourceAcquiredCompaniesMock.mockReturnValue([
      'acquiredCompanies-1',
      'acquiredCompanies-2'
    ])
    getCompanyFinancialInformationValueHookMock.mockReturnValue('query')
    adjustAcquiredCompaniesMock.mockReturnValue([
      'acquiredCompanies-1',
      'acquiredCompanies-2'
    ])
    CompanyExternalSourceInfoMock.mockReturnValue(
      <div data-testid='buyingSignalsService-source-info' />
    )
  })

  it('default render', () => {
    const companyMock = getCompanyMock({
      acquiredCompanies: ['acquiredCompanies-1', 'acquiredCompanies-2'],
      buyingSignalsService: {
        acquiredCompanies: [
          'buyingSignalsService-acquiredCompanies-1',
          'buyingSignalsService-acquiredCompanies-2'
        ]
      }
    })

    renderComponent(companyMock, onChangeMock)

    expect(getCompanyFinancialInformationValueHookMock).toHaveBeenCalledWith(
      companyMock.id,
      'acquiredCompanies'
    )

    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        adjustValues: adjustAcquiredCompaniesMock,
        onChange: onChangeMock,
        disabled: disabledMock,
        updateOnBlur: true,
        name: fieldName,
        queryValue: 'query',
        value: companyMock.acquiredCompanies,
        viewer: companyMock.acquiredCompanies,
        editor: expect.any(Function)
      }),
      {}
    )

    expect(CompanyExternalSourceInfoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value:
          'buyingSignalsService-acquiredCompanies-1, buyingSignalsService-acquiredCompanies-2',
        userValue: ['acquiredCompanies-1', 'acquiredCompanies-2'],
        type: CompanyExternalSourceType.BSS
      }),
      {}
    )
  })
})
