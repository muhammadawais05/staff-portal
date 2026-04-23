import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyFinancialInformationContent from './index'
import CompanyFinancialInformationDetailItems from '../CompanyFinancialInformationDetailItems'
import companyFinancialInformation from '../../data/company-financial-information-fragment.mock'

jest.mock('@staff-portal/ui/src/components/DetailedList')
jest.mock('../CompanyFinancialInformationDetailItems', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedCompanyFinancialInformationDetailItems =
  CompanyFinancialInformationDetailItems as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof CompanyFinancialInformationContent>
) =>
  render(
    <TestWrapper>
      <CompanyFinancialInformationContent {...props} />
    </TestWrapper>
  )

describe('CompanyFinancialInformationContent', () => {
  it('renders Financial Information Detail Items with correct props', () => {
    mockedCompanyFinancialInformationDetailItems.mockReturnValueOnce(null)

    arrangeTest({
      companyDetails: companyFinancialInformation
    })

    expect(mockedCompanyFinancialInformationDetailItems).toHaveBeenCalledWith(
      {
        companyDetails: companyFinancialInformation
      },
      {}
    )
  })
})
