import React from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@toptal/picasso/test-utils'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentInfractionsListActions from './TalentInfractionsListActions'

const mockedUseModal = useModal as jest.Mock

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn().mockReturnValue({
    showModal: () => {}
  })
}))

const arrangeTest = () => {
  render(
    <TestWrapperWithMocks>
      <TalentInfractionsListActions onCreate={jest.fn()} />
    </TestWrapperWithMocks>
  )
}

describe('TalentInfractionsListActions', () => {
  it('renders Add Infraction button', async () => {
    const showModal = jest.fn()

    mockedUseModal.mockReturnValue({
      showModal
    })

    arrangeTest()

    const button = screen.getByRole('button', { name: 'Add Infraction' })

    expect(showModal).not.toHaveBeenCalled()

    fireEvent.click(button)

    expect(showModal).toHaveBeenCalled()
  })
})
