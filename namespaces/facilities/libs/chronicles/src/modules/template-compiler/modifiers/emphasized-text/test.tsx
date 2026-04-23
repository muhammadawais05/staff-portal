import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { renderRecord as renderPerformedAction } from '../../compiler'
import { EMPHASIZED_TEXT_TEMPLATE, MODEL_DESCRIPTIONS } from './fixture'

describe('emphasized_text modifier for object payload', () => {
  it('should render template with replaced emphasized_text modifier with the colored label', () => {
    const result = renderPerformedAction(
      EMPHASIZED_TEXT_TEMPLATE,
      MODEL_DESCRIPTIONS
    )

    const { container } = render(<TestWrapper>{result}</TestWrapper>)

    expect(container).toMatchSnapshot()
  })
})
