import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import AutocompleteHighlightOption from './index'

describe('AutocompleteHighlightOption', () => {
  it('has to render just Label', async () => {
    const { container } = render(
      <TestWrapper>
        <AutocompleteHighlightOption label='Label' />
      </TestWrapper>
    )

    expect(container.textContent).toBe('Label')
  })

  it('has to render just Highlighted Label', async () => {
    const { container } = render(
      <TestWrapper>
        <AutocompleteHighlightOption
          label='Label'
          labelHighlight='Highlighted Label'
        />
      </TestWrapper>
    )

    expect(container.textContent).toBe('Highlighted Label')
  })

  it('has to render Label, then sub labels', async () => {
    const { container } = render(
      <TestWrapper>
        <AutocompleteHighlightOption
          label='Label '
          nodeTypes={['hello', 'world']}
        />
      </TestWrapper>
    )

    expect(container.textContent).toBe('Label Hello, World')
  })

  it('has to render Highlighted Label, then sub labels', async () => {
    const { container } = render(
      <TestWrapper>
        <AutocompleteHighlightOption
          label='Label '
          labelHighlight='Highlighted Label '
          nodeTypes={['hello', 'world']}
        />
      </TestWrapper>
    )

    expect(container.textContent).toBe('Highlighted Label Hello, World')
  })
})
