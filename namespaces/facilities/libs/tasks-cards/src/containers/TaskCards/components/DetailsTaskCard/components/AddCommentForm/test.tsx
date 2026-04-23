import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import AddCommentForm from './AddCommentForm'

const getItem = (selector: string) => document.querySelector(selector)

const arrangeTest = () =>
  render(
    <TestWrapperWithMocks addTypename={false}>
      <AddCommentForm taskId='ID1' />
    </TestWrapperWithMocks>
  )

describe('AddCommentForm', () => {
  it('has required elements', () => {
    arrangeTest()

    expect(getItem("textarea[name='taskComment']")).not.toBeNull()
    expect(getItem('button')?.textContent).toContain('Submit Comment')
  })
})
