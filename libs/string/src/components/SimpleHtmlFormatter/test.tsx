import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SimpleHtmlFormatter from './SimpleHtmlFormatter'

const arrangeTest = async ({
  text,
  removeReplies = false
}: {
  text: string
  removeReplies?: boolean
}) =>
  render(
    <TestWrapper>
      <SimpleHtmlFormatter text={text} removeReplies={removeReplies} />
    </TestWrapper>
  )

describe('SimpleHtmlFormatter', () => {
  it('should replace new lines by <p> and line breaks by <br>', async () => {
    const text = 'test\r\nnew\r\n\r\nparagraphs\r\nand\r\nline\r\nbreaks'

    const { container } = await arrangeTest({ text })

    expect(container.querySelectorAll('br')).toHaveLength(4)
    expect(container.querySelectorAll('p')).toHaveLength(2)
  })

  it('should replace new lines for Windows-style carriage returns', async () => {
    const text = 'test\nnew\n\nparagraphs'

    const { container } = await arrangeTest({ text })

    expect(container.querySelectorAll('br')).toHaveLength(1)
    expect(container.querySelectorAll('p')).toHaveLength(2)
  })

  it('should remove replies', async () => {
    const text = 'regular text with\r\n\r\n\r\n\r\n\r\n>some\r\n>replies'

    await arrangeTest({ text, removeReplies: true })

    expect(screen.getByText('regular text with')).toBeInTheDocument()
    expect(screen.queryByText('some')).not.toBeInTheDocument()
    expect(screen.queryByText('replies')).not.toBeInTheDocument()
  })

  it('should remove links, scripts, styles and meta tags', async () => {
    const text = `
      <link rel="stylesheet" href=""/>
      <style>
        .someClass {}
      </style>
      <script src=""></script>
      <meta />
      <meta name="description" content=""/>

      email content
    `

    const { container } = await arrangeTest({ text })

    expect(container.querySelectorAll('link')).toHaveLength(0)
    expect(container.querySelectorAll('script')).toHaveLength(0)
    expect(container.querySelectorAll('style')).toHaveLength(0)
    expect(container.querySelectorAll('meta')).toHaveLength(0)
    expect(screen.getByText('email content')).toBeInTheDocument()
  })
})
