import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DetailedListSkeleton from '.'

const arrangeTest = (props: ComponentProps<typeof DetailedListSkeleton>) =>
  render(
    <TestWrapper>
      <DetailedListSkeleton {...props} />
    </TestWrapper>
  )

describe('DetailedListSkeleton', () => {
  it('displays detailed list section with correct title', () => {
    const { getAllByTestId } = arrangeTest({
      items: 5,
      columns: 1
    })

    expect(getAllByTestId('row-item')).toHaveLength(5)
  })
})
