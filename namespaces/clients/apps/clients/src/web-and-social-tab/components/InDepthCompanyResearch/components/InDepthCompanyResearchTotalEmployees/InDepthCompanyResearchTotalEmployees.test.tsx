import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EditableField } from '@staff-portal/editable'

import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'
import InDepthCompanyResearchTotalEmployees from './InDepthCompanyResearchTotalEmployees'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../../../../components/CompanyExternalSourceInfo')

const EditableFieldMock = EditableField as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock

const disabledMock = 'disabled' as unknown as boolean

const getCompanyMock = (
  mock: Pick<
    GetInDepthCompanyResearchClientFragment,
    'internalEmployeeCount' | 'clientopedia'
  >
) => ({ id: 'company-id', ...mock } as GetInDepthCompanyResearchClientFragment)

const ON_CHANGE = Symbol() as unknown as () => void

const renderComponent = ({
  company,
  queryValue
}: Pick<
  ComponentProps<typeof InDepthCompanyResearchTotalEmployees>,
  'company' | 'queryValue'
>) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearchTotalEmployees
        company={company}
        onChange={ON_CHANGE}
        disabled={disabledMock}
        queryValue={queryValue}
      />
    </TestWrapper>
  )

describe('InDepthCompanyResearchTotalEmployees', () => {
  beforeEach(() => {
    EditableFieldMock.mockReturnValue(null)
    CompanyExternalSourceInfoMock.mockReturnValue(
      <div data-testid='clientopedia-source-info' />
    )
  })

  it('calls inner functions and components with correct params', () => {
    const queryValueMock = jest.fn()
    const companyMock = getCompanyMock({
      internalEmployeeCount: 50
    })

    renderComponent({
      company: companyMock,
      queryValue: queryValueMock
    })

    expect(EditableFieldMock).toHaveBeenNthCalledWith(
      1,
      {
        disabled: 'disabled',
        editor: expect.any(Function),
        name: 'currentEmployeeCount',
        queryValue: queryValueMock,
        updateOnBlur: true,
        value: 50,
        viewer: '50',
        onChange: ON_CHANGE
      },
      {}
    )
    expect(CompanyExternalSourceInfoMock).toHaveBeenNthCalledWith(
      1,
      {
        type: CompanyExternalSourceType.BSS,
        userValue: 50,
        value: undefined
      },
      {}
    )
    expect(CompanyExternalSourceInfoMock).toHaveBeenNthCalledWith(
      2,
      {
        type: CompanyExternalSourceType.CLIENTOPEDIA,
        userValue: 50,
        value: undefined
      },
      {}
    )
    expect(CompanyExternalSourceInfoMock).toHaveBeenNthCalledWith(
      3,
      {
        type: CompanyExternalSourceType.GIORGIO,
        userValue: 50,
        value: undefined
      },
      {}
    )
  })
})
