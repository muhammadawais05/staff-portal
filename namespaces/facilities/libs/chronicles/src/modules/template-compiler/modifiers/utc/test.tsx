import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { renderRecord as renderPerformedAction } from '../../compiler'
import { CHANGE_UTC_TEMPLATE, CHANGE_UTC_MODEL_DESCRIPTIONS } from './fixture'

describe('utc modifier for change payload type', () => {
  it('should render change template with replaced date/time with utc timezone and specific format', () => {
    const result = renderPerformedAction(
      CHANGE_UTC_TEMPLATE,
      CHANGE_UTC_MODEL_DESCRIPTIONS
    )

    const { container } = render(<TestWrapper>{result}</TestWrapper>)

    expect(container).toMatchSnapshot()
  })
})
