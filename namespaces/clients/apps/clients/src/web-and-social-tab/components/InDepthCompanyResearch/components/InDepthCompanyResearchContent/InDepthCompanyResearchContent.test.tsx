import React, { ComponentProps } from 'react'
import { screen, render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedList } from '@staff-portal/ui'
import { EditableField } from '@staff-portal/editable'

import CompanyExternalSourceInfo from '../../../../../components/CompanyExternalSourceInfo'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'
import {
  getClientFoundingYearHook,
  getClientIndustryHook,
  getClientRevenueRangeHook,
  getClientCurrentEmployeeCountHook,
  getClientSecondaryIndustryHook
} from '../../../../utils'
import {
  InDepthCompanyResearchBusinessModels,
  InDepthCompanyResearchIndustry,
  InDepthCompanyResearchRevenueRange,
  InDepthCompanyResearchAnnualRevenue,
  InDepthCompanyResearchSecondaryIndustry,
  InDepthCompanyResearchCareerPages,
  InDepthCompanyResearchFoundingYear,
  InDepthCompanyResearchTotalEmployees
} from '../'
import InDepthCompanyResearchContent from '.'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: jest.fn()
}))
jest.mock('@staff-portal/ui', () => {
  const mock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  mock.Row = jest.fn()
  mock.Item = jest.fn()

  return {
    DetailedList: mock
  }
})
jest.mock('@staff-portal/operations/src/utils', () => ({
  isOperationEnabled: () => true
}))
jest.mock('../../../../../components/CompanyExternalSourceInfo', () => ({
  ...jest.requireActual('../../../../../components/CompanyExternalSourceInfo'),
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../../../../utils', () => ({
  useInDepthCompanyResearchMutation: () => ({
    handleChange: mockedHandleChange
  }),
  getClientCurrentEmployeeCountHook: jest.fn(),
  getClientIndustryHook: jest.fn(),
  getClientSecondaryIndustryHook: jest.fn(),
  getClientFoundingYearHook: jest.fn(),
  getClientRevenueRangeHook: jest.fn()
}))
jest.mock('../', () => ({
  InDepthCompanyResearchBusinessModels: jest.fn(),
  InDepthCompanyResearchIndustry: jest.fn(),
  InDepthCompanyResearchRevenueRange: jest.fn(),
  InDepthCompanyResearchAnnualRevenue: jest.fn(),
  InDepthCompanyResearchSecondaryIndustry: jest.fn(),
  InDepthCompanyResearchFoundingYear: jest.fn(),
  InDepthCompanyResearchTotalEmployees: jest.fn(),
  InDepthCompanyResearchCareerPages: jest.fn()
}))

const mockedHandleChange = jest.fn()
const mockedUseClientFoundingYear = jest.fn()
const mockedUseClientIndustry = jest.fn()
const mockedUseClientRevenueRange = jest.fn()
const mockedUseClientCurrentEmployeeCount = jest.fn()
const mockedUseClientSecondaryIndustry = jest.fn()

const mockedDetailedList = DetailedList as unknown as jest.Mock
const mockedDetailedListRow = DetailedList.Row as unknown as jest.Mock
const mockedDetailedListItem = DetailedList.Item as unknown as jest.Mock
const mockedEditableField = EditableField as unknown as jest.Mock
const mockedGetClientIndustryHook =
  getClientIndustryHook as unknown as jest.Mock
const mockedGetClientSecondaryIndustryHook =
  getClientSecondaryIndustryHook as unknown as jest.Mock
const mockedGetClientRevenueRangeHook =
  getClientRevenueRangeHook as unknown as jest.Mock
const mockedGetClientCurrentEmployeeCountHook =
  getClientCurrentEmployeeCountHook as unknown as jest.Mock
const mockedGetClientFoundingYearHook =
  getClientFoundingYearHook as unknown as jest.Mock
const mockedCompanyExternalSourceInfo =
  CompanyExternalSourceInfo as unknown as jest.Mock
const mockedInDepthCompanyResearchIndustry =
  InDepthCompanyResearchIndustry as unknown as jest.Mock
const mockedInDepthCompanyResearchBusinessModels =
  InDepthCompanyResearchBusinessModels as unknown as jest.Mock
const mockedInDepthCompanyResearchSecondaryIndustry =
  InDepthCompanyResearchSecondaryIndustry as unknown as jest.Mock
const mockedInDepthCompanyResearchRevenueRange =
  InDepthCompanyResearchRevenueRange as unknown as jest.Mock
const mockedInDepthCompanyResearchAnnualRevenue =
  InDepthCompanyResearchAnnualRevenue as unknown as jest.Mock
const mockedInDepthCompanyResearchFoundingYear =
  InDepthCompanyResearchFoundingYear as unknown as jest.Mock
