import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'

import NoteCardInfo from './NoteCardInfo'

const CREATED_AT = '2020-03-09T18:00:51+03:00'
const AUTHOR_NAME = 'Author Name'
const AUTHOR: Partial<{
  webResource: { text: string; url?: string | null }
}> = {
  webResource: {
    text: AUTHOR_NAME,
    url: ''
  }
}

const arrangeTest = (author = AUTHOR, updatedAt = CREATED_AT) =>
  render(
    <TestWrapper>
      <NoteCardInfo
        author={author}
        createdAt={CREATED_AT}
        updatedAt={updatedAt}
      />
    </TestWrapper>
  )

describe('NoteCardInfo', () => {
  it('render note card info', () => {
    arrangeTest()

    const addedAt = parseAndFormatDateTime(CREATED_AT)

    expect(screen.getByText(AUTHOR_NAME)).toBeInTheDocument()
    expect(screen.getByText(`added on ${addedAt}`)).toBeInTheDocument()
  })

  it('should render if author is missing', () => {
    arrangeTest({})

    const addedAt = parseAndFormatDateTime(CREATED_AT)

    expect(screen.queryByText(AUTHOR_NAME)).not.toBeInTheDocument()
    expect(screen.getByText(`added on ${addedAt}`)).toBeInTheDocument()
  })

  it('should display the update section', () => {
    const UPDATE_AT = '2020-03-09T19:00:51+03:00'

    arrangeTest(AUTHOR, UPDATE_AT)

    const updatedAt = parseAndFormatDateTime(UPDATE_AT)

    expect(screen.getByText(`(updated on ${updatedAt})`)).toBeInTheDocument()
  })
})
