import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ModalSkeleton from './ModalSkeleton'

const arrangeTest = (props: ComponentProps<typeof ModalSkeleton>) =>
  render(
    <TestWrapper>
      <ModalSkeleton {...props} />
    </TestWrapper>
  )

describe('ModalSkeleton', () => {
  describe('When title is passed', () => {
    it('renders title', () => {
      const TITLE = 'TEST_TITLE'

      arrangeTest({ title: TITLE })

      expect(screen.getByTestId('ModalSkeleton-title')).toHaveTextContent(TITLE)
    })
  })
})
