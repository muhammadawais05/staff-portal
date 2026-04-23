import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CommitmentText from './CommitmentText'

const arrangeTest = (tag: ReturnType<typeof CommitmentText>) =>
  render(<TestWrapper>{tag}</TestWrapper>)

describe('CommitmentText', () => {
  it('renders commitment type when no text is present', () => {
    arrangeTest(<CommitmentText commitment='full_time' />)
    const commitmentText = screen.getByTestId('commitment-text')

    expect(commitmentText).toBeInTheDocument()
    expect(commitmentText).toHaveTextContent('Full-time')
  })

  it('renders text when no commitment is present', () => {
    arrangeTest(<CommitmentText text='Multiple Hires' />)
    const commitmentText = screen.getByTestId('commitment-text')

    expect(commitmentText).toBeInTheDocument()
    expect(commitmentText).toHaveTextContent('Multiple Hires')
  })

  it('renders only commitment when both are present', () => {
    arrangeTest(<CommitmentText commitment='hourly' text='(some gibberish)' />)
    const commitmentText = screen.getByTestId('commitment-text')

    expect(commitmentText).toBeInTheDocument()
    expect(commitmentText).toHaveTextContent('Hourly')
  })
})
