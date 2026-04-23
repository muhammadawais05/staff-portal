import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import FormInterviewContacts from './FormInterviewContacts'
import FormInterviewContactsSelect from '../FormInterviewContactsSelect'
import FormInterviewContactsTags from '../FormInterviewContactsTags'
import { ContactType } from '../../types'

jest.mock('../FormInterviewContactsSelect', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../FormInterviewContactsTags', () => ({
  __esModule: true,
  default: jest.fn()
}))

const FormInterviewContactsSelectMock = FormInterviewContactsSelect as jest.Mock
const FormInterviewContactsTagsMock = FormInterviewContactsTags as jest.Mock

const arrangeTest = ({
  availableContacts,
  interviewContacts
}: {
  availableContacts: ContactType[]
  interviewContacts: ContactType[]
}) =>
  render(
    <TestWrapper>
      <FormInterviewContacts
        availableContacts={availableContacts}
        interviewContacts={interviewContacts}
      />
    </TestWrapper>
  )

describe('FormInterviewContacts', () => {
  it('shows contacts select and contacts list', () => {
    FormInterviewContactsSelectMock.mockReturnValueOnce(null)
    FormInterviewContactsTagsMock.mockReturnValueOnce(null)

    const availableContacts: ContactType[] = [
      { id: '1', fullName: 'Contact 1' }
    ]
    const interviewContacts: ContactType[] = [
      { id: '2', fullName: 'Contact 2' },
      { id: '3', fullName: 'Contact 3' }
    ]

    arrangeTest({
      availableContacts,
      interviewContacts
    })

    expect(FormInterviewContactsSelectMock).toHaveBeenCalledTimes(1)
    expect(FormInterviewContactsSelectMock).toHaveBeenCalledWith(
      {
        availableContacts
      },
      {}
    )

    expect(FormInterviewContactsTagsMock).toHaveBeenCalledTimes(1)
    expect(FormInterviewContactsTagsMock).toHaveBeenCalledWith(
      {
        availableContacts: [...interviewContacts, ...availableContacts]
      },
      {}
    )
  })
})
