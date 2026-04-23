import React, { ReactNode } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import GroupField, { Props } from './GroupField'

const MockGroup = ({ children }: { children?: ReactNode }) => {
  return <div data-testid='mock-group'>{children}</div>
}
const MockInput = ({
  children,
  label,
  value,
  disabled
}: {
  label: ReactNode
  disabled: boolean
  value: string
  children?: ReactNode
}) => {
  return (
    <div data-testid='mock-input'>
      <input disabled={disabled} value={value} readOnly />
      {label}
      {children}
    </div>
  )
}

const arrangeTest = (props: Partial<Props & { children: ReactNode }> = {}) => {
  const defaultProps: Props = {
    Group: MockGroup,
    Input: MockInput,
    name: 'test_group',
    label: 'Group label',

    disabledOptions: [],
    choices: [
      {
        value: 'value',
        label: 'choice label'
      },
      {
        value: 'tooltip_value',
        label: 'tooltip label',
        tooltip: 'woot woot hoverin'
      },
      {
        value: 'disable_me',
        label: 'disabled input label'
      }
    ]
  }

  render(
    <TestWrapper>
      <GroupField {...{ ...defaultProps, ...props }} />
    </TestWrapper>
  )
}

describe('GroupField', () => {
  it('renders choices as grouped inputs with optional tooltips', () => {
    arrangeTest()

    expect(screen.getByText('Group Label')).toBeInTheDocument()

    expect(screen.getByText('choice label')).toBeInTheDocument()
    expect(screen.getByText('tooltip label')).toBeInTheDocument()
    expect(screen.getByText('disabled input label')).toBeInTheDocument()
  })

  it('renders children', () => {
    arrangeTest({ children: 'Woot woot children' })

    expect(screen.getByText('Woot woot children')).toBeInTheDocument()
  })

  it('renders icon when choice has a tooltip', () => {
    arrangeTest()
    const svgs = screen.getByTestId('mock-group').querySelectorAll('svg')

    expect(svgs).toHaveLength(1)
    expect(svgs.item(0).classList.value).toMatch('QuestionMark16')
  })

  it('renders disabled inputs', () => {
    arrangeTest({ disabledOptions: ['disable_me'] })

    const disabledInputs = screen
      .getByTestId('mock-group')
      .querySelectorAll('input[value="disable_me"]')

    expect(disabledInputs).toHaveLength(1)
    expect(disabledInputs.item(0)).toHaveAttribute('disabled')
  })
})
