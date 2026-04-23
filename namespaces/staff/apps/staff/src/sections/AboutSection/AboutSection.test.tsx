import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  ContainerLoader,
  TextSectionSkeleton,
  MultilineTextViewer
} from '@staff-portal/ui'
import { Container } from '@toptal/picasso'

import AboutSection from './AboutSection'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ContainerLoader: jest.fn(),
  MultilineTextViewer: jest.fn()
}))

type Props = ComponentProps<typeof AboutSection>

const renderComponent = (props: Props) =>
  render(
    <TestWrapper>
      <AboutSection {...props} />
    </TestWrapper>
  )

const MockContainerLoader = ContainerLoader as jest.Mock
const MockMultilineTextViewer = MultilineTextViewer as jest.Mock

describe('AboutSection', () => {
  beforeEach(() => {
    MockContainerLoader.mockImplementationOnce(({ children }) => (
      <>{children}</>
    ))
    MockMultilineTextViewer.mockReturnValueOnce(null)
  })

  const loading = {} as boolean
  const initialLoading = {} as boolean

  describe('when about is provided', () => {
    it('renders About section', () => {
      const about = {} as string

      renderComponent({ loading, initialLoading, about })

      expect(MockContainerLoader).toHaveBeenCalledTimes(1)
      expect(MockContainerLoader).toHaveBeenCalledWith(
        {
          loading,
          showSkeleton: initialLoading,
          skeletonComponent: expect.objectContaining({
            type: TextSectionSkeleton,
            props: {
              title: 'About'
            }
          }),
          children: expect.objectContaining({
            type: Container
          })
        },
        {}
      )
      expect(MockMultilineTextViewer).toHaveBeenCalledTimes(1)
      expect(MockMultilineTextViewer).toHaveBeenCalledWith(
        {
          value: about
        },
        {}
      )
    })
  })

  describe('when about is not provided', () => {
    it('does not render About section', () => {
      renderComponent({ loading, initialLoading })

      expect(MockMultilineTextViewer).toHaveBeenCalledTimes(0)
    })
  })
})
