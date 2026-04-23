import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ContactItem from './ContactItem'
import useRemoveContact from '../hooks/use-remove-contact'
import { contactData } from '../data/mocks'

jest.mock('../hooks/use-remove-contact')

const mockUseRemoveContact = useRemoveContact as jest.Mock<
  ReturnType<typeof useRemoveContact>
>

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <ContactItem jobId='some-id' contact={contactData} />
    </TestWrapper>
  )
}

describe('ContactItem', () => {
  beforeEach(() => {
    mockUseRemoveContact.mockReturnValue({
      removeLoading: false,
      handleContactRemove: jest.fn()
    })
  })

  it('renders contact name', () => {
    const { getByText } = arrangeTest()

    expect(getByText(contactData.node.fullName)).toBeInTheDocument()
  })

  it('removes contact', async () => {
    const removeContactMock = jest.fn()

    mockUseRemoveContact.mockReturnValue({
      removeLoading: false,
      handleContactRemove: removeContactMock
    })

    const { getByTestId } = arrangeTest()

    const removeButton = getByTestId('ContactItem-remove-btn')

    await act(async () => {
      fireEvent.click(removeButton)
    })

    expect(removeContactMock).toHaveBeenCalledTimes(1)
    expect(removeContactMock).toHaveBeenCalledWith(contactData.node.id)
  })
})
