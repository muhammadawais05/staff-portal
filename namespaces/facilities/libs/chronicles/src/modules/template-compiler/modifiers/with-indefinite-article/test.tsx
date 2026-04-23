import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { renderRecord as renderPerformedAction } from '../../compiler'
import {
  ENTRY_WITH_INDEFINITE_ARTICLE_TEMPLATE,
  ENTRY_WITH_ORDINARY_ARTICLE_TEMPLATE,
  MODEL_DESCRIPTIONS
} from './fixture'

afterEach(cleanup)

describe('with-indefinite-article modifier for change payload type', () => {
  it('should render change template with an article', () => {
    const result = renderPerformedAction(
      ENTRY_WITH_INDEFINITE_ARTICLE_TEMPLATE,
      MODEL_DESCRIPTIONS
    )

    const { container } = render(<TestWrapper>{result}</TestWrapper>)

    expect(container).toMatchSnapshot()
  })

  it('should render change template with a article', () => {
    const result = renderPerformedAction(
      ENTRY_WITH_ORDINARY_ARTICLE_TEMPLATE,
      MODEL_DESCRIPTIONS
    )

    const { container } = render(<TestWrapper>{result}</TestWrapper>)

    expect(container).toMatchSnapshot()
  })
})
