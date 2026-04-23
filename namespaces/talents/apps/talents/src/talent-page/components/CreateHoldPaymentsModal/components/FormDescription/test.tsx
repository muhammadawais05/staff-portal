import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { FormDescription } from './FormDescription'
import { TabType } from '../../types'

const arrangeTest = (tab: TabType = TabType.AUTOMATIC) =>
  render(
    <TestWrapper>
      <FormDescription currentTab={tab} />
    </TestWrapper>
  )

describe('FormDescription', () => {
  it('renders copy for AUTOMATIC tab', () => {
    const { container } = arrangeTest()

    expect(container.textContent).toContain(
      "Put a hold on user's payments and specify when the hold should be lifted."
    )
  })

  it('renders copy for MANUAL tab', () => {
    const { container } = arrangeTest(TabType.MANUAL)

    expect(container.textContent).toContain(
      "Put a hold on user's payments that should be lifted manually."
    )
  })
})
