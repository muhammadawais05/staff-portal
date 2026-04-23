import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { Form, FieldWrapper } from '@toptal/picasso-forms'

import { useCandidateSendingContext } from '../../hooks'
import TalentAutocompleteField from './TalentAutocompleteField'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  FieldWrapper: jest.fn()
}))

jest.mock('../FieldSkeleton/FieldSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid='field-skeleton' />
}))

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  Autocomplete: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const FieldWrapperMock = FieldWrapper as unknown as jest.Mock

const renderComponent = () => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    talentName: 'Andrei'
  }))

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <TalentAutocompleteField />
      </Form>
    </TestWrapper>
  )
}

describe('TalentAutocompleteField', () => {
  it('renders the proper content', () => {
    FieldWrapperMock.mockImplementation(() => null)

    renderComponent()

    expect(FieldWrapperMock).toHaveBeenCalledTimes(1)
    expect(FieldWrapperMock).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        hint: "Start typing talent's name",
        name: 'talentId'
      }),
      {}
    )
  })
})
