import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetUserSearchAutocomplete } from '@staff-portal/facilities'

import { useGetReferer } from './data'
import NoteFormReferrer from './NoteFormReferrer'

const REFERRER_ID = 'VjEtU3RhZmYtMjE3Mjc2OQ'
const REFERRER_NAME = 'Referrer Name'

jest.mock('./data', () => ({
  __esModule: true,
  useGetReferer: jest.fn()
}))

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  useGetUserSearchAutocomplete: jest.fn()
}))

const mockReturnValues = () => {
  const mockUseGetReferer = useGetReferer as jest.Mock
  const mockUseGetUserSearchAutocomplete =
    useGetUserSearchAutocomplete as jest.Mock

  mockUseGetReferer.mockImplementation(
    ({ onCompleted }: { onCompleted: () => void }) => ({
      referrer: { fullName: REFERRER_NAME },
      getReferrer: onCompleted,
      loading: false
    })
  )

  mockUseGetUserSearchAutocomplete.mockReturnValue({
    getUsers: jest.fn(),
    data: [],
    loading: false
  })
}

const arrangeTest = () => {
  mockReturnValues()

  return render(
    <TestWrapper>
      <Form
        initialValues={{
          answers: [{ value: REFERRER_ID }]
        }}
        onSubmit={() => {}}
      >
        <NoteFormReferrer index={0} placeholder='Select Referrer' />
      </Form>
    </TestWrapper>
  )
}

describe('NoteFormReferrer', () => {
  it('shows default referrer', async () => {
    arrangeTest()

    expect(screen.getByPlaceholderText('Select Referrer')).toHaveValue(
      REFERRER_NAME
    )
  })

  it('clears the referral value', async () => {
    arrangeTest()

    expect(await screen.findByPlaceholderText('Select Referrer')).toHaveValue(
      REFERRER_NAME
    )

    fireEvent.change(screen.getByPlaceholderText('Select Referrer'), {
      target: { value: '' }
    })

    expect(await screen.findByPlaceholderText('Select Referrer')).toHaveValue(
      ''
    )
  })
})
