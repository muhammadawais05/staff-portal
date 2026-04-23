import React from 'react'
import { Amount } from '@toptal/picasso'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField, getAdjustBigDecimalValue } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import { getClientAnnualRevenueHook } from '../../../../utils'
import {
  GetInDepthCompanyResearchClientFragment,
  SetPatchClientProfileDocument
} from '../../../../data'
import InDepthCompanyResearchAnnualRevenue from './InDepthCompanyResearchAnnualRevenue'
import { AnnualRevenueViewer } from './components'

jest.mock('@staff-portal/editable', () => ({
  getAdjustBigDecimalValue: jest.fn(),
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock(
  '../../../../../components/CompanyExternalSourceInfo/CompanyExternalSourceInfo'
)
jest.mock('../../../../utils', () => ({
  getClientAnnualRevenueHook: jest.fn()
}))

const EditableFieldMock = EditableField as jest.Mock
const getAdjustBigDecimalValueMock = getAdjustBigDecimalValue as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock
const getClientAnnualRevenueHookMock = getClientAnnualRevenueHook as jest.Mock

const fieldName: keyof Pick<PatchClientProfileInput, 'annualRevenue'> =
  'annualRevenue'

const disabledMock = 'disabled' as unknown as boolean

const getCompanyMock = (
  mock: Pick<
    GetInDepthCompanyResearchClientFragment,
    'annualRevenue' | 'clientopedia'
  >
) => ({ id: 'company-id', ...mock } as GetInDepthCompanyResearchClientFragment)

const renderComponent = (company: GetInDepthCompanyResearchClientFragment) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearchAnnualRevenue
        company={company}
        disabled={disabledMock}
      />
    </TestWrapper>
  )

describe('InDepthCompanyResearchAnnualRevenue', () => {
  beforeEach(() => {
    useEditableFieldChangeHandlerMock.mockReturnValue('handler')
    EditableFieldMock.mockReturnValue(null)
    getClientAnnualRevenueHookMock.mockReturnValue('query')
    getAdjustBigDecimalValueMock.mockReturnValue('adjust-function')
    CompanyExternalSourceInfoMock.mockReturnValue(
      <div data-testid='clientopedia-source-info' />
    )
  })

  it.each([
    { annualRevenue: 'annual-revenue', expected: 'annual-revenue' },
    { annualRevenue: '', expected: null },
    { annualRevenue: null, expected: null },
    { annualRevenue: undefined, expected: null }
  ])(
    'passes correct initialValues to useEditableFieldChangeHandler',
    ({ annualRevenue, expected }) => {
      const companyMock = getCompanyMock({ annualRevenue })

      renderComponent(companyMock)

      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: { annualRevenue: expected }
        })
      )
    }
  )

  it('calls inner functions and components with correct params', () => {
    const companyMock = getCompanyMock({
      annualRevenue: 'annual-revenue',
      clientopedia: {
        revenue: 'clientopedia-revenue'
      }
    })

    renderComponent(companyMock)

    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith({
      mutationDocument: SetPatchClientProfileDocument,
      initialValues: { annualRevenue: companyMock.annualRevenue },
      requiredValues: { clientId: companyMock.id }
    })

    expect(getClientAnnualRevenueHookMock).toHaveBeenCalledTimes(1)
    expect(getClientAnnualRevenueHookMock).toHaveBeenCalledWith(companyMock.id)

    expect(getAdjustBigDecimalValueMock).toHaveBeenCalledTimes(1)
    expect(getAdjustBigDecimalValueMock).toHaveBeenCalledWith(fieldName)

    expect(EditableFieldMock).toHaveBeenCalledTimes(1)
    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        onChange: 'handler',
        disabled: disabledMock,
        updateOnBlur: true,
        name: fieldName,
        queryValue: 'query',
        adjustValues: 'adjust-function',
        value: companyMock.annualRevenue,
        viewer: expect.objectContaining({
          type: AnnualRevenueViewer,
          props: {
            value: companyMock.annualRevenue
          }
        }),
        editor: expect.any(Function)
      }),
      {}
    )

    expect(CompanyExternalSourceInfoMock).toHaveBeenCalledTimes(1)
    expect(CompanyExternalSourceInfoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: companyMock.clientopedia?.revenue,
        userValue: companyMock.annualRevenue,
        formattedValue: expect.objectContaining({
          type: Amount,
          props: {
            amount: companyMock.clientopedia?.revenue,
            weight: 'semibold'
          }
        }),
        type: CompanyExternalSourceType.CLIENTOPEDIA
      }),
      {}
    )
  })
})
