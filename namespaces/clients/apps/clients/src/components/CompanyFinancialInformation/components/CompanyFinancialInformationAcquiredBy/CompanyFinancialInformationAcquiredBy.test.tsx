import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  getCompanyExternalSourceAcquiredBy,
  CompanyExternalSourceType
} from '../../../CompanyExternalSourceInfo'
import { adjustAcquiredBy } from '../../utils/adjust-values'
import { getCompanyFinancialInformationValueHook } from '../../utils/get-company-financial-information-value-hook'
import CompanyFinancialInformationAcquiredBy from '.'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))

jest.mock('../../../CompanyExternalSourceInfo', () => ({
  ...jest.requireActual('../../../CompanyExternalSourceInfo'),
  __esModule: true,
  default: jest.fn(),
  getCompanyExternalSourceAcquiredBy: jest.fn(),
  getCompanyExternalSourceAcquiredByTooltip: jest.fn()
}))
jest.mock('../../utils/get-company-financial-information-value-hook', () => ({
  getCompanyFinancialInformationValueHook: jest.fn()
}))
jest.mock('../../utils/adjust-values', () => ({
  adjustAcquiredBy: jest.fn()
}))

const EditableFieldMock = EditableField as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock
const getCompanyFinancialInformationValueHookMock =
  getCompanyFinancialInformationValueHook as jest.Mock
const adjustAcquiredByMock = adjustAcquiredBy as jest.Mock
const getCompanyExternalSourceAcquiredByMock =
  getCompanyExternalSourceAcquiredBy as jest.Mock

const fieldName: keyof Pick<PatchClientProfileInput, 'acquiredBy'> =
  'acquiredBy'

const disabledMock = 'disabled' as unknown as boolean
const onChangeMock = jest.fn()

const getCompanyMock = (
  mock: Pick<
    CompanyFinancialInformationFragment,
    'acquiredBy' | 'buyingSignalsService'
  >
) => ({ id: 'company-id', ...mock } as CompanyFinancialInformationFragment)

const renderComponent = (
  company: CompanyFinancialInformationFragment,
  onChange = () => {}
) =>
  render(
    <TestWrapper>
      <CompanyFinancialInformationAcquiredBy
        company={company}
        disabled={disabledMock}
        onChange={onChange}
      />
    </TestWrapper>
  )

describe('CompanyFinancialInformationAcquiredBy', () => {
  beforeEach(() => {
    EditableFieldMock.mockReturnValue(null)
    getCompanyExternalSourceAcquiredByMock.mockReturnValue(['acquired-by'])
    getCompanyFinancialInformationValueHookMock.mockReturnValue('query')
    CompanyExternalSourceInfoMock.mockReturnValue(
      <div data-testid='buyingSignalsService-source-info' />
    )
  })

  it('default render', () => {
    const companyMock = getCompanyMock({
      acquiredBy: ['acquired-by'],
      buyingSignalsService: {
        acquiredBy: ['acquired-by-1', 'acquired-by-2']
      }
    })

    renderComponent(companyMock, onChangeMock)

    expect(getCompanyFinancialInformationValueHookMock).toHaveBeenCalledWith(
      companyMock.id,
      'acquiredBy'
    )

    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        adjustValues: adjustAcquiredByMock,
        onChange: onChangeMock,
        disabled: disabledMock,
        updateOnBlur: true,
        name: fieldName,
        queryValue: 'query',
        value: companyMock.acquiredBy,
        viewer: companyMock.acquiredBy,
        editor: expect.any(Function)
      }),
      {}
    )

    expect(CompanyExternalSourceInfoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 'acquired-by-1, acquired-by-2',
        userValue: companyMock.acquiredBy,
        type: CompanyExternalSourceType.BSS
      }),
      {}
    )
  })
})
