/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import TalentCreatePositionField from './TalentCreatePositionField'
import { useGetPositions } from './hooks/get-positions'

jest.mock('./hooks/get-positions', () => ({
  useGetPositions: jest.fn()
}))

const mockUseGetPositions = useGetPositions as jest.Mock

const arrangeTest = (noData = false) => {
  mockUseGetPositions.mockReturnValue({
    selectOptions: noData
      ? []
      : [
          {
            value: 'val',
            text: 'Some Text'
          }
        ],
    loading: false
  })

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <TalentCreatePositionField />
      </Form>
    </TestWrapper>
  )
}

describe('TalentCreatePositionField', () => {
  it('renders dropdown', () => {
    arrangeTest()

    expect(screen.getByLabelText(/TopScreen Position/i)).toBeInTheDocument()
  })
})
