import React from 'react'
import { render } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { TestWrapper } from '@staff-portal/test-utils'

import ItemValue, { ItemValueProps } from './ItemValue'

const arrangeTest = ({ label, content }: ItemValueProps) => {
  const {
    container: { textContent, innerHTML }
  } = render(
    <TestWrapper>
      <ItemValue {...{ label, content }} />
    </TestWrapper>
  )

  return { textContent, innerHTML }
}

describe('ItemValue', () => {
  it('renders nothing', () => {
    const { textContent } = arrangeTest({ label: '', content: '' })

    expect(textContent).toBe('')
  })

  it('renders no value', () => {
    const { textContent } = arrangeTest({ label: 'Label', content: null })

    expect(textContent).toEqual(NO_VALUE)
  })

  it('renders a component', () => {
    const HelloComponent = () => <div>Hello</div>

    const { innerHTML } = arrangeTest({
      label: 'Label',
      content: <HelloComponent />
    })

    expect(innerHTML).toContain('<div>Hello</div>')
  })

  it('renders a string', () => {
    const { innerHTML } = arrangeTest({
      label: 'Label',
      content: 'Hello World!'
    })

    expect(innerHTML).toContain('Hello World!')
  })

  it('renders a number', () => {
    const { innerHTML } = arrangeTest({ label: null, content: 1000 })

    expect(innerHTML).toContain('1000')
  })
})
