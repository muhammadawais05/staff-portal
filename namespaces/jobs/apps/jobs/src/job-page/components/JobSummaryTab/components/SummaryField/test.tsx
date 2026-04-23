import React from 'react'
import { render, screen } from '@testing-library/react'
import { FieldCheckResult } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import SummaryField, { Props } from './SummaryField'

const arrangeTest = ({ filled, noMark }: Props) =>
  render(
    <TestWrapper>
      <SummaryField filled={filled} noMark={noMark} />
    </TestWrapper>
  )

describe('SummaryField', () => {
  it('Renders green icon', () => {
    arrangeTest({ filled: FieldCheckResult.COMPLETE })

    expect(screen.getByTestId('SummaryField-green-icon')).toBeInTheDocument()
  })

  it('Renders red icon', () => {
    arrangeTest({ filled: FieldCheckResult.EMPTY })

    expect(screen.getByTestId('SummaryField-red-icon')).toBeInTheDocument()
  })

  it('Renders without mark', () => {
    arrangeTest({ filled: FieldCheckResult.EMPTY, noMark: true })

    expect(
      screen.queryByTestId('SummaryField-red-icon')
    ).not.toBeInTheDocument()
  })
})
