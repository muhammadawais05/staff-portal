import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import AutocompleteHighlightOption from './index'

describe('AutocompleteHighlightOption', () => {
  it('has to render a Label value', async () => {
    const { container } = render(
      <TestWrapper>
        <AutocompleteHighlightOption label='Just a label' />
      </TestWrapper>
    )

    expect(container.textContent).toBe('Just a label')
  })

  it('has to render a Highlighted Label value', async () => {
    const { container } = render(
      <TestWrapper>
        <AutocompleteHighlightOption
          label='Just a label'
          labelHighlight='Highlighted Label'
        />
      </TestWrapper>
    )

    expect(container.textContent).toBe('Highlighted Label')
  })
})
