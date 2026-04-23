import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import socialMediaCompanyDetails from '../../../components/SocialMedia/data/client-social-media-fragment.mock'
import WebAndSocial from '.'

jest.mock('../InDepthCompanyResearch')
jest.mock('../../../components/SocialMedia')
jest.mock('../../../components/CompanyFinancialInformation')
jest.mock('@staff-portal/error-handling')

const companyId = socialMediaCompanyDetails.id

const arrangeTest = (props: ComponentProps<typeof WebAndSocial>) =>
  render(
    <TestWrapper>
      <WebAndSocial {...props} />
    </TestWrapper>
  )

describe('WebAndSocial', () => {
  it('displays proper sub components', () => {
    const { getByTestId } = arrangeTest({ companyId })

    expect(getByTestId('InDepthCompanyResearch-companyId')).toHaveTextContent(
      companyId
    )
    expect(getByTestId('SocialMedia-companyId')).toHaveTextContent(companyId)
    expect(
      getByTestId('CompanyFinancialInformation-companyId')
    ).toHaveTextContent(companyId)
  })
})
