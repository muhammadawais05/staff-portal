import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField, QueryResult } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import {
  GetInDepthCompanyResearchClientFragment,
  SetPatchClientProfileDocument
} from '../../../../data'
import InDepthCompanyResearchFoundingYear from './InDepthCompanyResearchFoundingYear'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('../../../../../components/CompanyExternalSourceInfo')

const EditableFieldMock = EditableField as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock

const fieldName: keyof Pick<PatchClientProfileInput, 'foundingYear'> =
  'foundingYear'

const disabledMock = 'disabled' as unknown as boolean

const getCompanyMock = (
  mock: Pick<
    GetInDepthCompanyResearchClientFragment,
    'foundingYear' | 'clientopedia'
  >
) => ({ id: 'company-id', ...mock } as GetInDepthCompanyResearchClientFragment)

interface Props {
  company: GetInDepthCompanyResearchClientFragment
  queryValue: () => QueryResult<string>
}
const renderComponent = ({ company, queryValue }: Props) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearchFoundingYear
        company={company}
        disabled={disabledMock}
        queryValue={queryValue}
      />
    </TestWrapper>
  )

describe('InDepthCompanyResearchFoundingYear', () => {
  beforeEach(() => {
    useEditableFieldChangeHandlerMock.mockReturnValue('handler')
    EditableFieldMock.mockReturnValue(null)
    CompanyExternalSourceInfoMock.mockReturnValue(
      <div data-testid='clientopedia-source-info' />
    )
  })

  it.each([
    { foundingYear: 'founding-year', expected: 'founding-year' },
    { foundingYear: '', expected: null },
    { foundingYear: null, expected: null },
    { foundingYear: undefined, expected: null }
  ])(
    'passes correct initialValues to useEditableFieldChangeHandler',
    ({ foundingYear, expected }) => {
      const companyMock = getCompanyMock({ foundingYear })

      renderComponent({
        company: companyMock,
        queryValue: jest.fn()
      })

      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: { foundingYear: expected }
        })
      )
    }
  )

  it('calls inner functions and components with correct params', () => {
    const queryValueMock = jest.fn()
    const companyMock = getCompanyMock({
      foundingYear: 'founding-year',
      clientopedia: {
        foundingYear: 'clientopedia-foundingYear'
      }
    })

    renderComponent({
      company: companyMock,
      queryValue: queryValueMock
    })

    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith({
      mutationDocument: SetPatchClientProfileDocument,
      initialValues: { foundingYear: companyMock.foundingYear },
      requiredValues: { clientId: companyMock.id }
    })

    expect(EditableFieldMock).toHaveBeenCalledTimes(1)
    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        onChange: 'handler',
        disabled: disabledMock,
        updateOnBlur: true,
        name: fieldName,
        queryValue: queryValueMock,
        value: companyMock.foundingYear,
        viewer: 'founding-year',
        editor: expect.any(Function)
      }),
      {}
    )

    expect(CompanyExternalSourceInfoMock).toHaveBeenCalledTimes(2)
    expect(CompanyExternalSourceInfoMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        value: companyMock.buyingSignalsService?.foundingYear,
        userValue: companyMock.foundingYear,
        type: CompanyExternalSourceType.BSS
      }),
      {}
    )
    expect(CompanyExternalSourceInfoMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        value: companyMock.clientopedia?.foundingYear,
        userValue: companyMock.foundingYear,
        type: CompanyExternalSourceType.CLIENTOPEDIA
      }),
      {}
    )
  })
})
