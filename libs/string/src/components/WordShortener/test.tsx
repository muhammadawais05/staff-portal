import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import WordShortener, { Props } from './WordShortener'

const arrangeTest = ({
  children,
  maxCharsPerWord,
  shortenedWordLength
}: Props) =>
  render(
    <TestWrapper>
      <WordShortener
        maxCharsPerWord={maxCharsPerWord}
        shortenedWordLength={shortenedWordLength}
      >
        {children}
      </WordShortener>
    </TestWrapper>
  )

describe('WordShortener', () => {
  it('shortens long words with defaults', () => {
    arrangeTest({
      children:
        'Loremipsumdolorsitamethulsxvfdecteturadipisicingeliasdsicingeliasd ad cupiditate alias mollitia!'
    })

    expect(
      screen.getByText('Loremipsumdolorsitamethulsxvfdecteturadipisicingel…')
    ).toBeInTheDocument()
  })

  it('shortens long words with custom props', () => {
    const word1 = 'firstword'
    const word2 = 'secondword'

    arrangeTest({
      children: `${word1} ${word2} lor ip is`,
      maxCharsPerWord: 4,
      shortenedWordLength: 2
    })

    expect(screen.getByText('fi…')).toBeInTheDocument()
    expect(screen.getByText('se…')).toBeInTheDocument()
  })

  it('shortens long words and preserves brackets', () => {
    const word1 = '(firstword)'
    const word2 = '(secondword)'

    arrangeTest({
      children: `${word1} ${word2} lor ip is`,
      maxCharsPerWord: 4,
      shortenedWordLength: 2
    })

    expect(screen.getByText('(fi…)')).toBeInTheDocument()
    expect(screen.getByText('(se…)')).toBeInTheDocument()
  })

  it('does not shorten short words', () => {
    const word = 'first'
    const children = `${word} lor ip is`

    arrangeTest({
      children,
      maxCharsPerWord: word.length,
      shortenedWordLength: 2
    })

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('opens a shortened word', () => {
    const children =
      'Loremipsumdolorsitamethulsxvfdecteturadipisicingeliasd ad cupiditate alias mollitia!'

    arrangeTest({ children })

    const shortenedWord = screen.getByText(
      'Loremipsumdolorsitamethulsxvfdecteturadipisicingel…'
    )

    fireEvent.click(shortenedWord)

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
