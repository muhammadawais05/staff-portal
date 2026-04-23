import { render, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import MockDate from 'mockdate'

import ContactDetails from './ContactDetails'
import useRemoveContact from '../hooks/use-remove-contact'
import { contactData } from '../data/mocks'

jest.mock('../hooks/use-remove-contact')
jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  PhoneLink: () => <div />
}))

const mockUseRemoveContact = useRemoveContact as jest.Mock<
  ReturnType<typeof useRemoveContact>
>

const CONTACT_ID = '33'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <ContactDetails jobId='some-id' contact={contactData} />
    </TestWrapper>
  )
}

describe('ContactDetails', () => {
  beforeAll(() => {
    MockDate.set('2022-01-01T10:20:30')
  })

  beforeEach(() => {
    mockUseRemoveContact.mockReturnValue({
      removeLoading: false,
      handleContactRemove: jest.fn()
    })
  })

  it('renders fullName', () => {
    const { getByText } = arrangeTest()

    expect(getByText(contactData.node.fullName)).toBeInTheDocument()
  })

  it('renders email', () => {
    const { getByText } = arrangeTest()

    expect(getByText(contactData.node.email)).toBeInTheDocument()
  })

  it('renders timezone', () => {
    const { getByText } = arrangeTest()

    expect(
      getByText(getTimeZoneFullText(contactData.node.timeZone))
    ).toBeInTheDocument()
  })

  it('renders photo', () => {
    const { getByRole } = arrangeTest()

    expect(getByRole('img')).toHaveAttribute(
      'src',
      contactData.node.photo?.small
    )
  })

  it('renders profile link', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId('ContactDetails-profile-link')).toHaveAttribute(
      'href',
      contactData.node.webResource?.url
    )
  })

  it('removes contact', async () => {
    const removeContactMock = jest.fn()

    mockUseRemoveContact.mockReturnValue({
      removeLoading: false,
      handleContactRemove: removeContactMock
    })

    const { getByTestId } = arrangeTest()

    const removeButton = getByTestId('ContactDetails-remove-btn')

    await act(async () => {
      fireEvent.click(removeButton)
    })

    expect(removeContactMock).toHaveBeenCalledTimes(1)
    expect(removeContactMock).toHaveBeenCalledWith(CONTACT_ID)
  })
})
