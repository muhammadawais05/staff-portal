import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyExternalSourceInfo, { CompanyExternalSourceType } from '.'

const arrangeTest = (props: ComponentProps<typeof CompanyExternalSourceInfo>) =>
  render(
    <TestWrapper>
      <CompanyExternalSourceInfo {...props} />
    </TestWrapper>
  )

describe('CompanyExternalSourceInfo', () => {
  it('show correct value', () => {
    arrangeTest({
      value: 'test',
      userValue: 'test2',
      type: CompanyExternalSourceType.BSS
    })

    expect(screen.queryByTestId('external-source-BSS')).toBeInTheDocument()
    expect(screen.queryByText('test')).toBeInTheDocument()
  })

  it('do not show if value empty', () => {
    arrangeTest({ value: undefined, type: CompanyExternalSourceType.BSS })

    expect(screen.queryByTestId('external-source-BSS')).not.toBeInTheDocument()
  })

  it('do not show if value the same as user input', () => {
    arrangeTest({ value: 1, userValue: 1, type: CompanyExternalSourceType.BSS })

    expect(screen.queryByTestId('external-source-BSS')).not.toBeInTheDocument()
  })

  it('do not show if value is an empty string', () => {
    arrangeTest({
      value: '',
      userValue: 1,
      type: CompanyExternalSourceType.BSS
    })

    expect(screen.queryByTestId('external-source-BSS')).not.toBeInTheDocument()
  })
})
