import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CommentCount, { Props } from './CommentCount'

const renderTestCommentCount = (props: Props) => {
  const { count, onClick } = props

  return render(
    <TestWrapper>
      <CommentCount count={count} onClick={onClick} />
    </TestWrapper>
  )
}

describe('CommentCount', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { getByTestId } = renderTestCommentCount({
      count: 1,
      onClick: jest.fn()
    })

    expect(getByTestId('comment-count')).toBeInTheDocument()
  })
})
