import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyFinancialInformation from './index'
import companyFinancialInformation from './data/company-financial-information-fragment.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('./components/CompanyFinancialInformationContent')

const mockedUseGetNode = useGetNode as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof CompanyFinancialInformation>
) =>
  render(
    <TestWrapper>
      <CompanyFinancialInformation {...props} />
    </TestWrapper>
  )

describe('CompanyFinancialInformation', () => {
  describe('when data provided', () => {
    it('default render', () => {
      mockedUseGetNode.mockImplementation(() => () => ({
        data: { node: { id: companyFinancialInformation.id } },
        loading: false
      }))

      const { getByTestId } = arrangeTest({
        companyId: companyFinancialInformation.id
      })

      expect(getByTestId('ContainerLoader-loading')).toHaveTextContent('false')
      expect(
        getByTestId('CompanyFinancialInformationContent')
      ).toBeInTheDocument()
      expect(
        getByTestId('CompanyFinancialInformationContent-companyDetails')
      ).toHaveTextContent(`"id":"${companyFinancialInformation.id}"`)
    })

    describe('when no company details provided', () => {
      it('displays nothing', () => {
        mockedUseGetNode.mockImplementation(() => () => ({
          data: undefined,
          loading: false
        }))

        const { queryByTestId } = arrangeTest({
          companyId: companyFinancialInformation.id
        })

        expect(queryByTestId('ContainerLoader-loading')).toHaveTextContent(
          'false'
        )
        expect(
          queryByTestId('CompanyFinancialInformationContent')
        ).not.toBeInTheDocument()
      })
    })

    describe('when data is loading', () => {
      it('displays nothing except loader', () => {
        mockedUseGetNode.mockImplementation(() => () => ({
          data: undefined,
          loading: true
        }))

        const { queryByTestId } = arrangeTest({
          companyId: companyFinancialInformation.id
        })

        expect(queryByTestId('ContainerLoader-loading')).toHaveTextContent(
          'true'
        )
        expect(
          queryByTestId('CompanyFinancialInformationContent')
        ).not.toBeInTheDocument()
      })
    })
  })
})
