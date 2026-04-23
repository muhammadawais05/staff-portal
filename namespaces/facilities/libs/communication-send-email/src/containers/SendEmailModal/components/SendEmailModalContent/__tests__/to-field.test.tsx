import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import SendEmailModalContent from '../index'
import { createEmailContextMock } from '../../../data/get-email-context/mocks'
import { EmailContext } from '../../../types'
import ToField from '../../ToField'
import { RoleRecipientFragment } from '../../../data/fragments'

const createCompanyRepresentativeMock = () =>
  ({
    id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyMjE0MTk',
    fullName: 'Maynard Monahan',
    email: 'tim.-f02a3c7d39d3ff92@toptal.io',
    contacts: {
      nodes: [
        {
          id: 'VjEtQ29udGFjdC0yNjA4MTc0',
          value: 'tim.-f02a3c7d39d3ff92@toptal.io'
        }
      ],
      __typename: 'ContactConnection'
    },
    __typename: 'TalentPartner'
  } as RoleRecipientFragment)

const arrangeTest = ({
  emailContext,
  mocks
}: {
  emailContext: EmailContext
  mocks?: MockedResponse[]
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SendEmailModalContent emailContext={emailContext} hideModal={() => {}}>
        <ToField />
      </SendEmailModalContent>
    </TestWrapperWithMocks>
  )

describe('Send Email modal "To" field', () => {
  it('cannot be cleared by clearing its input field text', async () => {
    // We need 5+ representatives to trigger search behavior of its `Select`
    const representatives = Array(5)
      .fill({})
      .map(createCompanyRepresentativeMock)
    const mainRepresentative = representatives[0]
    const emailContextMock = createEmailContextMock({
      emailMessaging: {
        defaultSendTo: mainRepresentative,
        optionsSendTo: { nodes: representatives }
      }
    })

    arrangeTest({ emailContext: emailContextMock })

    const toFieldValue = `${mainRepresentative.fullName} <${mainRepresentative.email}>`
    const toField = screen.getByLabelText(/To/i)

    expect(toField).toHaveValue(toFieldValue)

    fireEvent.change(toField, { target: { value: '' } })
    fireEvent.blur(toField)

    expect(toField).toHaveValue(toFieldValue)

    // Wait for GoogleAppsAuthNotification to complete
    await waitFor(() => {})
  })
})
