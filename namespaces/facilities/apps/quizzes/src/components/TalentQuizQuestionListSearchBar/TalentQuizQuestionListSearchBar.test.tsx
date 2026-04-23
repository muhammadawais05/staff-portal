import React from 'react'
import { render } from '@testing-library/react'
import { SearchBar } from '@staff-portal/filters'

import TalentQuizQuestionListSearchBar from './TalentQuizQuestionListSearchBar'

jest.mock('@staff-portal/filters', () => ({
  ...jest.requireActual('@staff-portal/filters'),
  SearchBar: jest.fn(),
  createInputCategory: jest.fn(({ name }) => name)
}))

const MockSearchBar = SearchBar as unknown as jest.Mock

const mockNestableControls = <div>Mock Nestable Controls</div>

const arrangeTest = () => {
  MockSearchBar.mockImplementation(() => null)

  return render(
    <TalentQuizQuestionListSearchBar nestableControls={mockNestableControls} />
  )
}

describe('TalentQuizQuestionListSearchBar', () => {
  const context = {}

  it('passes valid properties', () => {
    arrangeTest()

    expect(MockSearchBar).toHaveBeenCalledWith(
      {
        name: 'badges',
        categories: ['keywords'],
        nestableControls: mockNestableControls
      },
      context
    )
  })
})
