import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { renderRecord as renderPerformedAction } from '../../compiler'
import { EMPHASIZED_TEMPLATE, MODEL_DESCRIPTIONS } from './fixture'

describe('emphasized modifier for object payload', () => {
  it('should render template with replaced emphasized modifier with the colored label', () => {
    const result = renderPerformedAction(
      EMPHASIZED_TEMPLATE,
      MODEL_DESCRIPTIONS
    )

    const { container } = render(<TestWrapper>{result}</TestWrapper>)

    expect(container).toMatchSnapshot()
  })
})
