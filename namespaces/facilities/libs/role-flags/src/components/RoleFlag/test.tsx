import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import RoleFlag from './RoleFlag'

const TITLE = 'Greenfield'
const COMMENT = 'Test comment'
const FLAGGED_BY = 'Test Name'

const arrangeTest = () =>
  render(
    <TestWrapperWithMocks mocks={[]}>
      <RoleFlag
        title={TITLE}
        comment={COMMENT}
        createdAt='2020-10-11T10:45:53-03:00'
        updatedAt='2020-10-11T10:45:53-03:00'
        flaggedBy={FLAGGED_BY}
        plainTooltip={false}
      />
    </TestWrapperWithMocks>
  )

describe('RoleFlag', () => {
  it('renders label with flag title', () => {
    const { getByText } = arrangeTest()

    expect(getByText(TITLE)).toBeInTheDocument()
  })

  it('should display tooltip', async () => {
    const { getByTestId } = arrangeTest()
    const roleFlag = getByTestId('role-flag')

    fireEvent.mouseOver(roleFlag)
    const tooltip = screen.getByRole('tooltip')

    expect(tooltip).toHaveTextContent(COMMENT)
    expect(tooltip).toHaveTextContent(`Added by ${FLAGGED_BY} on Oct 11, 2020`)
  })
})
