import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TaskGroupHeader, { Props, STARRED_GROUP_NAME } from './TaskGroupHeader'

jest.mock('@toptal/picasso/Icon', () => ({
  StarSolid16: () => <div data-testid='star-icon' />,
  Calendar16: () => <div data-testid='calendar-icon' />
}))

const TEST_TITLE = 'test title'

const arrangeTest = ({ title }: Props) =>
  render(
    <TestWrapper>
      <table>
        <thead>
          <TaskGroupHeader title={title} />
        </thead>
      </table>
    </TestWrapper>
  )

describe('TaskGroupHeader', () => {
  it("renders star icon if title equals 'Starred'", () => {
    const { getByTestId, queryByTestId } = arrangeTest({
      title: STARRED_GROUP_NAME
    })

    expect(getByTestId('star-icon')).toBeInTheDocument()
    expect(queryByTestId('calendar-icon')).not.toBeInTheDocument()
  })

  it("renders calendar icon if title is not equal 'Starred'", () => {
    const { getByTestId, queryByTestId } = arrangeTest({
      title: TEST_TITLE
    })

    expect(queryByTestId('star-icon')).not.toBeInTheDocument()
    expect(getByTestId('calendar-icon')).toBeInTheDocument()
  })

  it('renders title properly cased', () => {
    const { getByText } = arrangeTest({
      title: TEST_TITLE
    })

    expect(getByText('Test title')).toBeInTheDocument()
  })
})
