import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import MakeLinksInteractive from './MakeLinksInteractive'

const TEST_URL_1 = 'http://www.example.com/'
const TEST_URL_2 = 'http://a.org/abc/p/a/t_(asd)/'

const arrangeTest = (text: string) =>
  render(
    <TestWrapper>
      <MakeLinksInteractive>{text}</MakeLinksInteractive>
    </TestWrapper>
  )

const expectLink = (el: Element, url: string) => {
  const linkEl = el.querySelector('a')

  expect(linkEl).not.toBeNull()
  expect(linkEl?.href).toBe(url)
}

describe('MakeLinksInteractive', () => {
  it('renders simple links', () => {
    const { container, getByText } = arrangeTest(TEST_URL_1)

    expectLink(container, TEST_URL_1)

    expect(getByText(TEST_URL_1)).toBeInTheDocument()
  })

  it('renders complex links', () => {
    const { container, getByText } = arrangeTest(TEST_URL_2)

    expectLink(container, TEST_URL_2)

    expect(getByText(TEST_URL_2)).toBeInTheDocument()
  })

  it('renders link and text', () => {
    const { container, getByText } = arrangeTest(`Test ${TEST_URL_2} text`)

    expectLink(container, TEST_URL_2)

    expect(getByText(TEST_URL_2)).toBeInTheDocument()
    expect(getByText(/Test/i)).toBeInTheDocument()
    expect(getByText(TEST_URL_2)).toBeInTheDocument()
    expect(getByText(/text/i)).toBeInTheDocument()
  })

  it('renders only text', () => {
    const { container, getByText } = arrangeTest(`Test text`)

    const linkEl = container.querySelector('a')

    expect(linkEl).toBeNull()
    expect(getByText(/Test text/i)).toBeInTheDocument()
  })
})
