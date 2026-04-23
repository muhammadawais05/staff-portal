import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ContainerLoader from '.'

const defaultProps = {
  loading: false,
  showSkeleton: false,
  skeletonComponent: <div data-testid='skeleton' />
}

const arrangeTest = (
  props: Partial<ComponentProps<typeof ContainerLoader>> = {}
) => {
  const finalProps = { ...defaultProps, ...props }

  return render(
    <TestWrapper>
      <ContainerLoader {...finalProps}>
        <div data-testid='content' />
      </ContainerLoader>
    </TestWrapper>
  )
}

describe('ContainerLoader', () => {
  it('default render', () => {
    const { queryByTestId } = arrangeTest()

    expect(queryByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).not.toBeInTheDocument()
  })

  it('render as span using the `as` prop', () => {
    const { queryByTestId } = arrangeTest({
      as: 'span'
    })

    expect(queryByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).not.toBeInTheDocument()
  })

  it('render skeleton state', () => {
    const { queryByTestId } = arrangeTest({
      showSkeleton: true
    })

    expect(queryByTestId('skeleton')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlayWrapper')).not.toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).not.toBeInTheDocument()
  })

  it('render loading state', () => {
    const { queryByTestId } = arrangeTest({
      loading: true
    })

    expect(queryByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).toContainHTML(
      'width: 16px; height: 16px;'
    )
    expect(queryByTestId('LoaderOverlay')).toContainHTML(
      'justify-content:center;'
    )
  })

  it('render loading state with large loader', () => {
    const { queryByTestId } = arrangeTest({
      loading: true,
      loaderSize: 'large'
    })

    expect(queryByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).toContainHTML(
      'width: 64px; height: 64px;'
    )
    expect(queryByTestId('LoaderOverlay')).toContainHTML(
      'justify-content:center;'
    )
  })

  it('render loading state with top-aligned loader', () => {
    const { queryByTestId } = arrangeTest({
      loading: true,
      loaderPosition: 'top'
    })

    expect(queryByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).toContainHTML(
      'width: 16px; height: 16px;'
    )
    expect(queryByTestId('LoaderOverlay')).toContainHTML(
      'justify-content:flex-start;'
    )
  })
})
