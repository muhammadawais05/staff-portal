import React from 'react'
import { render } from '@testing-library/react'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'

import SkypeAdditionalIdsTooltip from './SkypeAdditionalIdsTooltip'

describe('SkypeAdditionalIdsTooltip', () => {
  it('should show a tooltip there', () => {
    const additionalSkypeIds = ['test', 'skype', 'additional']

    const { getByTestId } = render(
      <TestWrapper>
        <SkypeAdditionalIdsTooltip additionalSkypeIds={additionalSkypeIds} />
      </TestWrapper>
    )

    expect(getByTestId('additional-skype-ids')).toBeInTheDocument()

    const tooltipIcon = getByTestId('additional-skype-ids')

    assertOnTooltipText(tooltipIcon, `Also used:${additionalSkypeIds.join('')}`)
  })
})
