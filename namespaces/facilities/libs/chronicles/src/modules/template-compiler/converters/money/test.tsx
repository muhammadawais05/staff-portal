import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { renderRecord as renderPerformedAction } from '../../compiler'
import { MONEY_TYPE_PAYLOAD_TEMPLATE, MODEL_DESCRIPTIONS } from './fixture'

afterEach(cleanup)

describe('money payload type', () => {
  it('should render template with money payload', () => {
    const result = renderPerformedAction(
      MONEY_TYPE_PAYLOAD_TEMPLATE,
      MODEL_DESCRIPTIONS
    )

    const { container } = render(<TestWrapper>{result}</TestWrapper>)

    expect(container).toMatchSnapshot()
  })
})
