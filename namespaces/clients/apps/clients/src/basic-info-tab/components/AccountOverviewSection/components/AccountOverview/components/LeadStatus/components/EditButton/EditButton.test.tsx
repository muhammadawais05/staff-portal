import React from 'react'
import { Button } from '@toptal/picasso'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EditButton from '.'

jest.mock('@toptal/picasso/Button', () => jest.fn())

const ButtonMock = Button as unknown as jest.Mock
const CHECK_OPERATION = () => {}

describe('EditButton', () => {
  it('renders button', () => {
    ButtonMock.mockReturnValue('button')

    render(
      <TestWrapper>
        <EditButton
          disabled={true}
          checkOperation={CHECK_OPERATION}
          loading={true}
        />
      </TestWrapper>
    )

    expect(screen.getByText('button')).toBeInTheDocument()
    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: true,
        disabled: true,
        onClick: CHECK_OPERATION
      }),
      {}
    )
  })
})
