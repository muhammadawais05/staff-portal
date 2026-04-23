import React, { ComponentProps } from 'react'

import ContentLoader from '.'
import renderComponent from '../../utils/tests'

const defaultProps = {
  loading: false,
  showSkeleton: false,
  skeletonComponent: <div data-testid='skeleton' />
}

const render = (props: Partial<ComponentProps<typeof ContentLoader>> = {}) => {
  const finalProps = { ...defaultProps, ...props }

  return renderComponent(
    <ContentLoader {...finalProps}>
      <div />
    </ContentLoader>
  )
}

describe('ContentLoader', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })

  it('render as span using the `as` prop', () => {
    const { container } = render({
      as: 'span'
    })

    expect(container).toMatchSnapshot()
  })

  it('render skeleton state', () => {
    const { container } = render({
      showSkeleton: true
    })

    expect(container).toMatchSnapshot()
  })

  it('render loading state', () => {
    const { container } = render({
      loading: true
    })

    expect(container).toMatchSnapshot()
  })

  it('render loading state with large loader', () => {
    const { container } = render({
      loading: true,
      loaderSize: 'large'
    })

    expect(container).toMatchSnapshot()
  })

  it('render loading state with top-aligned loader', () => {
    const { container } = render({
      loading: true,
      loaderPosition: 'top'
    })

    expect(container).toMatchSnapshot()
  })
})
