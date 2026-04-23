import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import socialMediaCompanyDetails from '../../data/client-social-media-fragment.mock'
import SocialMediaContainer from '.'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock(
  '../SocialMediaContent'
)

const mockedUseGetNode = useGetNode as jest.Mock

const arrangeTest = (props: ComponentProps<typeof SocialMediaContainer>) =>
  render(
    <TestWrapper>
      <SocialMediaContainer {...props} />
    </TestWrapper>
  )

describe('SocialMediaContainer', () => {
  describe('when data provided', () => {
    it('default render', () => {
      mockedUseGetNode.mockImplementation(() => () => ({
        data: { node: socialMediaCompanyDetails },
        loading: false,
        initialLoading: false
      }))

      const { getByTestId } = arrangeTest({
        companyId: socialMediaCompanyDetails.id
      })

      expect(getByTestId('ContainerLoader-loading')).toHaveTextContent('false')
      expect(getByTestId('SocialMediaContent')).toBeInTheDocument()
      expect(
        getByTestId('SocialMediaContent-companyDetails')
      ).toHaveTextContent(JSON.stringify(socialMediaCompanyDetails))
    })
  })

  describe('when no company details provided', () => {
    it('displays nothing', () => {
      mockedUseGetNode.mockImplementation(() => () => ({
        data: undefined,
        loading: false
      }))

      const { queryByTestId } = arrangeTest({
        companyId: socialMediaCompanyDetails.id
      })

      expect(queryByTestId('ContainerLoader-loading')).toHaveTextContent(
        'false'
      )
      expect(queryByTestId('SocialMediaContent')).not.toBeInTheDocument()
    })
  })

  describe('when data is loading', () => {
    it('render loader component', () => {
      mockedUseGetNode.mockImplementation(() => () => ({
        data: undefined,
        loading: true
      }))

      const { queryByTestId } = arrangeTest({
        companyId: socialMediaCompanyDetails.id
      })

      expect(queryByTestId('ContainerLoader-loading')).toHaveTextContent('true')
      expect(queryByTestId('SocialMediaContent')).not.toBeInTheDocument()
    })
  })
})
