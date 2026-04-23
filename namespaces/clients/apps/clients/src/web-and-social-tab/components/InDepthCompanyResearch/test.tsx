import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import InDepthCompanyResearch from '.'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('./components/InDepthCompanyResearchContent')

const COMPANY_ID = '123'
const mockedUseGetNode = useGetNode as jest.Mock

const arrangeTest = (props: ComponentProps<typeof InDepthCompanyResearch>) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearch {...props} />
    </TestWrapper>
  )

describe('InDepthCompanyResearch', () => {
  describe('when data value returned', () => {
    it('default render', () => {
      mockedUseGetNode.mockImplementation(() => () => ({
        data: { node: { id: COMPANY_ID } },
        loading: false
      }))

      const { getByTestId } = arrangeTest({ companyId: COMPANY_ID })

      expect(getByTestId('ContainerLoader-loading')).toHaveTextContent('false')
      expect(getByTestId('InDepthCompanyResearchContent')).toBeInTheDocument()
      expect(
        getByTestId('InDepthCompanyResearchContent-companyDetails')
      ).toHaveTextContent('"id":"123"')
    })

    it('displays nothing if no company details', () => {
      mockedUseGetNode.mockImplementation(() => () => ({
        data: undefined,
        loading: false
      }))

      const { queryByTestId } = arrangeTest({ companyId: COMPANY_ID })

      expect(queryByTestId('ContainerLoader-loading')).toHaveTextContent(
        'false'
      )
      expect(
        queryByTestId('InDepthCompanyResearchContent')
      ).not.toBeInTheDocument()
    })

    it('render loader component', () => {
      mockedUseGetNode.mockImplementation(() => () => ({
        data: undefined,
        loading: true
      }))

      const { queryByTestId } = arrangeTest({ companyId: COMPANY_ID })

      expect(queryByTestId('ContainerLoader-loading')).toHaveTextContent('true')
      expect(
        queryByTestId('InDepthCompanyResearchContent')
      ).not.toBeInTheDocument()
    })
  })
})
