import { getByRole } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import LoaderOverlay from '.'

const arrangeTest = (props: Partial<ComponentProps<typeof LoaderOverlay>>) =>
  render(
    <TestWrapper>
      <LoaderOverlay {...props}>
        <div data-testid='content' />
      </LoaderOverlay>
    </TestWrapper>
  )

describe('LoaderOverlay', () => {
  it('default render', () => {
    const { queryByTestId } = arrangeTest({})

    expect(queryByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).not.toBeInTheDocument()
  })

  it('renders as a span element', () => {
    const { queryByTestId } = arrangeTest({
      as: 'span'
    })

    const wrapper = queryByTestId('LoaderOverlayWrapper')

    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.tagName).toBe('SPAN')
    expect(queryByTestId('LoaderOverlay')).not.toBeInTheDocument()
  })

  it('shows a Loader overlay when `loading` is true', () => {
    const { queryByTestId } = arrangeTest({
      loading: true
    })

    expect(queryByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    expect(queryByTestId('LoaderOverlay')).toBeInTheDocument()
  })

  it('shows a medium Loader overlay when `loading` is true', () => {
    const { getByTestId } = arrangeTest({
      loaderSize: 'medium',
      loading: true
    })

    expect(
      getByRole(getByTestId('LoaderOverlay'), 'progressbar').style.width
    ).toBe('32px')
  })

  it('shows a large Loader overlay when `loading` is true', () => {
    const { getByTestId } = arrangeTest({
      loaderSize: 'large',
      loading: true
    })

    expect(
      getByRole(getByTestId('LoaderOverlay'), 'progressbar').style.width
    ).toBe('64px')
  })

  it('shows a top-aligned Loader overlay when `loading` is true', () => {
    const { getByTestId } = arrangeTest({
      loaderPosition: 'top',
      loading: true
    })

    expect(getByTestId('LoaderOverlay')).toContainHTML(
      'justify-content:flex-start;'
    )
  })
})
