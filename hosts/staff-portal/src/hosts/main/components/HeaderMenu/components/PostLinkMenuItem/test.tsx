import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import PostLinkMenuItem from './PostLinkMenuItem'

const arrangeTest = (label: string, path: string) =>
  render(
    <TestWrapper>
      <PostLinkMenuItem label={label} path={path} />
    </TestWrapper>
  )

describe('PostLinkMenuItem', () => {
  it('submits the form when click on item menu', () => {
    const onSubmitMock = jest.fn(e => e.preventDefault())
    const LABEL = 'Menu Label'
    const PATH = '/some-path'

    arrangeTest(LABEL, PATH)

    const form = screen.getByTestId('action-form')

    form.onsubmit = onSubmitMock

    fireEvent.click(screen.getByText(LABEL))

    expect(form).toHaveAttribute('action', PATH)
    expect(onSubmitMock).toHaveBeenCalled()
  })
})
