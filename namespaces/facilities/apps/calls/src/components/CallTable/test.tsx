import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CallTable from '.'

const arrangeTest = (props: ComponentProps<typeof CallTable>) =>
  render(
    <TestWrapper>
      <CallTable {...props} />
    </TestWrapper>
  )

describe('CallTable', () => {
  describe('when all necessary data to display a section is returned', () => {
    it('displays content', () => {
      arrangeTest({
        children: (
          <tr>
            <td>table content</td>
          </tr>
        )
      })

      expect(screen.getByTestId('call-table')).toBeInTheDocument()
      expect(screen.getByText('table content')).toBeInTheDocument()
    })
  })
})