const mockedInDepthCompanyResearchCareerPages =
  InDepthCompanyResearchCareerPages as unknown as jest.Mock
const mockedInDepthCompanyResearchTotalEmployees =
  InDepthCompanyResearchTotalEmployees as unknown as jest.Mock

const renderComponent = (
  props: ComponentProps<typeof InDepthCompanyResearchContent>
) => {
  mockedDetailedList.mockImplementation(({ children }) => <>{children}</>)
  mockedDetailedListRow.mockImplementation(({ children }) => <>{children}</>)
  mockedDetailedListItem.mockImplementation(({ label, children }) => (
    <div data-testid={label}>{children}</div>
  ))
  mockedEditableField.mockReturnValue(null)
  mockedCompanyExternalSourceInfo.mockReturnValue(null)
  mockedInDepthCompanyResearchIndustry.mockReturnValue(null)
  mockedInDepthCompanyResearchBusinessModels.mockReturnValue(null)
  mockedInDepthCompanyResearchSecondaryIndustry.mockReturnValue(null)
  mockedInDepthCompanyResearchRevenueRange.mockReturnValue(null)
  mockedInDepthCompanyResearchAnnualRevenue.mockReturnValue(null)
  mockedInDepthCompanyResearchCareerPages.mockReturnValue(null)
  mockedInDepthCompanyResearchFoundingYear.mockReturnValue(null)
  mockedInDepthCompanyResearchTotalEmployees.mockReturnValue(null)

  mockedGetClientFoundingYearHook.mockReturnValue(mockedUseClientFoundingYear)
  mockedGetClientIndustryHook.mockReturnValue(mockedUseClientIndustry)
  mockedGetClientSecondaryIndustryHook.mockReturnValue(
    mockedUseClientSecondaryIndustry
  )
  mockedGetClientRevenueRangeHook.mockReturnValue(mockedUseClientRevenueRange)
  mockedGetClientCurrentEmployeeCountHook.mockReturnValue(
    mockedUseClientCurrentEmployeeCount
  )

  render(
    <TestWrapper>
      <InDepthCompanyResearchContent {...props} />
    </TestWrapper>
  )
}

describe('InDepthCompanyResearchContent', () => {
  it('displays detailed list section with correct title', () => {
    const careerPagesInitialValue = {
      totalCount: 0,
      nodes: [
        {
          id: 'test',
          url: 'test',
          primary: true
        }
      ]
    }
    const companyDetails = {
      id: 'test',
      foundingYear: '123',
      industry: 'Industry test',
      revenueRange: '$100-500',
      careerPages: careerPagesInitialValue,
      employeeCountEstimation: '10-100',
      internalEmployeeCount: 50,
      secondaryIndustry: null,
      businessModels: ['test'],
      operations: {
        patchClientProfileOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    } as unknown as GetInDepthCompanyResearchClientFragment

    renderComponent({ companyDetails })

    expect(screen.getByTestId('Section-title')).toHaveTextContent(
      'In-depth Company Research'
    )

    expect(mockedInDepthCompanyResearchFoundingYear).toHaveBeenNthCalledWith(
      1,
      {
        disabled: false,
        company: companyDetails,
        queryValue: mockedUseClientFoundingYear
      },
      {}
    )
    expect(mockedInDepthCompanyResearchIndustry).toHaveBeenCalledWith(
      {
        disabled: false,
        name: 'industry',
        onChange: mockedHandleChange,
        company: companyDetails,
        queryValue: mockedUseClientIndustry
      },
      {}
    )
    expect(mockedInDepthCompanyResearchRevenueRange).toHaveBeenCalledWith(
      {
        disabled: false,
        name: 'revenueRange',
        onChange: mockedHandleChange,
        company: companyDetails,
        queryValue: mockedUseClientRevenueRange
      },
      {}
    )
    expect(mockedInDepthCompanyResearchAnnualRevenue).toHaveBeenCalledWith(
      {
        disabled: false,
        company: companyDetails
      },
      {}
    )
    expect(mockedInDepthCompanyResearchCareerPages).toHaveBeenCalledWith(
      {
        disabled: false,
        clientId: companyDetails.id,
        name: 'careerPages',
        value: companyDetails.careerPages?.nodes
      },
      {}
    )
    expect(mockedInDepthCompanyResearchSecondaryIndustry).toHaveBeenCalledWith(
      {
        disabled: false,
        name: 'secondaryIndustry',
        value: undefined,
        onChange: mockedHandleChange,
        queryValue: mockedUseClientSecondaryIndustry
      },
      {}
    )
    expect(mockedInDepthCompanyResearchBusinessModels).toHaveBeenCalledWith(
      {
        clientId: 'test',
        disabled: false,
        name: 'businessModels',
        onChange: mockedHandleChange,
        value: [{ text: 'test', value: 'test' }]
      },
      {}
    )
  })
})
