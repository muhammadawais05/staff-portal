import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { renderNameCol, TaskNameColRenderProps } from './render-name-col'

jest.mock('../../components/EditableTaskDescription', () => ({
  __esModule: true,
  default: () => <div />
}))

const arrangeTest = (props: TaskNameColRenderProps) =>
  render(<TestWrapper>{renderNameCol(props)}</TestWrapper>)

describe('render name column', () => {
  describe('comments counter', () => {
    it('do not show if no comments', () => {
      const data = {
        task: {}
      } as TaskNameColRenderProps

      const { queryByText, queryByTestId } = arrangeTest(data)

      // https://toptal-core.atlassian.net/browse/CRT-3240
      expect(queryByText('0')).not.toBeInTheDocument()
      expect(queryByTestId('comment-count')).not.toBeInTheDocument()
    })

    it('show if any comments', () => {
      const data = {
        task: {
          commentCount: 1,
          status: 'FINISHED'
        }
      } as TaskNameColRenderProps

      const { queryByText, getByTestId } = arrangeTest(data)

      expect(queryByText('1')).toBeInTheDocument()
      expect(getByTestId('comment-count')).toBeInTheDocument()
    })
  })
})
