import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters, { FilterConfig } from '..'
import { FilterConfigType } from '../../../types'

describe('Radio filter', () => {
  it('should be selectable when value is empty string', () => {
    const EMPTY_STRING_OPTION_LABEL = 'empty string'
    const radioConfig: FilterConfig = {
      name: 'test-radio',
      label: 'Test radio',
      type: FilterConfigType.RADIO,
      options: [{ label: EMPTY_STRING_OPTION_LABEL, value: '' }]
    }

    render(
      <TestWrapper>
        <Filters config={[radioConfig]} values={{ [radioConfig.name]: '' }} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByLabelText('Filter'))

    expect(
      screen.getByLabelText(new RegExp(EMPTY_STRING_OPTION_LABEL, 'i'))
    ).toBeChecked()
  })
})
