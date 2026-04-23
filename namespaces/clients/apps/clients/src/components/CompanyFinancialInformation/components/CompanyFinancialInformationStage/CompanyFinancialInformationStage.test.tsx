import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  getCompanyExternalSourceStage,
  CompanyExternalSourceType
} from '../../../CompanyExternalSourceInfo'
import { useGetClientStages } from '../../utils'
import { adjustStage } from '../../utils/adjust-values'
import { getCompanyFinancialInformationValueHook } from '../../utils/get-company-financial-information-value-hook'
import CompanyFinancialInformationStage from '.'

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
  adjustStage: jest.fn()
}))
jest.mock('../../utils', () => ({
  useGetClientStages: jest.fn()
}))

const EditableFieldMock = EditableField as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock
const getCompanyFinancialInformationValueHookMock =
  getCompanyFinancialInformationValueHook as jest.Mock
const useGetClientStagesMock = useGetClientStages as jest.Mock
const adjustStageMock = adjustStage as jest.Mock
const getCompanyExternalSourceStageMock =
  getCompanyExternalSourceStage as jest.Mock

const fieldName: keyof Pick<PatchClientProfileInput, 'stage'> = 'stage'

const disabledMock = 'disabled' as unknown as boolean
const onChangeMock = jest.fn()

const getCompanyMock = (
  mock: Pick<
    CompanyFinancialInformationFragment,
    'stage' | 'buyingSignalsService'
  >
) => ({ id: 'company-id', ...mock } as CompanyFinancialInformationFragment)

const renderComponent = (
  company: CompanyFinancialInformationFragment,
  onChange = () => {}
) =>
  render(
    <TestWrapper>
      <CompanyFinancialInformationStage
        company={company}
        disabled={disabledMock}
        onChange={onChange}
      />
    </TestWrapper>
  )

describe('CompanyFinancialInformationStage', () => {
  beforeEach(() => {
    EditableFieldMock.mockReturnValue(null)
    getCompanyExternalSourceStageMock.mockReturnValue('stage')
    getCompanyFinancialInformationValueHookMock.mockReturnValue('query')
    useGetClientStagesMock.mockReturnValue('options')
    adjustStageMock.mockReturnValue('stage')
    CompanyExternalSourceInfoMock.mockReturnValue(
      <div data-testid='buyingSignalsService-source-info' />
    )
  })

  it('default render', () => {
    const companyMock = getCompanyMock({
      stage: 'stage',
      buyingSignalsService: {
        stage: 'stage'
      }
    })

    renderComponent(companyMock, onChangeMock)

    expect(getCompanyFinancialInformationValueHookMock).toHaveBeenCalledWith(
      companyMock.id,
      'stage'
    )

    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        adjustValues: adjustStageMock,
        queryOptions: useGetClientStagesMock,
        onChange: onChangeMock,
        disabled: disabledMock,
        updateOnBlur: true,
        name: fieldName,
        queryValue: 'query',
        value: companyMock.stage,
        viewer: companyMock.stage,
        editor: expect.any(Function)
      }),
      {}
    )

    expect(CompanyExternalSourceInfoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 'stage',
        userValue: companyMock.stage,
        type: CompanyExternalSourceType.BSS
      }),
      {}
    )
  })
})
